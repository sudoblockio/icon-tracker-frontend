import React, { Component } from 'react';
import {
	convertNumberToText,
	numberWithCommas,
	tokenText,
	onlyDate,
} from 'utils/utils'
import {
	AddressLink,
	AmountCell
} from 'components'
import {
	CONTRACT_STATUS,
	SEARCH_TYPE
} from 'utils/const'

class SearchTableBody extends Component {
	render() {
		const TableRow = () => {
			const { searchType, data } = this.props
			switch (searchType) {
				case SEARCH_TYPE.CONTRACTS:
					return (
						<tr>
							<td className="on"><span className="ellipsis"><AddressLink to={data.address} /></span></td>
							<td>{data.contractName || '-'}</td>
							<td>{data.compiler || '-'}</td>
							<AmountCell type="icx" amount={data.balance} symbol="ICX" />
							<td>{numberWithCommas(data.txCount)}</td>
							<td>{CONTRACT_STATUS[data.status]}</td>
							<td>{onlyDate(data.verifiedDate)}</td>
						</tr>
					)
				case SEARCH_TYPE.TOKENS:
					const { index } = this.props
					const { name, symbol, price, changeVal, volume, marketCap, contractAddr } = data
					const { usd, icx, btc, eth } = price || {}
					const _changeVal = changeVal || 0
					const className = _changeVal > 0 ? 'red' : _changeVal < 0 ? 'blue' : ''
					const sign = _changeVal > 0 ? '+' : _changeVal < 0 ? '-' : ''
					return (
						<tr>
							<td>{index + 1}</td>
							<td>{tokenText(name, symbol, contractAddr)}</td>
							<td>
								<p>{convertNumberToText(usd) || '-'}<em>USD</em></p>
								<p>{convertNumberToText(icx) || '-'}<em>ICX</em></p>
								<p>{convertNumberToText(btc) || '-'}<em>BTC</em></p>
								<p>{convertNumberToText(eth) || '-'}<em>ETH</em></p>
							</td>
							<td className={className}><span>{sign}{_changeVal || '-'}</span> %</td>
							<td>{convertNumberToText(volume) || '-'}<em>USD</em></td>
							<td>{convertNumberToText(marketCap) || '-'}<em>USD</em></td>
						</tr>
					)
				default:
					return <tr></tr>
			}
		}

		return TableRow()
	}
}

export default SearchTableBody