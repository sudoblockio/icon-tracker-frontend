import React, { Component } from 'react';
import {
	numberWithCommas,
	isValidData,
	tokenText,
	is0xHash,
	convertLoopToIcxDecimal,
	convertHexToValue,
	epochToFromNow,
	dateToUTC 
} from '../../../utils/utils'
import {
	TransactionLink,
	BlockLink,
	AddressCell,
	AddressSet,
	AmountCell
} from '../../../components'
import {
	TX_TYPE,
} from '../../../utils/const'
import { getBadgeTitle, convertNumberToText, addUnregisteredStyle } from '../../../utils/utils';
import moment from 'moment';

const TxHashCell = ({ isError, txHash }) => {
	let _txHash, className
	if (!isValidData(txHash)) {
		_txHash = '-'
		className = 'no'
	}
	else {
		const _is0xHash = is0xHash(txHash)
		_txHash = _is0xHash ? <TransactionLink to={txHash} label={<span className="ellipsis">{txHash}</span>} /> : txHash
		className = `${isError ? 'icon error' : ''} ${_is0xHash ? 'on' : ''}`	
	}
	return (
		<td className={className}>
			{(_txHash !== '-' && isError) && <i className="img"></i>}
			{_txHash}
		</td>
	)
}

const TokenCell = ({ name, address }) => {
	return <td><span className="ellipsis">{tokenText(name, undefined, address, 'ellipsis')}</span></td>
}

const DateCell = ({ date, isDate }) => {
	let className, dateText
	if (!isValidData(date)) {
		className = ""
		dateText = "-"
	}
	else {
		className = "break"
		if (isDate) {
			dateText = dateToUTC(date)
		}
		else {
			dateText = epochToFromNow(date)

		}
	}
	return <td className={className}>{dateText}</td>
}

const BlockCell = ({ height }) => {
	return <td className="on"><BlockLink to={height} label={numberWithCommas(height)} /></td>
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
				case TX_TYPE.ADDRESS_REWARD:
					return (
						<tr>
							<TxHashCell isError={isError} txHash={data.txHash} />
							<BlockCell height={data.height} />
							<DateCell date={moment.utc(data.createDate).local()} />
							<AmountCell amount={data.iscore} symbol="I-Score" noEllipsis/>
							<AmountCell amount={data.icx} symbol="ICX" />
						</tr>
					)
				case TX_TYPE.ADDRESS_DELEGATION:
					const value = convertLoopToIcxDecimal(data.value)
					const badgeTitle = getBadgeTitle(data.grade, data.status)
					return (
						<tr>
							<td className="on" onClick={() => {
								window.open('/address/' + data.address)
							}}><span className={"prep-tag" + addUnregisteredStyle(data.status, data.grade)}>{badgeTitle}</span>{data.name || data.address}</td>
							<td className="plus"><span>{convertNumberToText(value)}</span><em>ICX</em></td>
						</tr>
					)
				case TX_TYPE.ADDRESS_VOTED:
					return (
						<tr>
							<td className="on" onClick={() => {
								window.open('/address/' + data.address)
							}}>{data.address}</td>
							<td className="plus"><span>{convertNumberToText(data.amount)}</span><em>ICX</em></td>
						</tr>
					)
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
				case TX_TYPE.ADDRESS_INTERNAL_TX:
					return (
						<tr>
							<TxHashCell isError={isError} txHash={data.txHash} />
							<BlockCell height={data.height} />
							<DateCell date={data.createDate} />
							<AddressSet fromAddr={data.fromAddr} toAddr={data.toAddr} address={address} txType={data.txType} targetContractAddr={address} />
							<AmountCell amount={data.amount} symbol="ICX" />
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
							<BlockCell height={data.height} />
							<DateCell date={data.createDate} />
							<AddressSet fromAddr={data.fromAddr} toAddr={data.toAddr} address={address} txType={data.txType} targetContractAddr={address} />
							<AmountCell amount={data.amount} symbol="ICX" />
							<AmountCell amount={data.fee} symbol="ICX" />
						</tr>
					)
				case TX_TYPE.CONTRACT_INTERNAL_TX:
					return (
						<tr>
							<TxHashCell isError={isError} txHash={data.txHash} />
							<BlockCell height={data.height} />
							<DateCell date={data.createDate} />
							<AddressSet fromAddr={data.fromAddr} toAddr={data.toAddr} address={address} txType={data.txType} targetContractAddr={address} />
							<AmountCell amount={data.amount} symbol="ICX" />
						</tr>
					)
				case TX_TYPE.CONTRACT_TOKEN_TX:
					return (
						<tr>
							<TxHashCell isError={isError} txHash={data.txHash} />
							<DateCell date={data.age} />
							<AddressSet fromAddr={data.fromAddr} toAddr={data.toAddr} address={address} txType={data.txType} targetContractAddr={address} />
							<AmountCell amount={data.quantity} symbol={data.symbol} />
							<TokenCell name={data.name} address={data.tradeTokenAddr} />
							<AmountCell amount={data.fee} symbol="ICX" />
						</tr>
					)
				case TX_TYPE.BLOCK_TX:
						return (
							<tr>
								<TxHashCell isError={isError} txHash={data.hash} />
								<AddressSet fromAddr={data.from_address} toAddr={data.to_address} txType={data.type} targetContractAddr={data.targetContractAddr} />
								<AmountCell amount={convertHexToValue(data.transaction_amount)} symbol="ICX" />
								<AmountCell amount={convertHexToValue(data.transaction_fees)} symbol="ICX" />
							</tr>
						)

					
				case TX_TYPE.TRANSACTIONS:
					// or statements to handle old endpoint column names:
					return (
						<tr>
							<TxHashCell isError={isError} txHash={data.hash || data.txHash} />
							<BlockCell height={data.block_number || data.height} />
							<DateCell date={data.timestamp || data.createDate} />
							<AddressSet fromAddr={data.from_address || data.fromAddr} toAddr={data.to_address || data.toAddr} txType={data.txType} targetContractAddr={data.targetContractAddr} />
							<AmountCell amount={convertHexToValue(data.value) || convertHexToValue(data.amount)} symbol="ICX" />
							<AmountCell amount={data.fee} symbol="ICX" />
						</tr>
					)
				case TX_TYPE.TOKEN_TRANSFERS:
					return (
						<tr>
							<TxHashCell isError={isError} txHash={data.txHash} />
							<DateCell date={data.age} />
							<AddressSet fromAddr={data.fromAddr} toAddr={data.toAddr} txType={data.txType} targetContractAddr={data.contractAddr} />
							<AmountCell amount={data.quantity} symbol={data.symbol} />
							<TokenCell name={data.tokenName} address={data.contractAddr} />
							<AmountCell amount={data.fee} symbol="ICX" />
						</tr>
					)
				case TX_TYPE.TOKEN_TX:
					return (
						<tr>
							<TxHashCell isError={isError} txHash={data.txHash} />
							<DateCell date={data.age} />
							<AddressSet fromAddr={data.fromAddr} toAddr={data.toAddr} txType={data.txType} targetContractAddr={data.contractAddr} />
							<AmountCell amount={data.quantity} symbol={data.symbol} />
							<AmountCell amount={data.fee} symbol="ICX" />
						</tr>
					)
				case TX_TYPE.ADDRESSES:
					return (
						<tr>
							<AddressCell targetAddr={addressInData} txType={data.txType} />
							<AmountCell amount={data.balance} symbol="ICX" />
							<AmountCell amount={data.icxUsd} decimal={3} symbol="USD" />
							<td><span>{data.percentage}</span><em>%</em></td>
							<td>{numberWithCommas(data.txCount)}</td>
							<td>{data.nodeType}</td>
						</tr>
					)
				case TX_TYPE.BLOCKS:
					return (
						<tr>
							<BlockCell height={data.number} />
							<DateCell date={data.timestamp} />
							<td>{numberWithCommas(data.transaction_count)}</td>
							<td><BlockLink label={data.hash} to={data.number} ellipsis /></td>
							<AmountCell amount={convertHexToValue(data.transaction_amount)} symbol="ICX" />
							<AmountCell amount={convertHexToValue(data.transaction_fees)} symbol="ICX" />
						</tr>
					)
				case TX_TYPE.CONTRACT_EVENTS:
					return (
						<tr>
							<td className="on">
								<span className="ellipsis"><TransactionLink to={data.txHash} /></span><br />
								<span><BlockLink label={`# ${data.height}`} to={data.height} /></span>
								<p>{epochToFromNow(data.age)}</p>
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
							{/* <td>-</td> */}
							<AddressSet fromAddr={data.fromAddr} toAddr={data.toAddr} txType={data.txType} targetContractAddr={data.targetContractAddr} />
							<AmountCell amount={convertHexToValue(data.amount)} symbol="ICX" />
							{/* <td>-</td> */}
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