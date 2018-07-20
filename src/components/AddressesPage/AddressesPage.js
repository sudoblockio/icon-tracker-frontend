import React, { Component } from 'react';
import { numberWithCommas, convertNumberToText, startsWith, calcMaxPageNum } from '../../utils/utils';
import { LoadingComponent, Pagination, WalletLink, SortHolder, NoBox } from '../../components/';

class AddressesPage extends Component {

  componentWillMount() {
    const { pathname } = this.props.url;
    if (pathname === '/addresses') {
      this.addressList()
    }

    const page = pathname.split("/")[2]
    if (!isNaN(page)) {
      this.addressList(page)
    }
    else {
      this.props.history.push('/addresses');
    }
  }

  componentWillReceiveProps(nextProps) {
    const current = this.props.url.pathname
    const next = nextProps.url.pathname
    if (current !== next && startsWith(next, '/addresses')) {
      const page = next.split("/")[2]
      this.addressList(page)
    }
  }

  addressList = (_page, _count) => {
    const { addresses } = this.props
    const page = _page || addresses.page
    const count = _count || addresses.count
    this.props.addressList({ page, count })
  }

  addressListByCount = (count) => {
    this.addressList(1, count)
  }

  addressListByPage = (page) => {
    this.props.history.push('/addresses/' + page);
  }

  render() {
    const { addresses } = this.props
    const { loading, data, page, listSize, count } = addresses;
    const noData = data.length === 0

    const TableContent = () => {
      if (noData) {
        return <NoBox text='No Address'/>
      }
      else {
        return ([
          <table 
            key='table'          
            className="table-typeA"
          >
            <thead>
              <tr>
                <th>Address</th>
                <th>ICX Balance</th>
                <th>ICX USD Value</th>
                <th>Percentage<em>%</em></th>
                <th>No of Txns</th>
                <th>Node type</th>
              </tr>
            </thead>
            <tbody>
              {
                data.map((row, index) => (
                  <TableRow key={index} data={row} />
                ))
              }
            </tbody>
          </table>,
          <SortHolder
            key='SortHolder'  
            count={count}
            getData={this.addressListByCount}
          />,
          <Pagination
            key='Pagination'  
            pageNum={page}
            maxPageNum={calcMaxPageNum(listSize, count)}
            getData={this.addressListByPage}
          />
        ])
      }
    }

    const Content = () => {
      if (loading) {
        return <LoadingComponent height='calc(100vh - 120px - 144px)'/>
      }
      else {
        return (
          <div className="wrap-holder">
            <p className="title">Addresses</p>
            <div className="contents">
              {TableContent()}
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

const TableRow = ({ data }) => {
  return (
    <tr>
      <td className="on"><span className="ellipsis"><WalletLink to={data.address} /></span></td>
      <td><span>{convertNumberToText(data.balance, 'icx')}</span><em>ICX</em></td>
      <td><span>{convertNumberToText(data.icxUsd, 'usd')}</span><em>USD</em></td>
      <td><span>{data.percentage}</span><em>%</em></td>
      <td>{numberWithCommas(data.txCount)}</td>
      <td>{data.nodeType}</td>
    </tr>
  )
}

export default AddressesPage;
