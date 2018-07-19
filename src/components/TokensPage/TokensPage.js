import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {
	convertNumberToText
} from '../../utils/utils'
import {
	NoBox,
	LoadingComponent,
	TokenLink
} from '../../components'

class TokensPage extends Component {

	constructor(props) {
		super(props)
		this.state = {
			search: ''
		}
	}

	componentWillMount() {
		this.props.tokenList({})
	}

	handleChange = (e) => {
		const { name, value } = e.target
		this.setState({ [name]: value })
	}

	handleKeyDown = (e) => {
		if (e.keyCode === 27) {
			const { name } = e.target
			this.setState({ [name]: '' })
		}
	}

	render() {
		const { search } = this.state
		const { tokens } = this.props
		const { data, listSize, loading } = tokens
		const list = data.filter(token => {
			const { tokenName, symbol } = token
			const lowerSearch = search.toLowerCase()
			return tokenName.toLowerCase().indexOf(lowerSearch) !== -1 || symbol.toLowerCase().indexOf(lowerSearch) !== -1
		})

		const TableContent = () => {
			if (list.length === 0) {
				return <NoBox text='No Data' />
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
								list.map((token, index) => {
									const { tokenName, symbol, price, changeVal, volume, marketCap, contractAddr } = token
									const { usd, icx, btc, eth } = price || {}
									const _changeVal = changeVal || 0
									const className = _changeVal > 0 ? 'red' : _changeVal < 0 ? 'blue' : ''
									const sign = _changeVal > 0 ? '+' : _changeVal < 0 ? '-' : ''
									return (
										<tr key={index}>
											<td>{index + 1}</td>
											<td><TokenLink label={`${tokenName} (${symbol})`} to={contractAddr} /></td>
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
							<div className="search-holder">
								<div className="search-group">
									<input name="search" type="text" className="txt-type-search" placeholder="Search for any ICX Token Name/Address"
										value={search}
										onChange={this.handleChange}
										onKeyDown={this.handleKeyDown}
									/>
									<span><em className="img"></em></span>
								</div>
							</div>
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
