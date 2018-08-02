import React from 'react';
import {
	AddressLink,
	CopyButton
} from 'components'
import {
	SERVER_TX_TYPE
} from 'utils/const'
import {
	isScoreTx,
	isContractAddress,
	isValidData
} from 'utils/utils'

function addIconClassName(tdClassName, isScoreTx, isContractAddress) {
	const _tdClassName = !!tdClassName ? tdClassName : 'icon'
	
	let className = ""
	if (isScoreTx) {
		className += `${_tdClassName} calen`
	}
	else if (isContractAddress) {
		className += `${_tdClassName}`
	}
	return className
}

function addLinkClassName(isTargetContractAddr, isScoreTx, isOtherContract, isOtherAddress) {
	let className = ""
	if (isScoreTx) {
		if (isTargetContractAddr && isOtherContract) {
			className += " on"
		}
	}
	else {
		if (isOtherAddress) {
			className += " on"
		}
	}
	return className
}

function getBoolean(targetAddr, address, txType, targetContractAddr, tdClassName) {
	const _isScoreTx = isScoreTx(targetAddr, txType)
	const _isContractAddress = isContractAddress(targetAddr)
	const _isOtherAddress = targetAddr !== address
	const _isOtherContract = targetContractAddr !== address
	const _isListCell = tdClassName !== 'trans'
	return {
		_isScoreTx,
		_isContractAddress,
		_isOtherAddress,
		_isOtherContract,
		_isListCell
	}
}

function getClassName(targetAddr, address, txType, targetContractAddr, tdClassName) {
	const _getBoolean = getBoolean(targetAddr, address, txType, targetContractAddr, tdClassName)
	const {
		_isScoreTx,
		_isContractAddress,
		_isOtherAddress,
		_isOtherContract,
		_isListCell
	} = _getBoolean
	
	let className = addIconClassName(tdClassName, _isScoreTx, _isContractAddress)
	if (_isListCell) {
		className += addLinkClassName(!!targetContractAddr, _isScoreTx, _isOtherContract, _isOtherAddress)
	}
	return className
}

function getInnerElements(targetAddr, address, txType, targetContractAddr, spanNoEllipsis, tdClassName) {
	const _getBoolean = getBoolean(targetAddr, address, txType, targetContractAddr, tdClassName)
	const {
		_isScoreTx,
		_isContractAddress,
		_isOtherAddress,
		_isOtherContract,
		_isListCell
	} = _getBoolean

	let elements = []
	if (_isScoreTx) {
		elements.push(<i key="i" className="img"></i>)
	}
	else if (_isContractAddress) {
		elements.push(<i key="i" className="img"></i>)
	}

	if (_isScoreTx) {
		const scoreTxTypeText = SERVER_TX_TYPE[txType]
		elements.push(
			<span key="span">
				{(!!targetContractAddr && _isOtherContract) ? <AddressLink label={scoreTxTypeText} to={targetContractAddr} /> : scoreTxTypeText}
			</span>
		)	
	}
	else {
		elements.push(
			<span key="span" className={spanNoEllipsis ? '' : 'ellipsis'}>
				{_isOtherAddress ? <AddressLink to={targetAddr} /> : address}
			</span>			
		)
	}

	if (!_isListCell) {
		elements.push(
			<CopyButton key="copy" data={targetAddr} title={'Copy Address'} isSpan disabled={_isScoreTx} />
		)
	}

	return elements
}

const AddressCell = ({ targetAddr, address, txType, targetContractAddr, tdClassName, spanNoEllipsis, InternalDiv }) => {
	if (!isValidData(targetAddr)) {
		return <td className="no">-</td>
	}
	const className = getClassName(targetAddr, address, txType, targetContractAddr, tdClassName)
	const innerElements = getInnerElements(targetAddr, address, txType, targetContractAddr, spanNoEllipsis, tdClassName)
	return <td className={className}>{innerElements}{InternalDiv}</td>
}

export default AddressCell