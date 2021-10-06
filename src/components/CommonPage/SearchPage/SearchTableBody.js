import React, { Component } from 'react';
import {
	convertNumberToText,
	numberWithCommas,
	tokenText,
	onlyDate,
} from '../../../utils/utils'
import {
	AddressLink,
	AmountCell,
	LinkButton
} from '../../../components'
import {
	CONTRACT_STATUS,
	SEARCH_TYPE
} from '../../../utils/const'

class SearchTableBody extends Component {
	render() {
		const TableRow = () => {
			const { searchType, data } = this.props
			console.log(data, "search table data")
			switch (searchType) {
				case SEARCH_TYPE.CONTRACTS:
					return (
						<tr>
							<td className="on"><span className="ellipsis"><AddressLink to={data.address} /></span></td>
							<td>{data.name || '-'}</td>
							{/* <td>{data.compiler || '-'}</td> */}
							<AmountCell type="icx" amount={data.balance} symbol="ICX" />
							<td>{numberWithCommas(data.txCount)}</td>
							<td>{data.status}</td>
							<td>{onlyDate(data.verifiedDate)}</td>
						</tr>
					)
				case SEARCH_TYPE.TOKENS:
					const { index, count, page } = this.props
					const { usd, icx, btc, eth } = data.price || {}
					const _changeVal = data.changeVal || 0
					const className = _changeVal > 0 ? 'red' : _changeVal < 0 ? 'blue' : ''
					const sign = _changeVal > 0 ? '+' : ''
					const ranking = count * (page - 1) + index + 1
					return (
						<tr>
							<td>{ranking}</td>
							<td><span className="ellipsis">{tokenText(data.name, data.symbol, data.contractAddr)}</span><LinkButton address={data.contractAddr}/></td>
							<td>
								<p>{convertNumberToText(usd, 8) || '-'}<em>USD</em></p>
								<p>{convertNumberToText(icx, 8) || '-'}<em>ICX</em></p>
								<p>{convertNumberToText(btc, 8) || '-'}<em>BTC</em></p>
								<p>{convertNumberToText(eth, 8) || '-'}<em>ETH</em></p>
							</td>
							<td className={className}><span>{sign}{_changeVal || '-'}</span> %</td>
							<td>{convertNumberToText(Math.floor(data.volume)) || '-'}<em>USD</em></td>
							<td>{convertNumberToText(Math.floor(data.marketCap)) || '-'}<em>USD</em></td>
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