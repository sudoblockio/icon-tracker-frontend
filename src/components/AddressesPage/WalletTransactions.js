import React, { Component } from 'react';
import {
  TxBottom
} from '../../components'
import {
  TX_TYPE_DATA
} from '../../utils/const'

class WalletTransactions extends Component {
  render() {
    const {
      walletTx,
      goAllTx,
      txType,
      address
    } = this.props

    const tableClassName =
      TX_TYPE_DATA[txType] ?
      TX_TYPE_DATA[txType]['className'] : ''
    const noBoxText =
      TX_TYPE_DATA[txType] ?
      TX_TYPE_DATA[txType]['noBoxText'] : ''

    return (
      <TxBottom
        txData={walletTx}
        goAllTx={goAllTx}
        txType={txType}
        address={address}
        tableClassName={tableClassName}
        noBoxText={noBoxText}
        totalText='Transactions'
      />
    )
  }
}

export default WalletTransactions;
