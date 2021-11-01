import React, { Component } from 'react';
import {
	TxPage
} from '../../../components'
// local dev environment running app!!! 
class AddressListPage extends Component {
	render() {
		return <TxPage {...this.props}/>
	}
}
export default AddressListPage