import React, { Component } from 'react';
import {
	convertNumberToText,
	numberWithCommas,
	tokenText,
	onlyDate,
	getTimezoneMomentTime,
} from '../../../utils/utils'
import {
	AddressLink,
	AmountCell,
	
} from '../../../components'
import  LinkButton  from '../../CommonComponent/LinkButton'
import {
	CONTRACT_STATUS,
	SEARCH_TYPE
} from '../../../utils/const'

class SearchTableBody extends Component {
	render() {
		const TableRow = () => {
			const { searchType, data } = this.props
			switch (searchType) {
				case SEARCH_TYPE.CONTRACTS:
					return (
						<tr>
							<td className="on"><span className="ellipsis"><AddressLink to={data.address || data.public_key} /></span></td>
							<td>{data.name || '-'}</td>
							{/* <td>{data.compiler || '-'}</td> */}
							<AmountCell type="icx" amount={data.balance} symbol="ICX" />
							<td>{numberWithCommas(data.transaction_count)}</td>
							<td>{CONTRACT_STATUS[data.status]}</td>
							<td>{onlyDate(data.created_timestamp /1000).toString()}</td>
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
							{console.log(data, "what data exactly per contract?")}
							<td><span className="ellipsis">{tokenText(data.name, data.symbol, data.address)}</span><LinkButton address={data.address}/></td>

							<td>
								<p><em>{data.symbol}</em></p>
							</td>
							{/* <td className={className}><span>{sign}{_changeVal || '-'}</span> %</td>
							<td>{convertNumberToText(Math.floor(data.volume)) || '-'}<em>USD</em></td>
							<td>{convertNumberToText(Math.floor(data.marketCap)) || '-'}<em>USD</em></td> */}
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