import React, { Component } from 'react';
import moment from 'moment';
import { withRouter } from 'react-router-dom';
import { LoadingComponent, Pagination } from '../../components/';
import { dateToUTC9, convertNumberToText } from '../../utils/utils';

class TransactionsPage extends Component {

	constructor(props) {
		super(props);
		this.state = {}
	}

	componentWillMount() {
		const { params } = this.props.match;
		this.props.getTransactions(params['pageId']);
	}

	render() {
		const { loading, data, pageNum, getTransactions, maxPageNum } = this.props;
		return (
			<div className="content-wrap">
				<div className="screen0">
					<div className="wrap-holder">
						<p className="title">Recent Transactions</p>
						<div className="contents">
							{
								loading ? (
									<div style={{ height: '600px' }}>
										<LoadingComponent />
									</div>
								) : (
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
												{
													data.map((row) => (
														<TableRow
															key={row.txHash}
															data={row}
														/>
													))
												}
											</tbody>
										</table>
									)
							}

							{<Pagination
								pageNum={pageNum}
								getData={this.getTransactionsData} />}
						</div>

					</div>
				</div>


			</div>
		);
	}
}

class TableRow extends Component {

	constructor(props) {
		super(props);
		this.state = {}
	}

	render() {
		const { data } = this.props;
		return (
			<tr>
				<td className="on break">{data.txHash}</td>
				<td>{data.height}</td>
				<td>{dateToUTC9(data.createDate)}</td>
				<td className="break">{data.fromAddr}</td>
				<td className="break">{data.toAddr}</td>
				<td><span>{data.amount}</span><em>ICX</em></td>
				<td><span>{data.fee}</span><em>ICX</em></td>
			</tr>
		);
	}
}

export default withRouter(TransactionsPage);
