import React, { Component } from 'react';
import { getUTCString } from '../../utils/utils'
import { TX_TYPE } from '../../utils/const'

// TODO 정리
class AddressTableHead extends Component {
	render() {
		const TableHead = (_txType) => {
            const isBlockTx = this.txType === TX_TYPE.BLOCK_TX
            const isTokenTx = this.txType === TX_TYPE.ADDRESS_TOKEN_TX || 
                            this.txType === TX_TYPE.TOKEN_TRANSFERS ||
                            this.txType === TX_TYPE.TOKEN_TX ||
                            this.txType === TX_TYPE.TOKEN_HOLDERS
    
			if (_txType === TX_TYPE.TOKEN_TX) {
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
			}
			else if (_txType === TX_TYPE.TOKEN_HOLDERS) {
				return (
                    <tr>
                        <th>Rank</th>
                        <th>Address</th>
                        <th>Quantity</th>
                        <th>Percentage<em>%</em></th>
                    </tr>
                )
			}
			else {
                const utcLabel = `(${getUTCString()})`
				return (
					<tr>
                        <th>Tx Hash</th>
                        {!isBlockTx && <th>Block</th>}
                        {!isBlockTx && <th>Time Stamp<em>{utcLabel}</em></th>}
                        <th>From</th>
                        <th className="table-sign"></th>
                        <th>To</th>
                        <th>{isTokenTx ? 'Quantity' : 'Amount'}</th>
                        <th>{isTokenTx ? 'Token' : 'TxFee'}</th>
					</tr>
				)
			}
        }
        
		const { txType } = this.props
		return TableHead(txType)
	}
}


export default AddressTableHead