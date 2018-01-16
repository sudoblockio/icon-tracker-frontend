import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { LoadingComponent, Pagination, WalletLink } from '../../components/';
import { numberWithCommas, convertNumberToText } from '../../utils/utils'

class BlockInformation extends Component {
  constructor(props) {
    super(props)
  }

  componentWillUnmount() {

  }

  getBlockData = (pageId) => {
    const { height, history } = this.props
    this.props.history.push('/block/' + height + '/'+ pageId);
  }

  render() {
    const { blockTx, pageNum, maxPageNum, loading } = this.props
    return (
      <div className="wrap-holder">
        <p className="title">Transactions in The Block</p>
        <div className="contents">
          <table className="table-typeD">
            <thead>
              <tr>
                <th>Tx Hash</th>
                <th>From</th>
                <th>To</th>
                <th>Amount</th>
                <th>Fee</th>
              </tr>
            </thead>
            <tbody>
            {
              loading ? (
                <tr><td colSpan="5" className="notrans"><LoadingComponent /></td></tr>
              ) : blockTx.length > 0
                  ? blockTx.map((row) => (
                      <TableRow
                        key={row.txHash}
                        data={row} />
                    ))
                  : (<tr><td colSpan="5" className="notrans">No transactions in this block</td></tr>)
            }
            </tbody>
          </table>
          <Pagination
            pageNum={pageNum}
            maxPageNum={maxPageNum}
            getData={this.getBlockData} />
        </div>
      </div>
    );
  }
}

class TableRow extends Component {

  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    const { data } = this.props;
    return (
      <tr>
        <td className="on break">{data.txHash}</td>
        <td className="on break"><WalletLink to={data.fromAddr} /></td>
        <td className="on break"><WalletLink to={data.toAddr} /></td>
        <td><span>{convertNumberToText(data.amount, 'icx')}</span><em>ICX</em></td>
        <td className={!data.fee ? "no" : ""}><span>{convertNumberToText(data.fee, 'icx')}</span><em>ICX</em></td>
      </tr>
    );
  }
}

export default withRouter(BlockInformation);
