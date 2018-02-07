import React, { Component } from 'react';
import { LoadingComponent, Pagination, BlockLink } from '../../components/';
import { dateToUTC, convertNumberToText, numberWithCommas, getUtcLabel, startsWith } from '../../utils/utils';

class BlocksPage extends Component {

  componentWillMount() {
    this.props.resetReducer();
    this.props.getBlocks(this.props.url.pathname.split("/")[2]);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.url.pathname !== this.props.url.pathname && startsWith(nextProps.url.pathname, '/blocks/')) {
      nextProps.getBlocks(nextProps.url.pathname.split("/")[2]);
    }
  }

  getBlocksData = (pageId) => {
    this.props.history.push('/blocks/' + pageId);
  }

  render() {
    const { loading, data, pageNum, maxPageNum } = this.props;
    const utcLabel = getUtcLabel()
    return (
      <div className="content-wrap">
        <div className="screen0">
          <div className="wrap-holder">
            <p className="title">Recent Blocks</p>
            <div className="contents">
              {
                loading ? (
                  <div style={{ height: '600px' }}>
                    <LoadingComponent />
                  </div>
                ) : (
                    <table className="table-typeE">
                      <thead>
                        <tr>
                          <th>Block Height</th>
                          <th>Time Stamp<em>{utcLabel}</em></th>
                          <th>No of Txns</th>
                          <th>Block Hash</th>
                          <th>Amount</th>
                          <th>Fee</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          data.map((row) => (
                            <TableRow
                              key={row.height}
                              data={row} />
                          ))
                        }
                      </tbody>
                    </table>
                  )
              }

              <Pagination
                pageNum={pageNum}
                maxPageNum={maxPageNum}
                getData={this.getBlocksData} />
            </div>
          </div>
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
        <td><BlockLink to={data.height} label={numberWithCommas(data.height)}/></td>
        <td>{dateToUTC(data.createDate)}</td>
        <td>{numberWithCommas(data.txCount)}</td>
        <td className="break">{data.hash}</td>
        <td><span>{convertNumberToText(data.amount, 'icx')}</span><em>ICX</em></td>
        <td><span>{convertNumberToText(data.fee, 'icx')}</span><em>ICX</em></td>
      </tr>
    );
  }
}

export default BlocksPage;
