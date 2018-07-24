import React, { Component } from 'react';
import {
  TxBottomWrapper
} from '../../components'

class TransactionEvents extends Component {
  render() {
    return <TxBottomWrapper {...this.props}/>
  }
}

export default TransactionEvents;

