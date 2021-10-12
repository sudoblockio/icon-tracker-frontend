import React, { Component } from 'react';
import {
  TxBottom
} from '../../../../components'

class TransactionEvents extends Component {
  render() {
    console.log(this.props, "event props")
    return <TxBottom {...this.props}/>
  }
}

export default TransactionEvents;

