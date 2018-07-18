import React, { Component } from 'react';
import { numberWithCommas, convertNumberToText, startsWith, calcMaxPageNum, onlyDate } from '../../utils/utils';
import { LoadingComponent, Pagination, ContractLink, SortHolder } from '../../components/';

// TODO TxPage 참조
class ContractsPage extends Component {

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

  render() {
    const { contracts } = this.props
    const { loading, data, page, listSize, count } = contracts;
    return (
      <div className="content-wrap">
        <div className="screen0">
          {
          loading ?
          <LoadingComponent height='calc(100vh - 120px - 144px)'/>
          :
          <div className="wrap-holder">
            <p className="title">Contracts</p>
						<div className="search-holder">
							<div className="search-group">
								<input type="text" className="txt-type-search" placeholder="Search for contract name" value=""/>
								<span><em className="img"></em></span>
							</div>
						</div>            
            <div className="contents">
              <p className="txt cont">
                <span>With verified source codes only</span>
                <span>A total of<em>{listSize}</em> verified contract source codes found</span>
              </p>
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
                    data.map((row, index) => (
                      <TableRow key={index} data={row} />
                    ))
                  }
                </tbody>
              </table>

              <SortHolder
                count={count}
                getData={this.addressListByCount}
              />

              <Pagination
                pageNum={page}
                maxPageNum={calcMaxPageNum(listSize, count)}
                getData={this.addressListByPage}
              />
            </div>
          </div>
        }
        </div>
			</div>
    );
  }
}

const TableRow = ({ data }) => {
  return (
    <tr>
      <td className="on"><span className="ellipsis"><ContractLink to={data.address}/></span></td>
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
