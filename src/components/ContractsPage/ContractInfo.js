import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {
    convertNumberToText,
    numberWithCommas,
    tokenText,
    isValidData
} from '../../utils/utils'
import {
    CONTRACT_STATUS
} from '../../utils/const'
import {
    CopyButton,
    TransactionLink,
    LoadingComponent,
    QrCodeButton,
    WalletLink
} from '../../components'

class ContractInfo extends Component {

    componentDidMount() {
        const event = new CustomEvent('CUSTOM_FX', { detail: "CONTRACT" })
        // TODO timeout 제거
        setTimeout(() => {
            window.dispatchEvent(event)
        }, 100)
    }

    render() {
        const { contract } = this.props
        const { loading, data } = contract
        const Contents = () => {
            if (loading) {
                return <LoadingComponent height='206px'/>
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
                                            <TokenCell tokenName={tokenName} symbol={symbol} address={address} ircVersion={ircVersion} />
                                        </tr>
                                        <tr>
                                            <td>ICX Value</td>
                                            <td>{convertNumberToText(usdBalance, 'usd')} USD</td>
                                            <td>Contract Creator</td>
                                            <td>
                                                <span className="link address ellipsis"><WalletLink to={creator} /></span><em>at Txn</em><TransactionLink to={createTx} spanClass="link hash ellipsis" />
                                                <span className="help address">Creator Address</span>
                                                <span className="help hash">Creator Transaction Hash</span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Transactions</td>
                                            <td>{numberWithCommas(txCount)} Txns</td>
                                            <td>Status</td>
                                            <td>{CONTRACT_STATUS[status]}<button className="btn-type-normal status">Detail</button></td>
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

const TokenCell = ({ tokenName, symbol, address, ircVersion }) => {
    const isSymbol = isValidData(symbol)
    if (isSymbol) {
        const isIrcVersion = isValidData(ircVersion)
        return (
            <td>
                {tokenText(tokenName, symbol, address)}
                <span className="help token">{isIrcVersion ? `${ircVersion} - ${address}` : address}</span>
            </td>
        )
    }
    else {
        return <td>-</td>
    }
}

export default withRouter(ContractInfo);
