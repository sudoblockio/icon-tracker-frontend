import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { LoadingComponent, Pagination, SortHolder, AddressTableRow } from '../../components/';
import { getUTCString, calcMaxPageNum, startsWith } from '../../utils/utils';
import { runInThisContext } from 'vm';

class AddressTotalTxList extends Component {

	constructor(props) {
		super(props);
		this.txType = 'addresstx'
		this.totalTxList = this.props.addressTxList
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

	getName = (type) => {
		switch(type) {
			case 'addresstx':
			case 'blocktx':
			case 'transactions':
				return 'Transactions'
			case 'addresstokentx':
				return 'Token Transfers'
			default:
				return ''	
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
			default:
				return {}
		}
	}

	render() {
		// TODO 이거 정리
		const urlIndex = this.props.url.pathname.split("/")[2]
		const tx = this.getTx(this.txType)
		const { loading, page, count, data, totalData } = tx;
		const _data = data || []
		const isBlockTx = this.txType === 'blocktx'
		const isTokenTx = this.txType === 'addresstokentx'
		const isRecentTx = this.txType === 'transactions'
		const noTx = _data.length === 0
		const utcLabel = `(${getUTCString()})`
		return (
			<div className="content-wrap">
				<div className="screen0">
					<div className="wrap-holder">
					{
						!loading && 
						<p className="title">{this.getName(this.txType)}
							{!isRecentTx && <span>for {isBlockTx ? 'Block Height' : 'Address' } {urlIndex}</span>}
							<span className="right">{!isRecentTx && "A total of"}<em>{totalData}</em> {isTokenTx ? 'Token transfers found' : 'Total Transactions'}</span>
						</p>
					}
					{
						loading ?
						<div style={{height: 'calc(100vh - 120px - 144px)'}}>
							<LoadingComponent />
						</div>
						:
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
										<AddressTableRow key={row.txHash} data={row} address={urlIndex} txType={this.txType}/>
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
					}
					</div>
				</div>
			</div>
		);
	}
}

export default withRouter(AddressTotalTxList);
