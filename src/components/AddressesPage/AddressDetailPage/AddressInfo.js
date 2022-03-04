import React, {useState, useEffect} from 'react'
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
import { prepList, getPRepsRPC, getBalanceOf, getBalance} from '../../../redux/store/iiss'
import { contractDetail } from '../../../redux/store/contracts'
import { addressTokens } from '../../../redux/store/addresses'


const _isNotificationAvailable = NotificationManager.available()

function AddressInfo(props) {
    const [icxMore, setIcxMore ] = useState(false)
    const [tokenMore, setTokenMore] = useState(false)
    const [showNode, setShowNode] = useState("none")
    const [links, setLinks] = useState("")
    const [totalVoted, setTotalVoted] = useState("")
    const [tokens, setTokens ] = useState("")
    const [addrBalance, setAddrBalance] = useState("")


    const {wallet, walletAddress} = props
    const {loading, data, error} = wallet
    const {
        is_prep,
        prep,
        available,
        staked,
        unstakes,
        iscore
    } = data
    console.log(data, "what data")
    const {
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
            unstakes.map((list) => {
                unstakeSum += Number(convertLoopToIcxDecimal(list.unstake));
            })
        }
        
    let media = ["twitter", "wechat", "youtube", "telegram", "steemit", "reddit", "keybase", "github", "facebook"]
    let checkLinks = {twitter:"", wechat:"", youtube:"", telegram:"", steemit:"", reddit:"", keybase:"", github:"", facebook:""}
    let tokenName = {}
    let tokenMap = {};

    const getContractName = async (tokenContract) => {
        const res = await contractDetail(tokenContract)
        tokenName[res.data.name] = await getBalanceOf(props.match.params.addressId, tokenContract)
        setTokens(Object.entries(tokenName))
        tokenMap = Object.entries(tokenName)
        setTokens(tokenMap)
    }
    const getPrepSocialMedia = async (address)  => {
        const allPreps = await prepList()
        const prepArray = allPreps.filter(preps => preps.address === address)
        const thisPrep = prepArray ? prepArray[0] : prepArray
        media.map(site => {
            if (checkLinks && thisPrep){
                checkLinks[site] !== thisPrep[site] ? checkLinks[site] = thisPrep[site] : console.log("no links")
            }
        })
        setLinks(checkLinks)
    }
    const getVoted = async () => {
        const {totalDelegated: totalVotedLoop } = await getPRepsRPC()
		const totalVoted = !totalVotedLoop ? 0 : IconConverter.toNumber(IconAmount.of(totalVotedLoop || 0x0, IconAmount.Unit.LOOP).convertUnit(IconAmount.Unit.ICX).value.toString(10))
        setTotalVoted(totalVoted)
        let tokenRes = await addressTokens(props.match.params.addressId)
        tokenRes.status !== 204? tokenRes.data.forEach(contract => getContractName(contract)) : console.log("no tokens")
    }
    const getTokens = async () => {
        let tokenRes = await addressTokens(props.match.params.addressId)
        tokenRes.status === 200 ? tokenRes.data.forEach(contract => {
            contractDetail(contract).then(contractRes => {
                getBalanceOf(props.match.params.addressId, contract).then(balance => {
                    tokenMap[`${contractRes.data.name}`] = balance 
                })
            })
            
        }) : console.log("no tokens")
    }

    const getAddrBalance = async () => {
        const balanceData = await getBalance(props.match.params.addressId)
        setAddrBalance(balanceData)
    }

    useEffect(() => {
        getTokens()
        getVoted()
        getPrepSocialMedia(props.match.params.addressId)
        setTokens(tokenMap)
        getAddrBalance()
    }, [])
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
    const validated = IconConverter.toNumber(validated_blocks)
    const productivity = !produced ? 'None' : `${(validated / produced * 100).toFixed(2)}%`
    const _lastGenerateBlockHeight = !last_updated_block ? 'None' : IconConverter.toNumber(last_updated_block)
    const badge = getBadgeTitle(grade, node_state)
    const tokenCxs = tokens ? tokens: []
    const Content = () => {
        if (loading) {
            return <LoadingComponent height="206px"/>
        } else {
            const {public_key, nodeType, reportedCount, is_prep} = data
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
                                            <span>{name}</span>
                                            {website && <span className="home" onClick={() => {
                                                onSocialClick(website)
                                            }}><i className="img"></i></span>}
                                            {SocialMediaType.map((type, index) => {
                                                const mediaValue = links[type]

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
                                            
                                            <span
                                                className={`active ${node_state === 'Synced' ? 'on' : node_state==='Inactive' ?  'off' : node_state === 'BlockSync' ? 'Active' : 'Inactive'}`}><i></i>{node_state}</span>
                                        </td>
                                    </tr>}
                                    {is_prep && <tr className="">
                                        <td>Total Votes</td>
                                        <td colSpan="3">
                                            <span>{convertNumberToText(delegated)}

                                            <em>( {totalVotes.toString().slice(0,3)}% )</em>
                                            </span>
                                        </td>
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
                                            }}>{numberWithCommas(_lastGenerateBlockHeight)}</span>
                                            </td>
                                        }
                                    </tr>}
                                    <tr className="">
                                        <td>Address</td>
                                        <td colSpan={is_prep ? '3' : '1'} className={scam ? 'scam' : ''}>
                                            {scam && <span className="scam-tag">Scam</span>}
                                            {_address} 
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
                                        <td colSpan="3" className="balance">
                                            <div className={icxMore ? 'on' : ''}>
                                                <p><span><i
                                                    className="coin icon"></i>ICX</span><span>{`${convertNumberToText(addrBalance ? Number(Number(addrBalance)/ Math.pow(10,18)).toFixed(4): 0, icxMore ? undefined : 4)}`}<em>ICX</em></span><em
                                                    className="drop-btn" onClick={toggleIcxMore}><i
                                                    className="img"></i></em></p>
                                                <p><span>Available</span><span>{`${Number(addrBalance)/Math.pow(10,18)}`}<em>ICX</em></span>
                                                </p>
                                                <p>
                                                    <span>Staked</span><span>{`${convertNumberToText(staked)}`}<em>ICX</em></span>
                                                </p>
                                                
                                                    <span>Unstaking</span>
                                                    <span>{`${convertNumberToText(unstakeSum)}`}<em>ICX</em></span>
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
                                                {tokens ? Object.entries(tokens).map((token, index ) => {
                                                    return <p key={index}>
                                                    <span>{token[1][0]}</span><span>{`${convertNumberToText(Number(token[1][1]) / Math.pow(10, 18))}`}
                                                    </span>
                                                </p>
                                                }) : ""}
                                            </div>
                                        </td>
                                    </tr>
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

