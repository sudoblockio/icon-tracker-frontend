import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { getMainInfo } from '../../redux/api/restV3/main';
import { numberWithCommas, convertLoopToIcxDecimal, convertNumberToText } from 'utils/utils'
import { getPReps, getIISSInfo } from '../../redux/api/restV3';
import { IconConverter, IconAmount } from 'icon-sdk-js'
import { getLastBlock, getStepPrice, prepMain, prepSub, prepList, getPRep } from '../../redux/api/restV3/iiss';
import {
    LoadingComponent,
} from 'components'
import { POPUP_TYPE } from 'utils/const'

class GovernancePage extends Component {

	state = {
		totalCirculation: 0,
		publicTreasury: 0,
		totalStaked: 0,
		totalVoted: 0,
		irep: 0,
		rrep: 0,
		height: 0,
		stepPrice: 0,
		mainChecked: true,
		subChecked: true,
		restChecked: true,
		blackChecked: false,
		allPrep: [],
		blackPrep: [],
		lastBlockPrepName: "",
		search: '',
		loading: true
	}

	checkedState = {}

	async componentDidMount() {
		const { tmainInfo } = await getMainInfo()
		const { preps, totalStake: totalStakedLoop, totalDelegated: totalVotedLoop } = await getPReps()		
		const { variable } = await getIISSInfo()
		const lastBlock = await getLastBlock()
		const stepPriceLoop = await getStepPrice()
		const _allPrep = await prepList()
		const _blackPrep = await prepList(3)

		const { icxCirculationy, publicTreasury } = tmainInfo || {}
		const { height, peer_id } = lastBlock || {}
		const allPrep = (_allPrep || []).map(prep => {
			const index = preps.findIndex(p => prep.address === p.address)
			if (index !== -1) {
				prep.stake = IconAmount.of(preps[index].stake || 0x0, IconAmount.Unit.LOOP).convertUnit(IconAmount.Unit.ICX).value.toString(10)
			}
			return prep
		})
		const blackPrep = _blackPrep || []

		const lastPrepIndex = preps.findIndex(prep => prep.address === peer_id)
		const lastBlockPrepName = lastPrepIndex === -1 ? "" : `#${lastPrepIndex + 1} ${preps[lastPrepIndex].name}`
	
		const totalCirculation = Number(icxCirculationy || 0)
		const totalStaked = !totalStakedLoop ? 0 : IconConverter.toNumber(IconAmount.of(totalStakedLoop || 0x0, IconAmount.Unit.LOOP).convertUnit(IconAmount.Unit.ICX).value.toString(10))
		const totalVoted = !totalVotedLoop ? 0 : IconConverter.toNumber(IconAmount.of(totalVotedLoop || 0x0, IconAmount.Unit.LOOP).convertUnit(IconAmount.Unit.ICX).value.toString(10))
		const irep = convertLoopToIcxDecimal((variable || {}).irep || 0)
		const rrep = IconConverter.toNumber((variable || {}).rrep || 0)
		const stepPrice = !stepPriceLoop ? 0 : IconAmount.of(stepPriceLoop || 0x0, IconAmount.Unit.LOOP).convertUnit(IconAmount.Unit.ICX).value.toString(10)
		
		this.setState({ 
			loading: false,
			totalCirculation, 
			publicTreasury,
			totalStaked,
			totalVoted,
			irep,
			rrep,
			height,
			stepPrice,
			allPrep,
			blackPrep,
			lastBlockPrepName
		})
	}

	handleChange = e => {
		const { type, value } = e.target
		switch(type) {
			case 'checkbox':
				if (value === 'main') {
					this.setState({ 
						mainChecked: !this.state.mainChecked,
						blackChecked: false,
					})
				}
				else if (value === 'sub') {
					this.setState({ 
						subChecked: !this.state.subChecked,
						blackChecked: false,
					})
				}
				else if (value === 'rest') {
					this.setState({ 
						restChecked: !this.state.restChecked,
						blackChecked: false,
					})
				}
				else if (value === 'black') {
					if (this.state.blackChecked) {
						this.setState({ 
							blackChecked: false,
							...this.checkedState,
						})	
					}
					else {
						const { 
							mainChecked,
							subChecked,
							restChecked
						} = this.state

						this.checkedState = {
							mainChecked,
							subChecked,
							restChecked
						}

						this.setState({ 
							blackChecked: true,
							mainChecked: false,
							subChecked: false,
							restChecked: false
						})	
					}
				}
				return
			case 'text':
				this.setState({ search: value })
				return
			default:							
		}
	}

	getBadge = (grade, active) => {
		const className = active ? 'prep-tag' : 'prep-tag off'

		switch(grade) {
			case 0:
				return <span className={className}><i></i>Main P-Rep</span>			
			case 1:
				return <span className={className}><i></i>Sub P-Rep</span>
			case 2:
				return <span className={className}><i></i>P-Rep</span>
			default:
				return null		
		}
	}

	goAddress = address => {
		this.props.history.push('/address/' + address)
	}

	render() {
		const {
			totalCirculation,
			publicTreasury,
			totalStaked,
			totalVoted,
			irep,
			rrep,
			height,
			stepPrice,
			allPrep,
			blackPrep,
			lastBlockPrepName,
			search,
			loading,
			mainChecked,
			subChecked,
			restChecked,
			blackChecked
		} = this.state

		const totalStakedRate = !totalCirculation ? '-' : totalStaked / totalCirculation * 100
		const totalVotedRate = !totalCirculation ? '-' : totalVoted / totalCirculation * 100
		
		const list = blackChecked ? blackPrep : allPrep.filter(p => {
			return (mainChecked && p.grade === 0) || (subChecked && p.grade === 1) || (restChecked && p.grade === 2)
		})

		const searched = !search ? list : list.filter(prep => prep.name.toLowerCase().includes(search.toLowerCase().trim()) || prep.address.toLowerCase().includes(search.trim()))

		return (
			<div className="content-wrap governance">
				<div className="screen0">
					{loading && <LoadingComponent height='100%'/>}
					{!loading && <div className="wrap-holder">
						<p className="title">Governance<span onClick={() => {this.props.setPopup({ type: POPUP_TYPE.ABOUT })}}><i className="img"></i>About Governance</span></p>
						<div className="contents">
							<div className="graph">
								<div className="txt"><span><i className="img"></i>Total Circulation : {convertNumberToText(totalCirculation, 0)}</span><span><i className="img"></i>Staked : {convertNumberToText(totalStaked, 0)}</span><span><i className="img"></i>Voted : {convertNumberToText(totalVoted, 0)}</span></div>
								<div className="bar-group">
									<div className="bar" style={{ width: "100%" }}><span>100<em>%</em></span></div>
									<div className={`bar${totalStakedRate - totalVotedRate < 11 ? ' small' : ''}`} style={{ width: `${totalStakedRate}%` }}>{totalStakedRate > 8 && <span>{totalStakedRate.toFixed(2)}<em>%</em></span>}</div>
									<div className="bar" style={{ width: `${totalVotedRate}%` }}>{totalVotedRate > 8 && <span>{totalVotedRate.toFixed(2)}<em>%</em></span>}</div>
								</div>
								<div className="total">
									<p>Public Treasury</p>
									<p><em>ICX</em><span>{convertNumberToText(publicTreasury, 4)}</span></p>
								</div>
							</div>
							<ul>
								<li>
									<p>i<sub>rep</sub></p>
									<p><em>ICX</em><span>{convertNumberToText(irep, 4)}</span></p>
								</li>
								<li>
									<p>r<sub>rep</sub> * 3</p>
									<p><em>%</em><span>{convertNumberToText(rrep / 100 * 3, 4)}</span></p>
								</li>
								{/* <li>
									<p>Voter reward</p>
									<p><em>ICX</em><span>900,000,000.0004</span></p>
								</li> */}
								<li>
									<p>Step Price</p>
									<p><em>ICX</em><span>{numberWithCommas(stepPrice)}</span></p>
								</li>
								<li>
									<p>Last Block{lastBlockPrepName && <span>{lastBlockPrepName}</span>}</p>
									<p><span>{numberWithCommas(IconConverter.toNumber(height))}</span></p>
								</li>
							</ul>
						</div>
					</div>}
				</div>
				<div className="screen2">
					{loading && <LoadingComponent height='500px'/>}
					{!loading && <div className="wrap-holder">
						<div className="contents">
							<div className="search-group">
								<span>
									<input id="cbox-01" className="cbox-type" type="checkbox" name="main" value="main" checked={mainChecked} onChange={this.handleChange}/>
									<label htmlFor="cbox-01" className="label _img">Main P-Rep ({allPrep.filter(p => p.grade === 0).length})</label>
								</span>						
								<span>
									<input id="cbox-02" className="cbox-type" type="checkbox" name="sub" value='sub' checked={subChecked} onChange={this.handleChange}/>
									<label htmlFor="cbox-02" className="label _img">Sub P-Rep ({allPrep.filter(p => p.grade === 1).length})</label>
								</span>						
								<span>
									<input id="cbox-03" className="cbox-type" type="checkbox" name="rest" value='rest' checked={restChecked} onChange={this.handleChange}/>
									<label htmlFor="cbox-03" className="label _img">P-Rep ({allPrep.filter(p => p.grade === 2).length})</label>
								</span>
								<span className="blacklist">
									<input id="cbox-04" className="cbox-type" type="checkbox" name="black" value='black' checked={blackChecked} onChange={this.handleChange}/>
									<label htmlFor="cbox-04" className="label _img">Blacklist ({blackPrep.length})</label>									
								</span>
								<span className="search on"><input type="text" className="txt-type-search modified" placeholder="P-Rep name / Address" value={search} onChange={this.handleChange}/><i className="img"></i></span>
							</div>
							<div className="table-box">
								<table className="table-typeP">
									<colgroup>
										<col className="add" />
										<col className="rank" />
										<col />
										<col />
										<col />
										<col />
										<col />
										<col />
									</colgroup>
									<thead>
										<tr>
											<th rowSpan="2" className="add">Add</th>
											<th rowSpan="2" className="rank"><span className="sort">Rank ↓</span></th>
											<th rowSpan="2">Name</th>
											<th rowSpan="2">Productivity<br/><em>Produced /<br/>(Produced + Missed)</em></th>
											<th colSpan="2">Governance Variables</th>
											<th rowSpan="2">Staked</th>
											<th rowSpan="2">Total Votes</th>
										</tr>
										<tr>
											<th className="italic"><em>i<sub>rep</sub></em></th>
											<th><em>Last updated</em></th>
										</tr>
									</thead>
									<tbody>
										{searched.map((prep, index) => {
											const { 
												name,
												address,
												grade,
												totalBlocks,
												validatedBlocks,
												stake,
												delegated,
												irep,
												irepUpdatedBlockHeight,
												active,
												logo,
												rank
											} = prep

											const productivity = !totalBlocks ? '-' : `${(validatedBlocks / totalBlocks * 100).toFixed(2)}%`

											const prepStaked = IconConverter.toNumber(stake || 0)
											const prepVoted = IconConverter.toNumber(delegated || 0)

											const stakedRate = !totalStaked ? 0 : prepStaked / totalStaked * 100
											const votedRate = !totalVoted ? 0 : prepVoted / totalVoted * 100

											const badge = this.getBadge(grade, active)
									
											return(
												<tr key={index}>
													<td className="rank"><span>{rank}</span></td>
													<td className="on">
														<ul>
															<li>{badge}</li>
															{logo && <li><img src={logo || 'https://www.freelogodesign.org/Content/img/logo-samples/bakary.png'} /></li>}
															<li>
																<span className="ellipsis pointer" onClick={()=>{this.goAddress(address)}}>{name}</span>
																<em className="ellipsis pointer" onClick={()=>{this.goAddress(address)}}>{address}</em>
															</li>
														</ul>
													</td>
													<td><span>{productivity}</span><em>{numberWithCommas(validatedBlocks)} / {numberWithCommas(totalBlocks)}</em></td>
													<td><span>{numberWithCommas(IconConverter.toNumber(irep || 0))}</span></td>
													<td><span>{numberWithCommas(IconConverter.toNumber(irepUpdatedBlockHeight))}</span></td>
													<td><span>{stakedRate.toFixed(1)}%</span><em>{convertNumberToText(prepStaked, 4)}</em></td>
													<td><span>{votedRate.toFixed(1)}%</span><em>{convertNumberToText(prepVoted, 4)}</em></td>
												</tr>
											)
										})}
									</tbody>
								</table>
							</div>
							<p className='prep-causion'>
								The detailed informations of P-Rep will be updated every UTC 00:00, UTC 06:00, UTC 12:00, and UTC 18:00. Please check the URL of the submitted JSON file for each P-Rep.
							</p>
						</div>
					</div>}
				</div>
			</div>
		)
	}
}

export default withRouter(GovernancePage);
