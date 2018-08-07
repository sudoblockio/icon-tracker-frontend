import React, { Component } from 'react';
import {
	calcFromNow,
	convertNumberToText,
	numberWithCommas,
	dateToUTC,
	isValidData,
	tokenText,
} from 'utils/utils'
import {
	TransactionLink,
	BlockLink,
	AddressCell,
	AddressSet
} from 'components'
import {
	TX_TYPE,
} from 'utils/const'

const TxHashCell = ({ isError, txHash }) => {
	let _txHash, className
	if (!isValidData(txHash)) {
		_txHash = '-'
		className = 'no'
	}
	else {
		_txHash = <TransactionLink to={txHash} label={<span className="ellipsis">{txHash}</span>} />
		className = `${isError ? 'icon error' : ''} on`
	}
	return (
		<td className={className}>
			{(_txHash !== '-' && isError) && <i className="img"></i>}
			{_txHash}
		</td>
	)
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
				case TX_TYPE.CONTRACT_INTERNAL_TX:
					return (
						<tr>
							<TxHashCell isError={isError} txHash={data.txHash} />
							<BlockCell height={data.height} />
							<DateCell isAge date={data.createDate} />
							<AddressSet fromAddr={data.fromAddr} toAddr={data.toAddr} address={address} txType={data.txType} targetContractAddr={address} />
							<AmountCell amount={data.amount} symbol="ICX" />
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
				case TX_TYPE.TRANSACTION_INTERNAL_TX:
					return (
						<tr>
							<AddressSet fromAddr={data.fromAddr} toAddr={data.toAddr} txType={data.txType} targetContractAddr={data.targetContractAddr} />
							<AmountCell amount={data.amount} symbol="ICX" />
						</tr>
					)
				case TX_TYPE.TOKEN_HOLDERS:
					return (
						<tr>
							<td>{data.rank}</td>
							<AddressCell targetAddr={addressInData} txType={data.txType} spanNoEllipsis />
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