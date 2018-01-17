import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { dateToUTC9, numberWithCommas, convertNumberToText } from '../../utils/utils';
import { LoadingComponent, Pagination, WalletLink } from '../../components/';

class AddressesPage extends Component {

  constructor(props) {
    super(props);
    this.state = {}
    this.pageId = this.props.match.params.pageId;
  }

  componentWillMount() {
    this.props.getAddresses(this.pageId);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.url.pathname !== this.props.url.pathname) {
      nextProps.getAddresses(nextProps.url.pathname.split("/")[2]);
    }
  }

  getAddressesData = (pageId) => {
    this.props.history.push('/wallets/' + pageId);
  }

  render() {
    const { loading, data, pageNum, getAddresses, maxPageNum } = this.props;
    return (
      <div className="content-wrap">
				<div className="screen0">
					<div className="wrap-holder">
						<p className="title">Addresses List</p>
            {
              loading ?
              <div style={{height: '400px'}}>
                <LoadingComponent />
              </div>
              :
              <div className="contents">
  							<table className="table-typeA link-in-table">
  								<thead>
  									<tr>
  										<th>Address</th>
  										<th>ICX Balance<em className="img"></em></th>
  										<th>ICX USD Value</th>
  										<th>Percentage<em>%</em></th>
  										<th>No of Tx</th>
  										<th>Node type</th>
  									</tr>
  								</thead>
  								<tbody>
                  {
                    data.map((row) => (
                      <TableRow key={row.address} data={row}/>
                    ))
                  }
  								</tbody>
  							</table>

                <Pagination
                  pageNum={pageNum}
                  maxPageNum={maxPageNum}
                  getData={this.getAddressesData}
                />
  						</div>
            }
					</div>
				</div>
			</div>
    );
  }
}

const TableRow = ({data}) => {
  return (
    <tr>
      <td className="on"><WalletLink to={data.address}/></td>
      <td><span>{convertNumberToText(data.balance, 'icx')}</span><em>ICX</em></td>
      <td><span>{convertNumberToText(data.icxUsd, 'usd')}</span><em>USD</em></td>
      <td><span>{data.percentage}</span><em>%</em></td>
      <td>{numberWithCommas(data.txCount)}</td>
      <td>{data.nodeType}</td>
    </tr>
  )
}

export default AddressesPage;
