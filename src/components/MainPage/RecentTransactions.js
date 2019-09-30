import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { convertNumberToText } from 'utils/utils'
import { LoadingComponent, TransactionLink } from 'components'

class RecentTransactions extends Component {
    render() {
        const { loading, tmainTx } = this.props.info
        const list = tmainTx ? tmainTx.slice(0, 10) : []
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
                                const { txHash, amount, fee, state } = tx
                                const isSuccess = Number(state) === 1
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
                                                {convertNumberToText(amount)} ICX
                                            </em>
                                        </p>
                                        <p className="c">
                                            Hash
                                            <em>
                                                <TransactionLink to={txHash} label={txHash} />
                                            </em>
                                        </p>
                                        <p className="d">
                                            Fee
                                            <em>
                                                {convertNumberToText(fee)} ICX
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
