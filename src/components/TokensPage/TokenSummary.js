import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { numberWithCommas, convertNumberToText } from '../../utils/utils'
import { LoadingComponent, ContractLink } from '../../components'

class TokenSummary extends Component {
    render() {
        const { token } = this.props
        // TODO 에러 처리
        const { loading, data, error } = token
        const { tokenName, tokenSymbol, totalSupply, contract, price, decimals, holderAddr, transfers, totalSupplyUsd, priceUsd } = data
        const _totalSupplyUsd = numberWithCommas(totalSupplyUsd)
        const _priceUsd = convertNumberToText(priceUsd, 'usd')
        return (
            <div className="screen0">
            {
                loading ?
                <LoadingComponent height='166px' />
                :
                <div className="wrap-holder">
                    <p className="title dapp">{tokenName}</p>
                    <div className="contents">
                        <table className="table-typeB contract">
                            <tbody>
                                <tr>
                                    <td>Total Supply</td>
                                    <td>{numberWithCommas(totalSupply)} {tokenSymbol}{!!_totalSupplyUsd && <em>({_totalSupplyUsd} USD)</em>}</td>
                                    <td>Contract </td>
                                    <td><span><ContractLink to={contract}/></span></td>
                                </tr>
                                <tr>
                                    <td>Price</td>
                                    {
                                        !!price ?
                                        <td>{convertNumberToText(price, 'icx')} ICX<em>({_priceUsd} USD)</em></td>
                                        :
                                        <td>-</td>
                                    }
                                    <td>Decimals</td>
                                    <td>{decimals}</td>
                                </tr>
                                <tr>
                                    <td>Holders</td>
                                    <td>{numberWithCommas(holderAddr)} addresses</td>
                                    <td>Transfers</td>
                                    <td>{numberWithCommas(transfers)}</td>
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

export default withRouter(TokenSummary);
