import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import TxPageTitle from './TxPageTitle'
import {
	TxTableBody,
	TxTableHead,
	LoadingComponent,
	Pagination,
	SortHolder,
	NoBox
} from 'components';
import {
	TX_TYPE,
	TX_TYPE_DATA
} from 'utils/const'
import {
	calcMaxPageNum,
} from 'utils/utils';

class TxPage extends Component {

	constructor(props) {
		super(props);
		this.txType = ''
		this.urlIndex = ''
		this.pageId = 1
		this.getTxList = () => {}
	}

	componentWillMount() {
		this.setInitialData(this.props.url.pathname, 20)
	}

	componentWillReceiveProps(nextProps) {
		const current = this.props.url.pathname
		const next = nextProps.url.pathname
		if (current !== next) {
			this.setInitialData(next)
		}
	}

	setInitialData = (pathname, sort) => {
		this.getParams(pathname)
		this.getTxList = this.props[this.getTxTypeData()['getTxList']] || (() => { })
		const tx = this.props[this.getTxTypeData()['tx']] || {}
		const { count } = tx	
		this.getTxListByCount(sort || count)
	}

	getTxTypeData = () => {
		return TX_TYPE_DATA[this.txType] || {}
	}

	getParams = (pathname) => {
		this.txType = pathname.split("/")[1] || ''
		switch (this.txType) {
			case TX_TYPE.CONTRACT_TX:
			case TX_TYPE.CONTRACT_INTERNAL_TX:
			case TX_TYPE.CONTRACT_TOKEN_TX:
			case TX_TYPE.CONTRACT_EVENTS:
			case TX_TYPE.ADDRESS_TX:
			case TX_TYPE.ADDRESS_TOKEN_TX:
			case TX_TYPE.BLOCK_TX:
			case TX_TYPE.TOKEN_TX:
			case TX_TYPE.TOKEN_HOLDERS:
			case TX_TYPE.TRANSACTION_EVENTS:
			case TX_TYPE.TRANSACTION_INTERNAL_TX:
				this.urlIndex = pathname.split("/")[2] || ''
				this.pageId = pathname.split("/")[3] || 1
				break
			case TX_TYPE.BLOCKS:
			case TX_TYPE.ADDRESSES:
			case TX_TYPE.TRANSACTIONS:
			case TX_TYPE.TOKEN_TRANSFERS:
				this.pageId = pathname.split("/")[2] || 1
				break

			default:
		}
	}

	getTxListByCount = (count) => {
		switch (this.txType) {
			case TX_TYPE.CONTRACT_TX:
			case TX_TYPE.CONTRACT_INTERNAL_TX:
			case TX_TYPE.CONTRACT_TOKEN_TX:
			case TX_TYPE.CONTRACT_EVENTS:
				this.getTxList({ addr: this.urlIndex, page: this.pageId, count })
				break
			case TX_TYPE.ADDRESS_TX:
			case TX_TYPE.ADDRESS_TOKEN_TX:
				this.getTxList({ address: this.urlIndex, page: this.pageId, count })
				break
			case TX_TYPE.BLOCK_TX:
				this.getTxList({ height: this.urlIndex, page: this.pageId, count })
				break
			case TX_TYPE.TOKEN_TX:
			case TX_TYPE.TOKEN_HOLDERS:
				this.getTxList({ contractAddr: this.urlIndex, page: this.pageId, count })
				break
			case TX_TYPE.BLOCKS:
			case TX_TYPE.ADDRESSES:
			case TX_TYPE.TRANSACTIONS:
			case TX_TYPE.TOKEN_TRANSFERS:
				this.getTxList({ page: this.pageId, count })
				break
			case TX_TYPE.TRANSACTION_EVENTS:
			case TX_TYPE.TRANSACTION_INTERNAL_TX:
				this.getTxList({ txHash: this.urlIndex, page: this.pageId, count })
				break

			default:
		}
	}

	getTxListByPage = (page) => {
		switch (this.txType) {
			case TX_TYPE.CONTRACT_TX:
			case TX_TYPE.CONTRACT_INTERNAL_TX:
			case TX_TYPE.CONTRACT_TOKEN_TX:
			case TX_TYPE.CONTRACT_EVENTS:
			case TX_TYPE.ADDRESS_TX:
			case TX_TYPE.ADDRESS_TOKEN_TX:
			case TX_TYPE.BLOCK_TX:
			case TX_TYPE.TOKEN_TX:
			case TX_TYPE.TOKEN_HOLDERS:
			case TX_TYPE.TRANSACTION_EVENTS:
			case TX_TYPE.TRANSACTION_INTERNAL_TX:
				this.props.history.push(`/${this.txType}/${this.urlIndex}/${page}`);
				break
			case TX_TYPE.BLOCKS:
			case TX_TYPE.ADDRESSES:
			case TX_TYPE.TRANSACTIONS:
			case TX_TYPE.TOKEN_TRANSFERS:
				this.props.history.push(`/${this.txType}/${page}`);
				break

			default:
		}
	}

	render() {
		const tx = this.props[this.getTxTypeData()['tx']] || {}
		const className = this.getTxTypeData()['className'] || ''
		const noBoxText = this.getTxTypeData()['noBoxText'] || ''
		const {
			loading,
			page,
			count,
			data,
			listSize,
			totalSize
		} = tx;
		const noData = !data || data.length === 0
		const TableContent = () => {
			if (noData) {
				return <NoBox text={noBoxText} />
			}
			else {
				return ([
					<table key='table' className={className}>
						<thead>
							<TxTableHead txType={this.txType}/>
						</thead>
						<tbody>
							{
								data.map((item, index) => (
									<TxTableBody key={index} data={item} txType={this.txType} address={this.urlIndex}/>
								))
							}
						</tbody>
					</table >,
					<SortHolder
						key='SortHolder'
						count={count}
						getData={this.getTxListByCount}
					/>,
					<Pagination
						key='Pagination'
						pageNum={page}
						maxPageNum={calcMaxPageNum(listSize, count)}
						getData={this.getTxListByPage}
					/>
				])
			}
		}

		const Content = () => {
			if (loading) {
				return <LoadingComponent height='calc(100vh - 120px - 144px)' />
			}
			else {
				return (
					<div className="screen0">
						<div className={`wrap-holder`}>
							<TxPageTitle
								txType={this.txType}
								urlIndex={this.urlIndex}
								listSize={listSize}
								totalSize={totalSize}
							/>
							<div className="contents">
								{TableContent()}
							</div>
						</div>
					</div>
				)
			}
		}

		return (
			<div className="content-wrap">
				{Content()}
			</div>
		);
	}
}

export default withRouter(TxPage);
