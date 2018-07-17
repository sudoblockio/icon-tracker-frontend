import React, { Component } from 'react';
import {
  TxBottom
} from '../../components'
import {
  TX_TYPE_DATA
} from '../../utils/const'

class WalletTokenTransfers extends Component {
  render() {
    const {
      walletTokenTx,
      goAllTx,
      txType,
      address
    } = this.props

    const tableClassName =
      TX_TYPE_DATA[txType] ?
      TX_TYPE_DATA[txType]['className'] : ''
    const noDataText =
      TX_TYPE_DATA[txType] ?
      TX_TYPE_DATA[txType]['noDataText'] : ''

    return (
      <TxBottom
        txData={walletTokenTx}
        goAllTx={goAllTx}
        txType={txType}
        address={address}
        tableClassName={tableClassName}
        noDataText={noDataText}
        totalText='Token transfers'
      />
    )
  }
}

export default WalletTokenTransfers;
