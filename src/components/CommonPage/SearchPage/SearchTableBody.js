import React, { Component } from 'react';
import {
	numberWithCommas,
	tokenText,
	onlyDate,
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
							<AmountCell type="icx" amount={data.balance} symbol="ICX" />
							<td>{numberWithCommas(data.transaction_count)}</td>
							<td>{CONTRACT_STATUS[data.status]}</td>
							<td>{onlyDate(data.created_timestamp /1000).toString()}</td>
						</tr>
					)
				case SEARCH_TYPE.TOKENS:
					const { index, count, page } = this.props
					const _changeVal = data.changeVal || 0
					const ranking = count * (page - 1) + index + 1
					return (
						<tr>
							<td>{ranking}</td>
							
							<td><span className="ellipsis">{tokenText(data.name, data.symbol, data.address)}</span></td>
							<td><span className="ellipsis"><LinkButton address={data.address}/></span></td>
							<td>
								<p><em>{data.symbol}</em></p>
							</td>
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