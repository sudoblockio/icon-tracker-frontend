import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { 
    numberWithCommas, 
    convertNumberToText 
} from 'utils/utils'
import { 
    LoadingComponent,
    AddressLink 
} from 'components'

class TokenSummary extends Component {
    render() {
        const { token } = this.props
        const { loading, data } = token

        const Content = () => {
            if (loading) {
                return <LoadingComponent height='206px'/>
            }
            else {
                const { tokenName, totalSupply, contract, price, decimals, holders, transfers, totalSupplyUsd, priceUsd, symbol } = data
                const _totalSupplyUsd = numberWithCommas(totalSupplyUsd)
                return (
                    <div className="screen0">
                        <div className="wrap-holder">
                            <p className="title dapp">{tokenName} ({symbol})</p>
                            <div className="contents">
                                <table className="table-typeB contract">
                                    <tbody>
                                        <tr>
                                            <td>Total Supply</td>
                                            <td>{numberWithCommas(totalSupply)} {symbol}{!!_totalSupplyUsd && <em>({_totalSupplyUsd} USD)</em>}</td>
                                            <td>Contract </td>
                                            <td><span>{contract ? <AddressLink to={contract}/> : '-'}</span></td>
                                        </tr>
                                        <tr>
                                            <td>Price</td>
                                            {
                                                !!price ?
                                                    <td>{convertNumberToText(price, 'icx')} ICX<em>({convertNumberToText(priceUsd, 'usd')} USD)</em></td>
                                                    :
                                                    <td>-</td>
                                            }
                                            <td>Decimals</td>
                                            <td>{decimals || '-'}</td>
                                        </tr>
                                        <tr>
                                            <td>Holders</td>
                                            <td>{numberWithCommas(holders)} addresses</td>
                                            <td>Transfers</td>
                                            <td>{numberWithCommas(transfers)}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )
            }
        }
        return Content()
    }
}

export default withRouter(TokenSummary);
