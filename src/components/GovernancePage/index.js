import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { getMainInfo } from '../../redux/api/restV3/main';
import { numberWithCommas } from 'utils/utils'
import { getPRepList, getIISSInfo } from '../../redux/api/restV3';
import { IconConverter, IconAmount } from 'icon-sdk-js'
import { getLastBlock, getStepPrice, prepMain, prepSub, prepList, getPRep } from '../../redux/api/restV3/iiss';

class GovernancePage extends Component {

	state = {
		totalCirculation: 0,
		publicTreasury: 0,
		totalStaked: 0,
		totalVoted: 0,
		iRep: 0,
		rRep: 0,
		height: 0,
		stepPrice: 0,
		checked: 'all',
		mainPrep: [],
		subPrep: [],
		allPrep: [],
		lastBlockPrepName: "",
		search: ''
	}

	async componentDidMount() {
		const { tmainInfo } = await getMainInfo()
		const { totalStake: totalStakedLoop, totalDelegated: totalVotedLoop } = await getPRepList()		
		const { variable } = await getIISSInfo()
		const lastBlock = await getLastBlock()
		const stepPriceLoop = await getStepPrice()
		const _mainPrep = await prepMain()
		const _subPrep = await prepSub()
		const _allPrep = await prepList()
		const { name: lastBlockPrepName } = await getPRep(peer_id)

		const { icxCirculationy, publicTreasury } = tmainInfo || {}
		const { irep, rrep } = variable || {}
		const { height, peer_id } = lastBlock || {}
		const mainPrep = _mainPrep || []
		const subPrep = _subPrep || []
		const allPrep = _allPrep || []
		
		const totalCirculation = Number(icxCirculationy || 0)
		const totalStaked = !totalStakedLoop ? 0 : IconConverter.toNumber(IconAmount.of(totalStakedLoop || 0x0, IconAmount.Unit.LOOP).convertUnit(IconAmount.Unit.ICX).value.toString(10))
		const totalVoted = !totalVotedLoop ? 0 : IconConverter.toNumber(IconAmount.of(totalVotedLoop || 0x0, IconAmount.Unit.LOOP).convertUnit(IconAmount.Unit.ICX).value.toString(10))
		const iRep = IconConverter.toNumber(irep || 0)
		const rRep = IconConverter.toNumber(rrep || 0)
		const stepPrice = !stepPriceLoop ? 0 : IconAmount.of(stepPriceLoop || 0x0, IconAmount.Unit.LOOP).convertUnit(IconAmount.Unit.ICX).value.toString(10)
		
		this.setState({ 
			totalCirculation, 
			publicTreasury,
			totalStaked,
			totalVoted,
			iRep,
			rRep,
			height,
			stepPrice,
			mainPrep,
			subPrep,
			allPrep,
			lastBlockPrepName
		})
	}

	handleChange = e => {
		const { type, value } = e.target
		switch(type) {
			case 'checkbox':
				this.setState({ checked: value })
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
		window.open('/address/' + address, '_blank')
	}

	render() {
		const {
			totalCirculation,
			publicTreasury,
			totalStaked,
			totalVoted,
			iRep,
			rRep,
			height,
			stepPrice,
			checked,
			mainPrep,
			subPrep,
			allPrep,
			lastBlockPrepName,
			search,
		} = this.state

		const totalStakedRate = !totalCirculation ? '-' : totalStaked / totalCirculation
		const totalVotedRate = !totalCirculation ? '-' : totalVoted / totalCirculation

		const list = checked === 'main' ? mainPrep : checked === 'sub' ? subPrep : allPrep
		const filtered = !search ? list : list.filter(prep => prep.name.includes(search) || prep.address.includes(search))

		return (
			<div className="content-wrap governance">
				<div className="screen0">
					<div className="wrap-holder">
						<p className="title">Governance<span><i className="img"></i>About Governance</span></p>
						<div className="contents">
							<div className="graph">
								<div className="txt"><span><i className="img"></i>Total Circulation : {numberWithCommas(totalCirculation)}</span><span><i className="img"></i>Staked : {numberWithCommas(totalStaked)}</span><span><i className="img"></i>Voted : {numberWithCommas(totalVoted)}</span></div>
								<div className="bar-group">
									<div className="bar" style={{ width: "100%" }}><span>100<em>%</em></span></div>
									<div className={`bar${totalStakedRate - totalVotedRate < 11 ? ' small' : ''}`} style={{ width: `${totalStakedRate}%` }}>{totalStakedRate > 8 && <span>{totalStakedRate.toFixed(1)}<em>%</em></span>}</div>
									<div className="bar" style={{ width: `${totalVotedRate}%` }}>{totalVotedRate > 8 && <span>{totalVotedRate.toFixed(1)}<em>%</em></span>}</div>
								</div>
								<div className="total">
									<p>Public Treasury</p>
									<p><em>ICX</em><span>{numberWithCommas(publicTreasury)}</span></p>
								</div>
							</div>
							<ul>
								<li>
									<p>i<sub>-rep</sub></p>
									<p><em>ICX</em><span>{numberWithCommas(iRep)}</span></p>
								</li>
								<li>
									<p>r<sub>-rep</sub></p>
									<p><em>ICX</em><span>{numberWithCommas(rRep)}</span></p>
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
									<p>Last block{lastBlockPrepName && <span>{lastBlockPrepName}</span>}</p>
									<p><span>{numberWithCommas(height)}</span></p>
								</li>
							</ul>
						</div>
					</div>
				</div>
				<div className="screen2">
					<div className="wrap-holder">
						<div className="contents">
							<div className="search-group">
								<span>
									<input id="cbox-01" className="cbox-type" type="checkbox" name="main" value="main" checked={checked === 'main'} onChange={this.handleChange}/>
									<label htmlFor="cbox-01" className="label _img">Main P-Rep ({mainPrep.length})</label>
								</span>						
								<span>
									<input id="cbox-02" className="cbox-type" type="checkbox" name="sub" value='sub' checked={checked === 'sub'} onChange={this.handleChange}/>
									<label htmlFor="cbox-02" className="label _img">Sub P-Rep ({subPrep.length})</label>
								</span>						
								<span>
									<input id="cbox-03" className="cbox-type" type="checkbox" name="all" value='all' checked={checked === 'all'} onChange={this.handleChange}/>
									<label htmlFor="cbox-03" className="label _img">P-Rep ({allPrep.length})</label>
								</span>
								{/* <span className="blacklist">
									<input id="cbox-04" className="cbox-type" type="checkbox" name=""/>
									<label htmlFor="cbox-04" className="label _img">Blacklist (22)</label>									
								</span> */}
								<span className="search on"><input type="text" className="txt-type-search" placeholder="P-Rep name / Address" value={search} onChange={this.handleChange}/><i className="img"></i></span>
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
											<th rowSpan="2">Productivity<em>Produced / Missed</em></th>
											<th colSpan="2">Governance Variables</th>
											<th rowSpan="2">Staked</th>
											<th rowSpan="2">Total Votes</th>
										</tr>
										<tr>
											<th className="italic"><em>i<sub>-rep</sub></em></th>
											<th><em>Last updated</em></th>
										</tr>
									</thead>
									<tbody>
										{filtered.map((prep, index) => {
											const { 
												name,
												address,
												grade,
												totalBlocks,
												validatedBlocks,
												stake,
												delegated,
												irep,
												irepUpdateBlockHeight,
												active,
												logo
											} = prep

											const produced = totalBlocks
											const missed = totalBlocks - validatedBlocks
											const productivity = !totalBlocks ? '-' : `${(validatedBlocks / totalBlocks * 100).toFixed(2)}%`

											const prepStaked = IconConverter.toNumber(stake || 0)
											const prepVoted = IconConverter.toNumber(delegated || 0)

											const stakedRate = !totalStaked ? 0 : prepStaked / totalStaked * 100
											const votedRate = !totalVoted ? 0 : prepVoted / totalVoted * 100

											const badge = this.getBadge(grade, active)
									
											return(
												<tr key={index}>
													<td className="rank"><span>{index + 1}</span></td>
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
													<td><span>{productivity}</span><em>{numberWithCommas(produced)} / {numberWithCommas(missed)}</em></td>
													<td><span>{numberWithCommas(IconConverter.toNumber(irep || 0))}</span></td>
													<td><span>{numberWithCommas(IconConverter.toNumber(irepUpdateBlockHeight))}</span></td>
													<td><span>{stakedRate.toFixed(1)}%</span><em>{numberWithCommas(prepStaked)}</em></td>
													<td><span>{votedRate.toFixed(1)}%</span><em>{numberWithCommas(prepVoted)}</em></td>
												</tr>
											)
										})}
									</tbody>
								</table>
							</div>
						</div>

					</div>
				</div>





			</div>
		)
	}
}

export default withRouter(GovernancePage);
