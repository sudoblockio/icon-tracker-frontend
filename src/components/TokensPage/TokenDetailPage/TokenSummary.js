import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { numberWithCommas, convertNumberToText } from '../../../utils/utils'
import { LoadingComponent, AddressLink } from '../../../components'

class TokenSummary extends Component {
    render() {
        const { token } = this.props
        const { loading, data } = token

        const Content = () => {
            if (loading) {
                return <LoadingComponent height="206px" />
            } else {
                const { tokenName, totalSupply, contract, price, decimals, holders, transfers, totalSupplyUsd, priceUsd, symbol } = data
                const _totalSupplyUsd = numberWithCommas(totalSupplyUsd)
                return (
                    <div className="screen0">
                        <div className="wrap-holder">
                            <p className="title dapp">
                                {tokenName} ({symbol})
                            </p>
                            <div className="contents">
                                <div className="table-box">
                                    <table className="table-typeB contract">
                                        <tbody>
                                            <tr>
                                                <td>Total Supply</td>
                                                <td>
                                                    {numberWithCommas(totalSupply)} {symbol}
                                                    {!!_totalSupplyUsd && <em>({convertNumberToText(_totalSupplyUsd, 0)} USD)</em>}
                                                </td>
                                                <td>Contract </td>
                                                <td>
                                                    {/* <i className="img" /> */}
                                                    <span>{contract ? <AddressLink to={contract} /> : '-'}</span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Price</td>
                                                {!!price ? (
                                                    <td>
                                                        {convertNumberToText(price, 8)} ICX
                                                        <em>({convertNumberToText(priceUsd, 8)} USD)</em>
                                                    </td>
                                                ) : (
                                                    <td>-</td>
                                                )}
                                                <td>Decimals</td>
                                                <td>{decimals}</td>
                                            </tr>
                                            <tr>
                                                <td>Holders</td>
                                                <td>{numberWithCommas(holders)} Address(es)</td>
                                                <td>Transfers</td>
                                                <td>{numberWithCommas(transfers)}</td>
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
}

export default withRouter(TokenSummary)
