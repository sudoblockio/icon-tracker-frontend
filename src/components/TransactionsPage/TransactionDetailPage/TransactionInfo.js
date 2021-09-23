import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { IconAmount, IconConverter } from 'icon-sdk-js'
import { getTrackerApiUrl } from '../../../redux/api/restV3/config'
import twitterLogo from '../../../style-custom/twitter-logo.png'
import {
	CopyButton,
	LoadingComponent,
	AddressLink,
	BlockLink,
	AddressCell,
	ReportButton
} from '../../../components'
import {
	makeDownloadLink,
	convertNumberToText,
	numberWithCommas,
	isValidData,
	dateToUTC,
	getTimezoneMomentKSTTime,
	utcDateInfo,
	beautifyJson,
	removeQuotes,
	isHex,
	isImageData,
} from '../../../utils/utils'

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

	onTwitterClick = async () => {
		const text = encodeURIComponent('New transaction made #Hyperconnected_ICON ')
		const url = await getTrackerApiUrl()
		const link = `${url}/transaction/${this.props.transaction.data.hash}`
		window.open(`https://twitter.com/intent/tweet?text=${text}&url=${link}`, "_blank", "width=500,block_number=470")
	}

	render() {
		const { download } = this.state
		const { transaction } = this.props
		const { loading, data } = transaction
		const Contents = () => {
			if (loading) {
				return <LoadingComponent block_number='206px' />
			}
			else {
				const {
					errorMsg,
					tokenTxList,
					internalTxList,
					type,
					hash,
					status,
					receipt_status,
					createDate,
					timestamp,
					block_number,
					confirmation,
					from_address,
					to_address,
					value,
					step_limit,
					stepUsedByTxn,
					stepPrice,
					// aliasing the DB column name 'data' to 'dataString' 
					// because 'data' is already used as a global state variable. 
					data: dataString,
					fee,
					feeUsd,
					data_type,
					targetContractAddr,
					reportedCount,
					stepUsedDetails
				} = data
				console.log(data, "tx detail data")
				const _stepPrice = stepPrice || "0"
				const stepPriceLoop = IconAmount.of(_stepPrice, IconAmount.Unit.LOOP)
				const stepPriceGloop = stepPriceLoop.convertUnit(9).toString()
				const stepPriceIcx = stepPriceLoop.convertUnit(IconAmount.Unit.ICX)
				const isFail = receipt_status === 'Fail'
				const isSuccess = Number(receipt_status) === 1
				const isErrorMsg = isValidData(errorMsg)
				const scam = reportedCount >= 10 ?  true: false;
				return (
					<div className="screen0">
						<div className="wrap-holder">
							<p className="title">Transaction</p>
							<div className="contents">
								<div className='table-box'>
								<table className="table-typeB transaction">
									<tbody>
										<tr>
											<td>hash</td>
											<td className={scam ? "scam":""}>
												{scam?<span className="scam-tag">Reported</span>:""}
												{hash}
												<span className="copy twit" onClick={this.onTwitterClick}>
													{/* <i className="img twit-icon"></i> */}
													<img className='custom-twitter' src={twitterLogo} alt='twitter'/>
												</span><CopyButton data={hash} title={'Copy hash'} isSpan />
												<ReportButton address={hash}/>
											</td>
										</tr>
										<tr>
											<td>Status</td>
											<td className={isFail ? 'fail' : ''}>{isSuccess ? 'Success' : 'Fail'} {(isFail && isErrorMsg) && `- ${errorMsg}`}</td>
										</tr>
										<tr>
											<td>Block</td>
											<td><span><BlockLink to={block_number} label={numberWithCommas(block_number)} /></span><em>{`(${confirmation ? numberWithCommas(confirmation) : ' -'} Confirmation(s))`}</em></td>
										</tr>
										<tr>
											<td>Time Stamp</td>
											<td>{(timestamp)}<em>{utcDateInfo(createDate)}</em></td>
										</tr>
										<tr>
											<td>From</td>
											<AddressRow address={from_address} type={type} targetContractAddr={targetContractAddr} isFrom />
										</tr>
										<tr>
											<td>To</td>
											<AddressRow address={to_address} internalTxList={internalTxList} type={type} targetContractAddr={targetContractAddr} download={download} />
										</tr>
										<tr>
											<td>Amount</td>
											<td>{`${convertNumberToText(value)} ICX`}</td>
										</tr>
										{
											(!!tokenTxList && tokenTxList.length !== 0) &&
											<tr>
												<td>Token transfer</td>
												<TokenTransferCell tokenTxList={tokenTxList} />
											</tr>
										}
										<tr>
											<td>Step Price</td>
											<td>{convertNumberToText(stepPriceIcx)} ICX<em>({convertNumberToText(stepPriceGloop)} Gloop)</em></td>
										</tr>
										<tr>
											<td>Step Limit</td>
											<td>{convertNumberToText(step_limit)} Steps</td>
										</tr>
										<tr>
											<td>Fee in Step</td>
											<td className='trans' style={{ paddingTop: stepUsedDetails ? 18 : undefined }}>
												{convertNumberToText(stepUsedByTxn)} Steps <em>{stepUsedDetails && 'Fee Sharing'}</em>
												<div>
													{stepUsedDetails && Object.keys(stepUsedDetails).map((stepAddr, index) => {
														const _stepUsed = IconAmount.of(stepUsedDetails[stepAddr]).toString()
														return (
															<p key={index}>
																┗&emsp;<span className='mint'><AddressLink to={stepAddr} /></span>
																&emsp;{convertNumberToText(_stepUsed)}
															</p>
														)
													})}
												</div>
											</td>
										</tr>
										<tr>
											<td>Fee in ICX</td>
											<td>{convertNumberToText(fee)} ICX<em>({feeUsd ? convertNumberToText(feeUsd, 4) : ' -'} USD)</em></td>
										</tr>
										{(data_type && dataString) ?
											<tr>
												<td>Data</td>
												<DataCell scam={scam} data_type={data_type} dataString={dataString} imageConverterPopup={this.props.imageConverterPopup} />
											</tr>
											:
											null

										}
									</tbody>
								</table>
								</div>
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
			loading: false,
			viewHex: this.props.scam ? true : false,
			converted: '',
			toHex: '',
			toUtf8: '',
			imgError: false
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
		const { data_type, dataString } = this.props
		const removed = removeQuotes(dataString)
		const _isHex = isHex(removed)
		const toHex = _isHex ? removed : IconConverter.toHex(removed)
		const toUtf8 = _isHex ? IconConverter.toUtf8(removed) : removed
		try {
			if (data_type === 'message') {
				const { viewHex } = this.state
				if (viewHex && !_isHex) {
					this.setState({ converted: toHex, toHex })
				}
				else if (!viewHex && _isHex) {
					this.setState({ converted: toUtf8, toUtf8 })
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
		const { data_type } = this.props
		if (data_type === 'message') {
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

	onError = () => {
		this.setState({ imgError: true })
	}

	openImage = () => {
		// const img = new Image()
		// img.src = this.state.toUtf8
		// const newTab = window.open('', '_blank')
		// newTab.document.write(img.outerHTML)
	}

	render() {
		const { data_type, scam } = this.props
		const { converted, loading, viewHex, toUtf8, imgError } = this.state
		const isMessage = data_type === 'message'
		const isButton = isMessage && !loading
		const _isImageData = isMessage && isImageData(toUtf8) && !imgError
		const buttonTitle = viewHex ? `Convert to ${_isImageData ? 'Image' : 'UTF-8'}` : 'Convert to HEX'
		return (
			<td className="convert">
				<div className="scroll">
					{!viewHex && _isImageData ?
						<img src={converted} onClick={this.openImage} onError={this.onError} alt='error'/> 
						:
						<p>{converted}</p>
					}
				</div>
				{isButton && <button className="btn-type-normal" onClick={this.handleClick} disabled={scam}>{buttonTitle}</button>}
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
					const { from_address, quantity, symbol, to_address, tokenName } = tokenTx
					return (
						<p key={index}>
							{quantity} {symbol}<em>({tokenName})</em>
							&emsp;from &emsp;<AddressLink to={from_address} label={<span className="ellipsis">{from_address}</span>} />
							&emsp;to&emsp;<AddressLink to={to_address} label={<span className="ellipsis">{to_address}</span>} />
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
					const { amount, from_address, to_address } = tx
					return (
						<p key={index}>
							┗&emsp;TRANSFER {convertNumberToText(amount)} ICX
							&emsp;from &emsp;<span><AddressLink to={from_address} /></span>
							&emsp;to&emsp;<span><AddressLink to={to_address} /></span>
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

const AddressRow = ({ address, type, internalTxList, targetContractAddr, isFrom, download }) => {
	const isAddress = isValidData(address)
	if (isAddress) {
		return (
			<AddressCell
				targetAddr={address}
				type={type}
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
