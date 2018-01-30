import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { numberWithCommas, convertNumberToText, dateToUTC, getUtcLabel } from '../../utils/utils'
import { Pagination, BlockLink, TransactionLink, WalletLink } from '../../components'

class WalletTransactions extends Component {

  getWalletData = (pageId) => {
    const { walletAddress } = this.props
    this.props.history.push('/address/' + walletAddress + '/' + pageId);
  }

  render() {
    const { walletAddress, walletTx, pageNum, maxPageNum } = this.props
    const utcLabel = getUtcLabel()
    return (
      <div className="wrap-holder">
        <p className="title">Transaction List</p>
        <div className="contents">
          <table className="table-typeC">
            <thead>
              <tr>
                <th>Tx Hash</th>
                <th>Block Height</th>
                <th>Time Stamp<em>{utcLabel}</em></th>
                <th>From</th>
                <th>To</th>
                <th>Amount</th>
                <th>Fee</th>
              </tr>
            </thead>
            <tbody>
              {walletTx.map(tx => (
                <TableRow key={tx.txHash} data={tx} address={walletAddress}/>
              ))}
            </tbody>
          </table>
          <Pagination
            pageNum={pageNum}
            maxPageNum={maxPageNum}
            getData={this.getWalletData}
          />
        </div>
      </div>
    );
  }
}

const TableRow = ({data, address}) => {
  const { txHash, height, createDate, fromAddr, toAddr, amount, fee} = data
  return (
    <tr>
      <td className="on break"><TransactionLink to={txHash}/></td>
      <td className="on"><BlockLink to={height} label={numberWithCommas(height)}/></td>
      <td>{dateToUTC(createDate)}</td>
      <td className="break">{fromAddr === address ? fromAddr : <WalletLink to={fromAddr}/>}</td>
      <td className="break">{toAddr === address ? toAddr : <WalletLink to={toAddr}/>}</td>
      <td><span>{convertNumberToText(amount, 'icx')}</span><em>ICX</em></td>
      <td><span>{convertNumberToText(fee, 'icx')}</span><em>ICX</em></td>
    </tr>
  )
}

export default withRouter(WalletTransactions);
