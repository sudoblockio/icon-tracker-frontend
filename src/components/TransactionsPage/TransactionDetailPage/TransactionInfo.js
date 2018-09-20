import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import web3Utils from 'web3-utils'
import Worker from 'worker-loader!workers/converter.js'; // eslint-disable-line import/no-webpack-loader-syntax
import {
	CopyButton,
	LoadingComponent,
	AddressLink,
	BlockLink,
	AddressCell
} from 'components'
import {
	makeDownloadLink,
	convertNumberToText,
	numberWithCommas,
	isValidData,
	dateToUTC,
	utcDateInfo,
	beautifyJson,
} from 'utils/utils'

class TransactionInfo extends Component {
	constructor(props) {
		super(props)
		this.state = {
			download: undefined,
		}
	}

	componentWillReceiveProps(nextProps) {
		const { download } = this.state
		if (download) {
			return
		}

		this.getDownloadLink(nextProps)
	}

	getDownloadLink = async (props) => {
		const { transaction } = props
		const { data } = transaction
		const { targetContractAddr, contractVersion } = data

		if (isValidData(targetContractAddr) && isValidData(contractVersion)) {
			const link = await makeDownloadLink(targetContractAddr, contractVersion)
			const name = `${targetContractAddr}_${contractVersion}.zip`
			this.setState({
				download: {
					link, name
				}
			})
		}
	}

	render() {
		const { download } = this.state
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
											<td><span><BlockLink to={height} label={numberWithCommas(height)} /></span><em>{`(${numberWithCommas(confirmation)} Confirmation(s))`}</em></td>
										</tr>
										<tr>
											<td>Time Stamp</td>
											<td>{dateToUTC(createDate)}<em>{utcDateInfo(createDate)}</em></td>
										</tr>
										<tr>
											<td>From</td>
											<AddressRow address={fromAddr} txType={txType} targetContractAddr={targetContractAddr} isFrom />
										</tr>
										<tr>
											<td>To</td>
											<AddressRow address={toAddr} internalTxList={internalTxList} txType={txType} targetContractAddr={targetContractAddr} download={download} />
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
											<td>Step Limit</td>
											<td>{convertNumberToText(stepLimit)}</td>
										</tr>
										<tr>
											<td>Step used by Txn</td>
											<td>{convertNumberToText(stepUsedByTxn)}</td>
										</tr>
										<tr>
											<td>Step Price</td>
											<td>{convertNumberToText(stepPriceIcx)} ICX<em>({convertNumberToText(stepPriceGloop)} Gloop)</em></td>
										</tr>
										<tr>
											<td>Actual TxFee</td>
											<td>{convertNumberToText(fee)} ICX<em>({convertNumberToText(feeUsd, 3)} USD)</em></td>
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
			removed: '',
			converted: '',
			loading: false,
			viewHex: false,
		}

		this.workers = []
	}

	async componentWillMount() {
		this.getDataString()
	}

	componentWillUnmount() {
		this.workers.forEach(worker => {
			worker.terminate()
		})
	}

	promiseWorker = (type, payload) => {
		let worker = new Worker()
		this.workers.push(worker)
		this.setState({ loading: true }, () => {
			worker.postMessage({ type, payload })
		})
		return new Promise(resolve => {
			worker.onmessage = message => {
				this.setState({ loading: false }, () => {
					const { payload } = message.data
					resolve(payload)
					worker.terminate()
				})
			}
		})
	}

	getDataString = async () => {
		const { dataType, dataString } = this.props
		try {
			if (dataType === 'message') {
				const { viewHex } = this.state
				const removed = await this.promiseWorker('removeQuotes', dataString)
				const isHex = web3Utils.isHex(removed)
				if (viewHex && !isHex) {
					const toHex = await this.promiseWorker('utf8ToHex', removed)
					this.setState({ converted: toHex })
				}
				else if (!viewHex && isHex) {
					let toUtf8 = await this.promiseWorker('hexToUtf8', removed)
					// alert(toUtf8)
					this.setState({ converted: toUtf8 })
				}
				else {
					this.setState({ converted: removed })
				}
			}
			else {
				this.setState({ converted: beautifyJson(dataString, '\t') })
			}
		}
		catch (e) {
			console.error(e)
			this.setState({ converted: dataString })
		}
	}

	handleClick = () => {
		const { dataType } = this.props
		if (dataType === 'message') {
			this.setState({ viewHex: !this.state.viewHex }, () => {
				this.getDataString()
			})
		}
	}

	render() {
		const { dataType } = this.props
		const { converted, loading, viewHex } = this.state
		const buttonTitle = viewHex ? 'Convert to UTF-8' : 'Convert to HEX'
		return (
			<td className="convert">
				<div className="scroll">
					<p>{converted}</p>
				</div>
				<button className="btn-type-normal" onClick={this.handleClick} disabled={!(dataType === 'message' && !loading)}>{buttonTitle}</button>
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
							&emsp;to&emsp;<AddressLink to={toAddr} label={<span className="ellipsis">{toAddr}</span>} />
						</p>
					)
				})
			}
		</td>
	)
}

const AddressRow = ({ address, txType, internalTxList, targetContractAddr, isFrom, download }) => {
	const isAddress = isValidData(address)
	if (isAddress) {
		const isInternalTxList = !!internalTxList && internalTxList.length !== 0
		return (
			<AddressCell
				targetAddr={address}
				txType={txType}
				targetContractAddr={targetContractAddr}
				spanNoEllipsis
				tdClassName="trans"
				isFrom={isFrom}
				download={download}
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
