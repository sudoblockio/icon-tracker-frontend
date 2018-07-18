import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { LoadingComponent, Pagination, BlockLink, WalletLink, TransactionLink, SortHolder } from '../../components/';
import { dateToUTC, convertNumberToText, numberWithCommas, startsWith, getUTCString } from '../../utils/utils';

// TODO 
// 아래는 코드는 더이상 쓰지 않음
// TxPage 래핑 하는 형태로 정리 필요
class TransactionsPage extends Component {

	constructor(props) {
		super(props);
		this.state = {}
	}

	componentWillMount() {
		const { pathname } = this.props.url;
		if (pathname === '/transactions') this.props.transactionTxDetails()

		const page = pathname.split("/")[2]
		if (!isNaN(page)) this.props.transactionTxDetails(page);
		else this.props.history.push('/transactions');
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.url.pathname !== this.props.url.pathname && startsWith(nextProps.url.pathname, '/transactions')) {
			nextProps.transactionTxDetails(nextProps.url.pathname.split("/")[2]);
		}
	}

	transactionTxDetailsData = (pageId) => {
		this.props.history.push('/transactions/' + pageId);
	}

	render() {
		const { loading, data, pageNum, maxPageNum, listSize } = this.props;
		const utcLabel = `(${getUTCString()})`
		return (
			<div className="content-wrap">
				<div className="screen0">
					<div className="wrap-holder">
						{
							!loading && 
							<p className="title">
								Transactions
								<span className="right"><em>{listSize}</em> Total Transactions</span>
							</p>
						}
						{
							// TODO 상위로 옮기기
							loading ?
							<div style={{height: 'calc(100vh - 120px - 144px)'}}>
								<LoadingComponent />
							</div>
							:
							<div className="contents">
								<table className="table-typeC">
									<thead>
										<tr>
											<th>Tx Hash</th>
											<th>Block</th>
											<th>Time Stamp<em>{utcLabel}</em></th>
											<th>From</th>
											<th className="table-sign"></th>
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
								
								<SortHolder />

								<Pagination
									pageNum={pageNum}
									maxPageNum={maxPageNum}
									getData={this.transactionTxDetailsData} 
								/>
							</div>
						}
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
				<td className="on"><span className="ellipsis"><TransactionLink to={data.txHash}/></span></td>
				<td><BlockLink to={data.height} label={numberWithCommas(data.height)} /></td>
				<td>{dateToUTC(data.createDate)}</td>
				<td className="on"><span className="ellipsis"><WalletLink to={data.fromAddr}/></span></td>
				<td className="table-sign"><i className="img"></i></td>
				<td className="on"><span className="ellipsis"><WalletLink to={data.toAddr}/></span></td>
				<td><span>{`${convertNumberToText(data.amount, 'icx')}`}</span><em>ICX</em></td>
				<td><span>{`${convertNumberToText(data.fee, 'icx')}`}</span><em>ICX</em></td>
			</tr>
		);
	}
}

export default withRouter(TransactionsPage);
