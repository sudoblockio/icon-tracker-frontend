import React, { Component } from 'react';
import {
	TxPage
} from '../../../components'

class TransactionListPage extends Component {
	render() {
		console.log(this.props, "tx list oage props")
		return <TxPage {...this.props}/>
	}
}
export default TransactionListPage
