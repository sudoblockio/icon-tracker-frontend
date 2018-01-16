import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { LoadingComponent, Pagination } from '../../components/';
import { numberWithCommas, convertNumberToText } from '../../utils/utils'

class BlockInformation extends Component {
  constructor(props) {
    super(props)
  }

  componentWillUnmount() {

  }

  render() {
    const { blockTx, pageNum, maxPageNum } = this.props
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
              blockTx.length > 0
                ? blockTx.map((row) => (
                    <TableRow
                      key={row.txHash}
                      data={row}
                      viewBlockDetail={() => this.viewBlockDetail(row.height)} />
                  ))
                : (<tr><td colSpan="5" className="notrans">No transactions in this block</td></tr>)
            }
            </tbody>
          </table>
          <Pagination
            pageNum={pageNum}
            maxPageNum={maxPageNum}
            getData={this.getBlocksData} />
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
    const { data, viewBlockDetail } = this.props;
    return (
      <tr>
        <td className="on break">{data.txHash}</td>
        <td className="on break"><Link to={'/wallet/' + data.fromAddr}>{data.fromAddr}</Link></td>
        <td className="on break"><Link to={'/wallet/' + data.toAddr}>{data.toAddr}</Link></td>
        <td><span>{convertNumberToText(data.amount, 'icx')}</span><em>ICX</em></td>
        <td className={!data.fee ? "no" : ""}><span>{convertNumberToText(data.fee, 'icx')}</span><em>ICX</em></td>
      </tr>
    );
  }
}

export default withRouter(BlockInformation);
