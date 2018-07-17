import React, { Component } from 'react';
import { getUTCString } from '../../../utils/utils'
import { TX_TYPE } from '../../../utils/const'

class TxTableHead extends Component {
	render() {
		const TableHead = (_props) => {
            const { txType } = _props
            switch (txType) {
                case TX_TYPE.CONTRACT_TX:
                    
                default:
                    return <div></div>
            }
        }
            
		return TableHead(this.props)
	}
}

export default TxTableHead