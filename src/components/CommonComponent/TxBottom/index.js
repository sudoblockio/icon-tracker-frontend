import React, { Component } from 'react';
import TxBottomComponent from './TxBottomComponent'
import {
  TX_TYPE_DATA
} from '../../../utils/const'

class TxBottom extends Component {
  render() {
    const {
      txData,
      goAllTx,
      txType,
      address,
      tokenTotal,
      onClickTab
    } = this.props


    const tableClassName =
      TX_TYPE_DATA[txType] ?
      TX_TYPE_DATA[txType]['className'] : ''

    const noBoxText =
      TX_TYPE_DATA[txType] ?
      TX_TYPE_DATA[txType]['noBoxText'] : ''

    return (
      
      <TxBottomComponent
        txData={txData}
        goAllTx={goAllTx}
        txType={txType}
        address={address}
        tableClassName={tableClassName}
        noBoxText={noBoxText}
        tokenTotal={tokenTotal}
        total={this.props.total}
        bondMap={this.props.bondMap?this.props.bondMap:""}
        onClickTab={onClickTab}
      />
    )
  }
}

export default TxBottom;
