import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { IconAmount, IconConverter } from 'icon-sdk-js'
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
	removeQuotes,
	isHex,
	isImageData
} from 'utils/utils'

const COUNT = 10

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
				const stepPriceLoop = IconAmount.of(_stepPrice, IconAmount.Unit.LOOP)
				const stepPriceGloop = stepPriceLoop.convertUnit(9).toString()
				const stepPriceIcx = stepPriceLoop.convertUnit(IconAmount.Unit.ICX)
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
											<DataCell dataType={dataType} dataString={dataString} imageConverterPopup={this.props.imageConverterPopup} />
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
		return new Promise((resolve, reject) => {
			worker.onmessage = message => {
				this.setState({ loading: false }, () => {
					const { payload } = message.data
					resolve(payload)
					worker.terminate()
				})
			}
		})
	}

	getDataString = () => {
		const { dataType, dataString } = this.props
		const removed = removeQuotes(dataString)
		const _isHex = isHex(removed)
		try {
			if (dataType === 'message') {
				const { viewHex } = this.state
				if (viewHex && !_isHex) {
					const toHex = IconConverter.toHex(removed)
					this.setState({ converted: toHex })
				}
				else if (!viewHex && _isHex) {
					const toUtf8 = IconConverter.toUtf8(removed)
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
		catch (error) {
			console.error(error)
			this.setState({ viewHex: _isHex, converted: removed })
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

	handleImageClick = () => {
		const { dataString } = this.props
		const removed = removeQuotes(dataString)		
		const data = isHex(removed) ? IconConverter.toUtf8(removed) : removed
		this.props.imageConverterPopup({ data })
	}

	render() {
		const { dataType, dataString } = this.props
		const { converted, loading, viewHex } = this.state
		const buttonTitle = viewHex ? 'Convert to UTF-8' : 'Convert to HEX'
		const _isImageData = isImageData(dataString)
		return (
			<td className="convert">
				<div className="scroll">
					<p>{converted}</p>
				</div>
				<button className="btn-type-normal" onClick={this.handleClick} disabled={!(dataType === 'message' && !loading)}>{buttonTitle}</button>
				<button className="btn-type-normal" onClick={this.handleImageClick} disabled={!(dataType === 'message' && !loading && _isImageData)}>Convert to Image</button>
			</td>
		)
	}
}

class TokenTransferCell extends Component {
	constructor(props) {
		super(props)
		this.state = {
			more: false,
		}
	}

	toggleMore = () => {
		this.setState({ more: !this.state.more })
	}

	render() {
		const { more } = this.state
		const { tokenTxList } = this.props
		const isMoreTen = tokenTxList && tokenTxList.length > COUNT
		const tokenTxListSliced = (isMoreTen && !more) ? tokenTxList.slice(0, COUNT) : tokenTxList
		const length = tokenTxList ? tokenTxList.length : 0
		return (
			<td className="transfer">
				{tokenTxListSliced.map((tokenTx, index) => {
					const { fromAddr, quantity, symbol, toAddr, tokenName } = tokenTx
					return (
						<p key={index}>
							{quantity} {symbol}<em>({tokenName})</em>
							&emsp;from &emsp;<AddressLink to={fromAddr} label={<span className="ellipsis">{fromAddr}</span>} />
							&emsp;to&emsp;<AddressLink to={toAddr} label={<span className="ellipsis">{toAddr}</span>} />
						</p>
					)
				})}
				{isMoreTen && 
					<span className={`more`} onClick={this.toggleMore}>
						More ({more ? length : length - COUNT} / {length})
						<i className={`img${more ? ' on' : ''}`}></i>
					</span>
				}
			</td>
		)
	}
}

class InternalTx extends Component {
	constructor(props) {
		super(props)
		this.state = {
			more: false,
		}
	}

	toggleMore = () => {
		this.setState({ more: !this.state.more })
	}

	render() {
		const { more } = this.state
		const { internalTxList } = this.props
		const isMoreTen = internalTxList && internalTxList.length > COUNT
		const internalTxListSliced = (isMoreTen && !more) ? internalTxList.slice(0, COUNT) : internalTxList
		const length = internalTxList ? internalTxList.length : 0
		return (
			<div>
				{internalTxListSliced.map((tx, index) => {
					const { amount, fromAddr, toAddr } = tx
					return (
						<p key={index}>
							┗&emsp;TRANSFER {convertNumberToText(amount)} ICX
							&emsp;from &emsp;<span><AddressLink to={fromAddr} /></span>
							&emsp;to&emsp;<span><AddressLink to={toAddr} /></span>
						</p>
					)
				})}
				{isMoreTen && 
					<span className={`more`} onClick={this.toggleMore}>
						More ({more ? length : length - COUNT}/{length})
						<i className={`img${more ? ' on' : ''}`}></i>
					</span>
				}
			</div>
		)
	}
}

const AddressRow = ({ address, txType, internalTxList, targetContractAddr, isFrom, download }) => {
	const isAddress = isValidData(address)
	if (isAddress) {
		return (
			<AddressCell
				targetAddr={address}
				txType={txType}
				targetContractAddr={targetContractAddr}
				spanNoEllipsis
				tdClassName="trans"
				isFrom={isFrom}
				download={download}
				InternalDiv={(internalTxList && internalTxList.length !== 0) && <InternalTx internalTxList={internalTxList}/>}
			/>
		)
	}
	else {
		return <td>-</td>
	}
}


export default withRouter(TransactionInfo);
