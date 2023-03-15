import React, { Component } from 'react';
import {
	AddressLink,
	CopyButton
} from '../../components'
import {
	SERVER_TX_TYPE
} from '../../utils/const'
import {
	isScoreTx,
	isContractAddress,
	isValidData
} from '../../utils/utils'

function getBooleans(props) {
	const _isScoreTx = isScoreTx(props.targetAddr, props.txType, props.isFrom)
	const _isContractAddress = isContractAddress(props.targetAddr)
	const _isOtherAddress = props.targetAddr !== props.address
	const _isOtherContract = props.targetContractAddr !== props.address
	const _isListCell = props.tdClassName !== 'trans'
	return {
		_isScoreTx,
		_isContractAddress,
		_isOtherAddress,
		_isOtherContract,
		_isListCell,
	}
}

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

function getClassName(props, booleans) {
	const { _isScoreTx, _isContractAddress, _isOtherAddress, _isOtherContract, _isListCell } = booleans
	
	let className = addIconClassName(props.tdClassName, _isScoreTx, _isContractAddress)
	if (_isListCell) {
		className += addLinkClassName(!!props.targetContractAddr, _isScoreTx, _isOtherContract, _isOtherAddress)
	}
	return className
}

function getInnerElements(props, booleans) {
	const { _isScoreTx, _isContractAddress, _isOtherAddress, _isOtherContract, _isListCell } = booleans

	let elements = []
	if (_isScoreTx) {
		elements.push(<i key="i" className="img"></i>)
	}
	else if (_isContractAddress) {
		elements.push(<i key="i" className="img"></i>)
	}

	if (_isScoreTx) {
		const scoreTxTypeText = SERVER_TX_TYPE[props.txType]
		elements.push(
			<span key="span">
				{(!!props.targetContractAddr && _isOtherContract) ? <AddressLink label={scoreTxTypeText} to={props.targetContractAddr} /> : scoreTxTypeText}
			</span>
		)	
	}
	else {
		elements.push(
			<span key="span" className={props.spanNoEllipsis ? '' : 'ellipsis'}>
				{_isOtherAddress ? <AddressLink to={props.targetAddr} onClickTab={props.onClickTab} /> : props.address}
			</span>			
		)
	}

	if (!_isListCell) {
		elements.push(
			<CopyButton key="copy" data={props.targetAddr} title={'Copy Address'} isSpan disabled={_isScoreTx} download={props.download} />
		)
	}

	return elements
}

class AddressCell extends Component {
	render() {
		const Content = () => {
			if (!isValidData(this.props.targetAddr)) {
				return <td className="no">-</td>
			}
			const booleans = getBooleans(this.props)
			const className = getClassName(this.props, booleans)
			const innerElements = getInnerElements(this.props, booleans)
			return (
				<td className={className}>
					{innerElements}
					{this.props.InternalDiv}
				</td>		
			)
		}

		return Content()
	}
}

export default AddressCell

