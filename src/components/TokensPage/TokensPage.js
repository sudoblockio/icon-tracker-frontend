import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string'
import {
	convertNumberToText,
	tokenText,
	startsWith
} from '../../utils/utils'
import {
	NoBox,
	LoadingComponent,
	SearchInput
} from '../../components'

const ROUTE = '/tokens'

class TokensPage extends Component {

	constructor(props) {
		super(props)
		this.state = {
			searchKeyword: ''
		}
	}

	componentWillMount() {
		this.setInitialData(this.props.url)
	}

	componentWillReceiveProps(nextProps) {
		const { pathname: currentPath } = this.props.url
		const { pathname: nextPath } = nextProps.url
		if (currentPath !== nextPath && startsWith(nextPath, ROUTE)) {
			this.setInitialData(nextProps.url)
		}
		else {
			const { search: currentSearch } = this.props.url
			const { search: nextSearch } = nextProps.url
			if (currentSearch !== nextSearch) {
				this.setSearch(nextSearch)
			}
		}
	}

	setInitialData = (url) => {
		const { search } = url
		this.props.tokenList({})
		if (search) {
			this.setSearch(search)
		}
	}

	setSearch = (_search) => {
		const parsed = queryString.parse(_search)
		const { search } = parsed
		this.setState({ searchKeyword: search || '' }, () => {
			if (search) {
				this.props.tokenListSearch({ keyword: search })
			}
		})
	}

	changeSearch = (nextSearch) => {
		const { search } = this.state
		if (search === '' && nextSearch === '') return
		if (nextSearch) {
			this.props.history.push(`${ROUTE}?search=${nextSearch}`);
		}
		else {
			this.props.history.push(ROUTE);
		}
	}

	render() {
		const { searchKeyword } = this.state
		const { tokens, tokensSearch } = this.props
		const ListData = !searchKeyword ? tokens : tokensSearch
		const { data, listSize, loading } = ListData
		const noData = data.length === 0

		const TableContent = () => {
			if (noData) {
				return <NoBox text={searchKeyword ? 'No Data' : 'No Token'} />
			}
			else {
				return (
					<table className="table-typeI">
						<thead>
							<tr>
								<th>No.</th>
								<th>Token</th>
								<th>Price<span className="img"></span></th>
								<th>% Change</th>
								<th>Volume (24h)</th>
								<th>MarketCap</th>
							</tr>
						</thead>
						<tbody>
							{
								data.map((token, index) => {
									const { name, symbol, price, changeVal, volume, marketCap, contractAddr } = token
									const { usd, icx, btc, eth } = price || {}
									const _changeVal = changeVal || 0
									const className = _changeVal > 0 ? 'red' : _changeVal < 0 ? 'blue' : ''
									const sign = _changeVal > 0 ? '+' : _changeVal < 0 ? '-' : ''
									return (
										<tr key={index}>
											<td>{index + 1}</td>
											<td>{tokenText(name, symbol, contractAddr, true)}</td>
											<td>
												<p>{convertNumberToText(usd, 'usd') || '-'}<em>USD</em></p>
												<p>{convertNumberToText(icx, 'icx') || '-'}<em>ICX</em></p>
												<p>{convertNumberToText(btc, 'icx') || '-'}<em>BTC</em></p>
												<p>{convertNumberToText(eth, 'icx') || '-'}<em>ETH</em></p>
											</td>
											<td className={className}><span>{sign}{_changeVal || '-'}</span> %</td>
											<td>{convertNumberToText(volume, 'usd') || '-'}<em>USD</em></td>
											<td>{convertNumberToText(marketCap, 'usd') || '-'}<em>USD</em></td>
										</tr>
									)
								})
							}
						</tbody>
					</table>
				)
			}
		}
		const Content = () => {
			if (loading) {
				return <LoadingComponent height='calc(100vh - 120px - 144px)' />
			}
			else {
				return (
					<div className="screen0">
						<div className="wrap-holder">
							<p className="title">Tokens</p>

							<SearchInput
								id="sub-search-input"
								placeholder="Search for any ICX token name / address"
								searchKeyword={searchKeyword}
								changeSearch={this.changeSearch}
							/>
							<div className="contents tokens">
								<p className="txt cont">
									<span>iCON Tokens Market Capitalization Sorted by MarketCap value in DESC Order</span>
									<span>A total of<em>{listSize} ICX Token</em> Contracts found<em>(Sorted by MarketCap value in DESC Order)</em></span>
								</p>
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
		)
	}
}

export default withRouter(TokensPage);
