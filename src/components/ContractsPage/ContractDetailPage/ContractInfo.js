import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { SocialMediaType } from '../../../utils/const'
import { CopyButton, TransactionLink, LoadingComponent, QrCodeButton, AddressLink, ReportButton } from '../../../components'
import { convertNumberToText, numberWithCommas, tokenText, isValidData, isUrl, addAt } from '../../../utils/utils'
import { cxSocialMedia } from '../../../redux/store/contracts'
import  {nodeApiUrl}  from '../../../config'

class ContractInfo extends Component {
    onMouseOver = param => {
        window.dispatchEvent(new CustomEvent('CUSTOM_FX', { detail: { type: 'CONTRACT_OVER', param } }))
    }

    onMouseOut = param => {
        window.dispatchEvent(new CustomEvent('CUSTOM_FX', { detail: { type: 'CONTRACT_OUT', param } }))
    }
    async componentDidMount() {

        this.payload = {contractAddr: this.props.match.params.contractId}
        this.props.getTokenSummary(this.payload)
        this.props.contractDetail(this.props.match.params.contractId)
        const socialLinks = await cxSocialMedia(this.props.match.params.contractId)
        this.getSocialMediaLinks(this.props.match.params.contractId)

        
    }
    media = ["twitter", "wechat", "youtube", "telegram", "steemit", "reddit", "keybase", "github", "facebook"]
    checkLinks = {twitter:"", wechat:"", youtube:"", telegram:"", steemit:"", reddit:"", keybase:"", github:"", facebook:""}
    website
    getSocialMediaLinks = async (contract) => {
        const socialLinksMap = await cxSocialMedia(contract);
        this.verified_data = socialLinksMap.data
        this.website = socialLinksMap.data.website

        this.media.map(site =>{
            if (this.checkLinks && socialLinksMap){
                this.checkLinks[site] !== socialLinksMap.data[site] ? this.checkLinks[site] = socialLinksMap.data[site] : console.log("no link")
            }
        })
    }
    onSocialClick = async link => {
        if (isUrl(link)) {
            window.open(link, '_blank')
        }
    }

    render() {
        const { contract, walletAddress, getTokenSummary, TxCount, contractDetails } = this.props
        const { loading, data } = contract
        let address, balance, createTx, owner_address, ircVersion, status, symbol, txCount, depositInfo, tokenName, reportedCount
        const Contents = () => {
            if (loading) {
                return <LoadingComponent height="206px" />
            } else {
                const isCreator = isValidData(contractDetails.owner_address)
                const isCreateTx = isValidData(contractDetails.creation_hash)
                const scam = reportedCount >= 100 ? true : false
                const { availableDeposit, availableVirtualStep } = depositInfo || {}
                return (
                    <div className="screen0">
                        <div className="wrap-holder">
                            <p className="title">Contract</p>
                            <div className={"cx-submit"}>

                                                                                {/* nodeApiUrl === 'https://berlin.net.solidwallet.io' ?  */}
                                                                                {/* <QrCodeButton address={walletAddress} contract={data.public_key}/>   */}
                                                                                {/* : ""  */}
                                                                                {/* : ""} */}
                            </div>
                            <div className="contents">
                                <div className="table-box">
                                                    
                                    <table className="table-typeB contract">
                                        <tbody>
                                            <tr className="p-rep">
                                                <td>Address</td>
                                                <td colSpan="3" className={scam ? 'scam' : ''}>
                                                    {scam && <span className="scam-tag">Scam</span>}
                                                    {data.public_key} 
                                                   <span> <CopyButton data={data.public_key} title={'Copy Address'} isSpan /></span>
                                                    {contractDetails.owner_address === walletAddress && nodeApiUrl===`https://berlin.net.solidwallet.io`? 
                                                    <QrCodeButton address={walletAddress} contract={data.public_key}/>  
                                                    :""}
                                                    {this.website && <span className="home" onClick={() => {
                                                    this.onSocialClick(this.website)
                                                    }}><i className="img"></i></span>}
                                                    {SocialMediaType.map((type, index) => {
                                                const mediaValue = this.checkLinks[type]
                                                if (!mediaValue) {
                                                    return null
                                                }

                                                return (
                                                    <span key={index} className={`table-typeB ${type} i`} onClick={() => {
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
                                                    <ReportButton address={data.public_key} />

                                                    
                                                </td>
                                            </tr>
                                            <tr>

                                                <td>Name</td>
                                                
                                                <TokenContractCell
                                                    isToken={contractDetails.is_token}
                                                    tokenName={contractDetails.name}
                                                    symbol={contractDetails.symbol}
                                                    address={contractDetails.address}
                                                    ircVersion={ircVersion}
                                                    onMouseOver={this.onMouseOver}
                                                    onMouseOut={this.onMouseOut}
                                                />
                                                <td>Contract Creator</td>
                                                {isCreator && isCreateTx ? ( 
                                                    <td>
                                                        <span className="help address">Creator Address</span>
                                                        <span className="help hash">Creator Transaction Hash</span>
                                                        <span
                                                            className="link address ellipsis"
                                                            onMouseOver={() => {
                                                                this.onMouseOver('address')
                                                            }}
                                                            onMouseOut={() => {
                                                                this.onMouseOut('address')
                                                            }}
                                                        >
                                                           
                                                            <AddressLink to={contractDetails.owner_address} />
                                                        </span>
                                                        <em>at Txn</em>
                                                        <span
                                                            className="link hash ellipsis"
                                                            onMouseOver={() => {
                                                                this.onMouseOver('hash')
                                                            }}
                                                            onMouseOut={() => {
                                                                this.onMouseOut('hash')
                                                            }}
                                                        >
                                                            <TransactionLink to={contractDetails.creation_hash} />
                                                        </span>
                                                    </td>
                                                 ) : (<td>-</td>)} 
                                            </tr>
                                            <tr>
                                                
                                               
                                                <td>Balance</td>
                                                <td>
                                                {convertNumberToText(data.balance? data.balance.toFixed(): 0)} ICX
                                                    {/* <DetailButton contractAddr={data.public_key} contractDetailPopup={this.props.contractDetailPopup} /> */}
                                                </td>
                                                <td>Transactions</td>
                                                <td>{numberWithCommas(TxCount)} Txns</td>

                                            </tr>
                                           
                                           {this.verified_data ? 
                                           <tr>
                                           <td>Team Name</td>
                                               <td>{this.verified_data ? <a href={`${window.location.origin}/address/${this.verified_data.p_rep_address}`}>{this.verified_data.team_name}</a>  : '-'}</td>
                                               <td>Description</td>
                                               <td>{this.verified_data ? this.verified_data.short_description : ""}</td>

                                           </tr>      
                                        : ""}
                                                                                  
                                            <tr>
                                                {/* <td>Balance</td> */}

                                                {/* <td>{convertNumberToText(data.balance? data.balance.toFixed(): 0)} ICX</td> */}
                                                {/* <td>Virtual Step</td> */}
                                                {/* {availableVirtualStep? <td>{convertNumberToText(availableVirtualStep)} Steps</td> : <td>-</td>} */}
                                            </tr>
                                            {/* <tr>
                                                <td>Virtual Step</td>
                                                {availableVirtualStep? <td>{convertNumberToText(availableVirtualStep)} Steps</td> : <td>-</td>}
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
        return Contents()
    }
}

class DetailButton extends Component {
    handleClick = () => {
        const { contractAddr } = this.props
        this.props.contractDetailPopup({ contractAddr })
    }

    render() {
        return (
            <button onClick={this.handleClick} className="btn-type-normal status">
                Detail
            </button>
        )
    }
}

class TokenContractCell extends Component {
    render() {
        const { tokenName, symbol, address, ircVersion, onMouseOver, onMouseOut, isToken } = this.props
        const Content = () => {
            if (isToken) {
                return (
                    <td>
                        <span className="help token">{ircVersion} Token</span>
                        <span
                            className="link token"
                            onMouseOver={() => {
                                onMouseOver('token')
                            }}
                            onMouseOut={() => {
                                onMouseOut('token')
                            }}
                        >
                            {tokenText(tokenName, symbol, address)}
                        </span>
                    </td>
                )
            } else {
                return (
                    <td>
                        {tokenName}
                        
                    </td>
                )
            }
        }
        return Content()
    }
}

export default withRouter(ContractInfo)
