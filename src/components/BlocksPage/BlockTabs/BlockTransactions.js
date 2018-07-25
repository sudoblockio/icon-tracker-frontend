import React, { Component } from 'react';
import {
  TxBottomWrapper
} from '../../../components'

class BlockTransactions extends Component {
  render() {
    return <TxBottomWrapper {...this.props}/>
  }
}

export default BlockTransactions;
