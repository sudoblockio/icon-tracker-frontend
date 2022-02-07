// import React, {Component, useState, useEffect} from 'react'
// import {withRouter} from 'react-router-dom'
// import {
//     numberWithCommas,
//     convertNumberToText,
//     isValidNodeType,
//     convertLoopToIcxDecimal,
//     getBadgeTitle,
//     isUrl,
//     addAt,
//     addUnregisteredStyle
// } from '../../../utils/utils'
// import {CopyButton, LoadingComponent, ReportButton} from '../../../components'
// import NotificationManager from '../../../utils/NotificationManager'
// import {IconConverter, IconAmount} from 'icon-sdk-js'
// import {SocialMediaType} from '../../../utils/const'
// import { prepList, getPRepsRPC, getBalanceOf} from '../../../redux/store/iiss'
// import { contractDetail, cxSocialMedia } from '../../../redux/store/contracts'
// import { addressTokens } from '../../../redux/store/addresses'


// const _isNotificationAvailable = NotificationManager.available()

// function AddressInfo(props) {
//     const [icxMore, setIcxMore ] = useState(false)
//     const [tokenMore, setTokenMore] = useState(false)
//     const [showNode, setShowNode] = useState("none")
//     const [links, setLinks] = useState("")
//     const [totalVoted, setTotalVoted] = useState("")


//     const {wallet, walletAddress, addrTokens} = props
//     const {loading, data, error} = wallet
//     const {
//         is_prep,
//         prep,
//         // media,
//         active,
//         available,
//         staked,
//         unstakes,
//         // balance,
//         iscore
//     } = data
//     const showLinks = is_prep ? true : false
//     const {
//         address,
//         api_endpoint,
//         city,
//         country,
//         created_block,
//         created_timestamp,
//         delegated,
//         grade,
//         last_updated_block,
//         name,
//         node_address,
//         status,
//         node_state,
//         total_blocks,
//         validated_blocks,

//         website,

//     } = prep || {}

//     let unstakeSum = 0;
//         if (unstakes && unstakes.length !== 0) {
//             unstakes.map((list, idx) => {
//                 unstakeSum += Number(convertLoopToIcxDecimal(list.unstake));
//             })
//         }
        
//     let media = ["twitter", "wechat", "youtube", "telegram", "steemit", "reddit", "keybase", "github", "facebook"]
//     let links = {twitter:"", wechat:"", youtube:"", telegram:"", steemit:"", reddit:"", keybase:"", github:"", facebook:""}
//     let linkList = []
//     let tokenBalance = ""
//     let tokenName = []


//     useEffect(() => {
//         let tokens;
//         const {totalDelegated: totalVotedLoop } = await getPRepsRPC()	
// 		const totalVoted = !totalVotedLoop ? 0 : IconConverter.toNumber(IconAmount.of(totalVotedLoop || 0x0, IconAmount.Unit.LOOP).convertUnit(IconAmount.Unit.ICX).value.toString(10))
//         setTotalVoted(totalVoted)
//         let tokens = await addressTokens(props.match.params.addressId)

//         if (props.wallet.data.is_prep === true){
//             getSocialMediaLinks(props.wallet.data.address)
//             linkList=links
//         }



//     }, [])

//     const getContractName = async (tokenContract) => {
//         const res = await contractDetail(tokenContract)
//         tokenName[res.data.name] = await getBalanceOf(props.match.params.addressId, tokenContract)
//     }
//     const getSocialMediaLinks = async (contract) => {
//         const socialLinksMap = await cxSocialMedia(contract);
//         media.map(site =>{
//             if (links && socialLinksMap){
//                 links[site] !== socialLinksMap[site] ? links[site] = socialLinksMap[site] : console.log("no link")
//             }
//         })
//     }
//     const getTokenBalance = async (tokenContract) => {
//         let tokenBalance = await getBalanceOf(props.match.params.addressId, tokenContract)
//     }

//     const toggleIcxMore = () => {
//         setIcxMore(!icxMore)
//     }
//     const toggleTokenMore = () => {
//         setTokenMore(!state.tokenMore)
//     }

//     const goBlock = height => {
//         window.open('/block/' + height, '_blank')
//     }
//     const onSocialClick = async link => {
//         if (isUrl(link)) {
//             window.open(link, '_blank')
//         }
//     }
//     const clickShowBtn = () => {
//         setShowNode("table-row")
//     }


//     const produced = IconConverter.toNumber(total_blocks)
//     const balance = Number(available || 0) + Number(staked || 0) + unstakeSum;
//     const validated = IconConverter.toNumber(validated_blocks)
//     const productivity = !produced ? 'None' : `${(validated / produced * 100).toFixed(2)}%`
//     const _lastGenerateBlockHeight = !last_updated_block ? 'None' : IconConverter.toNumber(last_updated_block)
//     const badge = getBadgeTitle(grade, node_state)
//     const tokenCxs = tokens ? tokens.data: []

//     const Content = () => {
//         if (loading) {
//             return <LoadingComponent height="206px"/>
//         } else {
//             const {public_key, nodeType, tokenList, reportedCount, is_prep} = data
//             const _address = !!public_key ? public_key : error
//             const isConnected = walletAddress === _address
//             const disabled = !_isNotificationAvailable
//             const scam = reportedCount >= 100 ? true : false
            
//             let totalVotes; 
//             !Number(delegated) ? totalVotes =  0 :  totalVotes = Number(Number(delegated) / Number(totalVoted)) / Math.pow(10, 18)
//             return (
//                 <div className="screen0">
//                     <div className="wrap-holder">
//                         {isConnected ? (
//                             <p className="title">
//                                 My Address{is_prep &&
//                             <span className={"title-tag" + addUnregisteredStyle(status, grade)}>{badge}</span>}
//                                 <span className="connected">
//                                     <i className="img"/>Connected to ICONex
//                                 </span>
//                                 <span className={`toggle${disabled ? ' disabled' : ''}`}>
                                    
                                        
                                       
                                    
//                                 </span>
//                             </p>
//                         ) : (
//                             <p className="title">Address{is_prep &&
//                                 <>
//                             <span className={"title-tag" + addUnregisteredStyle(status, grade)}>{badge}</span>
//                             </>
//                             }
//                             </p>
//                         )}
//                         {/* *********** */}
//                         <div className="contents">
//                             <div className="table-box">
//                                 <table className="table-typeB address">
//                                     <thead>
//                                     <tr>
//                                         <th>Address</th>
//                                         <th>value</th>
//                                     </tr>
//                                     </thead>
//                                     <tbody>
//                                     {is_prep && <tr className="p-rep">
//                                         <td>Name</td>
//                                         <td colSpan="3">
//                                             <span>{/* <em>1<sub>st.</sub></em> */}{name}</span>
//                                             {website && <span className="home" onClick={() => {
//                                                 onSocialClick(website)
//                                             }}><i className="img"></i></span>}
//                                             {SocialMediaType.map((type, index) => {
//                                                 const mediaValue = linkList[type]

//                                                 if (!mediaValue) {
//                                                     return null
//                                                 }

//                                                 return (
//                                                     <span key={index} className={type} onClick={() => {
//                                                         onSocialClick(mediaValue)
//                                                     }}>
//                                                             {isUrl(mediaValue) ?
//                                                                 <i className="img"></i>
//                                                                 :
//                                                                 [
//                                                                     <i key="i" className="img tooltip"></i>
//                                                                     ,
//                                                                     <div key="div" className="help-layer">
//                                                                         <p className='txt'>{addAt(mediaValue)}</p>
//                                                                         <div className='tri'></div>
//                                                                     </div>
//                                                                 ]
//                                                             }
//                                                         </span>
//                                                 )
//                                             })}
//                                             {/* <span className="home"><i className="img"></i></span><span className="twitter"><i className="img"></i></span><span className="email"><i className="img"></i></span> */}
                                            
//                                             <span
//                                                 className={`active ${node_state === 'Synced' ? 'on' : node_state==='Inactive' ?  'off' : node_state === 'BlockSync' ? 'Active' : 'Inactive'}`}><i></i>{node_state}</span>
//                                             {/* <span className="btn-scam">Go to Voting</span> */}
//                                         </td>
//                                     </tr>}
//                                     {is_prep && <tr className="">
//                                         <td>Total Votes</td>
//                                         <td colSpan="3">
//                                             <span>{convertNumberToText(delegated)}

//                                             <em>( {totalVotes.toString().slice(0,3)}% )</em>
//                                             {/* <em>( 90.02 % )</em> */}</span>
//                                         </td>
//                                         {/* <td>24h Change Amount</td>
//                                             <td><span>▲  900,000,000.0004</span></td> */}
//                                     </tr>}
//                                     {is_prep && <tr className="last">
//                                         <td>Productivity<br/>(Produced / (Produced + Missed))</td>
//                                         <td>
//                                             <span>{productivity}<em>( {numberWithCommas(validated)} / {numberWithCommas(produced)} )</em></span>
//                                         </td>
//                                         <td>Last Blockheight</td>
//                                         {(_lastGenerateBlockHeight === 'None' || _lastGenerateBlockHeight < 0) ?
//                                             <td><span>None</span></td>
//                                             :
//                                             <td><span className="mint" onClick={() => {
//                                                 goBlock(_lastGenerateBlockHeight)
//                                             }}>{numberWithCommas(_lastGenerateBlockHeight)}{/* <em className="small">( 2019-01-01 17:03:35 )</em> */}</span>
//                                             </td>
//                                         }
//                                     </tr>}
//                                     <tr className="">
//                                         <td>Address</td>
//                                         <td colSpan={is_prep ? '3' : '1'} className={scam ? 'scam' : ''}>
//                                             {scam && <span className="scam-tag">Scam</span>}
//                                             {_address} 
//                                             {/* <QrCodeButton address={_address}/> */}
//                                             <CopyButton data={_address} title={'Copy Address'} isSpan/>
//                                             <span className="show-node-addr"
//                                                   style={is_prep ? {display: ""} : {display: "none"}}
//                                                   onClick={clickShowBtn}>Show node address</span>
//                                             {isValidNodeType(nodeType) &&
//                                             <span className="crep">{`${nodeType}`}</span>}
//                                             {!isConnected && <ReportButton address={public_key}/>}
//                                         </td>
//                                     </tr>
//                                     <tr className="node-addr" style={{display: showNode}}>
//                                         <td>Node Address</td>
//                                         <td colSpan="3">
//                                             <i className="img node-addr"></i>
//                                             {node_address}
//                                         </td>
//                                     </tr>
//                                     <tr>
//                                         <td>Balance</td>
//                                         {/* <td>
//                                                 {`${convertNumberToText(balance)} ICX`}
//                                                 <span className="gray">{`(${convertNumberToText(icxUsd, 3)} USD)`}</span>
//                                             </td> */}
//                                         <td colSpan="3" className="balance">
//                                             <div className={icxMore ? 'on' : ''}>
//                                                 <p><span><i
//                                                     className="coin icon"></i>ICX</span><span>{`${convertNumberToText(data.balance ? data.balance.toFixed() : 0, icxMore ? undefined : 4)}`}<em>ICX</em></span><em
//                                                     className="drop-btn" onClick={toggleIcxMore}><i
//                                                     className="img"></i></em></p>
//                                                 <p><span>Available</span><span>{`${convertNumberToText(Number(available).toFixed())}`}<em>ICX</em></span>
//                                                 </p>
//                                                 <p>
//                                                     <span>Staked</span><span>{`${convertNumberToText(staked)}`}<em>ICX</em></span>
//                                                 </p>
//                                                 {/* <p><span>Staked</span><span><em>{(!balance ? 0 : Number(staked) / balance * 100).toFixed(2)}%</em>{`${convertNumberToText(staked)}`}<em>ICX</em></span></p> */}
                                                
//                                                     <span>Unstaking</span>
//                                                     <span>{`${convertNumberToText(unstakeSum)}`}<em>ICX</em></span>
//                                                     {/* <span><em>{(!balance ? 0 : Number(unstakeSum) / balance * 100).toFixed(2)}%</em>{`${convertNumberToText(unstakeSum)}`}<em>ICX</em></span> */}
//                                                     <div className="unstaking-list">
//                                                         {unstakes && unstakes.length !== 0 ?
//                                                             unstakes.map((dataList) => {

//                                                                 return (
//                                                                     <p>
//                                                                     <span className="unstaking-item">
//                                                                         <em>Target Block Height {convertNumberToText(IconConverter.toNumber(dataList.unstakeBlockHeight))}</em>
//                                                                         <span
//                                                                             className="balance">{convertNumberToText(convertLoopToIcxDecimal(dataList.unstake))}</span><em>ICX</em>
//                                                                     </span>
//                                                                     </p>
//                                                                 )
//                                                             }) : ''}
//                                                     </div>
                                                
//                                                 {/* <p><span>Voted</span><span><em>{(!Number(delegated) ?Address

// Address	hxc4193cda4a75526bf50896ec242d6713bb6b02a3 Report scam
// Balance	
// ICX42,272,003ICX
// totalDe
// Available42,359,732.077366143275843123ICX
// Staked0ICX
// Unstaking0ICX
// Voted0ICX
// I_SCORE0I-Score
// Token5Tokens
// 0 : Number(delegated) / Number(this.state.legated) * 100).toFixed(2)}%</em>{`${convertNumberToText(delegated / (10 ** 18))}`}<em>ICX</em></span></p> */}

//                                                 <p>
//                                                     <span>Voted</span><span>{`${convertNumberToText(delegated / (10 ** 18))}`}<em>ICX</em></span>
//                                                 </p>
//                                                 <p>
//                                                     <span>I_SCORE</span><span>{`${convertNumberToText(iscore)}`}<em>I-Score</em></span>
//                                                 </p>
//                                             </div>
                                            
//                                             <div className={tokenMore ? 'on' : ''}>
//                                                 <p><span><i
//                                                     className="coin"></i>Token</span><span>{(tokenCxs || []).length}<em>Tokens</em></span><em
                                                    
//                                                     className="drop-btn" onClick={toggleTokenMore}><i
//                                                     className="img"></i></em></p>
//                                                 {tokenCxs.length? tokenCxs.forEach((tokenContract, index) => {
//                                                     getContractName(tokenContract)
//                                                 } 
//                                                 ):""}
                                                
//                                                 {Object.entries(tokenName).map((token, index ) => {
//                                                     return <p key={index}>
//                                                     <span>{token[0]}</span><span>{`${convertNumberToText(Number(token[1]) / Math.pow(10, 18))}`}
//                                                     {/* <em>{contractSymbol}</em> */}
//                                                     </span>
//                                                 </p>
//                                                 })}
//                                             </div>
//                                         </td>
//                                     </tr>
//                                     {/* <tr>
//                                             <td>No of Txns</td>
//                                             <td>{`${numberWithCommas(txCount)}`}</td>
//                                         </tr> */}
//                                     {/* <tr>
//                                             <td>Token Balance</td>
//                                             <TokenBalance tokenList={tokenList} />
//                                         </tr> */}
//                                     </tbody>
//                                 </table>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             )
//         }
//     }
//     return Content()

// }

// export default withRouter(AddressInfo)







// BREAK BREAK BREAK 



// import React, {Component} from 'react'
// import {withRouter} from 'react-router-dom'
// import {
//     numberWithCommas,
//     convertNumberToText,
//     isValidNodeType,
//     convertLoopToIcxDecimal,
//     getBadgeTitle,
//     isUrl,
//     addAt,
//     addUnregisteredStyle
// } from '../../../utils/utils'
// import {CopyButton, LoadingComponent, ReportButton} from '../../../components'
// import NotificationManager from '../../../utils/NotificationManager'
// import {IconConverter, IconAmount} from 'icon-sdk-js'
// import {SocialMediaType} from '../../../utils/const'
// import { prepList, getPRepsRPC, getBalanceOf} from '../../../redux/store/iiss'
// import { contractDetail, cxSocialMedia } from '../../../redux/store/contracts'
// import { addressTokens } from '../../../redux/store/addresses'


// const _isNotificationAvailable = NotificationManager.available()

// class AddressInfo extends Component {
//     constructor(props) {
//         super(props)
//         this.state = {
//             notification: _isNotificationAvailable && this.props.walletNotification,
//             icxMore: false,
//             tokenMore: false,
//             showNode: "none",
//             links: ""

//         }
//     }
//     media = ["twitter", "wechat", "youtube", "telegram", "steemit", "reddit", "keybase", "github", "facebook"]
//     links = {twitter:"", wechat:"", youtube:"", telegram:"", steemit:"", reddit:"", keybase:"", github:"", facebook:""}
//     // links = {}
//     linkList = []
//     tokenBalance = ""
//     tokenName = []

// getContractName = async (tokenContract) => {

//         const res = await contractDetail(tokenContract)
//         this.tokenName[res.data.name] = await getBalanceOf(this.props.match.params.addressId, tokenContract)

//     }
    
//     tokens;

//     // hit new social endpoint, map through, check if our current link list matches the response, if not, reset value. 

//     getSocialMediaLinks = async (contract) => {
//         const socialLinksMap = await cxSocialMedia(contract);
//         this.media.map(site =>{
//             if (this.links && socialLinksMap){
//                 this.links[site] !== socialLinksMap[site] ? this.links[site] = socialLinksMap[site] : console.log("no link")
//             }
//         })

// }
    
//     async componentDidMount() {
//         this.getTokenList(this.props.match.params.addressId)
//         const {totalDelegated: totalVotedLoop } = await getPRepsRPC()	
// 		const totalVoted = !totalVotedLoop ? 0 : IconConverter.toNumber(IconAmount.of(totalVotedLoop || 0x0, IconAmount.Unit.LOOP).convertUnit(IconAmount.Unit.ICX).value.toString(10))
//         this.setState({totalVoted})
//         this.tokens = await addressTokens(this.props.match.params.addressId)

//         // this.tokenBalance = await getBalanceOf(this.props.match.params.addressId,'cxc0b5b52c9f8b4251a47e91dda3bd61e5512cd782')
        
//     }

//     getTokenBalance = async (tokenContract) => {
//         this.tokenBalance = await getBalanceOf(this.props.match.params.addressId, tokenContract)
//     }
    

//     onNotificationChange = () => {
//         if (!_isNotificationAvailable) {
//             return
//         }
//         const notification = !this.state.notification
//         this.setState({notification}, () => {
//             this.props.setNotification(notification)
//             if (notification) {
//                 const {wallet} = this.props
//                 const {data, error} = wallet
//                 const address = data.address || error
//                 NotificationManager.registerServiceWorker(address)
//             } else {
//                 NotificationManager.deregisterServiceWorker()
//             }
//         })
//     }

//     toggleIcxMore = () => {
//         this.setState({icxMore: !this.state.icxMore})
//     }

//     toggleTokenMore = () => {
//         this.setState({tokenMore: !this.state.tokenMore})
//     }

//     goBlock = height => {
//         window.open('/block/' + height, '_blank')
//     }

//     onSocialClick = async link => {
//         if (isUrl(link)) {
//             window.open(link, '_blank')
//         }
//     }

//     clickShowBtn = () => {
//         this.setState({showNode: "table-row"})
//     }

//     getTokenList = async (public_key) => {

//         // this.setState({tokenList: this.props.getAddressTokens(public_key)})


//     }



//     render() {
//         if (this.props.wallet.data.is_prep === true){
//             this.getSocialMediaLinks(this.props.wallet.data.address)
//             this.linkList=this.links
//         }

//         const {icxMore, tokenMore, showNode} = this.state
//         const {wallet, walletAddress, addrTokens} = this.props
//         const {loading, data, error} = wallet
//         console.log(wallet, "wallet wallet")
//         const {
//             is_prep,
//             prep,
//             // media,
//             active,
//             available,
//             staked,
//             unstakes,
//             // balance,
//             iscore
//         } = data



        
//         const showLinks = is_prep ? true : false
 


//             const {
//                 address,
//                 api_endpoint,
//                 city,
//                 country,
//                 created_block,
//                 created_timestamp,
//                 delegated,
//                 grade,
//                 last_updated_block,
//                 name,
//                 node_address,
//                 status,
//                 node_state,
//                 total_blocks,
//                 validated_blocks,

//                 website,

//             } = prep || {}



//         let unstakeSum = 0;
//         if (unstakes && unstakes.length !== 0) {
//             unstakes.map((list, idx) => {
//                 unstakeSum += Number(convertLoopToIcxDecimal(list.unstake));
//             })
//         }
        


//             // this.getSocialMediaLinks(name)

//             // linkList=this.links

//         const balance = Number(available || 0) + Number(staked || 0) + unstakeSum;
//         const produced = IconConverter.toNumber(total_blocks)
//         const validated = IconConverter.toNumber(validated_blocks)
//         const productivity = !produced ? 'None' : `${(validated / produced * 100).toFixed(2)}%`
//         const _lastGenerateBlockHeight = !last_updated_block ? 'None' : IconConverter.toNumber(last_updated_block)
//         const badge = getBadgeTitle(grade, node_state)
//         const tokenCxs = this.tokens ? this.tokens.data: []
//         // for each contract address, query contracts and.....
//         const Content = () => {
//             if (loading) {
//                 return <LoadingComponent height="206px"/>
//             } else {
//                 const {public_key, nodeType, tokenList, reportedCount, is_prep} = data
//                 const _address = !!public_key ? public_key : error
//                 const isConnected = walletAddress === _address
//                 const disabled = !_isNotificationAvailable
//                 const scam = reportedCount >= 100 ? true : false
                
//                 let totalVotes; 
//                 !Number(delegated) ? totalVotes =  0 :  totalVotes = Number(Number(delegated) / Number(this.state.totalVoted)) / Math.pow(10, 18)
//                 return (
//                     <div className="screen0">
//                         <div className="wrap-holder">
//                             {isConnected ? (
//                                 <p className="title">
//                                     My Address{is_prep &&
//                                 <span className={"title-tag" + addUnregisteredStyle(status, grade)}>{badge}</span>}
//                                     <span className="connected">
//                                         <i className="img"/>Connected to ICONex
//                                     </span>
//                                     <span className={`toggle${disabled ? ' disabled' : ''}`}>
                                        
                                            
                                           
                                        
//                                     </span>
//                                 </p>
//                             ) : (
//                                 <p className="title">Address{is_prep &&
//                                     <>
//                                 <span className={"title-tag" + addUnregisteredStyle(status, grade)}>{badge}</span>
//                                 </>
//                                 }
//                                 </p>
//                             )}
//                             {/* *********** */}
//                             <div className="contents">
//                                 <div className="table-box">
//                                     <table className="table-typeB address">
//                                         <thead>
//                                         <tr>
//                                             <th>Address</th>
//                                             <th>value</th>
//                                         </tr>
//                                         </thead>
//                                         <tbody>
//                                         {is_prep && <tr className="p-rep">
//                                             <td>Name</td>
//                                             <td colSpan="3">
//                                                 <span>{/* <em>1<sub>st.</sub></em> */}{name}</span>
//                                                 {website && <span className="home" onClick={() => {
//                                                     this.onSocialClick(website)
//                                                 }}><i className="img"></i></span>}
//                                                 {SocialMediaType.map((type, index) => {
//                                                     const mediaValue = this.linkList[type]

//                                                     if (!mediaValue) {
//                                                         return null
//                                                     }

//                                                     return (
//                                                         <span key={index} className={type} onClick={() => {
//                                                             this.onSocialClick(mediaValue)
//                                                         }}>
//                                                                 {isUrl(mediaValue) ?
//                                                                     <i className="img"></i>
//                                                                     :
//                                                                     [
//                                                                         <i key="i" className="img tooltip"></i>
//                                                                         ,
//                                                                         <div key="div" className="help-layer">
//                                                                             <p className='txt'>{addAt(mediaValue)}</p>
//                                                                             <div className='tri'></div>
//                                                                         </div>
//                                                                     ]
//                                                                 }
//                                                             </span>
//                                                     )
//                                                 })}
//                                                 {/* <span className="home"><i className="img"></i></span><span className="twitter"><i className="img"></i></span><span className="email"><i className="img"></i></span> */}
                                                
//                                                 <span
//                                                     className={`active ${node_state === 'Synced' ? 'on' : node_state==='Inactive' ?  'off' : node_state === 'BlockSync' ? 'Active' : 'Inactive'}`}><i></i>{node_state}</span>
//                                                 {/* <span className="btn-scam">Go to Voting</span> */}
//                                             </td>
//                                         </tr>}
//                                         {is_prep && <tr className="">
//                                             <td>Total Votes</td>
//                                             <td colSpan="3">
//                                                 <span>{convertNumberToText(delegated)}

//                                                 <em>( {totalVotes.toString().slice(0,3)}% )</em>
//                                                 {/* <em>( 90.02 % )</em> */}</span>
//                                             </td>
//                                             {/* <td>24h Change Amount</td>
//                                                 <td><span>▲  900,000,000.0004</span></td> */}
//                                         </tr>}
//                                         {is_prep && <tr className="last">
//                                             <td>Productivity<br/>(Produced / (Produced + Missed))</td>
//                                             <td>
//                                                 <span>{productivity}<em>( {numberWithCommas(validated)} / {numberWithCommas(produced)} )</em></span>
//                                             </td>
//                                             <td>Last Blockheight</td>
//                                             {(_lastGenerateBlockHeight === 'None' || _lastGenerateBlockHeight < 0) ?
//                                                 <td><span>None</span></td>
//                                                 :
//                                                 <td><span className="mint" onClick={() => {
//                                                     this.goBlock(_lastGenerateBlockHeight)
//                                                 }}>{numberWithCommas(_lastGenerateBlockHeight)}{/* <em className="small">( 2019-01-01 17:03:35 )</em> */}</span>
//                                                 </td>
//                                             }
//                                         </tr>}
//                                         <tr className="">
//                                             <td>Address</td>
//                                             <td colSpan={is_prep ? '3' : '1'} className={scam ? 'scam' : ''}>
//                                                 {scam && <span className="scam-tag">Scam</span>}
//                                                 {_address} 
//                                                 {/* <QrCodeButton address={_address}/> */}
//                                                 <CopyButton data={_address} title={'Copy Address'} isSpan/>
//                                                 <span className="show-node-addr"
//                                                       style={is_prep ? {display: ""} : {display: "none"}}
//                                                       onClick={this.clickShowBtn}>Show node address</span>
//                                                 {isValidNodeType(nodeType) &&
//                                                 <span className="crep">{`${nodeType}`}</span>}
//                                                 {!isConnected && <ReportButton address={public_key}/>}
//                                             </td>
//                                         </tr>
//                                         <tr className="node-addr" style={{display: showNode}}>
//                                             <td>Node Address</td>
//                                             <td colSpan="3">
//                                                 <i className="img node-addr"></i>
//                                                 {node_address}
//                                             </td>
//                                         </tr>
//                                         <tr>
//                                             <td>Balance</td>
//                                             {/* <td>
//                                                     {`${convertNumberToText(balance)} ICX`}
//                                                     <span className="gray">{`(${convertNumberToText(icxUsd, 3)} USD)`}</span>
//                                                 </td> */}
//                                             <td colSpan="3" className="balance">
//                                                 <div className={icxMore ? 'on' : ''}>
//                                                     <p><span><i
//                                                         className="coin icon"></i>ICX</span><span>{`${convertNumberToText(data.balance ? data.balance.toFixed() : 0, icxMore ? undefined : 4)}`}<em>ICX</em></span><em
//                                                         className="drop-btn" onClick={this.toggleIcxMore}><i
//                                                         className="img"></i></em></p>
//                                                     <p><span>Available</span><span>{`${convertNumberToText(Number(available).toFixed())}`}<em>ICX</em></span>
//                                                     </p>
//                                                     <p>
//                                                         <span>Staked</span><span>{`${convertNumberToText(staked)}`}<em>ICX</em></span>
//                                                     </p>
//                                                     {/* <p><span>Staked</span><span><em>{(!balance ? 0 : Number(staked) / balance * 100).toFixed(2)}%</em>{`${convertNumberToText(staked)}`}<em>ICX</em></span></p> */}
                                                    
//                                                         <span>Unstaking</span>
//                                                         <span>{`${convertNumberToText(unstakeSum)}`}<em>ICX</em></span>
//                                                         {/* <span><em>{(!balance ? 0 : Number(unstakeSum) / balance * 100).toFixed(2)}%</em>{`${convertNumberToText(unstakeSum)}`}<em>ICX</em></span> */}
//                                                         <div className="unstaking-list">
//                                                             {unstakes && unstakes.length !== 0 ?
//                                                                 unstakes.map((dataList) => {

//                                                                     return (
//                                                                         <p>
//                                                                         <span className="unstaking-item">
//                                                                             <em>Target Block Height {convertNumberToText(IconConverter.toNumber(dataList.unstakeBlockHeight))}</em>
//                                                                             <span
//                                                                                 className="balance">{convertNumberToText(convertLoopToIcxDecimal(dataList.unstake))}</span><em>ICX</em>
//                                                                         </span>
//                                                                         </p>
//                                                                     )
//                                                                 }) : ''}
//                                                         </div>
                                                    
//                                                     {/* <p><span>Voted</span><span><em>{(!Number(delegated) ?Address

// Address	hxc4193cda4a75526bf50896ec242d6713bb6b02a3 Report scam
// Balance	
// ICX42,272,003ICX
// totalDe
// Available42,359,732.077366143275843123ICX
// Staked0ICX
// Unstaking0ICX
// Voted0ICX
// I_SCORE0I-Score
// Token5Tokens
// 0 : Number(delegated) / Number(this.state.legated) * 100).toFixed(2)}%</em>{`${convertNumberToText(delegated / (10 ** 18))}`}<em>ICX</em></span></p> */}

//                                                     <p>
//                                                         <span>Voted</span><span>{`${convertNumberToText(delegated / (10 ** 18))}`}<em>ICX</em></span>
//                                                     </p>
//                                                     <p>
//                                                         <span>I_SCORE</span><span>{`${convertNumberToText(iscore)}`}<em>I-Score</em></span>
//                                                     </p>
//                                                 </div>
                                                
//                                                 <div className={tokenMore ? 'on' : ''}>
//                                                     <p><span><i
//                                                         className="coin"></i>Token</span><span>{(tokenCxs || []).length}<em>Tokens</em></span><em
                                                        
//                                                         className="drop-btn" onClick={this.toggleTokenMore}><i
//                                                         className="img"></i></em></p>
//                                                     {tokenCxs.length? tokenCxs.forEach((tokenContract, index) => {
//                                                         this.getContractName(tokenContract)
//                                                     } 
//                                                     ):""}
                                                    
//                                                     {Object.entries(this.tokenName).map((token, index ) => {
//                                                         return <p key={index}>
//                                                         <span>{token[0]}</span><span>{`${convertNumberToText(Number(token[1]) / Math.pow(10, 18))}`}
//                                                         {/* <em>{contractSymbol}</em> */}
//                                                         </span>
//                                                     </p>
//                                                     })}
//                                                 </div>
//                                             </td>
//                                         </tr>
//                                         {/* <tr>
//                                                 <td>No of Txns</td>
//                                                 <td>{`${numberWithCommas(txCount)}`}</td>
//                                             </tr> */}
//                                         {/* <tr>
//                                                 <td>Token Balance</td>
//                                                 <TokenBalance tokenList={tokenList} />
//                                             </tr> */}
//                                         </tbody>
//                                     </table>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 )
//             }
//         }
//         return Content()
//     }
// }

// // class TokenBalance extends Component {
// //     constructor(props) {
// //         super(props)
// //         this.state = {
// //             search: '',
// //         }
// //     }

// //     handleClick = () => {
// //         window.dispatchEvent(new CustomEvent('CUSTOM_FX', { detail: { type: 'TOKEN_BALANCE' } }))
// //     }

// //     handleChange = e => {
// //         const { name, value } = e.target
// //         this.setState({ [name]: value })
// //     }

// //     handleKeyDown = e => {
// //         if (e.keyCode === 27) {
// //             const { name } = e.target
// //             this.setState({ [name]: '' })
// //         }
// //     }

// //     calcTotalTokenBalance = tokenList => {
// //         let result = '0'
// //         tokenList.forEach(token => {
// //             const prev = new BigNumber(result)
// //             const { totalTokenPrice } = token
// //             const _totalTokenPrice = isValidData(totalTokenPrice) ? totalTokenPrice : '0'
// //             const next = prev.plus(_totalTokenPrice)
// //             result = next.toString(10)
// //         })
// //         return result
// //     }

// //     render() {
// //         const TableData = _tokenList => {
// //             if (_tokenList.length === 0) {
// //                 return <td>None</td>
// //             }
// //             else {
// //                 const { search } = this.state
// //                 const list = _tokenList.filter(token => {
// //                     const { contractName, contractSymbol } = token
// //                     return searchLowerCase(search, [contractName, contractSymbol])
// //                 })
// //                 const totalBalance = this.calcTotalTokenBalance(_tokenList)
// //                 return (
// //                     <td>
// //                         <p className="balance" onClick={this.handleClick}>
// //                             {convertNumberToText(totalBalance, 3)} USD<span className="gray">(Total)</span>
// //                             <em className="img" />
// //                         </p>
// //                         <div className="combo-group">
// //                             <div className="combo-layer">
// //                                 <div className="search-group">
// //                                     <input
// //                                         type="text"
// //                                         className="txt-type-page over"
// //                                         placeholder="Search for token name"
// //                                         name={'search'}
// //                                         value={this.state.search}
// //                                         onChange={this.handleChange}
// //                                         onKeyDown={this.handleKeyDown}
// //                                     />
// //                                 </div>
// //                                 {list.length === 0 ? (
// //                                     <p className="nodata">No result found</p>
// //                                 ) : (
// //                                         <div className="scroll">
// //                                             <ul className="list-group">
// //                                                 {list.map((token, index) => {
// //                                                     const { contractName, contractSymbol, quantity, totalTokenPrice, tokenPrice } = token
// //                                                     return (
// //                                                         <li key={index}>
// //                                                             <p>
// //                                                                 <em>{contractName}</em>
// //                                                                 <em>{totalTokenPrice ? convertNumberToText(totalTokenPrice, 3) : '-'}</em>
// //                                                                 <em>USD</em>
// //                                                             </p>
// //                                                             <p>
// //                                                                 <em>
// //                                                                     {quantity} {contractSymbol}
// //                                                                 </em>
// //                                                                 <em>{tokenPrice ? convertNumberToText(tokenPrice, 3) : '-'}</em>
// //                                                                 <em>@</em>
// //                                                             </p>
// //                                                         </li>
// //                                                     )
// //                                                 })}
// //                                             </ul>
// //                                         </div>
// //                                     )}
// //                             </div>
// //                         </div>
// //                     </td>
// //                 )
// //             }
// //         }
// //         return TableData(this.props.tokenList || [])
// //     }
// // }

// export default withRouter(AddressInfo)
