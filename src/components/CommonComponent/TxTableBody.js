import React, { Component } from 'react';
import {
	calcFromNow,
	convertNumberToText,
	isContractAddress,
	numberWithCommas,
	dateToUTC,
	isValidData,
	tokenText
} from 'utils/utils'
import {
	TransactionLink,
	AddressLink,
	BlockLink,
} from 'components'
import {
	TX_TYPE
} from 'utils/const'

const TxHashCell = ({ isError, txHash }) => {
	let _txHash, className
	if (!isValidData(txHash)) {
		_txHash = '-'
		className = 'no'
	}
	else if (isError) {
		_txHash = <TransactionLink to={txHash}/>
		className = 'icon error on'
	}
	else {
		_txHash = <TransactionLink to={txHash}/>
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
		_targetAddr = <span className={noEllipsis ? '' : 'ellipsis'}><AddressLink to={targetAddr} /></span>
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
	return <td className="on break"><BlockLink to={height} label={numberWithCommas(height)}/></td>
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
				case TX_TYPE.BLOCKS:
					return (
						<tr>
							<BlockCell height={data.height}/>
							<DateCell date={data.createDate} />
							<td>{numberWithCommas(data.txCount)}</td>
							<td><BlockLink label={data.hash} to={data.height} ellipsis/></td>
							<AmountCell type="icx" amount={data.amount} decimal={4} symbol="ICX"/>
							<AmountCell type="icx" amount={data.fee} decimal={4} symbol="ICX"/>
						</tr>
					)
				case TX_TYPE.ADDRESSES:
					return (
						<tr>
							<AddressCell targetAddr={addressInData} />
							<AmountCell type="icx" amount={data.balance} decimal={4} symbol="ICX"/>
							<AmountCell type="usd" amount={data.icxUsd} symbol="USD"/>
							<td><span>{data.percentage}</span><em>%</em></td>
							<td>{numberWithCommas(data.txCount)}</td>
							<td>{data.nodeType}</td>
						</tr>
					)
				case TX_TYPE.CONTRACT_TX:						
					return (
						<tr>
							<TxHashCell isError={isError} txHash={data.txHash}/>
							<DateCell isAge date={data.createDate} />
							<AddressCell targetAddr={data.fromAddr} address={data.address}/>
							<SignCell fromAddr={data.fromAddr} toAddr={data.toAddr} address={data.address}/>
							<AddressCell targetAddr={data.toAddr} address={data.address}/>
							<AmountCell type="icx" amount={data.quantity} decimal={4} symbol="ICX"/>
						</tr>
					)
				case TX_TYPE.CONTRACT_TOKEN_TX:
					return (
						<tr>
							<TxHashCell isError={isError} txHash={data.txHash} />
							<DateCell isAge date={data.age} />
							<AddressCell targetAddr={data.fromAddr} address={data.address}/>
							<SignCell fromAddr={data.fromAddr} toAddr={data.toAddr} address={data.address}/>
							<AddressCell targetAddr={data.toAddr} address={data.address}/>
							<AmountCell type="icx" amount={data.quantity} decimal={4} symbol={data.contractSymbol}/>
							<TokenCell name={data.name} address={data.tradeTokenAddr} />
						</tr>
					)
				case TX_TYPE.CONTRACT_EVENTS:
					return (
						<tr>
							<td className="on">
								<TransactionLink to={data.txHash}/><br/>
								<span><BlockLink label={`# ${data.height}`} to={data.height}/></span>
								<p>{calcFromNow(data.age)}</p>
							</td>
							<td>{data.method}</td>
							<td>{data.eventLog}</td>
						</tr>
					)
				case TX_TYPE.ADDRESS_TX:
					return (
						<tr>
							<TxHashCell isError={isError} txHash={data.txHash} />
							<BlockCell height={data.height}/>
							<DateCell date={data.createDate} />
							<AddressCell targetAddr={data.fromAddr} address={data.address} />
							<SignCell fromAddr={data.fromAddr} toAddr={data.toAddr} address={data.address} />
							<AddressCell targetAddr={data.toAddr} address={data.address} />
							<AmountCell type="icx" amount={data.amount} decimal={4} symbol="ICX"/>
							<AmountCell type="icx" amount={data.fee} decimal={4} symbol="ICX"/>
						</tr>
					)
				case TX_TYPE.ADDRESS_TOKEN_TX:
					return (
						<tr>
							<TxHashCell isError={isError} txHash={data.txHash} />
							<DateCell date={data.createDate} />
							<AddressCell targetAddr={data.fromAddr} address={data.address} />
							<SignCell fromAddr={data.fromAddr} toAddr={data.toAddr} address={data.address} />
							<AddressCell targetAddr={data.toAddr} address={data.address} />
							<AmountCell type="icx" amount={data.quantity} decimal={4} symbol={data.contractSymbol}/>
							<TokenCell name={data.contractName} address={data.contractAddr} />
						</tr>
					)
				case TX_TYPE.TRANSACTIONS:
					return (
						<tr>
							<TxHashCell isError={isError} txHash={data.txHash} />
							<BlockCell height={data.height}/>
							<DateCell date={data.createDate} />
							<AddressCell targetAddr={data.fromAddr} />
							<SignCell fromAddr={data.fromAddr} toAddr={data.toAddr} />
							<AddressCell targetAddr={data.toAddr} />
							<AmountCell type="icx" amount={data.amount} decimal={4} symbol="ICX"/>
							<AmountCell type="icx" amount={data.fee} decimal={4} symbol="ICX"/>
						</tr>
					)
				case TX_TYPE.TOKEN_TRANSFERS:
					return (
						<tr>
							<TxHashCell isError={isError} txHash={data.txHash} />
							<DateCell isAge date={data.age} />
							<AddressCell targetAddr={data.fromAddr} />
							<SignCell fromAddr={data.fromAddr} toAddr={data.toAddr} />
							<AddressCell targetAddr={data.toAddr} />
							<AmountCell type="icx" amount={data.quantity} decimal={4} symbol={data.symbol}/>
							<TokenCell name={data.tokenName} address={data.contractAddr}/>
						</tr>
					)
				case TX_TYPE.BLOCK_TX:
					return (
						<tr>
							<TxHashCell isError={isError} txHash={data.txHash} />
							<AddressCell targetAddr={data.fromAddr} />
							<SignCell fromAddr={data.fromAddr} toAddr={data.toAddr} />
							<AddressCell targetAddr={data.toAddr} />
							<AmountCell type="icx" amount={data.amount} decimal={4} symbol="ICX"/>
							<AmountCell type="icx" amount={data.fee} decimal={4} symbol="ICX"/>
						</tr>
					)
				case TX_TYPE.TOKEN_TX:
					return (
						<tr>
							<TxHashCell isError={isError} txHash={data.txHash} />
							<DateCell isAge date={data.createDate} />
							<AddressCell targetAddr={data.fromAddr} />
							<SignCell fromAddr={data.fromAddr} toAddr={data.toAddr} />
							<AddressCell targetAddr={data.toAddr} />
							<AmountCell type="icx" amount={data.quantity} decimal={4} symbol={data.symbol}/>
						</tr>
					)
				case TX_TYPE.TOKEN_HOLDERS:
					return (
						<tr>
							<td>{data.rank}</td>
							<AddressCell targetAddr={addressInData} noEllipsis/>
							<AmountCell type="icx" amount={data.quantity} decimal={4} symbol={data.symbol}/>
							<td><span>{data.percentage}</span><em>%</em></td>
						</tr>
					)
				case TX_TYPE.TRANSACTION_EVENTS:
					return (
						<tr>
							<td>{data.eventLog}</td>
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