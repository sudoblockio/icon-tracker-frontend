import React from 'react';
import {
	AddressLink
} from 'components'
import {
	SERVER_TX_TYPE
} from 'utils/const'
import {
	isScoreTx,
	isContractAddress,
	isValidData
} from 'utils/utils'

function getClassName(targetAddr, address, txType, targetContractAddr, tdClassName) {
	const _isScoreTx = isScoreTx(targetAddr, txType)
	const _isContractAddress = isContractAddress(targetAddr)
	const isOtherAddress = targetAddr !== address
	const isOtherContract = targetContractAddr !== address
	const _tdClassName = !!tdClassName ? tdClassName : 'icon'
	
	let className = ""
	if (_isScoreTx) {
		className += `${_tdClassName} calen`
	}
	else if (_isContractAddress) {
		className += `${_tdClassName}`
	}

	if (_isScoreTx) {
		if (!!targetContractAddr && isOtherContract) {
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

function getInnerElements(targetAddr, address, spanNoEllipsis, txType, targetContractAddr) {
	const _isScoreTx = isScoreTx(targetAddr, txType)
	const _isContractAddress = isContractAddress(targetAddr)
	const isOtherAddress = targetAddr !== address
	const isOtherContract = targetContractAddr !== address

	console.log(targetContractAddr, isOtherContract)
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
				{(!!targetContractAddr && isOtherContract) ? <AddressLink label={scoreTxTypeText} to={targetContractAddr} /> : scoreTxTypeText}
			</span>
		)
	}
	else {
		elements.push(
			<span key="span" className={spanNoEllipsis ? '' : 'ellipsis'}>
				{isOtherAddress ? <AddressLink to={targetAddr} /> : address}
			</span>
		)
	}

	return elements
}

const AddressCell = ({ targetAddr, address, tdClassName, spanNoEllipsis, txType, targetContractAddr, InternalDiv }) => {
	if (!isValidData(targetAddr)) {
		return <td className="no">-</td>
	}
	const className = getClassName(targetAddr, address, txType, targetContractAddr, tdClassName)
	const innerElements = getInnerElements(targetAddr, address, spanNoEllipsis, txType, targetContractAddr)
	return <td className={className}>{innerElements}{InternalDiv}</td>
}

export default AddressCell