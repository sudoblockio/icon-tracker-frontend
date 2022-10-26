import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { numberWithCommas, convertNumberToText } from '../../../utils/utils'
import { LoadingComponent, AddressLink } from '../../../components'
import {getTokenTotalSupply, getTokenDecimals} from '../../../redux/store/iiss'
import {tokenTransfersList, tokenHoldersList} from '../../../redux/api/restV3/token'

class TokenSummary extends Component {

    async componentDidMount(){
        this.transferCount = await tokenTransfersList({contractAddr: this.props.match.params.tokenId})
        this.holdersCount = await tokenHoldersList({contractAddr: this.props.match.params.tokenId})
        this.tokenDecimals = await getTokenDecimals(this.props.match.params.tokenId)
        this.tokenTotalSupply = await getTokenTotalSupply(this.props.match.params.tokenId) / Math.pow(10, this.tokenDecimals)
        this.transferCount = this.transferCount.headers["x-total-count"]
        this.holdersCount = this.holdersCount.headers["x-total-count"]
        this.setState({hC: this.holdersCount})
    }
    
    render() {
        
        const hC = this.holdersCount

        const { token } = this.props
        const { loading, data } = token
        const Content = () => {
            if (loading) {
                return <LoadingComponent height="206px" />
            } else {
                const { name, address, decimals, totalSupplyUsd, symbol } = data
                const _totalSupplyUsd = numberWithCommas(totalSupplyUsd)
                
                return (
                    <div className="screen0">
                        <div className="wrap-holder">
                            <p className="title dapp">
                                {name} ({symbol})
                            </p>
                            <div className="contents">
                                <div className="table-box">
                                    <table className="table-typeB contract">
                                        <tbody>
                                            <tr>
                                                <td>Total Supply</td>
                                                <td>
                                                    {numberWithCommas(this.tokenTotalSupply)} {symbol}
                                                    {!!_totalSupplyUsd && <em>({convertNumberToText(_totalSupplyUsd, 0)} USD)</em>}
                                                </td>
                                                <td>Contract </td>
                                                <td>
                                                    <span>{address ? <AddressLink to={address} /> : '-'}</span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Transfers</td>
                                                <td>{numberWithCommas(this.transferCount)}</td>
                                                <td>Decimals</td>
                                                <td>{Number(decimals)}</td>
                                            </tr>
                                            <tr>
                                                <td>Holders</td>
                                                <td>{numberWithCommas(hC)} Address(es)</td>

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
