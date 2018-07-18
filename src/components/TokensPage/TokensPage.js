import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { convertNumberToText } from '../../utils/utils'
import { LoadingComponent, TokenLink } from '../../components'

class TokenListPage extends Component {
	constructor(props) {
		super(props)
		this.state = {
			value: ''
		}
	}

	componentWillMount() {
		this.props.tokenList({})
	}
	
	handleChange = (e) => {
		const { value } = e.target
		this.setState({ value })
	}

	render() {
		const { value } = this.state
		const { tokens } = this.props
		const { data, listSize, loading } = tokens
		const list = data.filter(token => {
			const { tokenName, symbol } = token
			const lowerValue = value.toLowerCase()
			return tokenName.toLowerCase().indexOf(lowerValue) !== -1 || symbol.toLowerCase().indexOf(lowerValue) !== -1}
		)
		return (
			<div className="content-wrap">
				<div className="screen0">
				{
					loading ?
					<LoadingComponent height='calc(100vh - 120px - 144px)' />
					:
					<div className="wrap-holder">
						<p className="title">Tokens</p>
						<div className="search-holder">
							<div className="search-group">
								<input type="text" className="txt-type-search" placeholder="Search for any ICX Token Name/Address"
									value={value}
									onChange={this.handleChange}
								/>
								<span><em className="img"></em></span>
							</div>
						</div>
						<div className="contents tokens">
							<p className="txt cont">
								<span>iCON Tokens Market Capitalization Sorted by MarketCap value in DESC Order</span>
								<span>A total of<em>{listSize} ICX Token</em> Contracts found<em>(Sorted by MarketCap value in DESC Order)</em></span>
							</p>
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
										const { tokenName, symbol, price, changeVal, volume, marketCap, contractAddr, overview } = token
										const { usd, icx, btc, eth } = price || {}
										const _changeVal = changeVal || 0
										const className = _changeVal > 0 ? 'red' : _changeVal < 0 ? 'blue' : ''
										const sign = _changeVal > 0 ? '+' : _changeVal < 0 ? '-' : ''
										return (
											<tr key={index}>
												<td>{index + 1}</td>
												<td><TokenLink label={`${tokenName} (${symbol})`} to={contractAddr}/></td>
												<td>
													<p>{convertNumberToText(usd, 'usd') || '-'}<em>USD</em></p>
													<p>{convertNumberToText(icx, 'icx') || '-'}<em>ICX</em></p>
													<p>{convertNumberToText(btc, 'icx')  || '-'}<em>BTC</em></p>
													<p>{convertNumberToText(eth, 'icx')  || '-'}<em>ETH</em></p>
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
						</div>
					</div>
				}
				</div>
			</div>
		);
	}
}

export default withRouter(TokenListPage);
