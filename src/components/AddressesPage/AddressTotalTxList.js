import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { LoadingComponent, Pagination, SortHolder, AddressTableRow } from '../../components/';
import { getUTCString, calcMaxPageNum, startsWith } from '../../utils/utils';
import { runInThisContext } from 'vm';

class AddressTotalTxList extends Component {

	constructor(props) {
		super(props);
		this.txType = ''
		this.urlIndex = ''
		this.totalTxList = () => {}
	}

	componentWillMount() {
		this.initPageType(this.props.url.pathname)
	}

	componentWillReceiveProps(nextProps) {
		const current = this.props.url.pathname
		const next = nextProps.url.pathname
		if (current !== next) {
			this.initPageType(next)
		}
	}

	initPageType = (pathname) => {
		this.txType = pathname.split("/")[1]
		this.urlIndex = pathname.split("/")[2]
		switch(this.txType) {
			case 'addresstx':
				this.totalTxList = this.props.addressTxList	
				break
			case 'addresstokentx':
				this.totalTxList = this.props.addressTokenTxList	
				break			
			case 'blocktx':
				this.totalTxList = this.props.blockTxList	
				break
			case 'transactions':
				this.totalTxList = this.props.transactionRecentTx	
				break
			case 'tokentransfers':
				this.totalTxList = this.props.tokenGetTokenTransferList	
				break
			default:
				this.totalTxList = () => {}	
		}
		
		this.getTotalTxList(pathname, 20)
	}

	getTotalTxList = (pathname, count) => {
		let page
		switch(this.txType) {
			case 'addresstx':
			case 'addresstokentx':
				page = pathname.split("/")[3] || 1
				const address = pathname.split("/")[2]
				this.totalTxList({ address, page, count })
				break	
			case 'blocktx':
				page = pathname.split("/")[3] || 1
				const height = pathname.split("/")[2]
				this.totalTxList({ height, page, count })
				break
			case 'transactions':
			case 'tokentransfers':
				page = pathname.split("/")[2] || 1
				this.totalTxList({ page, count })
				break
			default:
		}
	}

	getTotalTxListByCount = (count) => {
		this.getTotalTxList(this.props.url.pathname, count)
	}

	getTotalTxListByPage = (page) => {
		if (this.txType === 'transactions') {
			this.props.history.push(`/${this.txType}/${page}`);	
		}
		else {
			const index = this.props.url.pathname.split("/")[2]
			this.props.history.push(`/${this.txType}/${index}/${page}`);	
		}
	}

	getTx = (type) => {
		switch(type) {
			case 'addresstx':
				return this.props.walletTx
			case 'addresstokentx':
				return this.props.walletTokenTx
			case 'blocktx':
				return this.props.blockTx
			case 'transactions':
				return this.props.recentTx
			case 'tokentransfers':
				return this.props.recentTokenTx
			default:
				return {}
		}
	}

	render() {
		const tx = this.getTx(this.txType)
		const { loading, page, count, data, totalData } = tx;
		const _data = data || []
		const isBlockTx = this.txType === 'blocktx'
		const isTokenTx = this.txType === 'addresstokentx' || this.txType === 'tokentransfers'
		const noTx = _data.length === 0
		const utcLabel = `(${getUTCString()})`
		return (
			<div className="content-wrap">
				<div className="screen0">
				{
					loading ?
					<div style={{height: 'calc(100vh - 120px - 144px)'}}>
						<LoadingComponent />
					</div>
					:
					<div className="wrap-holder">
						<Header txType={this.txType} urlIndex={this.urlIndex} totalData={totalData} />
						<div className="contents">		
						{
							noTx &&
							<table className="table-type">
								<tbody>
									<tr>
										<td colSpan="7" className="notrans">No Transaction</td>
									</tr>
								</tbody>
							</table>
						}
						{
							!noTx &&
							<table className={`table-type${isBlockTx ? 'D' : 'C'}`}>
								<thead>
									<tr>
										<th>Tx Hash</th>
										{!isBlockTx && <th>Block</th>}
										{!isBlockTx && <th>Time Stamp<em>{utcLabel}</em></th>}
										<th>From</th>
										<th className="table-sign"></th>
										<th>To</th>
										<th>{isTokenTx ? 'Quantity' : 'Amount'}</th>
										<th>{isTokenTx ? 'Token' : 'TxFee'}</th>
									</tr>
								</thead>
								<tbody>
								{
									_data.map((row) => (
										<AddressTableRow key={row.txHash} data={row} address={this.urlIndex} txType={this.txType}/>
									))
								}
								</tbody>
							</table>
						}							
						{
							!noTx &&
							<SortHolder
								count={count}
								getData={this.getTotalTxListByCount}
							/>
						}
						{
							!noTx &&
							<Pagination
								pageNum={page}
								maxPageNum={calcMaxPageNum(totalData, count)}
								getData={this.getTotalTxListByPage} 
							/>
						}
						</div>
					</div>					
				}				
				</div>
			</div>
		);
	}
}

const Header = ({txType, urlIndex, totalData}) => {
	switch(txType) {
		case 'addresstx':
			return (
				<p className="title">Transactions
					<span>for Address {urlIndex}</span>
					<span className="right">A total of<em>{totalData}</em> Total transactions</span>
				</p>
			)
		case 'addresstokentx':
			return (
				<p className="title">Token Transfers
					<span>for Address {urlIndex}</span>
					<span className="right">A total of<em>{totalData}</em> Token transfers found</span>
				</p>
			)
		case 'blocktx':
			return (
				<p className="title">Transactions
					<span>for Block Height {urlIndex}</span>
					<span className="right">A total of<em>{totalData}</em> Token transactions</span>
				</p>
			)
		case 'transactions':
			return (
				<p className="title">Transactions
					<span></span>
					<span className="right">A total of<em>{totalData}</em> Token transactions</span>
				</p>
			)
		case 'tokentransfers':
			return (
				<p className="title">Token Transfers
					<span></span>
					<span className="right">A total of<em>{totalData}</em> Token transfers found</span>
				</p>
			)
		default:
			return <p></p>
	}
}

export default withRouter(AddressTotalTxList);
