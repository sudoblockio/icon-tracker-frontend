import React, { Component } from 'react';
import { getUTCString } from '../../../utils/utils'
import { TX_TYPE } from '../../../utils/const'

class TxTableHead extends Component {
	render() {
		const TableHead = (_props) => {
            const { txType } = _props
            const utcLabel = `(${getUTCString()})`
            switch (txType) {
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