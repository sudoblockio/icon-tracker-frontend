import React from "react";
import { withRouter, Link } from "react-router-dom";
import { IconConverter } from "icon-sdk-js";
import { PROPOSAL_TABS } from "../../utils/const";
import {
  ProposalStatus,
  ProposalStatusClass,
  ProposalType,
  VIEW_NUMBER
} from "../../utils/const";
import {
  convertNumberToText,
  dateToUTC,
  getUTCString,
  convertLoopToIcxDecimal,
  closeEm
} from "../../utils/utils";
import { NoBox, NotFoundPage, LoadingComponent } from "../../components";
import ReactJsonBeautify from "react-json-beautify";
import "../../style-custom/react-json-beautify-custom.css";
import CustomButton from "./CustomButton";
import ApplyButton from "./ApplyButton";
import useProposalPage from "./useProposalPage";

function ProposalDetailPage(props) {
  const {
    state,
    setPageState,
    getTabList,
    handleClickOnApply,
    handleClickOnReject,
    handleClickOnAccept,
    getContentsValue,
    getContentsDeepOfValue,
    getTruncVotes,
    changeTab
  } = useProposalPage(props);
  const { loading, error, proposal, votedAgree, votedDisagree } = state;
  const { walletAddress } = props;

  const {
    id,
    contents,
    status,
    proposerName,
    proposer,
    startBlockHeight,
    endBlockHeight,
    vote,
    apply
  } = proposal;

  const { title, type, description, value } = contents || {};

  const { agree, disagree, noVote } = vote || {};

  const applyButtonLabel = "Apply Proposal";
  const buttonLabel =
    !votedAgree && !votedDisagree ? "Cast Vote" : "Change Vote";

  const start = startBlockHeight
    ? IconConverter.toNumber(startBlockHeight)
    : "-";
  const end = endBlockHeight ? IconConverter.toNumber(endBlockHeight) : "-";

  const agreeLength = agree ? agree.list.length : 0;
  const disagreeLength = disagree ? disagree.list.length : 0;
  const noVoteLength = noVote ? noVote.list.length : 0;
  const voteLength = agreeLength + disagreeLength;
  const prepsLength = noVoteLength + voteLength;

  const _agreeLength = ((agreeLength / prepsLength) * 100).toFixed();
  const _disagreeLength = ((disagreeLength / prepsLength) * 100).toFixed();
  const _voteLength = ((voteLength / prepsLength) * 100).toFixed();
  const topLength = 100 - _voteLength;

  const agreeAmount = agree ? IconConverter.toNumber(agree.amount) : 0;
  const disagreeAmount = disagree ? IconConverter.toNumber(disagree.amount) : 0;
  const voteAmount = agreeAmount + disagreeAmount;

  const noVoteAmount = noVote ? IconConverter.toNumber(noVote.amount) : 0;
  const totalVoteAmount = voteAmount + noVoteAmount;

  const _agreeAmount = ((agreeAmount * 100) / totalVoteAmount).toFixed();
  const _disagreeAmount = ((disagreeAmount * 100) / totalVoteAmount).toFixed();
  const topAmount = 100 - _agreeAmount - _disagreeAmount;

  const tabVotes = state.tab === PROPOSAL_TABS[1];

  const tabList = getTabList(vote);

  return error ? (
    <NotFoundPage error={error} />
  ) : (
    <div className="content-wrap">
      {loading && <LoadingComponent height="600px" />}
      {!loading && (
        <div className="screen0">
          <div className="wrap-holder">
            <div
              style={{
                display: "flex",
                flexFlow: "row nowrap",
                justifyContent: "space-between"
              }}
            >
              <p className="title">Network Proposal Details</p>
              <div
                style={{
                  display: `flex`,
                  flexFlow: `row nowrap`
                }}
              >
                {state.showApplyButton && (
                  <ApplyButton
                    label={applyButtonLabel}
                    handleClick={handleClickOnApply}
                  />
                )}
                {state.showVoteButton && state.isVoter && (
                  <CustomButton
                    label={buttonLabel}
                    handleAccept={handleClickOnAccept}
                    handleReject={handleClickOnReject}
                  />
                )}
              </div>
            </div>
            <div className="contents">
              <div className="table-box">
                <table className="table-typeB">
                  <thead>
                    <tr>
                      <th>Address</th>
                      <th>value</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Proposal Content</td>
                      <td>
                        <span>{title}</span>
                      </td>
                    </tr>
                    <tr>
                      <td>Status</td>
                      <td>
                        <em
                          className={`proposal-status ${ProposalStatusClass[status]}`}
                        >
                          {ProposalStatus[status]}
                        </em>
                        {apply && (
                          <p style={{ margin: 0 }}>
                            <span className="dot" />
                            Applied By{" "}
                            <Link to={`/address/${apply.address}`}>
                              <span className="on proposal-pointer">
                                {apply.name}
                              </span>
                            </Link>
                            , Tx Hash{" "}
                            <Link to={`/transaction/${apply.id}`}>
                              <span
                                style={{ verticalAlign: "middle" }}
                                className="link proposal-pointer"
                              >
                                {apply.id}
                              </span>
                            </Link>
                            ,{" "}
                            <span>
                              {dateToUTC(
                                IconConverter.toNumber(apply.timestamp) / 1000
                              )}
                            </span>
                          </p>
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td>Type</td>
                      <td>
                        <span>{ProposalType[type]} Proposal</span>
                      </td>
                    </tr>
                    <tr>
                      <td>Proposer</td>
                      <td>
                        <Link to={`/address/${proposer}`}>
                          <span className="on proposal-pointer">
                            {proposerName}
                          </span>
                        </Link>
                      </td>
                    </tr>
                    <tr>
                      <td>Tx Hash</td>
                      <td>
                        <Link to={`/transaction/${id}`}>
                          <span className="link proposal-pointer">{id}</span>
                        </Link>
                      </td>
                    </tr>
                    <tr>
                      <td>Start Blockheight</td>
                      {!isNaN(start) ? (
                        <td>
                          <Link to={`/block/${start}`}>
                            <span className={"on proposal-pointer"}>
                              {start}
                              {"~"}
                              {new Date(
                                state.startTimeDate
                              ).toDateString()}{" "}
                              {new Date(
                                state.startTimeDate
                              ).toLocaleTimeString()}{" "}
                              UTC
                            </span>
                          </Link>{" "}
                        </td>
                      ) : (
                        <td>
                          <span>-</span>
                        </td>
                      )}
                    </tr>
                    <tr>
                      <td>End Blockheight</td>
                      {!isNaN(end) ? (
                        <td>
                          <Link to={`/block/${end}`}>
                            <span className="on proposal-pointer">
                              {end} {"~"}
                              {new Date(
                                state.endingBlockHeight
                              ).toDateString()}{" "}
                              {new Date(
                                state.endingBlockHeight
                              ).toLocaleTimeString()}{" "}
                              UTC
                            </span>
                          </Link>{" "}
                        </td>
                      ) : (
                        <td>
                          <span>-</span>
                        </td>
                      )}
                    </tr>
                    <tr>
                      <td>Description</td>
                      <td>
                        <span
                          className="comment default-style"
                          ref={ref => {
                            if (ref) ref.innerHTML = closeEm(description);
                          }}
                        ></span>
                      </td>
                    </tr>
                    <tr>
                      <td>Value</td>
                      <td>
                        <ReactJsonBeautify
                          data={getContentsValue(value)}
                          deep={getContentsDeepOfValue(value)}
                          showLength={true}
                          showLine={true}
                          collapsedOnClickBrackets={true}
                          showSelectController={true}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>Votes</td>
                      <td>
                        <ul className="bar-graph-group">
                          <li>
                            <p>Voter</p>
                            <div className="bar-wrap">
                              <div className="bar-container">
                                <div
                                  className="bar-foreground"
                                  style={{
                                    height: `${_agreeLength}%`,
                                    top: `${topLength}%`
                                  }}
                                >
                                  {(VIEW_NUMBER || _agreeLength >= 25) && (
                                    <span>
                                      <em>{_agreeLength}</em>%
                                    </span>
                                  )}
                                </div>
                                <div
                                  className="bar-background"
                                  style={{
                                    height: `${_disagreeLength}%`,
                                    top: `${topLength}%`
                                  }}
                                >
                                  {(VIEW_NUMBER || _disagreeLength >= 25) && (
                                    <span>
                                      <em>{_disagreeLength}</em>%
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                            <div className="info">
                              <p>Total Voters</p>
                              <p>
                                <span>
                                  <em>{voteLength}</em>/{prepsLength}
                                </span>{" "}
                                P-Reps ({_voteLength}%)
                              </p>
                              <p className="on">
                                Agreed
                                <span>
                                  <em>{agreeLength}</em> P-Reps ({_agreeLength}
                                  %)
                                </span>
                              </p>
                              <p>
                                Disagreed
                                <span>
                                  <em>{disagreeLength}</em> P-Reps (
                                  {_disagreeLength}%)
                                </span>
                              </p>
                            </div>
                          </li>
                          <li className="disagreed">
                            <p>Token Vote</p>
                            <div className="bar-wrap">
                              <div className="bar-container">
                                <div
                                  className="bar-foreground"
                                  style={{
                                    height: `${_agreeAmount}%`,
                                    top: `${topAmount}%`
                                  }}
                                >
                                  {(VIEW_NUMBER || _agreeAmount >= 25) && (
                                    <span>
                                      <em>{_agreeAmount}</em>%
                                    </span>
                                  )}
                                </div>
                                <div
                                  className="bar-background"
                                  style={{
                                    height: `${_disagreeAmount}%`,
                                    top: `${topAmount}%`
                                  }}
                                >
                                  {(VIEW_NUMBER || _disagreeAmount >= 25) && (
                                    <span>
                                      <em>{_disagreeAmount}</em>%
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                            <div className="info">
                              <p>Total Token Votes</p>
                              <p>
                                {totalVoteAmount && (
                                  <span>
                                    <em>{getTruncVotes(totalVoteAmount)}</em>
                                  </span>
                                )}{" "}
                                ICX
                              </p>
                              <p className="on">
                                Agreed
                                <span>
                                  <em>{getTruncVotes(agreeAmount)}</em> ICX (
                                  {_agreeAmount}%)
                                </span>
                              </p>
                              <p>
                                Disagreed
                                <span>
                                  <em>{getTruncVotes(disagreeAmount)}</em> ICX (
                                  {_disagreeAmount}%)
                                </span>
                              </p>
                            </div>
                          </li>
                        </ul>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
      {!loading && (
        <div className="screen1">
          <div className="wrap-holder">
            <div className="tab-holder">
              <ul>
                {PROPOSAL_TABS.map((tab, index) => (
                  <li
                    key={index}
                    className={state.tab === tab ? "on" : ""}
                    onClick={() => {
                      changeTab(tab);
                    }}
                  >
                    {tab}
                  </li>
                ))}
              </ul>
            </div>
            <div className="contents">
              {tabList.length === 0 ? (
                <NoBox
                  text={`No ${
                    state.tab === PROPOSAL_TABS[0] ? "Voters" : "Token Vote"
                  }`}
                />
              ) : (
                <div className="table-box">
                  <table
                    className={`table-typeC proposal${
                      tabVotes ? " votes" : ""
                    }`}
                  >
                    <thead>
                      <tr>
                        <th>Voter</th>
                        <th>Votes</th>
                        <th>Answer</th>
                        <th>Tx Hash</th>
                        <th>Time ({getUTCString()})</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tabList.map((item, index) => {
                        const {
                          id,
                          address,
                          name,
                          timestamp,
                          amount,
                          answer
                        } = item;
                        const _amount =
                          amount !== "--"
                            ? IconConverter.toNumber(amount)
                            : "--";
                        const finalAmount =
                          _amount !== "--"
                            ? convertNumberToText(
                                convertLoopToIcxDecimal(_amount)
                              ).split(".")
                            : "-";
                        return (
                          <tr key={index}>
                            <td>
                              <Link to={`/address/${address}`}>
                                <span
                                  className={
                                    address !== "--"
                                      ? "tab-color proposal-pointer"
                                      : ""
                                  }
                                >
                                  {name}
                                </span>
                              </Link>
                            </td>
                            <td>
                              <span>{finalAmount[0]}</span>
                            </td>
                            <td className="center-align">
                              <span>{answer}</span>
                            </td>
                            <td className="">
                              <Link to={`/transaction/${id}`}>
                                <span className="ellipsis proposal-pointer">
                                  {id}
                                </span>
                              </Link>
                            </td>
                            <td>
                              <span>
                                {dateToUTC(
                                  IconConverter.toNumber(timestamp) / 1000
                                )}
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default withRouter(ProposalDetailPage);
