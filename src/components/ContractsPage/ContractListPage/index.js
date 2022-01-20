import React, { Component } from 'react';
import {
	SearchPage
} from '../../../components'

class ContractListPage extends Component {
	
	render() {
		console.log(this.props, "Search page props level")

		return <SearchPage {...this.props}/>
	}
}
export default ContractListPage