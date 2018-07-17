import React, { Component } from 'react';
import { TX_TYPE } from '../../../utils/const'

class TxTableRow extends Component {
	render() {
		const TableRow = (_props) => {
            const { txType } = _props
            switch (txType) {
                case TX_TYPE.CONTRACT_TX:
                    
                default:
                    return <div></div>
            }
        }
            
		return TableRow(this.props)
	}
}

export default TxTableRow