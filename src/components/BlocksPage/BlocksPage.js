import React, { Component } from 'react';
import { LoadingComponent, Pagination, BlockLink, SortHolder } from '../../components/';
import { dateToUTC, convertNumberToText, numberWithCommas, getUTCString, startsWith } from '../../utils/utils';

class BlocksPage extends Component {

  componentWillMount() {
    this.props.resetReducer();

    const { pathname } = this.props.url;
    if (pathname === '/blocks') this.props.getBlocks()

    const page = pathname.split("/")[2]
    if (!isNaN(page)) this.props.getBlocks(page);
    else this.props.history.push('/blocks');
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.url.pathname !== this.props.url.pathname && startsWith(nextProps.url.pathname, '/blocks')) {
      nextProps.getBlocks(nextProps.url.pathname.split("/")[2]);
    }
  }

  getBlocksData = (pageId) => {
    this.props.history.push('/blocks/' + pageId);
  }

  render() {
    const { loading, data, pageNum, maxPageNum, totalData } = this.props;
    const utcLabel = `(${getUTCString()})`
    return (
      <div className="content-wrap">
        <div className="screen0">
          <div className="wrap-holder">
            {!loading && 
              <p className="title">
                Blocks
                <span className="right"><em>{totalData}</em> Total blocks</span>
              </p>
            }
            {
              loading ?
              <div style={{height: 'calc(100vh - 120px - 144px)'}}>
                <LoadingComponent />
              </div>
              :
              <div className="contents">
                <table className="table-typeE">
                  <thead>
                    <tr>
                      <th>Block Height</th>
                      <th>Time Stamp<em>{utcLabel}</em></th>
                      <th>No of Txns</th>
                      <th>Block Hash</th>
                      <th>Amount</th>
                      <th>TxFee</th>
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

                <SortHolder />              

                <Pagination
                  pageNum={pageNum}
                  maxPageNum={maxPageNum}
                  getData={this.getBlocksData} 
                />
              </div>
            }
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
        <td><BlockLink to={data.height} label={numberWithCommas(data.height)} /></td>
        <td className="break">{dateToUTC(data.createDate)}</td>
        <td>{numberWithCommas(data.txCount)}</td>
        <td className="break"><BlockLink to={data.height} label={data.hash} /></td>
        <td><span>{convertNumberToText(data.amount, 'icx')}</span><em>ICX</em></td>
        <td><span>{convertNumberToText(data.fee, 'icx')}</span><em>ICX</em></td>
      </tr>
    );
  }
}

export default BlocksPage;
