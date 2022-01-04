import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import {
    numberWithCommas,
    convertNumberToText,
    isValidNodeType,
    convertLoopToIcxDecimal,
    getBadgeTitle,
    isUrl,
    addAt,
    addUnregisteredStyle
} from '../../../utils/utils'
import {CopyButton, LoadingComponent, QrCodeButton, ReportButton} from '../../../components'
import NotificationManager from '../../../utils/NotificationManager'
import {IconConverter} from 'icon-sdk-js'
import {SocialMediaType} from '../../../utils/const'
import { prepList, getPRepsLegacy } from '../../../redux/store/iiss'

const _isNotificationAvailable = NotificationManager.available()

class AddressInfo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            notification: _isNotificationAvailable && this.props.walletNotification,
            icxMore: false,
            tokenMore: false,
            showNode: "none",
            links: ""

        }
    }
    media = ["twitter", "wechat", "youtube", "telegram", "steemit", "reddit", "keybase", "github", "facebook"]
    links = {twitter:"", wechat:"", youtube:"", telegram:"", steemit:"", reddit:"", keybase:"", github:"", facebook:""}
    // links = {}
    linkList = []

    getSocialMediaLinks = async (name) => {
        if (this.props.wallet.data.is_prep) {
            const allPreps = await prepList();
            const prepArray = allPreps.filter(preps => preps.name === name )
            const thisPrep = prepArray ? prepArray[0] : prepArray
            this.media.map(site => {
                if (this.links && thisPrep) {
                    this.links[site] !== thisPrep[site]  ? this.links[site] = thisPrep[site] : console.log("found")
                }
            })
    
            this.linkList=this.links
            this.state.links = this.links
        }
        
    }
    
    async componentDidMount() {
        this.getTokenList(this.props.match.params.addressId)

        if (this.props.wallet.data.is_prep){
            const {totalDelegated} = await getPRepsLegacy()
        this.setState({totalDelegated })
        }
    }
    

    onNotificationChange = () => {
        if (!_isNotificationAvailable) {
            return
        }
        const notification = !this.state.notification
        this.setState({notification}, () => {
            this.props.setNotification(notification)
            if (notification) {
                const {wallet} = this.props
                const {data, error} = wallet
                const address = data.address || error
                NotificationManager.registerServiceWorker(address)
            } else {
                NotificationManager.deregisterServiceWorker()
            }
        })
    }

    toggleIcxMore = () => {
        this.setState({icxMore: !this.state.icxMore})
    }

    toggleTokenMore = () => {
        this.setState({tokenMore: !this.state.tokenMore})
        console.log(this.state.tokenMore, "the tokenMore state")
    }

    goBlock = height => {
        window.open('/block/' + height, '_blank')
    }

    onSocialClick = async link => {
        if (isUrl(link)) {
            window.open(link, '_blank')
        }
    }

    clickShowBtn = () => {
        this.setState({showNode: "table-row"})
    }

    getTokenList = (public_key) => {
        this.setState({tokenList: this.props.tokenList(public_key)})
        console.log(this.props.tokenList, "what is the tokenList Prop? ")

    }
// design a pattern to get the list of tokens, and then for each address, 
// query the contracts service to get the individual token information. 

    render() {

        const {notification, icxMore, tokenMore, showNode} = this.state
        console.log(this.state, "state in render")
        const {wallet, walletAddress} = this.props
        const {loading, data, error} = wallet
        const {
            is_prep,
            prep,
            // media,
            active,
            available,
            staked,
            unstakes,
            // balance,
            iscore
        } = data


        
        const showLinks = is_prep ? true : false
 


            const {
                address,
                api_endpoint,
                city,
                country,
                created_block,
                created_timestamp,
                delegated,
                grade,
                last_updated_block,
                name,
                node_address,
                status,
                node_state,
                total_blocks,
                validated_blocks,

                website,

            } = prep || {}

        let unstakeSum = 0;
        if (unstakes && unstakes.length !== 0) {
            unstakes.map((list, idx) => {
                unstakeSum += Number(convertLoopToIcxDecimal(list.unstake));
            })
        }
        


            this.getSocialMediaLinks(name)
            // linkList=this.links

        const balance = Number(available || 0) + Number(staked || 0) + unstakeSum;
        const produced = IconConverter.toNumber(total_blocks)
        const validated = IconConverter.toNumber(validated_blocks)
        const productivity = !produced ? 'None' : `${(validated / produced * 100).toFixed(2)}%`
        const _lastGenerateBlockHeight = !last_updated_block ? 'None' : IconConverter.toNumber(last_updated_block)
        
        const badge = getBadgeTitle(grade, node_state)
        const Content = () => {
            if (loading) {
                return <LoadingComponent height="206px"/>
            } else {
                const {public_key, nodeType, tokenList, reportedCount, is_prep} = data

                

                const _address = !!public_key ? public_key : error
                const isConnected = walletAddress === _address
                const disabled = !_isNotificationAvailable

                const scam = reportedCount >= 100 ? true : false

                is_prep?  this.getSocialMediaLinks(name) : console.log("not prep")
                let totalVotes; 
                !Number(delegated) ? totalVotes =  0 :  totalVotes = Number(delegated) / Number(this.state.totalDelegated)
                return (
                    <div className="screen0">
                        <div className="wrap-holder">
                            {isConnected ? (
                                <p className="title">
                                    My Address{is_prep &&
                                <span className={"title-tag" + addUnregisteredStyle(status, grade)}>{badge}</span>}
                                    <span className="connected">
                                        <i className="img"/>Connected to ICONex
                                    </span>
                                    <span className={`toggle${disabled ? ' disabled' : ''}`}>
                                        
                                            
                                            <span><QrCodeButton address={_address} isSpan/></span>
                                        
                                    </span>
                                </p>
                            ) : (
                                <p className="title">Address{is_prep &&
                                <span className={"title-tag" + addUnregisteredStyle(status, grade)}>{badge}</span>}
                                </p>
                            )}
                            <div className="contents">
                                <div className="table-box">
                                    <table className="table-typeB address">
                                        <thead>
                                        <tr>
                                            <th>Address</th>
                                            <th>value</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {is_prep && <tr className="p-rep">
                                            <td>Name</td>
                                            <td colSpan="3">
                                                <span>{/* <em>1<sub>st.</sub></em> */}{name}</span>
                                                {website && <span className="home" onClick={() => {
                                                    this.onSocialClick(website)
                                                }}><i className="img"></i></span>}
                                                
                                                {this.state.links && SocialMediaType.map((type, index) => {
                                                    const mediaValue = this.linkList[type]

                                                    if (!mediaValue) {
                                                        return null
                                                    }

                                                    return (
                                                        <span key={index} className={type} onClick={() => {
                                                            this.onSocialClick(mediaValue)
                                                        }}>
                                                                {isUrl(mediaValue) ?
                                                                    <i className="img"></i>
                                                                    :
                                                                    [
                                                                        <i key="i" className="img tooltip"></i>
                                                                        ,
                                                                        <div key="div" className="help-layer">
                                                                            <p className='txt'>{addAt(mediaValue)}</p>
                                                                            <div className='tri'></div>
                                                                        </div>
                                                                    ]
                                                                }
                                                            </span>
                                                    )
                                                })}
                                                {/* <span className="home"><i className="img"></i></span><span className="twitter"><i className="img"></i></span><span className="email"><i className="img"></i></span> */}
                                                
                                                <span
                                                    className={`active ${node_state === 'Synced' ? 'on' : node_state==='Inactive' ?  'off' : node_state === 'BlockSync' ? 'Active' : 'Inactive'}`}><i></i>{node_state}</span>
                                                {/* <span className="btn-scam">Go to Voting</span> */}
                                            </td>
                                        </tr>}
                                        {is_prep && <tr className="">
                                            <td>Total Votes</td>
                                            <td colSpan="3">
                                                <span>{convertNumberToText(delegated)}
                                                <em>( {totalVotes.toString().slice(0,3)}% )</em>
                                                {/* <em>( 90.02 % )</em> */}</span>
                                            </td>
                                            {/* <td>24h Change Amount</td>
                                                <td><span>▲  900,000,000.0004</span></td> */}
                                        </tr>}
                                        {is_prep && <tr className="last">
                                            <td>Productivity<br/>(Produced / (Produced + Missed))</td>
                                            <td>
                                                <span>{productivity}<em>( {numberWithCommas(validated)} / {numberWithCommas(produced)} )</em></span>
                                            </td>
                                            <td>Last Blockheight</td>
                                            {(_lastGenerateBlockHeight === 'None' || _lastGenerateBlockHeight < 0) ?
                                                <td><span>None</span></td>
                                                :
                                                <td><span className="mint" onClick={() => {
                                                    this.goBlock(_lastGenerateBlockHeight)
                                                }}>{numberWithCommas(_lastGenerateBlockHeight)}{/* <em className="small">( 2019-01-01 17:03:35 )</em> */}</span>
                                                </td>
                                            }
                                        </tr>}
                                        <tr className="">
                                            <td>Address</td>
                                            <td colSpan={is_prep ? '3' : '1'} className={scam ? 'scam' : ''}>
                                                {scam && <span className="scam-tag">Scam</span>}
                                                {_address} {/*<QrCodeButton address={_address}/>*/}
                                                <CopyButton data={_address} title={'Copy Address'} isSpan/>
                                                <span className="show-node-addr"
                                                      style={is_prep ? {display: ""} : {display: "none"}}
                                                      onClick={this.clickShowBtn}>Show node address</span>
                                                {isValidNodeType(nodeType) &&
                                                <span className="crep">{`${nodeType}`}</span>}
                                                {!isConnected && <ReportButton address={public_key}/>}
                                            </td>
                                        </tr>
                                        <tr className="node-addr" style={{display: showNode}}>
                                            <td>Node Address</td>
                                            <td colSpan="3">
                                                <i className="img node-addr"></i>
                                                {node_address}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Balance</td>
                                            {/* <td>
                                                    {`${convertNumberToText(balance)} ICX`}
                                                    <span className="gray">{`(${convertNumberToText(icxUsd, 3)} USD)`}</span>
                                                </td> */}
                                            <td colSpan="3" className="balance">
                                                <div className={icxMore ? 'on' : ''}>
                                                    <p><span><i
                                                        className="coin icon"></i>ICX</span><span>{`${convertNumberToText(data.balance ? data.balance.toFixed() : 0, icxMore ? undefined : 4)}`}<em>ICX</em></span><em
                                                        className="drop-btn" onClick={this.toggleIcxMore}><i
                                                        className="img"></i></em></p>
                                                    <p><span>Available</span><span>{`${convertNumberToText(available)}`}<em>ICX</em></span>
                                                    </p>
                                                    <p>
                                                        <span>Staked</span><span>{`${convertNumberToText(staked)}`}<em>ICX</em></span>
                                                    </p>
                                                    {/* <p><span>Staked</span><span><em>{(!balance ? 0 : Number(staked) / balance * 100).toFixed(2)}%</em>{`${convertNumberToText(staked)}`}<em>ICX</em></span></p> */}
                                                    
                                                        <span>Unstaking</span>
                                                        <span>{`${convertNumberToText(unstakeSum)}`}<em>ICX</em></span>
                                                        {/* <span><em>{(!balance ? 0 : Number(unstakeSum) / balance * 100).toFixed(2)}%</em>{`${convertNumberToText(unstakeSum)}`}<em>ICX</em></span> */}
                                                        <div className="unstaking-list">
                                                            {unstakes && unstakes.length !== 0 ?
                                                                unstakes.map((dataList) => {

                                                                    return (
                                                                        <p>
                                                                        <span className="unstaking-item">
                                                                            <em>Target Block Height {convertNumberToText(IconConverter.toNumber(dataList.unstakeBlockHeight))}</em>
                                                                            <span
                                                                                className="balance">{convertNumberToText(convertLoopToIcxDecimal(dataList.unstake))}</span><em>ICX</em>
                                                                        </span>
                                                                        </p>
                                                                    )
                                                                }) : ''}
                                                        </div>
                                                    
                                                    {/* <p><span>Voted</span><span><em>{(!Number(delegated) ? 0 : Number(delegated) / Number(this.state.totalDelegated) * 100).toFixed(2)}%</em>{`${convertNumberToText(delegated / (10 ** 18))}`}<em>ICX</em></span></p> */}
                                                    <p>
                                                        <span>Voted</span><span>{`${convertNumberToText(delegated / (10 ** 18))}`}<em>ICX</em></span>
                                                    </p>
                                                    <p>
                                                        <span>I_SCORE</span><span>{`${convertNumberToText(iscore)}`}<em>I-Score</em></span>
                                                    </p>
                                                </div>
                                                <div className={tokenMore ? 'on' : ''}>
                                                    <p><span><i
                                                        className="coin"></i>Token</span><span>{(this.props.walletTokenTx.data || []).length}<em>Tokens</em></span><em
                                                        className="drop-btn" onClick={this.toggleTokenMore}><i
                                                        className="img"></i></em></p>
                                                    {(tokenList || []).sort((a, b) => (a.contractName < b.contractName ? -1 : a.contractName > b.contractName ? 1 : 0)).map((token, index) => {
                                                        const {contractName, contractSymbol, quantity} = token
                                                        return <p key={index}>
                                                            <span>{contractName}</span><span>{`${convertNumberToText(quantity)}`}<em>{contractSymbol}</em></span>
                                                        </p>
                                                    })}
                                                </div>
                                            </td>
                                        </tr>
                                        {/* <tr>
                                                <td>No of Txns</td>
                                                <td>{`${numberWithCommas(txCount)}`}</td>
                                            </tr> */}
                                        {/* <tr>
                                                <td>Token Balance</td>
                                                <TokenBalance tokenList={tokenList} />
                                            </tr> */}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        }
        return Content()
    }
}

// class TokenBalance extends Component {
//     constructor(props) {
//         super(props)
//         this.state = {
//             search: '',
//         }
//     }

//     handleClick = () => {
//         window.dispatchEvent(new CustomEvent('CUSTOM_FX', { detail: { type: 'TOKEN_BALANCE' } }))
//     }

//     handleChange = e => {
//         const { name, value } = e.target
//         this.setState({ [name]: value })
//     }

//     handleKeyDown = e => {
//         if (e.keyCode === 27) {
//             const { name } = e.target
//             this.setState({ [name]: '' })
//         }
//     }

//     calcTotalTokenBalance = tokenList => {
//         let result = '0'
//         tokenList.forEach(token => {
//             const prev = new BigNumber(result)
//             const { totalTokenPrice } = token
//             const _totalTokenPrice = isValidData(totalTokenPrice) ? totalTokenPrice : '0'
//             const next = prev.plus(_totalTokenPrice)
//             result = next.toString(10)
//         })
//         return result
//     }

//     render() {
//         const TableData = _tokenList => {
//             if (_tokenList.length === 0) {
//                 return <td>None</td>
//             }
//             else {
//                 const { search } = this.state
//                 const list = _tokenList.filter(token => {
//                     const { contractName, contractSymbol } = token
//                     return searchLowerCase(search, [contractName, contractSymbol])
//                 })
//                 const totalBalance = this.calcTotalTokenBalance(_tokenList)
//                 return (
//                     <td>
//                         <p className="balance" onClick={this.handleClick}>
//                             {convertNumberToText(totalBalance, 3)} USD<span className="gray">(Total)</span>
//                             <em className="img" />
//                         </p>
//                         <div className="combo-group">
//                             <div className="combo-layer">
//                                 <div className="search-group">
//                                     <input
//                                         type="text"
//                                         className="txt-type-page over"
//                                         placeholder="Search for token name"
//                                         name={'search'}
//                                         value={this.state.search}
//                                         onChange={this.handleChange}
//                                         onKeyDown={this.handleKeyDown}
//                                     />
//                                 </div>
//                                 {list.length === 0 ? (
//                                     <p className="nodata">No result found</p>
//                                 ) : (
//                                         <div className="scroll">
//                                             <ul className="list-group">
//                                                 {list.map((token, index) => {
//                                                     const { contractName, contractSymbol, quantity, totalTokenPrice, tokenPrice } = token
//                                                     return (
//                                                         <li key={index}>
//                                                             <p>
//                                                                 <em>{contractName}</em>
//                                                                 <em>{totalTokenPrice ? convertNumberToText(totalTokenPrice, 3) : '-'}</em>
//                                                                 <em>USD</em>
//                                                             </p>
//                                                             <p>
//                                                                 <em>
//                                                                     {quantity} {contractSymbol}
//                                                                 </em>
//                                                                 <em>{tokenPrice ? convertNumberToText(tokenPrice, 3) : '-'}</em>
//                                                                 <em>@</em>
//                                                             </p>
//                                                         </li>
//                                                     )
//                                                 })}
//                                             </ul>
//                                         </div>
//                                     )}
//                             </div>
//                         </div>
//                     </td>
//                 )
//             }
//         }
//         return TableData(this.props.tokenList || [])
//     }
// }

export default withRouter(AddressInfo)
