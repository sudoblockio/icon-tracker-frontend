import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { numberWithCommas, convertNumberToText, dateToUTC9 } from '../../utils/utils'
import { LoadingComponent, Pagination, BlockLink, TransactionLink } from '../../components'

class WalletTransactions extends Component {

  getWalletData = (pageId) => {
    const { walletTx } = this.props
    this.props.history.push('/wallet/' + walletTx + '/' + pageId);
  }

  render() {
    const { walletTx, pageNum, maxPageNum } = this.props
    return (
      <div className="wrap-holder">
        <p className="title">Transaction List</p>
        <div className="contents">
          <table className="table-typeC">
            <thead>
              <tr>
                <th>Tx Hash</th>
                <th>Block</th>
                <th>Time Stamp<em>(UTC+9)</em></th>
                <th>From</th>
                <th>To</th>
                <th>Amount</th>
                <th>Fee</th>
              </tr>
            </thead>
            <tbody>
              {walletTx.map(tx => (
                <TableRow key={tx.txHash} data={tx}/>
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

const TableRow = ({data}) => {
  return (
    <tr>
      <td className="on break"><TransactionLink to={data.txHash}/></td>
      <td className="on"><BlockLink to={numberWithCommas(data.height)}/></td>
      <td>{dateToUTC9(data.createDate)}</td>
      <td className="break">{data.fromAddr}</td>
      <td className="break">{data.toAddr}</td>
      <td><span>{convertNumberToText(data.amount, 'icx')}</span><em>ICX</em></td>
      <td><span>{convertNumberToText(data.fee, 'icx')}</span><em>ICX</em></td>
    </tr>
  )
}

export default withRouter(WalletTransactions);
