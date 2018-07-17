import React, { Component } from 'react';
import { BlockLink, TransactionLink, WalletLink } from '../../components'
import { numberWithCommas, convertNumberToText, dateToUTC, isContractAddress, calcTime } from '../../utils/utils'
import { TX_TYPE } from '../../utils/const'

// TODO 정리
class AddressTableBody extends Component {
	render() {
		const TableRow = (_txType, _data, _address) => {
			if (_txType === TX_TYPE.TOKEN_TX) {
				const { txHash, age, fromAddr, toAddr, quantity, state, tokenSymbol } = _data
				const isError = state === 0
				return (
					<tr>
						<TxHashCell isError={isError} txHash={txHash}/>
						<td>{calcTime(age)}</td>
						<AddressCell targetAddr={fromAddr} address={undefined}/>
						<SignCell address={undefined} fromAddr={fromAddr} toAddr={toAddr}/>
						<AddressCell targetAddr={toAddr} address={undefined}/>
						<td><span>{convertNumberToText(quantity , 'icx', 4)}</span><em>{tokenSymbol}</em></td>
					</tr>
				)
			}
			else if (_txType === TX_TYPE.TOKEN_HOLDERS) {
				const { rank, address, quantity, percentage, tokenSymbol } = _data
				return (
					<tr>
						<td>{rank}</td>
						<AddressCell targetAddr={address} address={undefined}/>
						<td><span>{convertNumberToText(quantity , 'icx', 4)}</span><em>{tokenSymbol}</em></td>
						<td><span>{percentage}</span><em>%</em></td>
					</tr>	
				)
			}
			else {
				const { txHash, height, createDate, fromAddr, toAddr, amount, fee, state, tokenQuantity, tokenName, tokenSymbol } = _data
				const isWalletTokenTx = _txType === TX_TYPE.ADDRESS_TOKEN_TX
				const isBlockTx = _txType === TX_TYPE.BLOCK_TX		
				const isError = state === 0
				return (
					<tr>
						<TxHashCell isError={isError} txHash={txHash} />
						{!isBlockTx && <td className="on break"><BlockLink to={height || 0} label={numberWithCommas(height)} /></td>}
						{!isBlockTx && <td className={!createDate ? 'no' : 'break'}>{dateToUTC(createDate)}</td>}
						<AddressCell targetAddr={fromAddr} address={address} />
						<SignCell address={address} fromAddr={fromAddr} toAddr={toAddr}/>
						<AddressCell targetAddr={toAddr} address={address} />
						<td><span>{convertNumberToText((isWalletTokenTx ? tokenQuantity : amount) , 'icx', 4)}</span><em>{isWalletTokenTx ? tokenSymbol : 'ICX'}</em></td>
						<LastCell isWalletTokenTx={isWalletTokenTx} fee={fee} tokenName={tokenName} tokenSymbol={tokenSymbol} />
					</tr>
				)
			}
		}
		const { txType, data, address } = this.props
		return TableRow(txType, data, address)
	}
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

const LastCell = ({ isWalletTokenTx, fee, tokenName, tokenSymbol }) => {
	if (isWalletTokenTx) {
		return <td>{tokenName} ({tokenSymbol})</td>
	}
	else {
		return <td><span>{convertNumberToText(fee, 'icx')}</span><em>ICX</em></td>
	}
}

const TxHashCell = ({ isError, txHash }) => {
	let _txHash, className
	if (txHash === '-') {
		_txHash = txHash
		className = 'no'
	}
	else if (isError) {
		_txHash = <TransactionLink to={txHash}/>
		className = 'icon error'
	}
	else {
		_txHash = <TransactionLink to={txHash}/>
		className = 'on'
	}
	return <td className={className}>{isError && <i className="img"></i>}<span className="ellipsis">{_txHash}</span></td>
}

const AddressCell = ({ targetAddr, address }) => {
	const isContract = isContractAddress(targetAddr)
	let _targetAddr, className
	if (!targetAddr) {
		_targetAddr = '-'
		className = 'no'
	}
	else if (targetAddr === address) {
		_targetAddr = address
		className = isContract ? 'icon' : ''
	}
	else {
		_targetAddr = <WalletLink to={targetAddr} />
		className = `on ${isContract ? 'icon' : ''}`
	}
	return <td className={className}>{isContract && <i className="img"></i>}<span className="ellipsis">{_targetAddr}</span></td>
}

export default AddressTableBody