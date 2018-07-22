import React, { Component } from 'react';
import { getUTCString } from '../../../utils/utils'
import { TX_TYPE } from '../../../utils/const'

class TxTableHead extends Component {
    render() {
        const TableHead = (_props) => {
            const { txType } = _props
            const utcLabel = `(${getUTCString()})`
            switch (txType) {
                case TX_TYPE.BLOCKS:
                    return (
                        <tr>
                            <th>Block Height</th>
                            <th>Time Stamp<em>{utcLabel}</em></th>
                            <th>No of Txns</th>
                            <th>Block Hash</th>
                            <th>Amount</th>
                            <th>TxFee</th>
                        </tr>
                    )
                case TX_TYPE.ADDRESSES:
                    return (
                        <tr>
                            <th>Address</th>
                            <th>ICX Balance</th>
                            <th>ICX USD Value</th>
                            <th>Percentage<em>%</em></th>
                            <th>No of Txns</th>
                            <th>Node type</th>
                        </tr>
                    )
                case TX_TYPE.CONTRACT_TX:
                    return (
                        <tr>
                            <th>TxHash</th>
                            <th>Age</th>
                            <th>From</th>
                            <th className="table-sign"></th>
                            <th>To</th>
                            <th>Quantity</th>
                        </tr>
                    )
                case TX_TYPE.CONTRACT_TOKEN_TX:
                    return (
                        <tr>
                            <th>TxHash</th>
                            <th>Age</th>
                            <th>From</th>
                            <th className="table-sign"></th>
                            <th>To</th>
                            <th>Quantity</th>
                            <th>Token</th>
                        </tr>
                    )
                case TX_TYPE.CONTRACT_EVENTS:
                    return (
                        <tr>
                            <th>TxHash / Block / Age</th>
                            <th>Method</th>
                            <th>Event Logs</th>
                        </tr>
                    )
                case TX_TYPE.ADDRESS_TX:
                    return (
                        <tr>
                            <th>TxHash</th>
                            <th>Block</th>
                            <th>Time Stamp<em>{utcLabel}</em></th>
                            <th>From</th>
                            <th className="table-sign"></th>
                            <th>To</th>
                            <th>Amount</th>
                            <th>TxFee</th>
                        </tr>
                    )
                case TX_TYPE.ADDRESS_TOKEN_TX:
                    return (
                        <tr>
                            <th>TxHash</th>
                            <th>Time Stamp<em>{utcLabel}</em></th>
                            <th>From</th>
                            <th className="table-sign"></th>
                            <th>To</th>
                            <th>Quantity</th>
                            <th>Token</th>
                        </tr>
                    )
                case TX_TYPE.TRANSACTIONS:
                    return (
                        <tr>
                            <th>TxHash</th>
                            <th>Block</th>
                            <th>Time Stamp<em>{utcLabel}</em></th>
                            <th>From</th>
                            <th className="table-sign"></th>
                            <th>To</th>
                            <th>Amount</th>
                            <th>TxFee</th>
                        </tr>
                    )
                case TX_TYPE.TOKEN_TRANSFERS:
                    return (
                        <tr>
                            <th>Tx Hash</th>
                            <th>Age</th>
                            <th>From</th>
                            <th className="table-sign"></th>
                            <th>To</th>
                            <th>Value</th>
                            <th>Token</th>
                        </tr>
                    )
                case TX_TYPE.BLOCK_TX:
                    return (
                        <tr>
                            <th>Tx Hash</th>
                            <th>From</th>
                            <th className="table-sign"></th>
                            <th>To</th>
                            <th>Amount</th>
                            <th>TxFee</th>
                        </tr>
                    )
                case TX_TYPE.TOKEN_TX:
                    return (
                        <tr>
                            <th>TxHash</th>
                            <th>Age</th>
                            <th>From</th>
                            <th className="table-sign"></th>
                            <th>To</th>
                            <th>Quantity</th>
                        </tr>
                    )
                case TX_TYPE.TOKEN_HOLDERS:
                    return (
                        <tr>
                            <th>Rank</th>
                            <th>Addresses</th>
                            <th>Quantity</th>
                            <th>Percentage<em>%</em></th>
                        </tr>
                    )
                default:
                    return (
                        <tr></tr>
                    )
            }
        }

        return TableHead(this.props)
    }
}

export default TxTableHead