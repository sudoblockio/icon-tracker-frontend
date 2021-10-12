import React, { Component } from 'react';
import {
  TxBottom
} from '../../../../components'

class TransactionInternalTransactions extends Component {
  render() {
    console.log(this.props, "rheannone props")
    return <TxBottom {...this.props}/>
  }
}

export default TransactionInternalTransactions;

