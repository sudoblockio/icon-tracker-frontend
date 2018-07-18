import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { LoadingComponent, Pagination, SortHolder, AddressTableBody, AddressTableHead, NoBox } from '../../components/';
import { calcMaxPageNum } from '../../utils/utils';
import { TX_TYPE } from '../../utils/const'

const TxTypeSelector = {
	[TX_TYPE.ADDRESS_TX]: {
		tx: 'walletTx',
		getTxList: 'addressTxList',
		className: 'table-typeA'
	},
	[TX_TYPE.ADDRESS_TOKEN_TX]: {
		tx: 'walletTokenTx',
		getTxList: 'addressTokenTxList',
		className: 'table-typeC token'	
	},
	[TX_TYPE.BLOCK_TX]: {
		tx: 'blockTx',
		getTxList: 'blockTxList',
		className: 'table-typeD'
	},
	[TX_TYPE.TRANSACTIONS]: {
		tx: 'recentTx',
		getTxList: 'transactionRecentTx',
		className: 'table-typeJ'
	},
	[TX_TYPE.TOKEN_TRANSFERS]: {
		tx: 'recentTokenTx',
		getTxList: 'tokenTxList',
		className: 'table-typeN'
	},
	[TX_TYPE.TOKEN_TX]: {
		tx: 'tokenTransfers',
		getTxList: 'tokenGetTokenTransfers',
		className: 'table-typeF'
	},
	[TX_TYPE.TOKEN_HOLDERS]: {
		tx: 'tokenHolders',
		getTxList: 'tokenGetTokenHolders',
		className: 'table-typeG'
	}
}

class AddressTotalTxList extends Component {

	constructor(props) {
		super(props);
		
		this.txType = ''
		this.urlIndex = ''
		this.pageId = 1
		this.getTxList = () => {}
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
		this.urlIndex = pathname.split("/")[2] || ''
		this.pageId = pathname.split("/")[3] || 1
		this.getTxList = this.props[this.getTxTypeSelector()['getTxList']] || (()=>{})
		this.getTotalTxList(pathname, 20)
	}

	getTxTypeSelector = () => {
		return TxTypeSelector[this.txType] || {}
	}

	getTotalTxList = (pathname, count) => {
		let page
		switch(this.txType) {
			case TX_TYPE.ADDRESS_TX:
			case TX_TYPE.ADDRESS_TOKEN_TX:
				page = pathname.split("/")[3] || 1
				const address = pathname.split("/")[2]
				this.getTxList({ address, page, count })
				break	
			case TX_TYPE.BLOCK_TX:
				page = pathname.split("/")[3] || 1
				const height = pathname.split("/")[2]
				this.getTxList({ height, page, count })
				break
			case TX_TYPE.TRANSACTIONS:
			case TX_TYPE.TOKEN_TRANSFERS:
				page = pathname.split("/")[2] || 1
				this.getTxList({ page, count })
				break
			case TX_TYPE.TOKEN_TX:
			case TX_TYPE.TOKEN_HOLDERS:
				page = pathname.split("/")[3] || 1
				const contractAddr = pathname.split("/")[2]
				this.getTxList({ contractAddr, page, count })
				break
			default:
		}
	}

	getTotalTxListByCount = (count) => {
		this.getTotalTxList(this.props.url.pathname, count)
	}

	getTotalTxListByPage = (page) => {
		switch(this.txType) {
			case TX_TYPE.ADDRESS_TX:
			case TX_TYPE.ADDRESS_TOKEN_TX:
			case TX_TYPE.BLOCK_TX:
			case TX_TYPE.TOKEN_TX:
			case TX_TYPE.TOKEN_HOLDERS:
				const index = this.props.url.pathname.split("/")[2]
				this.props.history.push(`/${this.txType}/${index}/${page}`);	
				break
			case TX_TYPE.TRANSACTIONS:
			case TX_TYPE.TOKEN_TRANSFERS:
				this.props.history.push(`/${this.txType}/${page}`);	
				break
			default:
		}
	}

	render() {
		const className = this.getTxTypeSelector()['className'] || ''
		const tx = this.props[this.getTxTypeSelector()['tx']] || {}
		const { loading, page, count, data, totalData } = tx;
		return (
			<div className="content-wrap">
				<div className="screen0">
				{
					loading ?
					<LoadingComponent height='calc(100vh - 120px - 144px)'/>
					:
					<div className="wrap-holder">
						<Header txType={this.txType} urlIndex={this.urlIndex} totalData={totalData} />
						{
							(!data || data.length === 0) ?
							<NoBox text={this.txType === TX_TYPE.TOKEN_HOLDERS ? 'No Holder' : 'No Transaction'}/>
							:
							<div className="contents">	
								<table className={className}>
									<thead>
										<AddressTableHead txType={this.txType}/>
									</thead>
									<tbody>
									{
										data.map(row => (
											<AddressTableBody key={row.txHash} data={row} address={this.urlIndex} txType={this.txType}/>
										))
									}
									</tbody>
								</table>
								<SortHolder
									count={count}
									getData={this.getTotalTxListByCount}
								/>
								<Pagination
									pageNum={page}
									maxPageNum={calcMaxPageNum(totalData, count)}
									getData={this.getTotalTxListByPage} 
								/>								
							</div>
						}
					</div>					
				}				
				</div>
			</div>
		);
	}
}

const Header = ({txType, urlIndex, totalData}) => {
	switch(txType) {
		case TX_TYPE.ADDRESS_TX:
			return (
				<p className="title">Transactions
					<span>for Address {urlIndex}</span>
					<span className="right">A total of<em>{totalData}</em> Total transactions</span>
				</p>
			)
		case TX_TYPE.ADDRESS_TOKEN_TX:
			return (
				<p className="title">Token Transfers
					<span>for Address {urlIndex}</span>
					<span className="right">A total of<em>{totalData}</em> Token transfers found</span>
				</p>
			)
		case TX_TYPE.BLOCK_TX:
			return (
				<p className="title">Transactions
					<span>for Block Height {urlIndex}</span>
					<span className="right">A total of<em>{totalData}</em> Token transactions</span>
				</p>
			)
		case TX_TYPE.TRANSACTIONS:
			return (
				<p className="title">Transactions
					<span></span>
					<span className="right">A total of<em>{totalData}</em> Token transactions</span>
				</p>
			)
		case TX_TYPE.TOKEN_TRANSFERS:
			return (
				<p className="title">Token Transfers
					<span></span>
					<span className="right">A total of<em>{totalData}</em> Token transfers found</span>
				</p>
			)
		case TX_TYPE.TOKEN_TX:
			return (
				<p className="title">Token Transfers
					<span>for Token Contract {urlIndex}</span>
					<span className="right">A total of<em>{totalData}</em> Token transfers found</span>
				</p>
			)
		case TX_TYPE.TOKEN_HOLDERS:
			return (
				<p className="title">Token Holders
					<span>for Token Contract {urlIndex}</span>
					<span className="right">A total of<em>{totalData}</em> Holders found</span>
				</p>
			)
		default:
			return <p></p>
	}
}

export default withRouter(AddressTotalTxList);
