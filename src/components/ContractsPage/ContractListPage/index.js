import React, { Component } from 'react';
import {
	SearchPage
} from 'components'

class ContractsPage extends Component {
	render() {
		return <SearchPage {...this.props}/>
	}
}
export default ContractsPage