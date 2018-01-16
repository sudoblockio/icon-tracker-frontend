import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { dateToUTC9, numberWithCommas, convertNumberToText } from '../../utils/utils';
import { LoadingComponent, Pagination } from '../../components/';

class AddressesPage extends Component {

  constructor(props) {
    super(props);
    this.state = {}
    this.pageId = this.props.match.params.pageId;
  }

  componentWillMount() {
    this.props.getAddresses();
  }

  render() {
    const { loading, data, pageNum, getAddresses } = this.props;
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
  							<table className="table-typeA">
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
                      <TableRow key={row.address} data={row} />
                    ))
                  }
  								</tbody>
  							</table>

  							<ul className="page">
  								<li>
  									<span className="start"><em className="img"></em></span>
  								</li>
  								<li>
  									<span className="prev"><em className="img"></em></span>
  								</li>
  								<li className="pageNum">
  									<p>Page</p>
  									<input type="text" className="txt-type-page" placeholder="" value=""/> / 10000
  								</li>
  								<li>
  									<span className="next"><em className="img"></em></span>
  								</li>
  								<li>
  									<span className="end"><em className="img"></em></span>
  								</li>
  							</ul>
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
      <td className="on"><Link to={`/wallet/${data.address}/1`}>{data.address}</Link></td>
      <td><span>{convertNumberToText(data.balance, 'icx')}</span><em>ICX</em></td>
      <td><span>{convertNumberToText(data.icxUsd, 'usd')}</span><em>USD</em></td>
      <td><span>{data.percentage}</span><em>%</em></td>
      <td>{numberWithCommas(data.txCount)}</td>
      <td>{data.nodeType}</td>
    </tr>
  )
}

export default withRouter(AddressesPage);
