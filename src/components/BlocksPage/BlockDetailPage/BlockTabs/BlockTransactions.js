import React, { Component } from 'react'
import { TxBottom } from '../../../../components'

class BlockTransactions extends Component {
    render() {
        console.log(this.props, 'block transaction props')
        return <TxBottom {...this.props} />
    }
}

export default BlockTransactions
