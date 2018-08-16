import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import web3Utils from 'web3-utils'
import {
	CopyButton,
	LoadingComponent,
	AddressLink,
	BlockLink,
	AddressCell
} from 'components'
import {
	convertNumberToText,
	numberWithCommas,
	isValidData,
	dateToUTC,
	utcDateInfo,
	beautifyJson,
	removeQuotes,
} from 'utils/utils'

class TransactionInfo extends Component {

	render() {
		const { transaction } = this.props
		const { loading, data } = transaction
		const Contents = () => {
			if (loading) {
				return <LoadingComponent height='206px' />
			}
			else {
				const {
					errorMsg,
					tokenTxList,
					internalTxList,
					txType,
					txHash,
					status,
					createDate,
					height,
					confirmation,
					fromAddr,
					toAddr,
					amount,
					stepLimit,
					stepUsedByTxn,
					stepPrice,
					dataString,
					fee,
					feeUsd,
					dataType,
					targetContractAddr
				} = data
				const _stepPrice = stepPrice || "0"
				const stepPriceGloop = web3Utils.fromWei(_stepPrice, "Gwei")
				const stepPriceIcx = web3Utils.fromWei(_stepPrice, "ether")
				const isFail = status === 'Fail'
				const isErrorMsg = isValidData(errorMsg)

				return (
					<div className="screen0">
						<div className="wrap-holder">
							<p className="title">Transaction</p>
							<div className="contents">
								<table className="table-typeB transaction">
									<tbody>
										<tr>
											<td>TxHash</td>
											<td>{txHash}<CopyButton data={txHash} title={'Copy TxHash'} isSpan /></td>
										</tr>
										<tr>
											<td>Status</td>
											<td className={isFail ? 'fail' : ''}>{status} {(isFail && isErrorMsg) && `- ${errorMsg}`}</td>
										</tr>
										<tr>
											<td>Block Height</td>
											<td><span><BlockLink to={height} label={numberWithCommas(height)} /></span><em>{`(${numberWithCommas(confirmation)} Confirmations)`}</em></td>
										</tr>
										<tr>
											<td>Time Stamp</td>
											<td>{dateToUTC(createDate)}<em>{utcDateInfo(createDate)}</em></td>
										</tr>
										<tr>
											<td>From</td>
											<AddressRow address={fromAddr} txType={txType} targetContractAddr={targetContractAddr} />
										</tr>
										<tr>
											<td>To</td>
											<AddressRow address={toAddr} internalTxList={internalTxList} txType={txType} targetContractAddr={targetContractAddr} />
										</tr>
										<tr>
											<td>Amount</td>
											<td>{`${convertNumberToText(amount)} ICX`}</td>
										</tr>
										{
											(!!tokenTxList && tokenTxList.length !== 0) &&
											<tr>
												<td>Token transfer</td>
												<TokenTransferCell tokenTxList={tokenTxList} />
											</tr>
										}
										<tr>
											<td>STEP limit</td>
											<td>{convertNumberToText(stepLimit)}</td>
										</tr>
										<tr>
											<td>STEP used by Txn</td>
											<td>{convertNumberToText(stepUsedByTxn)}</td>
										</tr>
										<tr>
											<td>STEP price</td>
											<td>{`${convertNumberToText(stepPriceGloop)} Gloop`}<em>{`(${convertNumberToText(stepPriceIcx)} ICX)`}</em></td>
										</tr>
										<tr>
											<td>Actual TxFee</td>
											<td>{`${convertNumberToText(fee)} ICX`}<em>{`(${convertNumberToText(feeUsd, 2)} USD)`}</em></td>
										</tr>
										<tr>
											<td>Data</td>
											<DataCell dataType={dataType} dataString={dataString} />
										</tr>
									</tbody>
								</table>
							</div>
						</div>
					</div>
				)
			}
		}
		return Contents()
	}
}
class DataCell extends Component {
	constructor(props) {
		super(props)
		this.state = {
			viewUtf8: false
		}
	}

	handleClick = () => {
		const { dataType } = this.props
		if (dataType === 'message') {
			this.setState({ viewUtf8: !this.state.viewUtf8 })
		}
	}

	getButtonTitle = () => {
		const { viewUtf8 } = this.state
		if (viewUtf8) {
			return 'Convert to HEX'
		}

		return 'Convert to UTF-8'
	}

	getDataString = () => {
		const { viewUtf8 } = this.state
		const { dataType, dataString } = this.props
		try {
			if (dataType !== 'message') {
				return beautifyJson(dataString, '\t')
			}

			const _removed = removeQuotes(dataString)
			if (viewUtf8) {
				return web3Utils.hexToUtf8(_removed)
			}
			else {
				return _removed
			}
		}
		catch (e) {
			console.log(e)
			return dataString
		}
	}

	render() {
		const { dataType } = this.props
		const buttonTitle = this.getButtonTitle()
		const dataString = this.getDataString()
		return (
			<td className="convert">
				<div className="scroll">
					<p style={{ whiteSpace: 'pre' }}>{dataString}</p>
				</div>
				<button className="btn-type-normal" onClick={this.handleClick} disabled={dataType !== 'message'}>{buttonTitle}</button>
			</td>
		)
	}
}

const TokenTransferCell = ({ tokenTxList }) => {
	return (
		<td>
			{
				tokenTxList.map((tokenTx, index) => {
					const { fromAddr, quantity, symbol, toAddr, tokenName } = tokenTx
					return (
						<p key={index}>
							{quantity} {symbol}<em>({tokenName})</em>
							&emsp;from &emsp;<AddressLink to={fromAddr} label={<span className="ellipsis">{fromAddr}</span>} />
							&emsp;to&emsp;<AddressLink to={toAddr} label={<span className="ellipsis">{fromAddr}</span>} />
						</p>
					)
				})
			}
		</td>
	)
}

const AddressRow = ({ address, txType, internalTxList, targetContractAddr }) => {
	const isAddress = isValidData(address)
	if (isAddress) {
		const isInternalTxList = !!internalTxList && internalTxList.length !== 0
		return (
			<AddressCell targetAddr={address} txType={txType} targetContractAddr={targetContractAddr} spanNoEllipsis tdClassName="trans"
				InternalDiv={
					isInternalTxList &&
					<div>
						{internalTxList.map((tx, index) => {
							const { amount, fromAddr, toAddr } = tx
							return (
								<p key={index}>
									┗&emsp;TRANSFER {convertNumberToText(amount)} ICX
									&emsp;from &emsp;<span><AddressLink to={fromAddr} /></span>
									&emsp;to&emsp;<span><AddressLink to={toAddr} /></span>
								</p>
							)
						})}
					</div>
				}
			/>
		)
	}
	else {
		return <td>-</td>
	}
}


export default withRouter(TransactionInfo);
