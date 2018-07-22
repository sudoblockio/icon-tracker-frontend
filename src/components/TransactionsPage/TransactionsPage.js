import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {
	TxPage
} from '../../components'

class TransactionsPage extends Component {
	render() {
		return <TxPage {...this.props}/>
	}
}
export default withRouter(TransactionsPage);
