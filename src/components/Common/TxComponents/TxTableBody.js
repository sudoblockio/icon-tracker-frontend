import React, { Component } from 'react';
import { 
    calcTime,
    convertNumberToText,
	isContractAddress,
	numberWithCommas,
	dateToUTC
} from '../../../utils/utils'
import {
    TransactionLink,
	WalletLink,
	BlockLink
} from '../../../components'
import { 
    TX_TYPE
} from '../../../utils/const'

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

class TxTableBody extends Component {
	render() {
		const TableRow = (_props) => {
            const { 
				txType, 
				data, 
				address 
			} = _props
			
			const { 
				txHash, 
				age, 
				fromAddr, 
				toAddr, 
				quantity, 
				state, 
				tokenSymbol, 
				height, 
				amount, 
				createDate,
				fee
			} = data

			const isError = state === 0
			
			switch (txType) {
                case TX_TYPE.CONTRACT_TX:
                    return (
                        <tr>
                            <TxHashCell isError={isError} txHash={txHash}/>
                            <td>{calcTime(age)}</td>
                            <AddressCell targetAddr={fromAddr}/>
                            <SignCell fromAddr={fromAddr} toAddr={toAddr}/>
                            <AddressCell targetAddr={toAddr}/>
                            <td><span>{convertNumberToText(quantity , 'icx')}</span><em>ICX</em></td>
                        </tr>   
                    )                       
				case TX_TYPE.ADDRESS_TX:
                    return (
                        <tr>
                            <TxHashCell isError={isError} txHash={txHash}/>
							<td className="on break"><BlockLink to={height || 0} label={numberWithCommas(height)}/></td>
							<td className={'break'}>{dateToUTC(createDate)}</td>
                            <AddressCell targetAddr={fromAddr} address={address} />
                            <SignCell fromAddr={fromAddr} toAddr={toAddr} address={address}/>
                            <AddressCell targetAddr={toAddr} address={address}/>
							<td><span>{convertNumberToText(amount , 'icx', 4)}</span><em>ICX</em></td>
							<td><span>{convertNumberToText(fee, 'icx')}</span><em>ICX</em></td>
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