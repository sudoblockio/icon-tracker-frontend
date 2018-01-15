import React, { Component } from 'react';
import moment from 'moment';
import { withRouter } from 'react-router-dom';
import { LoadingComponent, Pagination } from '../../components/';
import { dateToUTC9, convertNumberToText } from '../../utils/utils';

class BlockDetailPage extends Component {

  constructor(props) {
    super(props);
    this.state = {}
  }

  componentWillMount() {
    this.props.getBlocks();
  }

  render() {
    const { loading, data, pageNum, getBlocks, totalNum } = this.props;
    return (
      <div className="content-wrap">
				<div className="screen0">
					<div className="wrap-holder">
						<p className="title">Block Detail</p>
						<div className="contents">
							<table className="table-typeB detail">
								<thead>
									<tr>
										<th>Address</th>
										<th>value</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td>Address</td>
										<td><p className="prev"><em className="img"></em></p><em className="value">99999</em><p className="next"><em className="img"></em></p></td>
									</tr>

									<tr>
										<td>Time</td>
										<td>2017-12-14 01:53:49 (UTC+9)</td>
									</tr>
									<tr>
										<td>C-rep</td>
										<td><span>0x45ab5ce7aa91dae22384938c3bcf0a4548548bb78717c34fa04ce339c5b43460</span></td>
									</tr>
									<tr>
										<td>No of Txns</td>
										<td>21111</td>
									</tr>
									<tr>
										<td>Hash</td>
										<td>0x45ab5ce7aa91dae22384938c3bcf0a4548548bb78717c34fa04ce339c5b43460</td>
									</tr>
									<tr>
										<td>Prev Hash</td>
										<td><span>0x45ab5ce7aa91dae22384938c3bcf0a4548548bb78717c34fa04ce339c5b43460</span></td>
									</tr>
									<tr>
										<td>Block size</td>
										<td>37,975 bytes</td>
									</tr>
									<tr>
										<td>Amount</td>
										<td>100.000005 ICX</td>
									</tr>
									<tr>
										<td>Fee</td>
										<td>0.1 ICX</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
				</div>
				<div className="screen1">
					<div className="wrap-holder">
						<p className="title">Transactions in The Block</p>
						<div className="contents">
							<table className="table-typeD">
								<thead>
									<tr>
										<th>Tx Hash</th>
										<th>From</th>
										<th>To</th>
										<th>Amount</th>
										<th>Fee</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td className="on break">0x45ab5ce7aa9idae22384938c3bcf0a4548548bb787</td>
										<td className="on break">0xB704eC3E412910C97d120424f5De0e7b63b2c04E</td>
										<td className="on break">0xB704eC3E412910C97d120424f5De0e7b63b2c04E</td>
										<td><span>20000000.01</span><em>ICX</em></td>
										<td><span>20.1</span><em>ICX</em></td>
									</tr>
									<tr>
										<td className="on break">0x45ab5ce7aa9idae22384938c3bcf0a4548548bb787</td>
										<td className="on break">0xB704eC3E412910C97d120424f5De0e7b63b2c04E</td>
										<td className="on break">0xB704eC3E412910C97d120424f5De0e7b63b2c04E</td>
										<td><span>2000.01</span><em>ICX</em></td>
										<td><span>2.1</span><em>ICX</em></td>
									</tr>
									<tr>
										<td className="on break">0x45ab5ce7aa9idae22384938c3bcf0a4548548bb787</td>
										<td className="on break">0xB704eC3E412910C97d120424f5De0e7b63b2c04E</td>
										<td className="on break">0xB704eC3E412910C97d120424f5De0e7b63b2c04E</td>
										<td><span>2000.01</span><em>ICX</em></td>
										<td><span>0.1</span><em>ICX</em></td>
									</tr>
									<tr>
										<td className="on break">0x45ab5ce7aa9idae22384938c3bcf0a4548548bb787</td>
										<td className="on break">0xB704eC3E412910C97d120424f5De0e7b63b2c04E</td>
										<td className="on break">0xB704eC3E412910C97d120424f5De0e7b63b2c04E</td>
										<td><span>2000.01</span><em>ICX</em></td>
										<td className="no"><span>-</span></td>
									</tr>
								</tbody>
							</table>
							<table className="table-typeD">
								<thead>
									<tr>
										<th>Tx Hash</th>
										<th>From</th>
										<th>To</th>
										<th>Amount</th>
										<th>Fee</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td colspan="5" className="notrans">No transactions in this block</td>
									</tr>
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
									<input type="text" className="txt-type-page" placeholder="" value="" /> / 10000
								</li>
								<li>
									<span className="next"><em className="img"></em></span>
								</li>
								<li>
									<span className="end"><em className="img"></em></span>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
    );
  }
}

const TableRow = ({data}) => {
  return (
    <tr>
      <td>{data.height}</td>
      <td>{dateToUTC9(data.createDate)}</td>
      <td>{data.txCount}</td>
      <td className="break">{data.crep}</td>
      <td><span>{convertNumberToText(data.amount, 'icx')}</span><em>ICX</em></td>
      <td><span>{convertNumberToText(data.fee, 'icx')}</span><em>ICX</em></td>
    </tr>
  )
}

export default withRouter(BlockDetailPage);
