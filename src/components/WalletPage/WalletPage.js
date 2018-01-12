import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class WalletPage extends Component {

  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <div className="content-wrap">
				<div className="screen0">
					<div className="wrap-holder">
						<p className="title">Wallet Information</p>
						<div className="contents">
							<table className="table-typeB address">
								<thead>
									<tr>
										<th>Address</th>
										<th>value</th>
									</tr>
								</thead>
								<tbody>
									<tr className="">
										<td>Address</td>
										<td>0xB704eC3E412910C97d120424f5De0e7b63b2c04E <em className="img"></em><span className="crep">C-rep Node</span></td>
									</tr>
									<tr>
										<td>Balance</td>
										<td>0.1234 ICX<em className="img"></em><span>11 USD</span></td>
									</tr>
									<tr>
										<td>No of Txns</td>
										<td>999,999,999,999</td>
									</tr>

								</tbody>
							</table>

						</div>

					</div>
				</div>
				<div className="screen1">
					<div className="wrap-holder">
						<p className="title">Transaction List</p>
						<div className="contents">
							<table className="table-typeC">
								<thead>
									<tr>
										<th>Tx Hash</th>
										<th>Block</th>
										<th>Time Stamp<em>(UTC+9)</em></th>
										<th>From</th>
										<th>To</th>
										<th>Amount</th>
										<th>Fee</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td className="on break">0x45ab5ce7aa9idae22384938c3bcf0a4548548bb787</td>
										<td className="on">999999</td>
										<td>2017-12-14 01:53:49</td>
										<td className="break">0xB704eC3E412910C97d120424f5De0e7b63b2c04E</td>
										<td className="break">0xB704eC3E412910C97d120424f5De0e7b63b2c04E</td>
										<td><span>2000.000001</span><em>ICX</em></td>
										<td><span>20.1</span><em>ICX</em></td>
									</tr>
									<tr>
										<td className="on break">0x45ab5ce7aa9idae22384938c3bcf0a4548548bb787</td>
										<td className="on">999999</td>
										<td className="break">2017-12-14 01:53:49</td>
										<td className="break">0xB704eC3E412910C97d120424f5De0e7b63b2c04E</td>
										<td className="on break">0xB704eC3E412910C97d120424f5De0e7b63b2c04E</td>
										<td><span>2000.01</span><em>ICX</em></td>
										<td><span>20.1</span><em>ICX</em></td>
									</tr>
									<tr>
										<td className="on break">0x45ab5ce7aa9idae22384938c3bcf0a4548548bb787</td>
										<td className="on">999999</td>
										<td>2017-12-14 01:53:49</td>
										<td className="on break no">-</td>
										<td className="break no">-</td>
										<td><span>200001</span><em>ICX</em></td>
										<td className="no"><span>-</span></td>
									</tr>
									<tr>
										<td className="on break">0x45ab5ce7aa9idae22384938c3bcf0a4548548bb787</td>
										<td className="on">999999</td>
										<td>2017-12-14 01:53:49</td>
										<td className="on break">0xB704eC3E412910C97d120424f5De0e7b63b2c04E</td>
										<td className="on break">0xB704eC3E412910C97d120424f5De0e7b63b2c04E</td>
										<td><span>201</span><em>ICX</em></td>
										<td><span>20.1</span><em>ICX</em></td>
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

					</div>
				</div>

			</div>
    );
  }
}

export default withRouter(WalletPage);
