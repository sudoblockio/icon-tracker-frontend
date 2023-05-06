import React, { Component } from 'react';
import {
	SearchPage
} from '../../../components'

class ContractListPage extends Component {
	constructor(props) {
		super(props);
	}
	
	render() {


		return <SearchPage {...this.props} type="contract"/>
	}
}
export default ContractListPage;
