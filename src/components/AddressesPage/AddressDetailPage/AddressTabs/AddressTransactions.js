import React, { Component } from 'react';
import {
  TxBottomWrapper
} from 'components'

class AddressTransactions extends Component {
  render() {
    return <TxBottomWrapper {...this.props}/>
  }
}

export default AddressTransactions;

