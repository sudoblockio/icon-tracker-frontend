import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
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
    const noDataText =
      TX_TYPE_DATA[txType] ?
        TX_TYPE_DATA[txType]['noDataText'] : ''

    return (
      <TxBottom
        txData={walletTx}
        goAllTx={goAllTx}
        txType={txType}
        address={address}
        tableClassName={tableClassName}
        noDataText={noDataText}
        totalText='Transactions'
      />
    )
  }
}

export default withRouter(WalletTransactions);
