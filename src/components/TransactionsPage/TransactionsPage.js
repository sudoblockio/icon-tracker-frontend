import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { LoadingComponent, Pagination, BlockLink, WalletLink, TransactionLink } from '../../components/';
import { dateToUTC, convertNumberToText, numberWithCommas, startsWith, getUTCString } from '../../utils/utils';

class TransactionsPage extends Component {

	constructor(props) {
		super(props);
		this.state = {}
	}

	componentWillMount() {
		const { params } = this.props.match;
		this.props.getTransactions(params['pageId']);
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.url.pathname !== this.props.url.pathname && startsWith(nextProps.url.pathname, '/transactions/') ) {
			nextProps.getTransactions(nextProps.url.pathname.split("/")[2]);
		}
	}

	getTransactionsData = (pageId) => {
		this.props.history.push('/transactions/' + pageId);
	}

	render() {
		const { loading, data, pageNum, maxPageNum } = this.props;
		const utcLabel = `(${getUTCString()})`
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
													<th>Time Stamp<em>{utcLabel}</em></th>
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
								maxPageNum={maxPageNum}
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
				<td className="on break"><TransactionLink to = {data.txHash}/></td>
				<td><BlockLink to={data.height} label={numberWithCommas(data.height)}/></td>
				<td>{dateToUTC(data.createDate)}</td>
				<td className="break"><WalletLink to = {data.fromAddr}/></td>
				<td className="break"><WalletLink to = {data.toAddr}/></td>
				<td><span>{`${convertNumberToText(data.amount, 'icx')}`}</span><em>ICX</em></td>
				<td><span>{`${convertNumberToText(data.fee, 'icx')}`}</span><em>ICX</em></td>
			</tr>
		);
	}
}

export default withRouter(TransactionsPage);
