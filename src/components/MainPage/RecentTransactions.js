import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { convertNumberToText } from 'utils/utils'
import { LoadingComponent, TransactionLink } from 'components'
import icon_01 from '../../style/image/icon_01.png'
import icon_03 from '../../style/image/icon_03.png'

class RecentTransactions extends Component {
    render() {
        const { loading, tmainTx } = this.props.info
        const list = tmainTx.slice(9) || []
        return (
            <li className="right">
                <p className="title">Transactions</p>
                <div className="list-group">
                    {loading ? (
                        <div style={{ height: '511px' }}>
                            <LoadingComponent />
                        </div>
                    ) : (
                        <ul className="list">
                            {list.map((tx, index) => {
                                const { txHash, amount, fee, state } = tx
                                const isSuccess = Number(state) === 1
                                const src = isSuccess ? icon_01 : icon_03
                                const text = isSuccess ? 'SUCCESS' : 'FAIL'
                                return (
                                    <li key={index}>
                                        <p
                                            className={`icon ${
                                                !isSuccess ? 'fail' : ''
                                            }`}
                                        >
                                            T
                                        </p>
                                        <p className="a">
                                            TX Hash
                                            <em>
                                                <TransactionLink
                                                    to={txHash}
                                                    label={txHash}
                                                />
                                            </em>
                                        </p>
                                        <p className="b">
                                            Amount
                                            <em>
                                                {convertNumberToText(amount)}{' '}
                                                <span>ICX</span>
                                            </em>
                                        </p>
                                        <p className="c">
                                            Fee
                                            <em>
                                                {convertNumberToText(fee)}{' '}
                                                <span>ICX</span>
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
