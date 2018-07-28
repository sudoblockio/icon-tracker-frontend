import React, { Component } from 'react';
import {
  TxBottom
} from 'components'

class BlockTransactions extends Component {
  render() {
    return <TxBottom {...this.props}/>
  }
}

export default BlockTransactions;
