import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import web3Utils from 'web3-utils'
import {
	convertNumberToText,
	numberWithCommas,
	isVaildData,
	dateToUTC,
	utcDateInfo,
	isContractAddress
} from '../../utils/utils'
import {
	CopyButton,
	LoadingComponent,
	WalletLink,
	BlockLink
} from '../../components'

class TransactionInfo extends Component {

	render() {
		const { transaction } = this.props
		const { loading, data } = transaction
		const Contents = () => {
			if (loading) {
				return <LoadingComponent height='206px' />
			}
			else {
				const { errorMsg, tokenTxList, txType, txHash, status, createDate, height, confirmation, fromAddr, toAddr, amount, stepLimit, stepUsedByTxn, stepPrice, dataString, fee, feeUsd } = data
				const stepPriceLoop = web3Utils.toWei(stepPrice || "0", "ether")
				// const stepPriceGloop = web3Utils.fromWei(stepPriceLoop, "Gwei")

				const _tokenTxList = tokenTxList || []
				const isTokenTx = txType === "1"

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
											<td>{status}{isVaildData(errorMsg) && <em>({errorMsg})</em>}</td>
										</tr>
										<tr>
											<td>Block Height</td>
											<td><span><BlockLink to={height} /></span><em>{`(${numberWithCommas(confirmation)} Confirmations)`}</em></td>
										</tr>
										<tr>
											<td>Time Stamp</td>
											<td>{dateToUTC(createDate)}<em>{utcDateInfo(createDate)}</em></td>
										</tr>
										<tr>
											<td>From</td>
											<AddressCell address={fromAddr} />
										</tr>
										<tr>
											<td>To</td>
											<AddressCell address={toAddr} />
										</tr>
										{
											!isTokenTx ?
												<tr>
													<td>Amount</td>
													<td>{`${convertNumberToText(amount, 'icx')} ICX`}</td>
												</tr>
												:
												<tr>
													<td>Token transfer</td>
													<td>
														{
															_tokenTxList.map((tokenTx, index) => {
																const { fromAddr, quantity, symbol, toAddr, tokenName } = tokenTx
																return <p key={index}>{quantity} {symbol}<em>({tokenName})</em>&emsp; from &emsp;<WalletLink to={fromAddr} />&emsp;to&emsp;<WalletLink to={toAddr} /></p>
															})
														}
													</td>
												</tr>
										}

										<tr>
											<td>STEP limit</td>
											<td>{convertNumberToText(stepLimit, 'icx')}</td>
										</tr>
										<tr>
											<td>STEP used by Txn</td>
											<td>{convertNumberToText(stepUsedByTxn, 'icx')}</td>
										</tr>
										<tr>
											<td>STEP price</td>
											<td>{`${convertNumberToText(stepPrice, 'icx')} ICX`}<em>{`(${convertNumberToText(stepPriceLoop, 'icx')} loop)`}</em></td>
										</tr>
										<tr>
											<td>Actual TxFee</td>
											<td>{`${convertNumberToText(fee, 'icx')} ICX`}<em>{`(${convertNumberToText(feeUsd, 'usd')} USD)`}</em></td>
										</tr>
										<tr>
											<td>Data</td>
											<td className="convert">
												<div className="scroll">
													<p>{dataString}</p>
												</div>
												<button className="btn-type-normal">Convert to UTF-8</button>
											</td>
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

const AddressCell = ({ address }) => {
	const isAddress = isVaildData(address)
	if (isAddress) {
		const isContract = isContractAddress(address)
		let className = ''
		if (isContract) {
			className = 'trans'
		}
		return <td className={className}>{isContract && <i className="img"></i>}<span><WalletLink to={address} /></span><CopyButton data={address} title={'Copy Address'} isSpan /></td>
	}
	else {
		return <td>-</td>
	}
}


export default withRouter(TransactionInfo);
