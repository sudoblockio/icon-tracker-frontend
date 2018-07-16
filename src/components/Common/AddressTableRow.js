import React, { Component } from 'react';
import { BlockLink, TransactionLink, WalletLink } from '../../components'
import { numberWithCommas, convertNumberToText, dateToUTC, isContractAddress } from '../../utils/utils'

class AddressTableRow extends Component {
	render() {
		const { data, address, txType } = this.props
		const { txHash, height, createDate, fromAddr, toAddr, amount, fee, state, tokenQuantity, tokenName, tokenSymbol } = data
		const isOut = fromAddr === address
		const isError = state === 0
		const isTokenTx = txType === 'addresstokentx'
		const isBlockTx = txType === 'blocktx'
		return (
			<tr>
				<TxHashCell isError={isError} txHash={txHash} />
				{!isBlockTx && <td className="on break"><BlockLink to={height || 0} label={numberWithCommas(height)} /></td>}
				{!isBlockTx && <td className={!createDate ? 'no' : 'break'}>{dateToUTC(createDate)}</td>}
				<AddressCell targetAddr={fromAddr} address={address} />
				<SignCell address={address} fromAddr={fromAddr} toAddr={toAddr}/>
				<AddressCell targetAddr={toAddr} address={address} />
				<td><span>{convertNumberToText((isTokenTx ? tokenQuantity : amount) , 'icx', 4)}</span><em>{isTokenTx ? tokenSymbol : 'ICX'}</em></td>
				<LastCell isTokenTx={isTokenTx} fee={fee} tokenName={tokenName} tokenSymbol={tokenSymbol} />
			</tr>
		)
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

const LastCell = ({ isTokenTx, fee, tokenName, tokenSymbol }) => {
	if (isTokenTx) {
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

export default AddressTableRow