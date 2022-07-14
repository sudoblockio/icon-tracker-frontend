import React, { Component } from 'react';
import {
	SearchPage
} from '../../../components'

class ContractListPage extends Component {
	
	render() {


		return <SearchPage {...this.props} type="contract"/>
	}
}
export default ContractListPage