import React, { Component, useState, useEffect } from "react";
import { withRouter, Link } from "react-router-dom";
import { IconConverter } from "icon-sdk-js";
import { PROPOSAL_TABS } from "../../utils/const";
import { getProposal } from "../../redux/store/iiss";
import {
  ProposalStatus,
  ProposalStatusClass,
  ProposalType,
  VIEW_NUMBER
} from "../../utils/const";
import {
  valueToString,
  convertNumberToText,
  findTabIndex,
  dateToUTC,
  getUTCString,
  convertLoopToIcxDecimal,
  closeEm
} from "../../utils/utils";
import { NoBox, NotFoundPage, LoadingComponent } from "../../components";
import ReactJsonBeautify from "react-json-beautify";
import "../../style-custom/react-json-beautify-custom.css";
import { blockInfo } from "../../redux/store/blocks";
import { getLastBlock, getPRepsRPC } from "../../redux/store/iiss";
import { addressInfo } from "../../redux/store/addresses";
import CustomButton from "./CustomButton";
import { governanceMethods } from "../../utils/rawTxMaker";
import { icxSendTransaction } from "../../redux/api/jsProvider/icx";
import config from "../../config";

// SET THE FOLLOWING FLAG AS true FOR TESTING
const USE_TESTING_PARAMS = false;

const nid = USE_TESTING_PARAMS ? 3 : config.nid;

const { approveNetworkProposal, rejectNetworkProposal } = governanceMethods;

function ProposalDetailPage(props) {
  const [state, setPageState] = useState({
    loading: true,
    error: false,
    proposal: {},
    tab: getTab(props.url.hash),
    startTimeDate: "",
    currentBlockHeight: "",
    endingBlockHeight: "",
    prepsList: null,
    showVoteButton: false,
    walletInfo: null,
    votedAgree: false,
    votedDisagree: false,
    isVoter: false
  });
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

  const buttonLabel =
    !votedAgree && !votedDisagree ? "Cast Vote" : "Change Vote";
  console.log('vote button');
  console.log(buttonLabel);
  console.log('votedAgree');
  console.log(votedAgree);
  console.log('votedDisagree');
  console.log(votedDisagree);

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

  function getTruncVotes(amount) {
    const totalTokenVotesNumber = Number(convertLoopToIcxDecimal(amount));
    return convertNumberToText(totalTokenVotesNumber.toFixed(0));
  }

  async function getLastBlockHeight(endBlockHeight, currentBlockHeight) {
    const endBlockHeightNumber = IconConverter.toNumber(endBlockHeight);
    if (Number(currentBlockHeight) > endBlockHeightNumber) {
      const payload = {
        height: endBlockHeightNumber
      };
      const res = await blockInfo(payload);
      const date = new Date((res.data.timestamp / 1e6) * 1000);

      setPageState(currentState => {
        return { ...currentState, endingBlockHeight: date };
      });
    } else {
      const difference =
        Number(endBlockHeightNumber) - Number(currentBlockHeight);
      const miliseconds = difference * 2 * 1000;
      const latestDate = new Date().valueOf();
      const totalSum = miliseconds + latestDate;
      const date = new Date(totalSum);

      setPageState(currentState => {
        return { ...currentState, endingBlockHeight: date };
      });
    }
  }

  async function getStartBlockHeight(startBlockHeight) {
    const payload = {
      height: IconConverter.toNumber(startBlockHeight)
    };
    const res = await blockInfo(payload);
    const date = new Date((res.data.timestamp / 1e6) * 1000);
    setPageState(currentState => {
      return { ...currentState, startTimeDate: date };
    });
  }

  function getId(pathname) {
    return pathname.split("/")[2];
  }

  function getTab(hash) {
    const index = findTabIndex(PROPOSAL_TABS, hash);
    return PROPOSAL_TABS[index === -1 ? 0 : index];
  }

  function changeTab(tab) {
    setPageState(currentState => {
      return { ...currentState, tab };
    });
  }

  function getTabList(vote) {
    if (!vote) return [];

    const { agree, disagree, noVote } = vote;
    let result = [];

    if (agree) {
      agree.list.forEach(item => {
        item.answer = "Agree";
        result.push(item);
      });
    }

    if (disagree) {
      disagree.list.forEach(item => {
        item.answer = "Disagree";
        result.push(item);
      });
    }

    if (vote && noVote && state.prepsList != null) {
      noVote.list.forEach(item => {
        const data = state.prepsList.filter(e => {
          return e.address === item;
        });
        if (!data[0]) {
          result.push({
            address: "--",
            amount: "--",
            name: "Unregistered Prop",
            answer: "No Vote"
          });
        } else {
          result.push({
            address: item,
            amount: data[0]?.power,
            name: data[0]?.name,
            answer: "No Vote"
          });
        }
      });
    }
    return result.sort((a, b) => Number(b.timestamp) - Number(a.timestamp));
  }

  function getContentsValue(value) {
    try {
      if (value.hasOwnProperty("data")) {
        return JSON.parse(valueToString(value));
      }
      return value;
    } catch (e) {
      console.log("JSON Parsing Error: ", e);
    }
  }

  function getContentsDeepOfValue(value) {
    try {
      if (value.hasOwnProperty("data")) {
        return 2;
      }
      return 1;
    } catch (e) {
      console.log("JSON Parsing Error: ", e);
    }
  }

  function setVoteButtonVisibility(
    endblockHeightAsHex,
    currentBlockHeightAsNumber
  ) {
    const endBlockHeight = parseInt(endblockHeightAsHex, 16);
    const currentBlockHeight = currentBlockHeightAsNumber;

    const flowCondition = USE_TESTING_PARAMS
      ? false
      : endBlockHeight > currentBlockHeight;
    if (flowCondition) {
      setPageState(currentState => {
        return {
          ...currentState,
          showVoteButton: true
        };
      });
    } else {
      setPageState(currentState => {
        return {
          ...currentState,
          showVoteButton: false
        };
      });
    }
  }
  async function handleClickOnAccept() {
    //
    if (
      state.proposal.id != null &&
      walletAddress != null &&
      walletAddress != ""
    ) {
      const rawTransaction = approveNetworkProposal(
        state.proposal.id,
        walletAddress,
        nid
      );

      const response = await icxSendTransaction({
        rawTx: rawTransaction,
        index: 0
      });
      console.log("network vote response", response);
    }
  }

  async function handleClickOnReject() {
    //
    if (
      state.proposal.id != null &&
      walletAddress != null &&
      walletAddress != ""
    ) {
      const rawTransaction = rejectNetworkProposal(
        state.proposal.id,
        walletAddress,
        nid
      );

      const response = await icxSendTransaction({
        rawTx: rawTransaction,
        index: 0
      });
      console.log("network vote response", response);
    }
  }

  function checkIfVoted(arrayOfVotesObject, walletAddress) {
    if (arrayOfVotesObject == null) {
      return false;
    }
    const voted = arrayOfVotesObject.filter(vote => {
      return vote.address === walletAddress;
    });
    return voted.length > 0;
  }

  useEffect(() => {
    async function getWalletInfo(wallet) {
      let walletInfo;
      try {
        walletInfo = await addressInfo({
          address: wallet,
          limit: 10,
          skip: 0
        });
      } catch (e) {
        walletInfo = null;
      }
      setPageState(currentState => {
        return { ...currentState, walletInfo: walletInfo };
      });
    }

    async function fetchInit() {
      try {
        const proposal = await getProposal(id);
        const data = await getLastBlock();
        const prepRpc = await getPRepsRPC();

        setPageState(currentState => {
          return {
            ...currentState,
            currentBlockHeight: data.height,
            loading: false,
            proposal: proposal,
            prepsList: prepRpc.preps
          };
        });

        await getStartBlockHeight(proposal.startBlockHeight);
        await getLastBlockHeight(proposal.endBlockHeight, data.height);
        setVoteButtonVisibility(proposal.endBlockHeight, data.height);
      } catch (e) {
        console.error(e);
        setPageState(currentState => {
          return { ...currentState, error: id };
        });
      }
    }
    const id = getId(props.url.pathname);
    fetchInit();

    if (typeof walletAddress === "string" && walletAddress !== "") {
      getWalletInfo(walletAddress);
    }
  }, []);

  useEffect(() => {
    async function getVoters(height) {
      let allPreps = null;
      try {
        allPreps = await getPRepsRPC(height);
        if (allPreps.error != null) {
          allPreps = await getPRepsRPC();
        }
      } catch (e) {
        console.log("error in getVoters");
      }
      if (allPreps != null) {
        return allPreps.preps
          .filter(prep => {
            return prep.grade === "0x0";
          })
          .map(prep => {
            return prep.address;
          });
      } else {
        return [];
      }
    }
    async function asyncTask() {
      const { agree, disagree, noVote } = state.proposal.vote;

      const votedAgree = checkIfVoted(agree.list, walletAddress);
      let votedDisagree = false;
      if (!votedAgree) {
        votedDisagree = checkIfVoted(disagree.list, walletAddress);
      }
      const voters = await getVoters(state.proposal.startBlockHeight);
      const isVoter = USE_TESTING_PARAMS
        ? true
        : voters.includes(walletAddress);
      setPageState(currentState => {
        return {
          ...currentState,
          votedAgree: votedAgree,
          votedDisagree: votedDisagree,
          isVoter: isVoter
        };
      });
    }
    if (
      state.proposal != null &&
      state.proposal.vote != null &&
      typeof walletAddress === "string" &&
      walletAddress !== "" &&
      state.prepsList != null &&
      state.prepsList.length > 0
    ) {
      asyncTask();
    }
  }, [state.proposal, walletAddress]);

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
              {state.showVoteButton && state.isVoter && (
                <CustomButton
                  label={buttonLabel}
                  handleAccept={handleClickOnAccept}
                  handleReject={handleClickOnReject}
                />
              )}
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
