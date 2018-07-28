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
				rank,
				percentage,
				tradeTokenAddr,
				method,
				eventLog,
				balance,
				icxUsd,
				txCount,
				nodeType,
				hash,
			} = data

			const addressInData = data.address
			const isError = state === 0

			switch (txType) {
				case TX_TYPE.BLOCKS:
					return (
						<tr>
							<BlockCell height={height}/>
							<DateCell date={createDate} />
							<td>{numberWithCommas(txCount)}</td>
							<td><BlockLink label={hash} to={height} isEllipsis/></td>
							<AmountCell type="icx" amount={amount} decimal={4} symbol="ICX"/>
							<AmountCell type="icx" amount={fee} decimal={4} symbol="ICX"/>
						</tr>
					)
				case TX_TYPE.ADDRESSES:
					return (
						<tr>
							<AddressCell targetAddr={addressInData} />
							<AmountCell type="icx" amount={balance} decimal={4} symbol="ICX"/>
							<AmountCell type="usd" amount={icxUsd} symbol="USD"/>
							<td><span>{percentage}</span><em>%</em></td>
							<td>{numberWithCommas(txCount)}</td>
							<td>{nodeType}</td>
						</tr>
					)
				case TX_TYPE.CONTRACT_TX:						
					return (
						<tr>
							<TxHashCell isError={isError} txHash={txHash}/>
							<DateCell isAge date={age} />
							<AddressCell targetAddr={fromAddr} address={address}/>
							<SignCell fromAddr={fromAddr} toAddr={toAddr} address={address}/>
							<AddressCell targetAddr={toAddr} address={address}/>
							<AmountCell type="icx" amount={quantity} decimal={4} symbol="ICX"/>
						</tr>
					)
				case TX_TYPE.CONTRACT_TOKEN_TX:
					return (
						<tr>
							<TxHashCell isError={isError} txHash={txHash} />
							<DateCell isAge date={age} />
							<AddressCell targetAddr={fromAddr} address={address}/>
							<SignCell fromAddr={fromAddr} toAddr={toAddr} address={address}/>
							<AddressCell targetAddr={toAddr} address={address}/>
							<AmountCell type="icx" amount={quantity} decimal={4} symbol={contractSymbol}/>
							<TokenCell name={name} address={tradeTokenAddr} />
						</tr>
					)
				case TX_TYPE.CONTRACT_EVENTS:
					return (
						<tr>
							<td className="on">
								<TransactionLink to={txHash}/><br/>
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
							<BlockCell height={height}/>
							<DateCell date={createDate} />
							<AddressCell targetAddr={fromAddr} address={address} />
							<SignCell fromAddr={fromAddr} toAddr={toAddr} address={address} />
							<AddressCell targetAddr={toAddr} address={address} />
							<AmountCell type="icx" amount={amount} decimal={4} symbol="ICX"/>
							<AmountCell type="icx" amount={fee} decimal={4} symbol="ICX"/>
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
							<AmountCell type="icx" amount={quantity} decimal={4} symbol={contractSymbol}/>
							<TokenCell name={contractName} address={contractAddr} />
						</tr>
					)
				case TX_TYPE.TRANSACTIONS:
					return (
						<tr>
							<TxHashCell isError={isError} txHash={txHash} />
							<BlockCell height={height}/>
							<DateCell date={createDate} />
							<AddressCell targetAddr={fromAddr} />
							<SignCell fromAddr={fromAddr} toAddr={toAddr} />
							<AddressCell targetAddr={toAddr} />
							<AmountCell type="icx" amount={amount} decimal={4} symbol="ICX"/>
							<AmountCell type="icx" amount={fee} decimal={4} symbol="ICX"/>
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
							<AmountCell type="icx" amount={quantity} decimal={4} symbol={symbol}/>
							<TokenCell name={tokenName} address={contractAddr}/>
						</tr>
					)
				case TX_TYPE.BLOCK_TX:
					return (
						<tr>
							<TxHashCell isError={isError} txHash={txHash} />
							<AddressCell targetAddr={fromAddr} />
							<SignCell fromAddr={fromAddr} toAddr={toAddr} />
							<AddressCell targetAddr={toAddr} />
							<AmountCell type="icx" amount={amount} decimal={4} symbol="ICX"/>
							<AmountCell type="icx" amount={fee} decimal={4} symbol="ICX"/>
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
							<AmountCell type="icx" amount={quantity} decimal={4} symbol={symbol}/>
						</tr>
					)
				case TX_TYPE.TOKEN_HOLDERS:
					return (
						<tr>
							<td>{rank}</td>
							<AddressCell targetAddr={addressInData} noEllipsis/>
							<AmountCell type="icx" amount={quantity} decimal={4} symbol={symbol}/>
							<td><span>{percentage}</span><em>%</em></td>
						</tr>
					)
				case TX_TYPE.TRANSACTION_EVENTS:
					return (
						<tr>
							<td>{eventLog}</td>
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