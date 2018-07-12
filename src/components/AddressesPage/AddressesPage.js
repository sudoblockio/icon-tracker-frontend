import React, { Component } from 'react';
import { numberWithCommas, convertNumberToText, startsWith } from '../../utils/utils';
import { LoadingComponent, Pagination, WalletLink, SortHolder } from '../../components/';

class AddressesPage extends Component {

  constructor(props) {
    super(props);
    this.state = {}
  }

  componentWillMount() {
    const { pathname } = this.props.url;
    if (pathname === '/addresses') this.props.getAddresses()

    const page = pathname.split("/")[2]
    if (!isNaN(page)) this.props.getAddresses(page);
    else this.props.history.push('/addresses');
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.url.pathname !== this.props.url.pathname && startsWith(nextProps.url.pathname, '/addresses')) {
      nextProps.getAddresses(nextProps.url.pathname.split("/")[2]);
    }
  }

  getAddressesData = (pageId) => {
    this.props.history.push('/addresses/' + pageId);
  }

  render() {
    const { loading, data, pageNum, maxPageNum } = this.props;
    return (
      <div className="content-wrap">
				<div className="screen0">
					<div className="wrap-holder">
						{!loading && <p className="title">Addresses</p>}
            {
              loading ?
              <div style={{height: 'calc(100vh - 120px - 144px)'}}>
                <LoadingComponent />
              </div>
              :
              <div className="contents">
  							<table className="table-typeA">
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
                    data.map((row) => (
                      <TableRow key={row.address} data={row}/>
                    ))
                  }
  								</tbody>
  							</table>

                <SortHolder />
                
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
      <td className="on"><span className="ellipsis"><WalletLink to={data.address}/></span></td>
      <td><span>{convertNumberToText(data.balance, 'icx')}</span><em>ICX</em></td>
      <td><span>{convertNumberToText(data.icxUsd, 'usd')}</span><em>USD</em></td>
      <td><span>{data.percentage}</span><em>%</em></td>
      <td>{numberWithCommas(data.txCount)}</td>
      <td>{data.nodeType}</td>
    </tr>
  )
}

export default AddressesPage;
