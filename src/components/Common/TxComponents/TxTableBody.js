import React, { Component } from 'react';
import {
	calcFromNow,
	convertNumberToText,
	isContractAddress,
	numberWithCommas,
	dateToUTC,
	isVaildData
} from '../../../utils/utils'
import {
	TransactionLink,
	WalletLink,
	BlockLink,
	TokenLink
} from '../../../components'
import {
	TX_TYPE
} from '../../../utils/const'

const TxHashCell = ({ isError, txHash }) => {
	let _txHash, className
	if (!isVaildData(txHash)) {
		_txHash = '-'
		className = 'no'
	}
	else if (isError) {
		_txHash = <span className="ellipsis"><TransactionLink to={txHash} /></span>
		className = 'icon error'
	}
	else {
		_txHash = <span className="ellipsis"><TransactionLink to={txHash} /></span>
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

const TokenCell = ({ name, symbol, address }) => {
	return <td><TokenLink label={name} to={address} />{/*tokenText(name, symbol, address)*/}</td>
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

class TxTableBody extends Component {
	render() {
		const TableRow = (_props) => {
			const {
				txType,
				data,
				address
			} = _props

			const {
				name,
				txHash,
				age,
				fromAddr,
				toAddr,
				quantity,
				state,
				height,
				amount,
				createDate,
				fee,
				contractSymbol,
				contractName,
				contractAddr,
				tokenName,
				symbol,
				tokenQuantity,
				rank,
				percentage,
				tradeTokenAddr,
				method,
				eventLog,
				balance,
				icxUsd,
				txCount,
				nodeType,
				hash
			} = data

			const addressInData = data.address
			const isError = state === 0

			switch (txType) {
				case TX_TYPE.BLOCKS:
					return (
						<tr>
					        <td><BlockLink label={numberWithCommas(height)} to={height}/></td>
							<DateCell date={createDate}/>
							<td>{numberWithCommas(txCount)}</td>
							<td><BlockLink label={hash} to={height}/></td>
							<td><span>{convertNumberToText(amount, 'icx')}</span><em>ICX</em></td>
							<td><span>{convertNumberToText(fee, 'icx')}</span><em>ICX</em></td>
						</tr>
					)
				case TX_TYPE.ADDRESSES:
					return (
						<tr>
							<AddressCell targetAddr={addressInData}/>
							<td><span>{convertNumberToText(balance, 'icx')}</span><em>ICX</em></td>
							<td><span>{convertNumberToText(icxUsd, 'usd')}</span><em>USD</em></td>
							<td><span>{percentage}</span><em>%</em></td>
							<td>{numberWithCommas(txCount)}</td>
							<td>{nodeType}</td>
						</tr>
					)
				case TX_TYPE.CONTRACT_TX:
					return (
						<tr>
							<TxHashCell isError={isError} txHash={txHash} />
							<DateCell isAge date={age} />
							<AddressCell targetAddr={fromAddr} />
							<SignCell fromAddr={fromAddr} toAddr={toAddr} />
							<AddressCell targetAddr={toAddr} />
							<td><span>{convertNumberToText(quantity, 'icx')}</span><em>ICX</em></td>
						</tr>
					)
				case TX_TYPE.CONTRACT_TOKEN_TX:
					return (
						<tr>
							<TxHashCell isError={isError} txHash={txHash} />
							<DateCell isAge date={age}/>
							<AddressCell targetAddr={fromAddr} />
							<SignCell fromAddr={fromAddr} toAddr={toAddr} />
							<AddressCell targetAddr={toAddr} />
							<td><span>{convertNumberToText(quantity, 'icx', 4)}</span><em>{contractSymbol}</em></td>
							<TokenCell name={name} symbol={symbol} address={tradeTokenAddr} />
						</tr>
					)
				case TX_TYPE.CONTRACT_EVENTS:
					return (
						<tr>
							<td className="on">
								<span className=" ellipsis"><TransactionLink to={txHash}/></span><br/>
								<span><BlockLink label={`# ${height}`} to={height}/></span>
								<p>{calcFromNow(age)}</p>
							</td>
							<td>{method}</td>
							<td>{eventLog}</td>
						</tr>
					)
				case TX_TYPE.ADDRESS_TX:
					return (
						<tr>
							<TxHashCell isError={isError} txHash={txHash} />
							<td className="on break"><BlockLink to={height} label={numberWithCommas(height)} /></td>
							<DateCell date={createDate} />
							<AddressCell targetAddr={fromAddr} address={address} />
							<SignCell fromAddr={fromAddr} toAddr={toAddr} address={address} />
							<AddressCell targetAddr={toAddr} address={address} />
							<td><span>{convertNumberToText(amount, 'icx', 4)}</span><em>ICX</em></td>
							<td><span>{convertNumberToText(fee, 'icx')}</span><em>ICX</em></td>
						</tr>
					)
				case TX_TYPE.ADDRESS_TOKEN_TX:
					return (
						<tr>
							<TxHashCell isError={isError} txHash={txHash} />
							<DateCell date={createDate} />
							<AddressCell targetAddr={fromAddr} address={address} />
							<SignCell fromAddr={fromAddr} toAddr={toAddr} address={address} />
							<AddressCell targetAddr={toAddr} address={address} />
							<td><span>{convertNumberToText(amount, 'icx', 4)}</span><em>{contractSymbol}</em></td>
							<TokenCell name={contractName} symbol={contractSymbol} address={contractAddr} />
						</tr>
					)
				case TX_TYPE.TRANSACTIONS:
					return (
						<tr>
							<TxHashCell isError={isError} txHash={txHash} />
							<td className="on break"><BlockLink to={height} label={numberWithCommas(height)} /></td>
							<DateCell date={createDate} />
							<AddressCell targetAddr={fromAddr} />
							<SignCell fromAddr={fromAddr} toAddr={toAddr} />
							<AddressCell targetAddr={toAddr} />
							<td><span>{convertNumberToText(amount, 'icx', 4)}</span><em>ICX</em></td>
							<td><span>{convertNumberToText(fee, 'icx')}</span><em>ICX</em></td>
						</tr>
					)
				case TX_TYPE.TOKEN_TRANSFERS:
					return (
						<tr>
							<TxHashCell isError={isError} txHash={txHash} />
							<DateCell isAge date={age} />
							<AddressCell targetAddr={fromAddr} />
							<SignCell fromAddr={fromAddr} toAddr={toAddr} />
							<AddressCell targetAddr={toAddr} />
							<td><span>{convertNumberToText(tokenQuantity, 'icx', 4)}</span><em>{symbol}</em></td>
							<TokenCell name={tokenName} symbol={symbol} address={contractAddr} />
						</tr>
					)
				case TX_TYPE.BLOCK_TX:
					return (
						<tr>
							<TxHashCell isError={isError} txHash={txHash} />
							<AddressCell targetAddr={fromAddr} />
							<SignCell fromAddr={fromAddr} toAddr={toAddr} />
							<AddressCell targetAddr={toAddr} />
							<td><span>{convertNumberToText(amount, 'icx', 4)}</span><em>ICX</em></td>
							<td><span>{convertNumberToText(fee, 'icx')}</span><em>ICX</em></td>
						</tr>
					)
				case TX_TYPE.TOKEN_TX:
					return (
						<tr>
							<TxHashCell isError={isError} txHash={txHash} />
							<DateCell isAge date={createDate} />
							<AddressCell targetAddr={fromAddr} />
							<SignCell fromAddr={fromAddr} toAddr={toAddr} />
							<AddressCell targetAddr={toAddr} />
							<td><span>{convertNumberToText(amount, 'icx', 4)}</span><em>{symbol}</em></td>
						</tr>
					)
				case TX_TYPE.TOKEN_HOLDERS:
					return (
						<tr>
							<td>{rank}</td>
							<AddressCell targetAddr={addressInData} noEllipsis={true} />
							<td><span>{convertNumberToText(quantity, 'icx', 4)}</span><em>{symbol}</em></td>
							<td><span>{percentage}</span><em>%</em></td>
						</tr>
					)
				default:
					return <tr></tr>
			}
		}

		return TableRow(this.props)
	}
}

export default TxTableBody