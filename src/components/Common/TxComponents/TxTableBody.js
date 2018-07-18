import React, { Component } from 'react';
import { 
    calcTime,
    convertNumberToText,
	isContractAddress,
	numberWithCommas,
	dateToUTC,
	tokenText
} from '../../../utils/utils'
import {
    TransactionLink,
	WalletLink,
	BlockLink,
	TokenLink
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

const AddressCell = ({ targetAddr, address, noEllipsis }) => {
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
	return <td className={className}>{isContract && <i className="img"></i>}<span className={noEllipsis ? '' : 'ellipsis' }>{_targetAddr}</span></td>
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

const TokenCell = ({name, symbol, address}) => {
	return <td><TokenLink label={name} to={address}/>{/*tokenText(name, symbol, address)*/}</td>
}

const AgeCell = ({ age }) => {
	let className, ageText
	if (!age || age === "-") {
		className = "no"
		ageText = "-"
	}
	else {
		className = "break"
		ageText = calcTime(age)
	}
	return <td className={className}>{ageText}</td>
}

const DateCell = ({ date }) => {
	let className, dateText
	if (!date || date === "-") {
		className = "no"
		dateText = "-"
	}
	else {
		className = "break"
		dateText = dateToUTC(date)
	}
	return <td className={className}>{dateText}</td>
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
				height, 
				amount, 
				createDate,
				fee,
				contractSymbol,
				contractName,
				contractAddr,
				tokenName,
				symbol,
				tokenQuantity,
				rank,
				tokenSymbol,
				percentage
			} = data

			const addressInData = data.address
			const isError = state === 0
			
			// TODO calcAgeTime 새로 만들 것
			// TODO amount, tokenQuantity, quantity 구분
			switch (txType) {
                case TX_TYPE.CONTRACT_TX:
                    return (
                        <tr>
                            <TxHashCell isError={isError} txHash={txHash}/>
                            <AgeCell age={age}/>
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
							<td className="on break"><BlockLink to={height} label={numberWithCommas(height)}/></td>
							<DateCell date={createDate}/>
							<AddressCell targetAddr={fromAddr} address={address} />
                            <SignCell fromAddr={fromAddr} toAddr={toAddr} address={address}/>
                            <AddressCell targetAddr={toAddr} address={address}/>
							<td><span>{convertNumberToText(amount , 'icx', 4)}</span><em>ICX</em></td>
							<td><span>{convertNumberToText(fee, 'icx')}</span><em>ICX</em></td>
                        </tr>   
                    )                       
				case TX_TYPE.ADDRESS_TOKEN_TX:
                    return (
                        <tr>
                            <TxHashCell isError={isError} txHash={txHash}/>
							<DateCell date={createDate}/>
                            <AddressCell targetAddr={fromAddr} address={address} />
                            <SignCell fromAddr={fromAddr} toAddr={toAddr} address={address}/>
                            <AddressCell targetAddr={toAddr} address={address}/>
							<td><span>{convertNumberToText(amount , 'icx', 4)}</span><em>{contractSymbol}</em></td>
							<TokenCell name={contractName} symbol={contractSymbol} address={contractAddr}/>
                        </tr>   
                    )                       
				case TX_TYPE.TRANSACTIONS:
                    return (
                        <tr>
                            <TxHashCell isError={isError} txHash={txHash}/>
							<td className="on break"><BlockLink to={height} label={numberWithCommas(height)}/></td>
							<td className='break'>{dateToUTC(createDate)}</td>
                            <AddressCell targetAddr={fromAddr}/>
                            <SignCell fromAddr={fromAddr} toAddr={toAddr}/>
                            <AddressCell targetAddr={toAddr}/>
							<td><span>{convertNumberToText(amount , 'icx', 4)}</span><em>ICX</em></td>
							<td><span>{convertNumberToText(fee, 'icx')}</span><em>ICX</em></td>
                        </tr>   
                    )                       
				case TX_TYPE.TOKEN_TRANSFERS:
                    return (
                        <tr>
                            <TxHashCell isError={isError} txHash={txHash}/>
							<td className='break'>{calcTime(createDate)}</td>
                            <AddressCell targetAddr={fromAddr}/>
                            <SignCell fromAddr={fromAddr} toAddr={toAddr}/>
                            <AddressCell targetAddr={toAddr}/>
							<td><span>{convertNumberToText(tokenQuantity , 'icx', 4)}</span><em>{symbol}</em></td>
							<TokenCell name={tokenName} symbol={symbol} address={contractAddr}/>
                        </tr>   
                    )                       
				case TX_TYPE.BLOCK_TX:
                    return (
                        <tr>
							<TxHashCell isError={isError} txHash={txHash} />
                            <AddressCell targetAddr={fromAddr}/>
                            <SignCell fromAddr={fromAddr} toAddr={toAddr}/>
                            <AddressCell targetAddr={toAddr}/>
							<td><span>{convertNumberToText(amount , 'icx', 4)}</span><em>ICX</em></td>
							<td><span>{convertNumberToText(fee, 'icx')}</span><em>ICX</em></td>
                        </tr>   
                    )                       
				case TX_TYPE.TOKEN_TX:
                    return (
                        <tr>
                            <TxHashCell isError={isError} txHash={txHash}/>
							<td className='break'>{calcTime(createDate)}</td>
                            <AddressCell targetAddr={fromAddr}/>
                            <SignCell fromAddr={fromAddr} toAddr={toAddr}/>
                            <AddressCell targetAddr={toAddr}/>
							<td><span>{convertNumberToText(amount , 'icx', 4)}</span><em>{symbol}</em></td>
                        </tr>   
                    )
				case TX_TYPE.TOKEN_HOLDERS:
                    return (
                        <tr>
							<td>{rank}</td>
							<AddressCell targetAddr={addressInData} noEllipsis={true}/>
							<td><span>{convertNumberToText(quantity , 'icx', 4)}</span><em>{symbol}</em></td>
							<td><span>{percentage}</span><em>%</em></td>
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