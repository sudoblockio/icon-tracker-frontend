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
					const { index, count, page } = this.props
					const { usd, icx, btc, eth } = data.price || {}
					const _changeVal = data.changeVal || 0
					const className = _changeVal > 0 ? 'red' : _changeVal < 0 ? 'blue' : ''
					const sign = _changeVal > 0 ? '+' : _changeVal < 0 ? '-' : ''
					const ranking = count * (page - 1) + index + 1
					return (
						<tr>
							<td>{ranking}</td>
							<td>{tokenText(data.name, data.symbol, data.contractAddr)}</td>
							<td>
								<p>{convertNumberToText(usd) || '-'}<em>USD</em></p>
								<p>{convertNumberToText(icx) || '-'}<em>ICX</em></p>
								<p>{convertNumberToText(btc) || '-'}<em>BTC</em></p>
								<p>{convertNumberToText(eth) || '-'}<em>ETH</em></p>
							</td>
							<td className={className}><span>{sign}{_changeVal || '-'}</span> %</td>
							<td>{convertNumberToText(data.volume) || '-'}<em>USD</em></td>
							<td>{convertNumberToText(data.marketCap) || '-'}<em>USD</em></td>
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