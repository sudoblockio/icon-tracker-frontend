import React, { Component } from 'react';
import {
	calcFromNow,
	convertNumberToText,
	isContractAddress,
	numberWithCommas,
	dateToUTC,
	isValidData,
	tokenText,
	onlyDate
} from '../../../utils/utils'
import {
	TransactionLink,
	WalletLink,
	BlockLink,
	ContractLink
} from '../../../components'
import {
	TX_TYPE,
	CONTRACT_STATUS,
	SUB_SEARCH_TYPE
} from '../../../utils/const'

const TxHashCell = ({ isError, txHash }) => {
	let _txHash, className
	if (!isValidData(txHash)) {
		_txHash = '-'
		className = 'no'
	}
	else if (isError) {
		_txHash = <TransactionLink to={txHash} />
		className = 'icon error on'
	}
	else {
		_txHash = <TransactionLink to={txHash} />
		className = 'on'
	}
	return (
		<td className={className}>
			{(_txHash !== '-' && isError) && <i className="img"></i>}
			{_txHash}
		</td>
	)
}

const AddressCell = ({ targetAddr, address, noEllipsis }) => {
	const isContract = isContractAddress(targetAddr)
	let _targetAddr, className
	if (!targetAddr || targetAddr === '-') {
		_targetAddr = '-'
		className = 'no'
	}
	else if (targetAddr === address) {
		_targetAddr = <span className={noEllipsis ? '' : 'ellipsis'}>{address}</span>
		className = isContract ? 'icon' : ''
	}
	else {
		_targetAddr = <span className={noEllipsis ? '' : 'ellipsis'}><WalletLink to={targetAddr} /></span>
		className = `on ${isContract ? 'icon' : ''}`
	}
	return (
		<td className={className}>
			{(_targetAddr !== '-' && isContract) && <i className="img"></i>}
			{_targetAddr}
		</td>
	)
}

const SignCell = ({ address, fromAddr, toAddr }) => {
	let signItem, className = 'table-sign'
	if (fromAddr === address) {
		signItem = <span>OUT</span>
		className += ' out'
	}
	else if (toAddr === address) {
		signItem = <span>IN</span>
	}
	else {
		signItem = <i className="img"></i>
	}
	return <td className={className}>{signItem}</td>
}

const TokenCell = ({ name, address }) => {
	return <td>{tokenText(name, undefined, address)}</td>
}

const DateCell = ({ date, isAge }) => {
	let className, dateText
	if (!date || date === "-") {
		className = "no"
		dateText = "-"
	}
	else {
		className = "break"
		if (isAge) {
			dateText = calcFromNow(date)
		}
		else {
			dateText = dateToUTC(date)
		}
	}
	return <td className={className}>{dateText}</td>
}

const AmountCell = ({ type, amount, decimal, symbol }) => {
	return <td><span>{convertNumberToText(amount, type, decimal)}</span><em>{symbol}</em></td>
}

const BlockCell = ({ height }) => {
	return <td className="on break"><BlockLink to={height} label={numberWithCommas(height)} /></td>
}

class SubSearchTableBody extends Component {
	render() {
		const TableRow = () => {
			const { subSearchType, data } = this.props
			switch (subSearchType) {
				case SUB_SEARCH_TYPE.CONTRACTS:
					return (
						<tr>
							<td className="on"><span className="ellipsis"><WalletLink to={data.address} /></span></td>
							<td>{data.contractName}</td>
							<td>{data.compiler}</td>
							<AmountCell type="icx" amount={data.balance} decimal={4} symbol="ICX" />
							<td>{numberWithCommas(data.txCount)}</td>
							<td>{CONTRACT_STATUS[data.status]}</td>
							<td>{onlyDate(data.verifiedDate)}</td>
						</tr>
					)
				case SUB_SEARCH_TYPE.TOKENS:
					const { index } = this.props
					const { name, symbol, price, changeVal, volume, marketCap, contractAddr } = data
					const { usd, icx, btc, eth } = price || {}
					const _changeVal = changeVal || 0
					const className = _changeVal > 0 ? 'red' : _changeVal < 0 ? 'blue' : ''
					const sign = _changeVal > 0 ? '+' : _changeVal < 0 ? '-' : ''
					return (
						<tr>
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
				default:
					return <tr></tr>
			}
		}

		return TableRow()
	}
}

export default SubSearchTableBody