import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {
    CopyButton,
    TransactionLink,
    LoadingComponent,
    QrCodeButton,
    AddressLink
} from 'components'
import {
    convertNumberToText,
    numberWithCommas,
    tokenText,
} from 'utils/utils'
import {
    CONTRACT_STATUS,
    IRC_VERSION
} from 'utils/const'

class ContractInfo extends Component {

    onMouseOver = (param) => {
        window.dispatchEvent(new CustomEvent('CUSTOM_FX', { detail: { type: "CONTRACT_OVER", param } }))
    }

    onMouseOut = (param) => {
        window.dispatchEvent(new CustomEvent('CUSTOM_FX', { detail: { type: "CONTRACT_OUT", param } }))
    }

    render() {
        const { contract } = this.props
        const { loading, data } = contract
        const Contents = () => {
            if (loading) {
                return <LoadingComponent height='206px' />
            }
            else {
                const { address, balance, createTx, creator, ircVersion, status, symbol, txCount, usdBalance, tokenName } = data
                return (
                    <div className="screen0">
                        <div className="wrap-holder">
                            <p className="title">Contract</p>
                            <div className="contents">
                                <table className="table-typeB contract">
                                    <tbody>
                                        <tr className="qr">
                                            <td>Address</td>
                                            <td colSpan="3">{address} <QrCodeButton address={address} /><CopyButton data={address} title={'Copy Address'} isSpan /></td>
                                        </tr>
                                        <tr>
                                            <td>Balance</td>
                                            <td>{convertNumberToText(balance, 'icx')} ICX{/*<span className="gray">({convertNumberToText(usdBalance, 'usd')} USD)</span>*/}</td>
                                            <td>Token Contract</td>
                                            <TokenContractCell
                                                tokenName={tokenName}
                                                symbol={symbol}
                                                address={address}
                                                ircVersion={ircVersion}
                                                onMouseOver={this.onMouseOver}
                                                onMouseOut={this.onMouseOut}
                                            />
                                        </tr>
                                        <tr>
                                            <td>ICX Value</td>
                                            <td>{convertNumberToText(usdBalance, 'usd')} USD</td>
                                            <td>Contract Creator</td>
                                            <td>
                                                <span className="help address">Creator Address</span>
                                                <span className="help hash">Creator Transaction Hash</span>
                                                <span className="link address ellipsis" onMouseOver={() => { this.onMouseOver("address") }} onMouseOut={() => { this.onMouseOut("address") }}>
                                                    <AddressLink to={creator} />
                                                </span>
                                                <em>at Txn</em>
                                                <TransactionLink to={createTx} spanClassName="link hash ellipsis" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Transactions</td>
                                            <td>{numberWithCommas(txCount)} Txns</td>
                                            <td>Status</td>
                                            <td>{CONTRACT_STATUS[status]}
                                                <DetailButton contractAddr={address} contractDetailPopup={this.props.contractDetailPopup} />
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
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
            <button onClick={this.handleClick} className="btn-type-normal status">Detail</button>
        )
    }
}

class TokenContractCell extends Component {
    render() {
        const { tokenName, symbol, address, ircVersion, onMouseOver, onMouseOut } = this.props
        const Content = () => {
            if (ircVersion === IRC_VERSION[1]) {
                return (
                    <td>
                        <span className="help token">{ircVersion} Token</span>
                        <span className="link token" onMouseOver={()=>{onMouseOver("token")}}  onMouseOut={()=>{onMouseOut("token")}}>
                            {tokenText(tokenName, symbol, address)}
                        </span>
                    </td>
                )
            }
            else {
                return <td>-</td>
            }
        }
        return Content()
    }
}

export default withRouter(ContractInfo);
