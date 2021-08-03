import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { getProposals } from '../../redux/api/restV3/iiss';
import { ProposalType, ProposalStatus, ProposalStatusClass, VIEW_NUMBER } from '../../utils/const';
import { valueToString, getTextFromHtml } from '../../utils/utils';
import {
	LoadingComponent
} from '../../components';
import imgNoProposal from '../../style/image/img-no-proposal.png'

class ProposalListPage extends Component {

	state = {
		loading: true,
		proposals: []
	}

	async componentDidMount() {
		const { proposals } = await getProposals()
		this.setState({ loading: false, proposals })
	}

	render() {
		const {
			loading,
			proposals
		} = this.state

		return (
			<div className="content-wrap">
				{loading && <LoadingComponent height='600px' />}
				{!loading && <div className="screen0">
					<div className="wrap-holder">
						<p className="title">Network Proposal</p>
						<div className="content">
							{proposals.length === 0 ?
							<div className="no-proposal"><img src={imgNoProposal} alt='no-proposal' /></div>						
							:	
							<div className="proposal-list">
								{(proposals || []).reverse().map(proposal => {
									const { id, contents, vote, status, proposerName } = proposal
									const { type, title, value } = contents
									// const { description } = contents
									const { agree, disagree, noVote } = vote
									const allCount = Number(agree.count) + Number(disagree.count) + Number(noVote.count)
									const allAmount = Number(agree.amount) + Number(disagree.amount)
									// const allAmount = Number(agree.amount) + Number(disagree.amount) + Number(noVote.amount)
									const agreeCount = ((agree.count / allCount) * 100).toFixed()
									const disagreeCount = ((disagree.count / allCount) * 100).toFixed()
									const topCount = 100 - agreeCount - disagreeCount
									const agreeAmount = !allAmount ? 0 : ((agree.amount / allAmount) * 100).toFixed()
									const disagreeAmount = !allAmount ? 0 : ((disagree.amount / allAmount) * 100).toFixed()
									const topAmount = !allAmount ? 100 : 0 
									return (
										<ul key={id} className='proposal-pointer' onClick={() => { this.props.history.push('/proposal/' + id) }}>
											<li>
												<h3 className="label">{ProposalType[type]} Proposal</h3>
												{/* <h1>{title}<br />{getTextFromHtml(description)}</h1> */}
												<h1>{title}</h1>
												<div>
													<span className={`proposal-status ${ProposalStatusClass[status]}`}>{ProposalStatus[status]}</span><h3 className='proposer-name'>Proposed by <span>{proposerName}</span></h3>
												</div>
											</li>
											<li>
												<h3 className="label">Value</h3>
												<h2>{getTextFromHtml(valueToString(value))}</h2>
												<div>
													<div className="percent-group">
														<h3 className="label">Voter</h3>
														<div><h4>Agreed</h4><span>{agreeCount}</span>%</div>
														<div><h4>Disagreed</h4><span>{disagreeCount}</span>%</div>
													</div>
													<div className="percent-group">
														<h3 className="label">Token Vote</h3>
														<div><h4>Agreed</h4><span>{agreeAmount}</span>%</div>
														<div><h4>Disagreed</h4><span>{disagreeAmount}</span>%</div>
													</div>
												</div>

											</li>
											<li>
												<h4>Voter</h4>
												<div className="bar-wrap">
													<div className="bar-container">
														<div className="bar-foreground" style={{ height: `${agreeCount}%`, top: `${topCount}%` }}>
															{(VIEW_NUMBER || agreeCount >= 30) && <span><em>{agreeCount}</em>%</span>}
														</div>
														<div className="bar-background" style={{ height: `${disagreeCount}%`, top: `${topCount}%` }}>
															{(VIEW_NUMBER || disagreeCount >= 30) && <span><em>{disagreeCount}</em>%</span>}
														</div>
													</div>
												</div>
											</li>
											<li>
												<h4>Token Vote</h4>
												<div className="bar-wrap">
													<div className="bar-container">
														<div className="bar-foreground" style={{ height: `${agreeAmount}%`, top: `${topAmount}%` }}>
															{/* <div className="bar-foreground" style={{ height: `${agreeAmount}%`, top: `${noVoteAmount}%` }}> */}
															{(VIEW_NUMBER || agreeAmount >= 30) && <span><em>{agreeAmount}</em>%</span>}
														</div>
														<div className="bar-background" style={{ height: `${disagreeAmount}%`, top: `${topAmount}%`  }}>
															{/* <div className="bar-background" style={{ height: `${disagreeAmount}%`, top: `${noVoteAmount}%` }}> */}
															{(VIEW_NUMBER || disagreeAmount >= 30) && <span><em>{disagreeAmount}</em>%</span>}
														</div>
													</div>
												</div>
											</li>
										</ul>
									)
								})}
							</div>
							}
						</div>
					</div>
				</div>}
			</div>
		)
	}
}

export default withRouter(ProposalListPage);
