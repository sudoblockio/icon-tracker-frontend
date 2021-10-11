import React, { Component } from 'react';
import {
  TxBottom
} from '../../../../components'

class BlockTransactions extends Component {
  render() {
    {console.log("tx botton props", this.props)}
    return <TxBottom {...this.props}/>
  }
}

export default BlockTransactions;
