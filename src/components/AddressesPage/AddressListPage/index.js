import React, { Component } from 'react';
import {
	TxPage
} from '../../../components'

class AddressListPage extends Component {
	render() {
		console.log(this.props, "????")
		return <TxPage {...this.props}/>
	}
}
export default AddressListPage