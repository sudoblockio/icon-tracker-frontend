import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
// import BigNumber from 'bignumber.js'
import { numberWithCommas, convertNumberToText, isValidNodeType } from 'utils/utils'
// import { searchLowerCase, isValidData } from 'utils/utils'
import { CopyButton, LoadingComponent, QrCodeButton, ReportButton } from 'components'
import NotificationManager from 'utils/NotificationManager'
import { getStake, queryIScore, getBalance, getPRep, getDelegation, iissPrepRepJsonActive } from '../../../redux/api/restV3/iiss';
import { IconConverter } from 'icon-sdk-js'
import { convertLoopToIcxDecimal, getBadgeTitle, isUrl, addAt, addUnregisteredStyle } from '../../../utils/utils';

const _isNotificationAvailable = NotificationManager.available()

class AddressInfo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            notification: _isNotificationAvailable && this.props.walletNotification,
            available: 0,
            staked: 0,
            unstaked: 0,
            iscore: 0,
            delegated: 0,
            icxMore: false,
            tokenMore: false,
            prep: {},
            active: 'N/A',
            media: {},
            prepLoading: true,
            on: {}
        }
    }

    async componentDidMount() {
        const splitted = window.location.pathname.split('/')
        const address = splitted[splitted.length - 1]
        await this.setPrepData(address)
    }

    async componentWillReceiveProps(nextProps) {
        const { address: prev } = this.props.wallet.data
        const { address: next } = nextProps.wallet.data

        if (prev && !next) {
            this.setState({
                notification: _isNotificationAvailable && this.props.walletNotification,
                available: 0,
                staked: 0,
                unstaked: 0,
                iscore: 0,
                delegated: 0,
                icxMore: false,
                tokenMore: false,
                prep: {},
                active: 'N/A',
                media: {},
                prepLoading: true,
            })
        }
        else if (!prev && next) {
            this.setPrepData(next)
        }
    }

    setPrepData = async address => {
        const prep = await getPRep(address)
        const balance = await getBalance(address)
        const { stake, unstake } = await getStake(address)
        const { iscore } = await queryIScore(address)
        const { totalDelegated } = await getDelegation(address)
        
        if (prep && Object.keys(prep).length > 0) {
            await this.checkRepJson(address)
        }
        
        const _balance = !balance ? 0 : convertLoopToIcxDecimal(balance)
        const _stake = !stake ? 0 : convertLoopToIcxDecimal(stake)
        const _unstake = !unstake ? 0 : convertLoopToIcxDecimal(unstake)
        const _totalDelegated = !totalDelegated ? 0 : convertLoopToIcxDecimal(totalDelegated)
        const _iscore = !iscore ? 0 : convertLoopToIcxDecimal(iscore)

        this.setState({
            balance: convertLoopToIcxDecimal(Number(balance || 0) + Number(stake || 0) + Number(unstake || 0)),
            available: _balance,
            staked: _stake,
            unstaked: _unstake,
            iscore: _iscore,
            delegated: _totalDelegated,
            prep,
            prepLoading: false
        })
    }

    checkRepJson = async address => {
        const { repJson, isActive } = await iissPrepRepJsonActive({ address })
        let media = {}
        if (repJson &&
            repJson.representative &&
            repJson.representative.media instanceof Object) {
            media = repJson.representative.media
        }

        this.setState({ media, active: isActive ? 'Active' : 'Inactive' })
    }

    onNotificationChange = () => {
        if (!_isNotificationAvailable) {
            return
        }
        const notification = !this.state.notification
        this.setState({ notification }, () => {
            this.props.setNotification(notification)
            if (notification) {
                const { wallet } = this.props
                const { data, error } = wallet
                const address = data.address || error
                NotificationManager.registerServiceWorker(address)
            } else {
                NotificationManager.deregisterServiceWorker()
            }
        })
    }

    toggleIcxMore = () => {
        this.setState({ icxMore: !this.state.icxMore })
    }

    toggleTokenMore = () => {
        this.setState({ tokenMore: !this.state.tokenMore })
    }

    goBlock = height => {
        window.open('/block/' + height, '_blank')
    }

    onSocialClick = async (link, type) => {
        this.setState({ on: {}}, () => {
            window.dispatchEvent(new CustomEvent('CUSTOM_FX', { detail: { type: 'SOCIAL_OFF' } }))
        })

        if (!type || isUrl(link)) {
            window.open(link, '_blank')
        }
        else {
            this.setMedia(type)
        }
    }

    setMedia = type => {
        if (this.state.on[type]) {
            this.setState({ on: {
                ...this.state.on,
                [type]: false
            }}, () => {
                window.dispatchEvent(new CustomEvent('CUSTOM_FX', { detail: { type: 'SOCIAL_OFF' } }))
            })
        }
        else {
            this.setState({ on: {
                ...this.state.on,
                [type]: true
            }}, () => {
                window.dispatchEvent(new CustomEvent('CUSTOM_FX', { detail: { type: 'SOCIAL_ON', param: type } }))
            })
        }
    }

    render() {
        const { wallet, walletAddress } = this.props
        const { loading, data, error } = wallet
        const isPrep = Object.keys(this.state.prep).length !== 0

        const {
            name,
            totalBlocks,
            validatedBlocks,
            irep,
            irepUpdateBlockHeight,
            lastGenerateBlockHeight,
            website,
            grade,
            status
        } = this.state.prep

        let {
            facebook,
            github,
            keybase,
            reddit,
            steemit,
            telegram,
            twitter,
            wechat,
            youtube,
        } = this.state.media

        const produced = IconConverter.toNumber(totalBlocks)
        const validated = IconConverter.toNumber(validatedBlocks)
        const productivity = !produced ? '-' : `${(validated / produced * 100).toFixed(2)}%`

        const _irep = !irep ? 0 : convertLoopToIcxDecimal(irep)
        const _irepUpdateBlockHeight = !irepUpdateBlockHeight ? 0 : IconConverter.toNumber(irepUpdateBlockHeight)
        const _lastGenerateBlockHeight = !lastGenerateBlockHeight ? '-' : IconConverter.toNumber(lastGenerateBlockHeight)

        const totalVotes = convertLoopToIcxDecimal(this.state.prep.delegated)

        const badge = getBadgeTitle(grade, status)
        const Content = () => {
            if (loading || this.state.prepLoading) {
                return <LoadingComponent height="206px" />
            }
            else {
                const { address, nodeType, tokenList, reportedCount } = data
                const _address = !!address ? address : error
                const isConnected = walletAddress === _address
                const disabled = !_isNotificationAvailable

                const scam = reportedCount >= 100 ? true : false

                return (
                    <div className="screen0">
                        <div className="wrap-holder">
                            {isConnected ? (
                                <p className="title">
                                    My Address{isPrep && <span className={"title-tag" + addUnregisteredStyle(status)}>{badge}</span>}
                                    <span className="connected">
                                        <i className="img" />Connected to ICONex
                                    </span>
                                    <span className={`toggle${disabled ? ' disabled' : ''}`}>
                                        <em>
                                            <input
                                                id="cbox-02"
                                                className="cbox-type"
                                                type="checkbox"
                                                name="notification"
                                                onChange={this.onNotificationChange}
                                                checked={this.state.notification}
                                                disabled={disabled}
                                            />
                                            <label htmlFor="cbox-02" className="label _img" />Notifications<span>(Beta)</span>
                                        </em>
                                    </span>
                                </p>
                            ) : (
                                    <p className="title">Address{isPrep && <span className={"title-tag" + addUnregisteredStyle(status)}>{badge}</span>}</p>
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
                                            {isPrep && <tr className="p-rep">
                                                <td>Name</td>
                                                <td colSpan="3">                                                
                                                    <span>{/* <em>1<sub>st.</sub></em> */}{name}</span>
                                                    {website && <span className="home" onClick={() => { this.onSocialClick(website) }}><i className="img"></i></span>}
                                                    {facebook && <span className="facebook" onClick={() => { this.onSocialClick(facebook) }}><i className="img"></i></span>}
                                                    {github && <span className="github" onClick={() => { this.onSocialClick(github) }}><i className="img"></i></span>}
                                                    {keybase && <span className={"keybase" + (this.state.on.keybase ? " media-on" : "")} onClick={() => { this.onSocialClick(keybase, 'keybase') }}><span style={{ width: facebook.length * 6.5 + 50 }} className="help social keybase">{addAt(keybase)}</span><i className="img"></i></span>}
                                                    {reddit && <span className="reddit" onClick={() => { this.onSocialClick(reddit) }}><i className="img"></i></span>}
                                                    {steemit && <span className="steemit" onClick={() => { this.onSocialClick(steemit) }}><i className="img"></i></span>}
                                                    {telegram && <span className={"telegram" + (this.state.on.telegram ? " media-on" : "")} onClick={() => { this.onSocialClick(telegram, 'telegram') }}><span style={{ width: telegram.length * 6.5 + 50 }} className="help social telegram">{addAt(telegram)}</span><i className="img"></i></span>}
                                                    {twitter && <span className="twitter" onClick={() => { this.onSocialClick(twitter) }}><i className="img"></i></span>}
                                                    {wechat && <span className={"wechat" + (this.state.on.wechat ? " media-on" : "")} onClick={() => { this.onSocialClick(wechat, 'wechat') }}><span style={{ width: wechat.length * 6.5 + 50 }} className="help social wechat">{addAt(wechat)}</span><i className="img"></i></span>}
                                                    {youtube && <span className="youtube" onClick={() => {this.onSocialClick(youtube) }}><i className="img"></i></span>}
                                                    {/* <span className="home"><i className="img"></i></span><span className="twitter"><i className="img"></i></span><span className="email"><i className="img"></i></span> */}
                                                    <span className={`active ${this.state.active === 'Active' ? 'on' : 'off'}`}><i></i>{this.state.active}</span>
                                                    {/* <span className="btn-scam">Go to Voting</span> */}
                                                </td>
                                            </tr>}
                                            {isPrep && <tr className="">
                                                <td>Total Votes</td>
                                                <td colSpan="3"><span>{numberWithCommas(totalVotes)}{/* <em>( 90.02 % )</em> */}</span></td>
                                                {/* <td>24h Change Amount</td>
                                                <td><span>▲  900,000,000.0004</span></td> */}
                                            </tr>}
                                            {isPrep && <tr className="last">
                                                <td>Productivity<br />(Produced / (Produced + Missed))</td>
                                                <td><span>{productivity}<em>( {numberWithCommas(validated)} / {numberWithCommas(produced)} )</em></span></td>
                                                <td>Last Blockheight</td>
                                                {(_lastGenerateBlockHeight === '-' || _lastGenerateBlockHeight < 0) ?
                                                    <td><span>{_lastGenerateBlockHeight}</span></td>
                                                    :
                                                    <td><span className="mint" onClick={() => { this.goBlock(_lastGenerateBlockHeight) }}>{numberWithCommas(_lastGenerateBlockHeight)}{/* <em className="small">( 2019-01-01 17:03:35 )</em> */}</span></td>
                                                }
                                            </tr>}
                                            {isPrep && <tr className="governance">
                                                <td>Governance variables</td>
                                                <td colSpan="3">
                                                    <span><i>i<sub>rep</sub></i>{numberWithCommas(_irep)}</span>
                                                    <span><em>Last updated</em><span className="mint" onClick={() => { this.goBlock(_irepUpdateBlockHeight) }}>{numberWithCommas(_irepUpdateBlockHeight)}</span></span>
                                                </td>
                                            </tr>}
                                            <tr className="">
                                                <td>Address</td>
                                                <td colSpan={isPrep ? '3' : '1'} className={scam ? 'scam' : ''}>
                                                    {scam && <span className="scam-tag">Scam</span>}
                                                    {_address} <QrCodeButton address={_address} />
                                                    <CopyButton data={_address} title={'Copy Address'} isSpan />
                                                    {isValidNodeType(nodeType) && <span className="crep">{`${nodeType}`}</span>}
                                                    {!isConnected && <ReportButton address={address} />}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Balance</td>
                                                {/* <td>
                                                    {`${convertNumberToText(balance)} ICX`}
                                                    <span className="gray">{`(${convertNumberToText(icxUsd, 3)} USD)`}</span>
                                                </td> */}
                                                <td colSpan="3" className="balance">
                                                    <div className={this.state.icxMore ? 'on' : ''}>
                                                        <p><span><i className="coin icon"></i>ICX</span><span>{`${convertNumberToText(this.state.balance, this.state.icxMore ? undefined : 4)}`}<em>ICX</em></span><em className="drop-btn" onClick={this.toggleIcxMore}><i className="img"></i></em></p>
                                                        <p><span>Available</span><span>{`${convertNumberToText(this.state.available)}`}<em>ICX</em></span></p>
                                                        <p><span>Staked</span><span><em>{(!Number(this.state.balance) ? 0 : Number(this.state.staked) / Number(this.state.balance) * 100).toFixed(2)}%</em>{`${convertNumberToText(this.state.staked)}`}<em>ICX</em></span></p>
                                                        <p><span>Unstaking</span><span><em>{(!Number(this.state.balance) ? 0 : Number(this.state.unstaked) / Number(this.state.balance) * 100).toFixed(2)}%</em>{`${convertNumberToText(this.state.unstaked)}`}<em>ICX</em></span></p>
                                                        <p><span>Voted</span><span><em>{(!Number(this.state.staked) ? 0 : Number(this.state.delegated) / Number(this.state.staked) * 100).toFixed(2)}%</em>{`${convertNumberToText(this.state.delegated)}`}<em>ICX</em></span></p>
                                                        <p><span>I_SCORE</span><span>{`${convertNumberToText(this.state.iscore)}`}<em>I-Score</em></span></p>
                                                    </div>
                                                    <div className={this.state.tokenMore ? 'on' : ''}>
                                                        <p><span><i className="coin"></i>Token</span><span>{(tokenList || []).length}<em>Tokens</em></span><em className="drop-btn" onClick={this.toggleTokenMore}><i className="img"></i></em></p>
                                                        {(tokenList || []).sort((a, b) => (a.contractName < b.contractName ? -1 : a.contractName > b.contractName ? 1 : 0)).map((token, index) => {
                                                            const { contractName, contractSymbol, quantity } = token
                                                            return <p key={index}><span>{contractName}</span><span>{`${convertNumberToText(quantity)}`}<em>{contractSymbol}</em></span></p>
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
