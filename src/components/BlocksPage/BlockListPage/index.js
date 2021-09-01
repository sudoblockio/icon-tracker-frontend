import React, { Component } from 'react';
import {
	TxPage
} from '../../../components'

class BlockListPage extends Component {
	render() {
		{console.log(this.props, "props on txpage index")}
		return <TxPage {...this.props}/>
	}
}
export default BlockListPage
