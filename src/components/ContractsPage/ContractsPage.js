import React, { Component } from 'react';
import { numberWithCommas, convertNumberToText, startsWith, calcMaxPageNum, onlyDate } from '../../utils/utils';
import { LoadingComponent, Pagination, ContractLink, SortHolder } from '../../components/';

class ContractsPage extends Component {

  componentWillMount() {
    const { pathname } = this.props.url;
    if (pathname === '/contracts') {
      this.selectContractList()
    }

    const page = pathname.split("/")[2]
    if (!isNaN(page)) {
      this.selectContractList(page)
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
      this.selectContractList(page)
    }
  }

  selectContractList = (_page, _count) => {
    const { contracts } = this.props
    const page = _page || contracts.page
    const count = _count || contracts.count
    this.props.selectContractList({ page, count })
  }

  selectContractListByCount = (count) => {
    this.selectContractList(1, count)
  }

  selectContractListByPage = (page) => {
    this.props.history.push('/contracts/' + page);
  }

  render() {
    const { contracts } = this.props
    const { loading, data, page, totalData, count } = contracts;
    console.log(data)
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
                <span>A total of<em>{totalData}</em> verified contract source codes found</span>
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
                maxPageNum={calcMaxPageNum(totalData, count)}
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
