import React, { Component } from 'react';
import {
  numberWithCommas,
  convertNumberToText,
  startsWith,
  calcMaxPageNum,
  onlyDate
} from '../../utils/utils';
import {
  LoadingComponent,
  Pagination,
  ContractLink,
  SortHolder,
  NoBox
} from '../../components/';

class ContractsPage extends Component {

  constructor(props) {
    super(props)
    this.state = {
      search: ''
    }
  }

  componentWillMount() {
    const { pathname } = this.props.url;
    if (pathname === '/contracts') {
      this.contractList()
    }

    const page = pathname.split("/")[2]
    if (!isNaN(page)) {
      this.contractList(page)
    }
    else {
      this.props.history.push('/contracts');
    }
  }

  componentWillReceiveProps(nextProps) {
    const current = this.props.url.pathname
    const next = nextProps.url.pathname
    if (current !== next && startsWith(next, '/contracts')) {
      const page = next.split("/")[2]
      this.contractList(page)
    }
  }

  contractList = (_page, _count) => {
    const { contracts } = this.props
    const page = _page || contracts.page
    const count = _count || contracts.count
    this.props.contractList({ page, count })
  }

  contractListByCount = (count) => {
    this.contractList(1, count)
  }

  contractListByPage = (page) => {
    this.props.history.push('/contracts/' + page);
  }

  handleChange = (e) => {
    const { name, value } = e.target
    this.setState({ [name]: value })
  }

  handleKeyDown = (e) => {
    if (e.keyCode === 27) {
      const { name } = e.target
      this.setState({ [name]: '' })
    }
  }

  render() {
    const { search } = this.state
    const { contracts } = this.props
    const { loading, data, page, listSize, count } = contracts;
    const list = data.filter(token => {
      const { contractName } = token
      const lowerSearch = search.toLowerCase()
      return contractName.toLowerCase().indexOf(lowerSearch) !== -1
    })

    const TableContent = () => {
      if (list.length === 0) {
        return <NoBox text='No Data' />
      }
      else {
        return (
          <table className="table-typeA contract">
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
                list.map((row, index) => (
                  <TableRow key={index} data={row} />
                ))
              }
            </tbody>
          </table>
        )
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
              <div className="search-holder">
                <div className="search-group">
                  <input name="search" type="text" className="txt-type-search" placeholder="Search for contract name"
                    value={search}
                    onChange={this.handleChange}
                    onKeyDown={this.handleKeyDown}
                  />
                  <span><em className="img"></em></span>
                </div>
              </div>
              <div className="contents">
                <p className="txt cont">
                  <span>With verified source codes only</span>
                  <span>A total of<em>{listSize}</em> verified contract source codes found</span>
                </p>

                {TableContent()}

                {
                  !search &&
                  <SortHolder
                    count={count}
                    getData={this.contractListByCount}
                  />
                }

                {
                  !search &&
                  <Pagination
                    pageNum={page}
                    maxPageNum={calcMaxPageNum(listSize, count)}
                    getData={this.contractListByPage}
                  />
                }
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
      <td>{data.status}</td>
      <td>{onlyDate(data.verifiedDate)}</td>
    </tr>
  )
}

export default ContractsPage;
