import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { convertNumberToText, numberWithCommas } from '../../utils/utils'
import {
	CopyButton,
	TokenLink,
    TransactionLink,
    LoadingComponent
} from '../../components'
import WalletLink from '../Common/WalletLink';

class ContractInfo extends Component {
    render() {
        const { contract } = this.props
        // TODO 에러 처리
        const { loading, data, error } = contract
        const { address, balance, createTx, creator, ircVersion, status, symbol, txCount, usdBalance } = data
        return (
            <div className="screen0">
            {
                loading ?
                <LoadingComponent height='206px' />
                :
                <div className="wrap-holder">
                    <p className="title">Contract</p>
                    <div className="contents">
                        <table className="table-typeB contract">
                            <tbody>
                                <tr className="qr">
                                    <td>Address</td>
                                    <td colSpan="3">{address}  <span className="qrcode"><em className="img"></em></span><CopyButton data={address} title={'Address'}/></td>
                                </tr>
                                <tr className="">
                                    <td>Balance</td>
                                    <td>{convertNumberToText(balance, 'icx', 4)} ICX{/*<span className="gray">({convertNumberToText(usdBalance, 'usd')} USD)</span>*/}</td>
                                    <td>Token Contract</td>
                                    <td>
                                        <span className="link token"><TokenLink label={symbol} to={address}/></span>
                                        <span className="help token">{ircVersion} - {address}</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td>ICX Value</td>
                                    <td>{convertNumberToText(usdBalance, 'usd')}</td>
                                    <td>Contract Creator</td>
                                    <td>
                                        <span className="link address"><WalletLink to={creator}/></span><em>at Txn</em><span className="link hash"><TransactionLink to={createTx}/></span>
                                        <span className="help address">Creator Address</span>
                                        <span className="help hash">Creator Transaction Hash</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Transactions</td>
                                    <td>{numberWithCommas(txCount)} Txns</td>
                                    <td>Status</td>
                                    <td>In progress<button className="btn-type-normal status">Detail</button></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>					
            }					
            </div>
        )
    }
}

export default withRouter(ContractInfo);
