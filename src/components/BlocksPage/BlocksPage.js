import React, { Component } from 'react';
import { LoadingComponent, Pagination, BlockLink, SortHolder, NoBox } from '../../components/';
import { calcMaxPageNum, dateToUTC, convertNumberToText, numberWithCommas, getUTCString, startsWith } from '../../utils/utils';

class BlocksPage extends Component {

  componentWillMount() {
    const { pathname } = this.props.url;
    if (pathname === '/blocks') {
      this.blockList()
    }

    const page = pathname.split("/")[2]
    if (!isNaN(page)) {
      this.blockList(page);
    }
    else {
      this.props.history.push('/blocks');
    }
  }

  componentWillReceiveProps(nextProps) {
    const current = this.props.url.pathname
    const next = nextProps.url.pathname
    if (current !== next && startsWith(next, '/blocks')) {
      const page = next.split("/")[2]
      this.blockList(page)
    }
  }

  blockList = (_page, _count) => {
    const { blocks } = this.props
    const page = _page || blocks.page
    const count = _count || blocks.count
    this.props.blockList({ page, count })
  }

  getBlocksData = (pageId) => {
    this.props.history.push('/blocks/' + pageId);
  }

  blockListByCount = (count) => {
    this.blockList(1, count)
  }

  blockListByPage = (page) => {
    this.props.history.push('/blocks/' + page);
  }

  render() {
    const { blocks } = this.props
    const { loading, data, page, listSize, count } = blocks;
    const utcLabel = `(${getUTCString()})`
    const noData = !data || data.length === 0

    const TableContent = () => {
      if (noData) {
        return <NoBox text='No Block'/>
      }
      else {
        return ([
          <table 
            key='table'
            className="table-typeE"
          >
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
          </table>,
          <SortHolder
            key='SortHolder'
            count={count}
            getData={this.blockListByCount}
          />,
          <Pagination
            key='Pagination'
            pageNum={page}
            maxPageNum={calcMaxPageNum(listSize, count)}
            getData={this.blockListByPage}
          />
        ])
      }
    }

    const Content = () => {
      if (loading) {
        return <LoadingComponent height='calc(100vh - 120px - 144px)' />
      }
      else {
        return (
          <div className="screen0">
            <div className="wrap-holder">
              <p className="title">
                Blocks
              <span className="right"><em>{listSize}</em> Total blocks</span>
              </p>
              <div className="contents">
                {TableContent()}
              </div>
            </div>
          </div>
        )
      }
    }

    return (
      <div className="content-wrap">
        {Content()}
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
        <td>{dateToUTC(data.createDate)}</td>
        <td>{numberWithCommas(data.txCount)}</td>
        <td><BlockLink to={data.height} label={data.hash} /></td>
        <td><span>{convertNumberToText(data.amount, 'icx')}</span><em>ICX</em></td>
        <td><span>{convertNumberToText(data.fee, 'icx')}</span><em>ICX</em></td>
      </tr>
    );
  }
}

export default BlocksPage;
