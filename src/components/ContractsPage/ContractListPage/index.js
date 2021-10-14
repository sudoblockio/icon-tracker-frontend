import React, { Component } from 'react';
import {
	SearchPage
} from '../../../components'

class ContractListPage extends Component {
	render() {
		console.log(this.props, "contract props")
		return <SearchPage {...this.props}/>
	}
}
export default ContractListPage