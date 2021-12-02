import React, { Component } from 'react';
import {
	SearchPage
} from '../../../components'

class ContractListPage extends Component {
	
	render() {
		console.log(this.props, "searchpageconat")
		return <SearchPage {...this.props}/>
	}
}
export default ContractListPage