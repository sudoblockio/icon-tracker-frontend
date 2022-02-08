import React, {Component, useState, useEffect} from 'react'
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
import {CopyButton, LoadingComponent, ReportButton} from '../../../components'
import NotificationManager from '../../../utils/NotificationManager'
import {IconConverter, IconAmount} from 'icon-sdk-js'
import {SocialMediaType} from '../../../utils/const'
import { prepList, getPRepsRPC, getBalanceOf, getTokenTotalSupply} from '../../../redux/store/iiss'
import { contractDetail, cxSocialMedia } from '../../../redux/store/contracts'
import { addressTokens } from '../../../redux/store/addresses'


const _isNotificationAvailable = NotificationManager.available()

function AddressInfo(props) {
    const [icxMore, setIcxMore ] = useState(false)
    const [tokenMore, setTokenMore] = useState(false)
    const [showNode, setShowNode] = useState("none")
    const [links, setLinks] = useState("")
    const [totalVoted, setTotalVoted] = useState("")
    const [tokens, setTokens ] = useState("")
    


    const {wallet, walletAddress, addrTokens} = props
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
        
    let media = ["twitter", "wechat", "youtube", "telegram", "steemit", "reddit", "keybase", "github", "facebook"]
    let checkLinks = {twitter:"", wechat:"", youtube:"", telegram:"", steemit:"", reddit:"", keybase:"", github:"", facebook:""}
    let linkList = []
    let tokenBalance = ""
    let tokenName = {}
    let tokenMap = {};
    const getContractName = async (tokenContract) => {
        const res = await contractDetail(tokenContract)
        // tokenName.push(res.data.name)
        // console.log(tokenName, "right after push")
        tokenName[res.data.name] = await getBalanceOf(props.match.params.addressId, tokenContract)
        setTokens(Object.entries(tokenName))
        tokenMap = Object.entries(tokenName)
        setTokens(tokenMap)
        
    }
    const getVoted = async () => {
        const {totalDelegated: totalVotedLoop } = await getPRepsRPC()
		const totalVoted = !totalVotedLoop ? 0 : IconConverter.toNumber(IconAmount.of(totalVotedLoop || 0x0, IconAmount.Unit.LOOP).convertUnit(IconAmount.Unit.ICX).value.toString(10))
        setTotalVoted(totalVoted)
        let tokenRes = await addressTokens(props.match.params.addressId)
        tokenRes.data.forEach(contract => getContractName(contract))
        // setTokens(tokenRes.data)
        // console.log(tokenRes.data, "Whatttt tokens")
    }
    const getTokens = async () => {
        let tokenRes = await addressTokens(props.match.params.addressId)
        tokenRes.data.forEach(contract => {
            contractDetail(contract).then(contractRes => {
                getBalanceOf(props.match.params.addressId, contract).then(balance => {
                    tokenMap[`${contractRes.data.name}`] = balance 
                })
            })
            
        })
    }

    useEffect(() => {
        getTokens()
        getVoted()
        
        if (props.wallet.data.is_prep === true){
            getSocialMediaLinks(props.wallet.data.address)
            linkList=links
        }


    }, [])


    const getSocialMediaLinks = async (contract) => {
        const socialLinksMap = await cxSocialMedia(contract);
        media.map(site =>{
            if (checkLinks && socialLinksMap){
                checkLinks[site] !== socialLinksMap[site] ? checkLinks[site] = socialLinksMap[site] : console.log("no link")
            }
        })
    }
    const getTokenBalance = async (tokenContract) => {
        let tokenBalance = await getBalanceOf(props.match.params.addressId, tokenContract)
    }

    const toggleIcxMore = () => {
        setIcxMore(!icxMore)
    }
    const toggleTokenMore = () => {
        setTokenMore(!tokenMore)
    }

    const goBlock = height => {
        window.open('/block/' + height, '_blank')
    }
    const onSocialClick = async link => {
        if (isUrl(link)) {
            window.open(link, '_blank')
        }
    }
    const clickShowBtn = () => {
        setShowNode("table-row")
    }


    const produced = IconConverter.toNumber(total_blocks)
    const balance = Number(available || 0) + Number(staked || 0) + unstakeSum;
    const validated = IconConverter.toNumber(validated_blocks)
    const productivity = !produced ? 'None' : `${(validated / produced * 100).toFixed(2)}%`
    const _lastGenerateBlockHeight = !last_updated_block ? 'None' : IconConverter.toNumber(last_updated_block)
    const badge = getBadgeTitle(grade, node_state)
    const tokenCxs = tokenMap ? tokenMap: []

    const Content = () => {
        if (loading) {
            return <LoadingComponent height="206px"/>
        } else {
            const {public_key, nodeType, tokenList, reportedCount, is_prep} = data
            const _address = !!public_key ? public_key : error
            const isConnected = walletAddress === _address
            const disabled = !_isNotificationAvailable
            const scam = reportedCount >= 100 ? true : false
            
            let totalVotes; 
            !Number(delegated) ? totalVotes =  0 :  totalVotes = Number(Number(delegated) / Number(totalVoted)) / Math.pow(10, 18)
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
                                    
                                        
                                       
                                    
                                </span>
                            </p>
                        ) : (
                            <p className="title">Address{is_prep &&
                                <>
                            <span className={"title-tag" + addUnregisteredStyle(status, grade)}>{badge}</span>
                            </>
                            }
                            </p>
                        )}
                        {/* *********** */}
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
                                                onSocialClick(website)
                                            }}><i className="img"></i></span>}
                                            {SocialMediaType.map((type, index) => {
                                                const mediaValue = linkList[type]

                                                if (!mediaValue) {
                                                    return null
                                                }

                                                return (
                                                    <span key={index} className={type} onClick={() => {
                                                        onSocialClick(mediaValue)
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
                                                goBlock(_lastGenerateBlockHeight)
                                            }}>{numberWithCommas(_lastGenerateBlockHeight)}{/* <em className="small">( 2019-01-01 17:03:35 )</em> */}</span>
                                            </td>
                                        }
                                    </tr>}
                                    <tr className="">
                                        <td>Address</td>
                                        <td colSpan={is_prep ? '3' : '1'} className={scam ? 'scam' : ''}>
                                            {scam && <span className="scam-tag">Scam</span>}
                                            {_address} 
                                            {/* <QrCodeButton address={_address}/> */}
                                            <CopyButton data={_address} title={'Copy Address'} isSpan/>
                                            <span className="show-node-addr"
                                                  style={is_prep ? {display: ""} : {display: "none"}}
                                                  onClick={clickShowBtn}>Show node address</span>
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
                                                    className="drop-btn" onClick={toggleIcxMore}><i
                                                    className="img"></i></em></p>
                                                <p><span>Available</span><span>{`${convertNumberToText(Number(available).toFixed())}`}<em>ICX</em></span>
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
                                                
                                                {/* <p><span>Voted</span><span><em>{(!Number(delegated) ?Address

Address	hxc4193cda4a75526bf50896ec242d6713bb6b02a3 Report scam
Balance	
ICX42,272,003ICX
totalDe
Available42,359,732.077366143275843123ICX
Staked0ICX
Unstaking0ICX
Voted0ICX
I_SCORE0I-Score
Token5Tokens
0 : Number(delegated) / Number(this.state.legated) * 100).toFixed(2)}%</em>{`${convertNumberToText(delegated / (10 ** 18))}`}<em>ICX</em></span></p> */}

                                                <p>
                                                    <span>Voted</span><span>{`${convertNumberToText(delegated / (10 ** 18))}`}<em>ICX</em></span>
                                                </p>
                                                <p>
                                                    <span>I_SCORE</span><span>{`${convertNumberToText(iscore)}`}<em>I-Score</em></span>
                                                </p>
                                            </div>
                                            
                                            <div className={tokenMore ? 'on' : ''}>
                                                <p><span><i
                                                    className="coin"></i>Token</span><span>{(tokenCxs || []).length}<em>Tokens</em></span><em
                                                    
                                                    className="drop-btn" onClick={toggleTokenMore}><i
                                                    className="img"></i></em></p>
                                                {/* {tokenCxs? tokenCxs.forEach((tokenContract, index) => {
                                                    getContractName(tokenContract)
                                                } 
                                                ):""} */}
                                                {tokenName ? Object.entries(tokenName).map((token, index ) => {
                                                    return <p key={index}>
                                                    <span>{token[0]}</span><span>{`${convertNumberToText(Number(token[1]) / Math.pow(10, 18))}`}
                                                    {/* <em>{contractSymbol}</em> */}
                                                    </span>
                                                </p>
                                                }) : ""}
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

export default withRouter(AddressInfo)

