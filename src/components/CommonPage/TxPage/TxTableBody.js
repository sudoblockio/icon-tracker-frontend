import React, { Component } from 'react';
import {
	calcFromNow,
	convertNumberToText,
	isContractAddress,
	numberWithCommas,
	dateToUTC,
	isValidData,
	tokenText,
	isScoreTx
} from 'utils/utils'
import {
	TransactionLink,
	AddressLink,
	BlockLink,
} from 'components'
import {
	TX_TYPE,
	SERVER_TX_TYPE,
} from 'utils/const'

const TxHashCell = ({ isError, txHash }) => {
	let _txHash, className
	if (!isValidData(txHash)) {
		_txHash = '-'
		className = 'no'
	}
	else if (isError) {
		_txHash = <TransactionLink to={txHash} label={<span className="ellipsis">{txHash}</span>} />
		className = 'icon error on'
	}
	else {
		_txHash = <TransactionLink to={txHash} label={<span className="ellipsis">{txHash}</span>} />
		className = 'on'
	}
	return (
		<td className={className}>
			{(_txHash !== '-' && isError) && <i className="img"></i>}
			{_txHash}
		</td>
	)
}

function getClassName(targetAddr, address, txType, targetContractAddr) {
	const _isScoreTx = isScoreTx(targetAddr, txType)
	const _isContractAddress = isContractAddress(targetAddr)

	console.log()

	let className = ""
	if (_isScoreTx) {
		className += "icon calen"
	}
	else if (_isContractAddress) {
		className += "icon"
	}

	if (_isScoreTx) {
		if (!!targetContractAddr) {
			className += " on"
		}
	}
	else {
		if (targetAddr !== address) {
			className += " on"
		}
	}

	return className
}

function getInnerElements(targetAddr, address, noEllipsis, txType, targetContractAddr) {
	const _isScoreTx = isScoreTx(targetAddr, txType)
	const _isContractAddress = isContractAddress(targetAddr)

	let elements = []
	if (_isScoreTx) {
		elements.push(<i key="i" className="img"></i>)
	}
	else if (_isContractAddress) {
		elements.push(<i key="i" className="img"></i>)
	}

	if (_isScoreTx) {
		const scoreTxTypeText = SERVER_TX_TYPE[txType]
		elements.push(<span key="span">{!!targetContractAddr ? <AddressLink label={scoreTxTypeText} to={targetContractAddr} /> : scoreTxTypeText}</span>)
	}
	else {
		elements.push(<span key="span" className={noEllipsis ? '' : 'ellipsis'}>{targetAddr !== address ? <AddressLink to={targetAddr} /> : address}</span>)
	}

	return elements
}

const AddressCell = ({ targetAddr, address, noEllipsis, txType, targetContractAddr }) => {
	if (!isValidData(targetAddr)) {
		return <td className="no">-</td>
	}
	const className = getClassName(targetAddr, address, txType, targetContractAddr)
	const innerElements = getInnerElements(targetAddr, address, noEllipsis, txType, targetContractAddr)
	return <td className={className}>{innerElements}</td>
}

const AddressSet = ({ fromAddr, toAddr, address, txType, targetContractAddr }) => {
	return [
		<AddressCell key="from" targetAddr={fromAddr} address={address} txType={txType} targetContractAddr={targetContractAddr} />,
		<SignCell key="sign" fromAddr={fromAddr} toAddr={toAddr} address={address} />,
		<AddressCell key="to" targetAddr={toAddr} address={address} txType={txType} targetContractAddr={targetContractAddr} />
	]
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
	return <td>{tokenText(name, undefined, address, 'ellipsis')}</td>
}

const DateCell = ({ date, isAge }) => {
	let className, dateText
	if (!isValidData(date)) {
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

const AmountCell = ({ amount, decimal, symbol }) => {
	return <td><span>{convertNumberToText(amount || "0", decimal || 4)}</span><em>{symbol}</em></td>
}

const BlockCell = ({ height }) => {
	return <td className="on break"><BlockLink to={height} label={numberWithCommas(height)} /></td>
}

class TxTableBody extends Component {
	render() {
		const TableRow = (_props) => {
			const {
				txType,
				data,
				address
			} = this.props

			const addressInData = data.address
			const isError = data.state === 0

			switch (txType) {
				case TX_TYPE.ADDRESS_TX:
					return (
						<tr>
							<TxHashCell isError={isError} txHash={data.txHash} />
							<BlockCell height={data.height} />
							<DateCell date={data.createDate} />
							<AddressSet fromAddr={data.fromAddr} toAddr={data.toAddr} address={address} txType={data.txType} targetContractAddr={data.targetContractAddr} />
							<AmountCell amount={data.amount} symbol="ICX" />
							<AmountCell amount={data.fee} symbol="ICX" />
						</tr>
					)
				case TX_TYPE.ADDRESS_TOKEN_TX:
					return (
						<tr>
							<TxHashCell isError={isError} txHash={data.txHash} />
							<DateCell date={data.createDate} />
							<AddressSet fromAddr={data.fromAddr} toAddr={data.toAddr} address={address} txType={data.txType} targetContractAddr={data.contractAddr} />
							<AmountCell amount={data.quantity} symbol={data.contractSymbol} />
							<TokenCell name={data.contractName} address={data.contractAddr} />
						</tr>
					)
				case TX_TYPE.CONTRACT_TX:
					return (
						<tr>
							<TxHashCell isError={isError} txHash={data.txHash} />
							<DateCell isAge date={data.createDate} />
							<AddressSet fromAddr={data.fromAddr} toAddr={data.toAddr} address={address} txType={data.txType} targetContractAddr={address} />
							<AmountCell amount={data.quantity} symbol="ICX" />
						</tr>
					)
				case TX_TYPE.CONTRACT_TOKEN_TX:
					return (
						<tr>
							<TxHashCell isError={isError} txHash={data.txHash} />
							<DateCell isAge date={data.age} />
							<AddressSet fromAddr={data.fromAddr} toAddr={data.toAddr} address={address} txType={data.txType} targetContractAddr={address} />
							<AmountCell amount={data.quantity} symbol={data.contractSymbol} />
							<TokenCell name={data.name} address={data.tradeTokenAddr} />
						</tr>
					)
				case TX_TYPE.BLOCK_TX:
					return (
						<tr>
							<TxHashCell isError={isError} txHash={data.txHash} />
							<AddressSet fromAddr={data.fromAddr} toAddr={data.toAddr} txType={data.txType} targetContractAddr={data.targetContractAddr} />
							<AmountCell amount={data.amount} symbol="ICX" />
							<AmountCell amount={data.fee} symbol="ICX" />
						</tr>
					)
				case TX_TYPE.TRANSACTIONS:
					return (
						<tr>
							<TxHashCell isError={isError} txHash={data.txHash} />
							<BlockCell height={data.height} />
							<DateCell date={data.createDate} />
							<AddressSet fromAddr={data.fromAddr} toAddr={data.toAddr} txType={data.txType} targetContractAddr={data.targetContractAddr} />
							<AmountCell amount={data.amount} symbol="ICX" />
							<AmountCell amount={data.fee} symbol="ICX" />
						</tr>
					)
				case TX_TYPE.TOKEN_TRANSFERS:
					return (
						<tr>
							<TxHashCell isError={isError} txHash={data.txHash} />
							<DateCell isAge date={data.age} />
							<AddressSet fromAddr={data.fromAddr} toAddr={data.toAddr} txType={data.txType} targetContractAddr={data.contractAddr} />
							<AmountCell amount={data.quantity} symbol={data.symbol} />
							<TokenCell name={data.tokenName} address={data.contractAddr} />
						</tr>
					)
				case TX_TYPE.TOKEN_TX:
					return (
						<tr>
							<TxHashCell isError={isError} txHash={data.txHash} />
							<DateCell isAge date={data.age} />
							<AddressSet fromAddr={data.fromAddr} toAddr={data.toAddr} txType={data.txType} targetContractAddr={data.contractAddr} />
							<AmountCell amount={data.quantity} symbol={data.symbol} />
						</tr>
					)
				case TX_TYPE.ADDRESSES:
					return (
						<tr>
							<AddressCell targetAddr={addressInData} txType={data.txType} />
							<AmountCell amount={data.balance} symbol="ICX" />
							<AmountCell amount={data.icxUsd} decimal={2} symbol="USD" />
							<td><span>{data.percentage}</span><em>%</em></td>
							<td>{numberWithCommas(data.txCount)}</td>
							<td>{data.nodeType}</td>
						</tr>
					)
				case TX_TYPE.BLOCKS:
					return (
						<tr>
							<BlockCell height={data.height} />
							<DateCell date={data.createDate} />
							<td>{numberWithCommas(data.txCount)}</td>
							<td><BlockLink label={data.hash} to={data.height} ellipsis /></td>
							<AmountCell amount={data.amount} symbol="ICX" />
							<AmountCell amount={data.fee} symbol="ICX" />
						</tr>
					)
				case TX_TYPE.CONTRACT_EVENTS:
					return (
						<tr>
							<td className="on">
								<span className="ellipsis"><TransactionLink to={data.txHash} /></span><br />
								<span><BlockLink label={`# ${data.height}`} to={data.height} /></span>
								<p>{calcFromNow(data.age)}</p>
							</td>
							<td>{data.method}</td>
							<td>{data.eventLog}</td>
						</tr>
					)
				case TX_TYPE.TRANSACTION_EVENTS:
					return (
						<tr>
							<td>{data.eventLog}</td>
						</tr>
					)
				case TX_TYPE.TOKEN_HOLDERS:
					return (
						<tr>
							<td>{data.rank}</td>
							<AddressCell targetAddr={addressInData} txType={data.txType} noEllipsis />
							<AmountCell amount={data.quantity} symbol={data.symbol} />
							<td><span>{data.percentage}</span><em>%</em></td>
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