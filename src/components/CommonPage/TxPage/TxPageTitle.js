import React, { Component } from 'react'
import { TX_TYPE, IRC_VERSION } from '../../../utils/const'
import { numberWithCommas } from '../../../utils/utils'

class TxPageTitle extends Component {
    render() {
        const { txType, urlIndex, listSize, totalSize } = this.props
        console.log(this.props, "block tx list props")

        const Content = () => {
            const _listSize = numberWithCommas(listSize || 0)
            const _totalSize = numberWithCommas(totalSize || 0)
            switch (txType) {
                case TX_TYPE.ADDRESS_VOTED:
                    return (
                        <p className="title">
                            Voters
                            <span>for address {urlIndex}</span>
                            <span className="right">
                                A total of<em>{_listSize}</em> voter(s) found
                            </span>
                        </p>
                    )
                case TX_TYPE.ADDRESS_REWARD:
                    return (
                        <p className="title">
                            Rewards
                            <span>for address {urlIndex}</span>
                            <span className="right">
                                A total of<em>{_listSize}</em> reward(s) found
                            </span>
                        </p>
                    )
                case TX_TYPE.CONTRACT_TX:
                    return (
                        <p className="title">
                            Transactions
                            <span>for Contract {urlIndex}</span>
                            <span className="right">
                                A total of<em>{_listSize}</em> transaction(s) found
                            </span>
                        </p>
                    )
                case TX_TYPE.CONTRACT_INTERNAL_TX:
                    return (
                        <p className="title">
                            Internal Transactions
                            <span>for Contract {urlIndex}</span>
                            <span className="right">
                                A total of<em>{_listSize}</em> internal transaction(s) found
                            </span>
                        </p>
                    )
                case TX_TYPE.CONTRACT_TOKEN_TX:
                    return (
                        <p className="title">
                            Token Transfers
                            <span>for Contract {urlIndex}</span>
                            <span className="right">
                                A total of<em>{_listSize}</em> token transfer(s) found
                            </span>
                        </p>
                    )
                case TX_TYPE.CONTRACT_EVENTS:
                    return (
                        <p className="title">
                            Events
                            <span>for Contract {urlIndex}</span>
                            <span className="right">
                                A total of<em>{_listSize}</em> event(s) found
                            </span>
                        </p>
                    )
                case TX_TYPE.ADDRESS_TX:
                    return (
                        <p className="title">
                            Transactions
                            <span>for Address {urlIndex}</span>
                            <span className="right">
                                A total of<em>{_listSize}</em> transaction(s) found
                            </span>
                        </p>
                    )
                case TX_TYPE.ADDRESS_INTERNAL_TX:
                    return (
                        <p className="title">
                            Internal Transactions
                            <span>for Address {urlIndex}</span>
                            <span className="right">
                                A total of<em>{_listSize}</em> internal transaction(s) found
                            </span>
                        </p>
                    )
                case TX_TYPE.ADDRESS_TOKEN_TX:
                    return (
                        <p className="title">
                            Token Transfers
                            <span>for Address {urlIndex}</span>
                            <span className="right">
                                A total of<em>{_listSize}</em> token transfer(s) found
                            </span>
                        </p>
                    )
                case TX_TYPE.BLOCK_TX:
                    return (
                        <p className="title">
                            Transactions
                            <span>for Block Height {urlIndex}</span>
                            <span className="right">
                                A total of<em>{_totalSize}</em> transaction(s) found
                            </span>
                        </p>
                    )
                case TX_TYPE.TOKEN_TX:
                    return (
                        <p className="title">
                            Token Transfers
                            <span>for Token {urlIndex}</span>
                            <span className="right">
                                A total of<em>{_listSize}</em> token transfer(s) found
                            </span>
                        </p>
                    )
                case TX_TYPE.TOKEN_HOLDERS:
                    return (
                        <p className="title">
                            Token Holders
                            <span>for Token {urlIndex}</span>
                            <span className="right">
                                A total of<em>{_totalSize}</em> holder(s) found<em className="gray">(Showing the top {_listSize} holder(s) only)</em>
                            </span>
                        </p>
                    )
                case TX_TYPE.TRANSACTION_EVENTS:
                    return (
                        <p className="title">
                            Events
                            <span>for Transaction {urlIndex}</span>
                            <span className="right">
                                A total of<em>{_totalSize}</em> event(s) found
                            </span>
                        </p>
                    )
                case TX_TYPE.TRANSACTION_INTERNAL_TX:
                    return (
                        <p className="title">
                            Internal Transactions
                            <span>for Transaction {urlIndex}</span>
                            <span className="right">
                                A total of<em>{_listSize}</em> internal transaction(s) found
                            </span>
                        </p>
                    )
                case TX_TYPE.BLOCKS:
                    return (
                        <p className="title token">
                            Blocks
                            <span />
                            <span className="right">
                                A total of<em>{numberWithCommas(totalSize)}</em> total block(s) found<em className="gray">(Showing the last {_listSize} record(s) only)</em>
                            </span>
                        </p>
                    )
                case TX_TYPE.ADDRESSES:
                    return <p className="title">Addresses</p>
                case TX_TYPE.TRANSACTIONS:
                    return (
                        <p className="title token">
                            Transactions
                            <span />
                            <span className="right">
                                A total of<em>{_totalSize}</em> total transaction(s) found
                                <em className="gray">(Showing the last {_listSize} record(s) only)</em>
                            </span>
                        </p>
                    )
                case TX_TYPE.TOKEN_TRANSFERS:
                    return (
                        <p className="title token">
                            Token Transfers
                            <span>({IRC_VERSION[2]})</span>
                            <span className="right">
                                A total of<em>{_totalSize}</em> token transfer(s) found<em className="gray">(Showing the last {_listSize} record(s) only)</em>
                            </span>
                        </p>
                    )
                default:
                    return <p />
            }
        }
        return Content()
    }
}

export default TxPageTitle
