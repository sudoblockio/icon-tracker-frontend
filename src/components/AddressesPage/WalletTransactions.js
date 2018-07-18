import React, { Component } from 'react';
import {
  TxBottomWrapper
} from '../../components'

class WalletTransactions extends Component {
  render() {
    return (
      <TxBottomWrapper
        {...this.props}
      />
    )
  }
}

export default WalletTransactions;

