import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { IconAmount, IconConverter } from 'icon-sdk-js'
import { getLastBlock, coinGeckoCurrentUSD, getFailMessage } from '../../../redux/store/iiss';
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
	beautifyJson,
	removeQuotes,
	isHex,
	isImageData,
	epochToFromNow,
	convertHexToValue,
} from '../../../utils/utils'

const COUNT = 10

class TransactionInfo extends Component {
	constructor(props) {
		super(props)
		this.state = {
			download: undefined,
			feeInUSD: 0
		}
	}

	async componentDidMount() {
		const currentUSD = await coinGeckoCurrentUSD()
		const lastBlock = await getLastBlock()
		this.setState({lastBlock, currentUSD})
		const moreMsg = await getFailMessage(this.props.match.params.txHash)
		this.setState({msgList: moreMsg})
		
		
	}
	async componentWillReceiveProps(nextProps) {

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
				},
			})
		}
	}

	// failMsg = async (txHash) => {
	//
	// }

	onTwitterClick = async () => {
		const text = encodeURIComponent('New transaction made #Hyperconnected_ICON ')
		const url = await getTrackerApiUrl()
		const link = `${url}/transaction/${this.props.transaction.data.txHash}`
		window.open(`https://twitter.com/intent/tweet?text=${text}&url=${link}`, "_blank", "width=500,height=470")
	}

	msgFormat = () => {
		if (this.state.msgList !== undefined) {
			return this.state.msgList.map((msg) => {})
		}
	}
	
	render()  {
	
		const { download } = this.state
		const { transaction } = this.props
		const { loading, data } = transaction
		console.log(this.state.msgList, "inside render msg list")
		const toUSDNum = Number(this.state.currentUSD * convertHexToValue(this.props.transaction.data.transaction_fee) ).toFixed(4)
		const Contents = () => {
			if (loading) {
				return <LoadingComponent height='206px' />
			}
			else {
				const {
					tokenTxList,
					internalTxList,
					txType,
					hash,
					status,
					block_timestamp,
					block_number,
					value,
					step_limit,
					// receipt_step_used,
					step_price,
					step_used,
					// receipt_step_price,
					data: dataString,
					transaction_fee,
					data_type,
					targetContractAddr,
					reportedCount,
					// stepUsedDetails
				} = data

				const _stepPrice = step_price || "0"
				const stepPriceLoop = IconAmount.of(_stepPrice, IconAmount.Unit.LOOP)
				const stepPriceGloop = stepPriceLoop.convertUnit(9).toString()
				const stepPriceIcx = stepPriceLoop.convertUnit(IconAmount.Unit.ICX)
				const isFail = Number(status) === 0
				const isSuccess = Number(status) === 1

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
											<td>TxHash</td>
											<td className={scam ? "scam":""}>
												{scam?<span className="scam-tag">Reported</span>:""}
												{hash}
												<span className="copy twit" onClick={this.onTwitterClick}>
													<img className='custom-twitter' src={twitterLogo} alt='twitter'/>
												</span><CopyButton data={hash} title={'Copy TxHash'} isSpan />
												<ReportButton address={hash}/>
											</td>
										</tr>
										<tr>
											<td>Status</td>
											<td className={isFail ? 'fail' : ''} > {isSuccess ? 'Success' : 'Fail'} {(isFail) &&  `- ${this.state.msgList}`}</td>
										</tr>
										<tr>
											<td>Block Height</td>
											<td><span><BlockLink to={block_number} label={numberWithCommas(block_number)} /></span><em>{`(${ this.state.lastBlock? Number(this.state.lastBlock.height - block_number) : ' -'} Confirmation(s))`}</em></td>
										</tr>
										<tr>
											<td>Time Stamp</td>
											<td>{new Date(block_timestamp / 1000).toString()}<em>{epochToFromNow(block_timestamp)}</em></td>
										</tr>
										<tr>
											<td>From</td>
											<AddressRow address={data.from_address !== "None" ? data.from_address : "-" } txType={txType} targetContractAddr={targetContractAddr} isFrom />
										</tr>
										<tr>
											<td>To</td>
											<AddressRow address={data.to_address !== "None" ? data.to_address : "-"} internalTxList={internalTxList} txType={txType} targetContractAddr={targetContractAddr} download={download} />
										</tr>
										<tr>
											<td>Amount</td>
											<td>{`${convertHexToValue(value)} ICX`}</td>
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
											<td>{convertNumberToText(step_used)} Steps</td>
											{/*<td className='trans' style={{ paddingTop: stepUsedDetails ? 18 : undefined }}>*/}
											{/*	{convertNumberToText(receipt_step_used)} Steps <em>{stepUsedDetails && 'Fee Sharing'}</em>*/}
											{/*	<div>*/}
											{/*		{stepUsedDetails && Object.keys(stepUsedDetails).map((stepAddr, index) => {*/}
											{/*			const _stepUsed = IconAmount.of(stepUsedDetails[stepAddr]).toString()*/}
											{/*			return (*/}
											{/*				<p key={index}>*/}
											{/*					┗&emsp;<span className='mint'><AddressLink to={stepAddr} /></span>*/}
											{/*					&emsp;{convertNumberToText(_stepUsed)}*/}
											{/*				</p>*/}
											{/*			)*/}
											{/*		})}*/}
											{/*	</div>*/}
											{/*</td>*/}
										</tr>
										<tr>
											<td>Fee in ICX</td>
											<td>{convertHexToValue(transaction_fee)} ICX<em>({ transaction_fee ?  toUSDNum : ' -'} USD)</em></td>
										</tr>

										{(data_type && dataString) ?
											<tr>
												<td>Data</td>
												<DataCell scam={scam} dataType={data_type} dataString={dataString} imageConverterPopup={this.props.imageConverterPopup} />
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
		const { dataType, dataString } = this.props
		const removed = removeQuotes(dataString)
		const _isHex = isHex(removed)
		const toHex = _isHex ? removed : IconConverter.toHex(removed)
		const toUtf8 = _isHex ? IconConverter.toUtf8(removed) : removed
		try {
			if (dataType === 'message') {
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
		const { dataType, scam } = this.props
		const { converted, loading, viewHex, toUtf8, imgError } = this.state
		const isMessage = dataType === 'message'
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
