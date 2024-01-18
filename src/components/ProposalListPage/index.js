import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { getProposals } from '../../redux/store/iiss'
import { ProposalType, ProposalStatus, ProposalStatusClass, VIEW_NUMBER } from '../../utils/const'
// import { valueToString, getTextFromHtml } from "../../utils/utils";
import { LoadingComponent } from '../../components'
import imgNoProposal from '../../style/image/img-no-proposal.png'
import { SortHolder } from '../../components'
import styles from './index.module.css'

class ProposalListPage extends Component {
    state = {
        loading: true,
        proposals: [],
        pageSize: 10,
        pageNo: 1,
        modalIsOpen: false,
    }

    constructor(props) {
        super(props)
    }

    async setProposals({ pageNo, pageSize }) {
        try {
            if (pageNo === 0) throw new Error("PageNo Can't be zero")
            this.setState({ loading: true })
            const { proposals } = await getProposals({ pageNo, pageSize })
            let updateState = { loading: false }

            if (proposals.length) this.setState({ ...updateState, proposals, pageNo, pageSize })
            else this.setState({ ...updateState })
        } catch (err) {
            console.log('Invalid page params', err)
        }
    }

    async componentDidMount() {
        this.setProposals({
            pageNo: this.state.pageNo,
            pageSize: this.state.pageSize,
        })
    }

    handleClickSortHolder = (count) => {
        this.setProposals({ pageNo: 1, pageSize: count })
    }

    handleClickPage = (page) => {
        this.setProposals({ pageNo: page, pageSize: this.state.pageSize })
    }

    toggleModalState = () => {
        console.log('modal state')
        console.log(this.state.modalIsOpen)
        this.setState({ modalIsOpen: !this.state.modalIsOpen })
    }

    handleSortChange = (count) => {
        this.setState({ pageSize: count, pageNo: 1 }, () => {
            this.setProposals({ pageNo: 1, pageSize: count })
        })
    }

    render() {
        const { loading, proposals, modalIsOpen } = this.state
        const { walletAddress } = this.props
        console.log('wallet address')
        console.log(walletAddress)

        return (
            <div className="content-wrap">
                {loading && <LoadingComponent height="600px" />}

                {!loading && (
                    <div className="screen0">
                        <div className="wrap-holder">
                            <div
                                style={{
                                    display: 'flex',
                                    flexFlow: 'row-nowrap',
                                    justifyContent: 'space-between',
                                }}>
                                <p className="title" style={{ marginLeft: 0 }}>
                                    Network Proposal
                                </p>
                                <Link to={'/proposal-submit'}>
                                    <button className={styles.button}>Submit New Proposal</button>
                                </Link>
                            </div>

                            <div
                                style={{
                                    marginBlock: '1em',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                }}>
                                <SortHolder
                                    type="PROPOSALS"
                                    key="SortHolder"
                                    count={this.state.pageSize}
                                    getData={this.handleClickSortHolder}
                                    onSortChange={this.handleSortChange}
                                />

                                <ul className="page">
                                    <li
                                        onClick={() => {
                                            this.handleClickPage(this.state.pageNo - 1)
                                        }}>
                                        <span className={`prev`}>
                                            <em className="img"></em>
                                        </span>
                                    </li>
                                    <li className="pageNum">
                                        <p>Page</p>
                                        <input
                                            type="text"
                                            className="txt-type-page over"
                                            readOnly={true}
                                            value={this.state.pageNo}
                                        />
                                    </li>
                                    <li
                                        onClick={() => {
                                            this.handleClickPage(this.state.pageNo + 1)
                                        }}>
                                        <span
                                            name="next"
                                            className={`next ${
                                                this.state.isEndPage ? 'disabled' : ''
                                            }`}>
                                            <em className="img"></em>
                                        </span>
                                    </li>
                                </ul>
                            </div>

                            <div className="content">
                                {proposals.length === 0 ? (
                                    <div className="no-proposal">
                                        <img src={imgNoProposal} alt="no-proposal" />
                                    </div>
                                ) : (
                                    <div className="proposal-list">
                                        {(proposals || []).map((proposal) => {
                                            const { id, contents, vote, status, proposerName } =
                                                proposal
                                            let { type, title } = contents
                                            // check if the value is an object, if it is, format properly.
                                            // if (value.toString() === "[object Object]"){
                                            // 	console.log(Object.entries(value), "incorrect format")
                                            // }
                                            // const { description } = contents
                                            const { agree, disagree, noVote } = vote
                                            const allCount =
                                                Number(agree.count) +
                                                Number(disagree.count) +
                                                Number(noVote.count)
                                            // const allAmount = Number(agree.amount) + Number(disagree.amount)
                                            const allAmount =
                                                Number(agree.amount) +
                                                Number(disagree.amount) +
                                                Number(noVote.amount)
                                            const agreeCount = (
                                                (agree.count / allCount) *
                                                100
                                            ).toFixed()
                                            const disagreeCount = (
                                                (disagree.count / allCount) *
                                                100
                                            ).toFixed()
                                            const topCount = 100 - agreeCount - disagreeCount
                                            const agreeAmount = !allAmount
                                                ? 0
                                                : ((agree.amount / allAmount) * 100).toFixed()
                                            const disagreeAmount = !allAmount
                                                ? 0
                                                : ((disagree.amount / allAmount) * 100).toFixed()
                                            const topAmount = 100 - agreeAmount - disagreeAmount //!allAmount ? 100 : 0
                                            return (
                                                <ul
                                                    key={id}
                                                    className="proposal-pointer"
                                                    onClick={() => {
                                                        this.props.history.push('/proposal/' + id)
                                                    }}>
                                                    <li>
                                                        <h3 className="label">
                                                            {ProposalType[type]} Proposal
                                                        </h3>
                                                        {/* <h1>{title}<br />{getTextFromHtml(description)}</h1> */}
                                                        <h1>{title}</h1>
                                                        <div>
                                                            <span
                                                                className={`proposal-status ${ProposalStatusClass[status]}`}>
                                                                {ProposalStatus[status]}
                                                            </span>
                                                            <h3 className="proposer-name">
                                                                Proposed by{' '}
                                                                <span>{proposerName}</span>
                                                            </h3>
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <h3 className="label">Value</h3>
                                                        {/*<h2>{getTextFromHtml(valueToString(value)) !== '[object Object]' ?*/}
                                                        {/*getTextFromHtml(valueToString(value)) :*/}
                                                        {/*JSON.stringify(value)*/}
                                                        {/*}</h2>*/}
                                                        <div style={{ height: 70 }}></div>
                                                        <div>
                                                            <div className="percent-group">
                                                                <h3 className="label">Voter</h3>
                                                                <div>
                                                                    <h4>Agreed</h4>
                                                                    <span>{agreeCount}</span>%
                                                                </div>
                                                                <div>
                                                                    <h4>Disagreed</h4>
                                                                    <span>{disagreeCount}</span>%
                                                                </div>
                                                            </div>
                                                            <div className="percent-group">
                                                                <h3 className="label">
                                                                    Token Vote
                                                                </h3>
                                                                <div>
                                                                    <h4>Agreed</h4>
                                                                    <span>{agreeAmount}</span>%
                                                                </div>
                                                                <div>
                                                                    <h4>Disagreed</h4>
                                                                    <span>{disagreeAmount}</span>%
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <h4>Voter</h4>
                                                        <div className="bar-wrap">
                                                            <div className="bar-container">
                                                                <div
                                                                    className="bar-foreground"
                                                                    style={{
                                                                        height: `${agreeCount}%`,
                                                                        top: `${topCount}%`,
                                                                    }}>
                                                                    {(VIEW_NUMBER ||
                                                                        agreeCount >= 30) && (
                                                                        <span>
                                                                            <em>{agreeCount}</em>%
                                                                        </span>
                                                                    )}
                                                                </div>
                                                                <div
                                                                    className="bar-background"
                                                                    style={{
                                                                        height: `${disagreeCount}%`,
                                                                        top: `${topCount}%`,
                                                                    }}>
                                                                    {(VIEW_NUMBER ||
                                                                        disagreeCount >= 30) && (
                                                                        <span>
                                                                            <em>{disagreeCount}</em>
                                                                            %
                                                                        </span>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <h4>Token Vote</h4>
                                                        <div className="bar-wrap">
                                                            <div className="bar-container">
                                                                <div
                                                                    className="bar-foreground"
                                                                    style={{
                                                                        height: `${agreeAmount}%`,
                                                                        top: `${topAmount}%`,
                                                                    }}>
                                                                    {/* <div className="bar-foreground" style={{ height: `${agreeAmount}%`, top: `${noVoteAmount}%` }}> */}
                                                                    {(VIEW_NUMBER ||
                                                                        agreeAmount >= 30) && (
                                                                        <span>
                                                                            <em>{agreeAmount}</em>%
                                                                        </span>
                                                                    )}
                                                                </div>
                                                                <div
                                                                    className="bar-background"
                                                                    style={{
                                                                        height: `${disagreeAmount}%`,
                                                                        top: `${topAmount}%`,
                                                                    }}>
                                                                    {/* <div className="bar-background" style={{ height: `${disagreeAmount}%`, top: `${noVoteAmount}%` }}> */}
                                                                    {(VIEW_NUMBER ||
                                                                        disagreeAmount >= 30) && (
                                                                        <span>
                                                                            <em>
                                                                                {disagreeAmount}
                                                                            </em>
                                                                            %
                                                                        </span>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </li>
                                                </ul>
                                            )
                                        })}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        )
    }
}

export default withRouter(ProposalListPage)
