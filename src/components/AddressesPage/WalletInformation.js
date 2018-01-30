import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import clipboard from 'clipboard'
import { numberWithCommas, convertNumberToText, isValidNodeType } from '../../utils/utils'

class WalletInformation extends Component {
  constructor(props) {
    super(props)
    this.clipboard = new clipboard('.clipboard-btn');
  }

  componentWillUnmount() {
    this.clipboard.destroy();
  }

  render() {
    const { walletDetail } = this.props
    const { address, nodeType, balance, icxUsd, txCount } = walletDetail
    return (
      <div className="wrap-holder">
        <p className="title">Wallet Information</p>
        <div className="contents">
          <table className="table-typeB address">
            <thead>
              <tr>
                <th>Address</th>
                <th>value</th>
              </tr>
            </thead>
            <tbody>
              <tr className="">
                <td>Address</td>
                <td>{address}<em className="img clipboard-btn" data-clipboard-text={address}></em>{isValidNodeType(nodeType) && <span className="crep">{`${nodeType}`}</span>}</td>
              </tr>
              <tr>
                <td>Balance</td>
                <td>{`${convertNumberToText(balance, 'icx')} ICX`}<em className="img"></em><span>{`${convertNumberToText(icxUsd, 'usd')} USD`}</span></td>
              </tr>
              <tr>
                <td>No of Txns</td>
                <td>{`${numberWithCommas(txCount)}`}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default withRouter(WalletInformation);
