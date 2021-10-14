import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { convertNumberToText, convertHexToValue } from '../../utils/utils'
import { awaitGetRecentTx } from '../../redux/api/restV3/iiss'
import { LoadingComponent, TransactionLink } from '../../components'

class RecentTransactions extends Component {
    constructor(props) {
        super(props)
        this.state = {
            recentTx: 0
        }
    }
    async componentDidMount() {
        const recentTx = await awaitGetRecentTx()
        this.setState({recentTx})
    }
    render() {
        const loading = false;
        const list = this.state.recentTx ? this.state.recentTx.slice(0, 10) : []
        console.log(list, "recent txt list")
        return (
            <li className="right">
                <p className="title">Transactions</p>
                <div className="list-group">
                    {loading ? (
                        <div style={{ height: '511px' }}>
                            <LoadingComponent />
                        </div>
                    ) : (
                        <ul className="list" style={{ height: list.length === 0 ? 511 : '' }}>
                            {list.map((tx, index) => {
                                const { hash, value, transaction_fee, receipt_status } = tx
                                const isSuccess = Number(receipt_status) === 1
                                return (
                                    <li key={index}>
                                        <p className={`icon ${!isSuccess ? 'fail' : ''}`}>T</p>
                                        <p className="a">
                                            Status
                                            <em>
                                                {isSuccess ? 'Success' : 'Fail'}
                                            </em>
                                        </p>
                                        <p className="b">
                                            Amount
                                            <em>
                                            {convertHexToValue(value).toFixed(2)} ICX
                                            </em>
                                        </p>
                                        <p className="c">
                                            Hash
                                            <em>
                                                <TransactionLink to={hash} label={hash} />
                                            </em>
                                        </p>
                                        <p className="d">
                                            Fee
                                            <em>
                                                {convertNumberToText(transaction_fee)} ICX
                                            </em>
                                        </p>
                                    </li>
                                )
                            })}
                        </ul>
                    )}
                </div>
                <Link to="/transactions">
                    <p className="all">View all</p>
                </Link>
            </li>
        )
    }
}

export default RecentTransactions
