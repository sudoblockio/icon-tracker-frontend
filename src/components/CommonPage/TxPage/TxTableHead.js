import React, { Component } from 'react'
import { TX_TYPE } from '../../../utils/const'

class TxTableHead extends Component {
    render() {
        const TableHead = _props => {
            const { txType } = _props
            switch (txType) {
                case TX_TYPE.ADDRESS_REWARD:
                    return (
                        <tr>
                            <th>TxHash</th>
                            <th>Block</th>
                            <th>Age</th>
                            <th>I-Score</th>
                            <th>ICX</th>
                        </tr>
                    )
                case TX_TYPE.ADDRESS_DELEGATION:
                    return (
                        <tr>
                            <th>P-Rep</th>
                            <th>Voted</th>
                        </tr>
                    )
                case TX_TYPE.ADDRESS_VOTED:
                    return (
                        <tr>
                            <th>Address</th>
                            <th>Delegation</th>
                        </tr>
                    )
                case TX_TYPE.ADDRESS_BONDED:
                        return (
                            <tr>
                                <th>Address</th>
                                <th>Value</th>
                            </tr>
                        )
                        case TX_TYPE.ADDRESS_BONDERS:
                            return (
                                <tr>
                                    <th>Address</th>
                                    <th>Bond</th>
                                </tr>
                            )
                case TX_TYPE.ADDRESS_TX:
                    return (
                        <tr>
                            <th>TxHash</th>
                            <th>Block</th>
                            <th>Age</th>
                            <th>From</th>
                            <th className="table-sign" />
                            <th>To</th>
                            <th>Amount</th>
                            <th>TxFee</th>
                        </tr>
                    )
                case TX_TYPE.ADDRESS_INTERNAL_TX:
                    return (
                        <tr>
                            <th>Parent TxHash</th>
                            <th>Block</th>
                            <th>Age</th>
                            <th>From</th>
                            <th className="table-sign" />
                            <th>To</th>
                            <th>Value</th>
                        </tr>
                    )
                case TX_TYPE.ADDRESS_TOKEN_TX:
                    return (
                        <tr>
                            <th>TxHash</th>
                            <th>Age</th>
                            <th>From</th>
                            <th className="table-sign" />
                            <th>To</th>
                            <th>Quantity</th>
                            <th>Token</th>
                        </tr>
                    )
                case TX_TYPE.CONTRACT_TX:
                    return (
                        <tr>
                            <th>TxHash</th>
                            <th>Block</th>
                            <th>Age</th>
                            <th>From</th>
                            <th className="table-sign" />
                            <th>To</th>
                            <th>Amount</th>
                            <th>TxFee</th>
                        </tr>
                    )
                case TX_TYPE.CONTRACT_INTERNAL_TX:
                    return (
                        <tr>
                            <th>Parent TxHash</th>
                            <th>Block</th>
                            <th>Age</th>
                            <th>From</th>
                            <th className="table-sign" />
                            <th>To</th>
                            <th>Value</th>
                        </tr>
                    )
                case TX_TYPE.CONTRACT_TOKEN_TX:
                    return (
                        <tr>
                            <th>TxHash</th>
                            <th>Age</th>
                            <th>From</th>
                            <th className="table-sign" />
                            <th>To</th>
                            <th>Quantity</th>
                            <th>Token</th>
                            <th>TxFee</th>
                        </tr>
                    )
                case TX_TYPE.BLOCK_TX:
                    return (
                        <tr>
                            <th>Tx Hash</th>
                            <th>From</th>
                            <th className="table-sign" />
                            <th>To</th>
                            <th>Amount</th>
                            <th>TxFee</th>
                        </tr>
                    )
                case TX_TYPE.BLOCK_INTTX:
                    return (
                        <tr>
                            <th>Tx Hash</th>
                            <th>From</th>
                            <th className="table-sign" />
                            <th>To</th>
                            <th>Amount</th>
                            <th>TxFee</th>
                        </tr>
                    )
                case TX_TYPE.TRANSACTIONS:
                    return (
                        <tr>
                            <th>TxHash</th>
                            <th>Block</th>
                            <th  id='age-format' onClick={()=>this.props.handleClick?this.props.handleClick(this.props.age):null}>
                                <div class= {this.props.age==="Age"&& "div-tooltip"}>{this.props.age}
                        {this.props.age==="Age"&& <span class="tooltiptext">Click to show Datetime Format</span>}
                        </div>
                                </th>
                            <th>From</th>
                            <th className="table-sign" />
                            <th>To</th>
                            <th>Amount</th>
                            <th>TxFee</th>
                            <th>Method</th>
                        </tr>
                    )
                case TX_TYPE.TOKEN_TRANSFERS:
                    return (
                        <tr>
                            <th>Tx Hash</th>
                            <th  id='age-format' onClick={()=>this.props.handleClick?this.props.handleClick(this.props.age):null}>
                                <div class= {this.props.age==="Age"&& "div-tooltip"}>{this.props.age}
                        {this.props.age==="Age"&& <span class="tooltiptext">Click to show Datetime Format</span>}
                        </div>
                                </th>
                            <th>From</th>
                            <th className="table-sign" />
                            <th>To</th>
                            <th>Quantity</th>
                            <th>Token</th>
                            <th>TxFee</th>
                        </tr>
                    )
                case TX_TYPE.TOKEN_TX:
                    return (
                        <tr>
                            <th>TxHash</th>
                            <th>Age</th>
                            <th>From</th>
                            <th className="table-sign" />
                            <th>To</th>
                            <th>Quantity</th>
                            <th>TxFee</th>
                        </tr>
                    )
                case TX_TYPE.ADDRESSES:
                    return (
                        <tr>
                            <th>Address</th>
                            <th>Balance</th>
                            <th>USD Value</th>
                            <th>
                                Percentage<em>%</em>
                            </th>
                            <th>No of Txns</th>
                            <th>Address type</th>
                        </tr>
                    )
                case TX_TYPE.BLOCKS:
                    return (
                        <tr>
                            <th>Block</th>
                            <th  id='age-format' onClick={()=>this.props.handleClick?this.props.handleClick(this.props.age):null}>
                                <div class= {this.props.age==="Age"&& "div-tooltip"}>{this.props.age}
                        {this.props.age==="Age"&& <span class="tooltiptext">Click to show Datetime Format</span>}
                        </div>
                                </th>
                            <th>No of Txns</th>
                            <th>Block Hash</th>
                            <th>Amount</th>
                            <th>TxFee</th>
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
                case TX_TYPE.TRANSACTION_EVENTS:
                    return (
                        <tr>
                            <th>Event Logs</th>
                        </tr>
                    )
                case TX_TYPE.TRANSACTION_INTERNAL_TX:
                    return (
                        <tr>
                            {/* <th>Type trace address</th> */}
                            <th>From</th>
                            <th className="table-sign" />
                            <th>To</th>
                            <th>Value</th>
                            {/* <th>Step Limit</th> */}
                        </tr>
                    )
                case TX_TYPE.TOKEN_HOLDERS:
                    return (
                        <tr>
                            <th>Rank</th>
                            <th>Addresses</th>
                            <th>Quantity</th>
                            <th>
                                Percentage<em>%</em>
                            </th>
                        </tr>
                    )
                default:
                    return <tr />
            }
        }

        return TableHead(this.props)
    }
}

export default TxTableHead
