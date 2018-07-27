import React, { Component } from 'react';
import queryString from 'query-string'
import {
  numberWithCommas,
  convertNumberToText,
  startsWith,
  calcMaxPageNum,
  onlyDate,
} from '../../utils/utils';
import {
  CONTRACT_STATUS
} from '../../utils/const'
import {
  LoadingComponent,
  Pagination,
  ContractLink,
  SortHolder,
  NoBox,
  SearchInput
} from '../../components/';

const ROUTE = '/contracts'

class ContractsPage extends Component {

  constructor(props) {
    super(props)
    this.pageId = 1
    this.state = {
      searchKeyword: ''
    }
  }

  componentWillMount() {
    this.setInitialData(this.props.url)
  }

  componentWillReceiveProps(nextProps) {
    const { pathname: currentPath } = this.props.url
    const { pathname: nextPath } = nextProps.url
    if (currentPath !== nextPath && startsWith(nextPath, ROUTE)) {
      this.setInitialData(nextProps.url)
    }
    else {
      const { search: currentSearch } = this.props.url
      const { search: nextSearch } = nextProps.url
      if (currentSearch !== nextSearch) {
        this.setSearch(nextSearch)
      }
    }
  }

  setInitialData = (url, sort) => {
    const { pathname, search } = url
    this.pageId = pathname.split("/")[2] || 1
    const { contracts } = this.props
    const { count } = contracts
    this.contractListByCount(sort || count)
    if (search) {
      this.setSearch(search)
    }
  }

  contractListByCount = (count) => {
    this.props.contractList({ page: this.pageId, count })
  }

  contractListByPage = (page) => {
    this.props.history.push(`${ROUTE}/${page}`);
  }

  setSearch = (_search) => {
    const parsed = queryString.parse(_search)
    const { search } = parsed
    this.setState({ searchKeyword: search || '' }, () => {
      if (search) {
        this.props.contractListSearch({ keyword: search, page: 1, count: 100 })
      }
    })
  }

  changeSearch = (nextSearch) => {
    const { search } = this.state
    if (search === '' && nextSearch === '') return
    if (nextSearch) {
      this.props.history.push(`${ROUTE}?search=${nextSearch}`);
    }
    else {
      this.props.history.push(ROUTE);
    }
  }

  render() {
    const { searchKeyword } = this.state
    const { contracts, contractsSearch } = this.props
    const ListData = !searchKeyword ? contracts : contractsSearch
    const { loading, data, page, listSize, count } = ListData;
    const noData = data.length === 0

    const TableContent = () => {
      if (noData) {
        return <NoBox text={searchKeyword ? 'No Data' : 'No Contract'} />
      }
      else {
        return ([
          <table
            key='table'
            className="table-typeA contract"
          >
            <thead>
              <tr>
                <th>Address</th>
                <th>Contract Name</th>
                <th>Compiler</th>
                <th>Balance</th>
                <th>TxCount</th>
                <th>Status</th>
                <th>Confirmed date</th>
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
          (!searchKeyword &&
            <SortHolder
              key='SortHolder'
              count={count}
              getData={this.contractListByCount}
            />),
          (!searchKeyword &&
            <Pagination
              key='Pagination'
              pageNum={page}
              maxPageNum={calcMaxPageNum(listSize, count)}
              getData={this.contractListByPage}
            />)
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
              <p className="title">Contracts</p>
              <SearchInput
                id="sub-search-input"
                placeholder="Search for contract name / address"
                searchKeyword={searchKeyword}
                changeSearch={this.changeSearch}
              />
              <div className="contents">
                <p className="txt cont">
                  <span>With verified source codes only</span>
                  <span>A total of<em>{listSize}</em> verified contract source codes found</span>
                </p>
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


const TableRow = ({ data }) => {
  return (
    <tr>
      <td className="on"><span className="ellipsis"><ContractLink to={data.address} /></span></td>
      <td>{data.contractName}</td>
      <td>{data.compiler}</td>
      <td><span>{convertNumberToText(data.balance, 'icx', 4)}</span><em>ICX</em></td>
      <td>{numberWithCommas(data.txCount)}</td>
      <td>{CONTRACT_STATUS[data.status]}</td>
      <td>{onlyDate(data.verifiedDate)}</td>
    </tr>
  )
}

export default ContractsPage;
