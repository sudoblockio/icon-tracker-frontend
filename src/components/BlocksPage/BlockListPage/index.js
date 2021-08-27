import React, { Component } from 'react';
import {
	TxPage
} from '../../../components'

class BlockListPage extends Component {
	render() {
		{console.log({...this.props}, "props from component")}
		return <TxPage {...this.props}/>
	}
}
export default BlockListPage
