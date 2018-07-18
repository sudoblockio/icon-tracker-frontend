import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import WalletLink from '../Common/WalletLink';
import {
    convertNumberToText,
    numberWithCommas,
    tokenText
} from '../../utils/utils'
import {
    CONTRACT_STATUS
} from '../../utils/const'
import {
    CopyButton,
    TransactionLink,
    LoadingComponent
} from '../../components'

class ContractInfo extends Component {
    render() {
        const { contract } = this.props
        const { loading, data } = contract
        const Contents = () => {
            if (loading) {
                return (
                    <LoadingComponent height='206px' />
                )
            }
            else {
                const { address, balance, createTx, creator, ircVersion, status, symbol, txCount, usdBalance, tokenName } = data
                const isSymbol = symbol && symbol !== "-"
                return (
                    <div className="screen0">
                        <div className="wrap-holder">
                            <p className="title">Contract</p>
                            <div className="contents">
                                <table className="table-typeB contract">
                                    <tbody>
                                        <tr className="qr">
                                            <td>Address</td>
                                            <td colSpan="3">{address}  <span className="qrcode"><em className="img"></em></span><CopyButton data={address} title={'Copy Address'} /></td>
                                        </tr>
                                        <tr className="">
                                            <td>Balance</td>
                                            <td>{convertNumberToText(balance, 'icx')} ICX{/*<span className="gray">({convertNumberToText(usdBalance, 'usd')} USD)</span>*/}</td>
                                            <td>Token Contract</td>
                                            <td>
                                                <span className={`${!isSymbol ? '' : 'link'} `}>{tokenText(tokenName, symbol, address)}</span>
                                                <span className="help token">{ircVersion} - {address}</span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>ICX Value</td>
                                            <td>{convertNumberToText(usdBalance, 'usd')} USD</td>
                                            <td>Contract Creator</td>
                                            <td>
                                                <span className="link address"><WalletLink to={creator} /></span><em>at Txn</em><span className="link hash"><TransactionLink to={createTx} /></span>
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

export default withRouter(ContractInfo);
