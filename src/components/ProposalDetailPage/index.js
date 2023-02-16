import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { IconConverter } from "icon-sdk-js";
import { PROPOSAL_TABS } from "../../utils/const";
import { getProposal } from "../../redux/store/iiss";
import { ProposalStatus, ProposalStatusClass, ProposalType, VIEW_NUMBER } from "../../utils/const";
import {
  valueToString,
  convertNumberToText,
  findTabIndex,
  dateToUTC,
  getUTCString,
  convertLoopToIcxDecimal,
  closeEm,
} from "../../utils/utils";
import { NoBox, NotFoundPage, LoadingComponent } from "../../components";
import ReactJsonBeautify from "react-json-beautify";
import "../../style-custom/react-json-beautify-custom.css";
import { blockInfo } from "../../redux/store/blocks";
import { getLastBlock, getPRepsRPC } from "../../redux/store/iiss";

class ProposalDetailPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      error: false,
      proposal: {},
      tab: this.getTab(this.props.url.hash),
      startTimeDate: "",
      currentBlockHeight: "",
      endingBlockHeight: "",
      prepsList: null,
    };
  }

  async componentDidMount() {
    const id = this.getId(this.props.url.pathname);
    try {
      const proposal = await getProposal(id);
      const data = await getLastBlock();
      console.log(data.height, "height======>");
      this.setState({ currentBlockHeight: data.height, loading: false, proposal }, () => {
        this.getStartBlockHeight();
        this.getLastBlockHeight();
      });
      const prepRpc = await getPRepsRPC();
      this.setState({ loading: false, proposal, prepsList: prepRpc.preps });
    } catch (e) {
      console.error(e);
      this.setState({ error: id });
    }
  }
  getLastBlockHeight = async () => {
    const payload = {
      height: IconConverter.toNumber(this.state.proposal.endBlockHeight),
    };
    const res = await blockInfo(payload);
    if (Number(this.state.currentBlockHeight) > Number(res.data.number)) {
      const date = new Date((res.data.timestamp / 1e6) * 1000);
      this.setState({ endingBlockHeight: date });
    } else {
      const difference = Number(res.data.number) - Number(this.state.currentBlockHeight);
      const sum = difference * 2;
      const latestDate = new Date().valueOf();
      const totalSum = sum + latestDate;
      const date = new Date((totalSum / 1e6) * 1000);
      this.setState({ endingBlockHeight: date });
    }
  };
  getStartBlockHeight = async () => {
    const payload = {
      height: IconConverter.toNumber(this.state.proposal.startBlockHeight),
    };
    const res = await blockInfo(payload);
    const date = new Date((res.data.timestamp / 1e6) * 1000);
    this.setState({ startTimeDate: date });
  };
  async componentWillReceiveProps(nextProps) {
    // const prev = this.getId(this.props.url.pathname)
    // const next = this.getId(nextProps.url.pathname)
    // console.log(prev, next)
    // if (!prev && prev !== next) {
    // }
  }

  getId = (pathname) => {
    return pathname.split("/")[2];
  };

  getTab = (hash) => {
    const index = findTabIndex(PROPOSAL_TABS, hash);
    return PROPOSAL_TABS[index === -1 ? 0 : index];
  };

  changeTab = (tab) => {
    this.setState({ tab });
  };

  getTabList = (vote) => {
    if (!vote) return [];

    const { agree, disagree, noVote } = vote;
    let result = [];

    if (agree) {
      agree.list.forEach((item) => {
        item.answer = "Agree";
        result.push(item);
      });
    }

    if (disagree) {
      disagree.list.forEach((item) => {
        item.answer = "Disagree";
        result.push(item);
      });
    }

    console.log({ abc: this.state.prepsList });
    if (vote && noVote && this.state.prepsList != null) {
      noVote.list.forEach((item) => {
        // console.log(e.address, item)
        const data = this.state.prepsList.filter((e) => {
          //   console.log(e.address, item, "adddd");
          return e.address === item;
        });
        if (!data[0]) {
          result.push({ address: "--", amount: "--", name: "Unregistered Prop", answer: "No Vote" });
          console.log({ address: item });
        } else {
          result.push({ address: item, amount: data[0]?.power, name: data[0]?.name, answer: "No Vote" });
        }
      });
    }
    return result.sort((a, b) => Number(b.timestamp) - Number(a.timestamp));
  };

  getContentsValue = (value) => {
    try {
      if (value.hasOwnProperty("data")) {
        return JSON.parse(valueToString(value));
      }
      return value;
    } catch (e) {
      console.log("JSON Parsing Error: ", e);
    }
  };

  getContentsDeepOfValue = (value) => {
    try {
      if (value.hasOwnProperty("data")) {
        return 2;
      }
      return 1;
    } catch (e) {
      console.log("JSON Parsing Error: ", e);
    }
  };

  render() {
    const { loading, error, proposal } = this.state;

    const { id, contents, status, proposerName, proposer, startBlockHeight, endBlockHeight, vote, apply } = proposal;

    const { title, type, description, value } = contents || {};

    const { agree, disagree, noVote } = vote || {};

    const start = startBlockHeight ? IconConverter.toNumber(startBlockHeight) : "-";
    const end = endBlockHeight ? IconConverter.toNumber(endBlockHeight) : "-";

    const agreeLength = agree ? agree.list.length : 0;
    const disagreeLength = disagree ? disagree.list.length : 0;
    const noVoteLength = noVote ? noVote.list.length : 0;
    const voteLength = agreeLength + disagreeLength;
    const prepsLength = noVoteLength + voteLength;

    const _agreeLength = ((agreeLength / prepsLength) * 100).toFixed();
    const _disagreeLength = ((disagreeLength / prepsLength) * 100).toFixed();
    const _voteLength = ((voteLength / prepsLength) * 100).toFixed();
    // const topLength = ((noVoteLength / prepsLength) * 100).toFixed()
    const topLength = 100 - _voteLength;

    const agreeAmount = agree ? IconConverter.toNumber(agree.amount) : 0;
    const disagreeAmount = disagree ? IconConverter.toNumber(disagree.amount) : 0;
    const voteAmount = agreeAmount + disagreeAmount;

    const noVoteAmount = noVote ? IconConverter.toNumber(noVote.amount) : 0;
    const totalVoteAmount = voteAmount + noVoteAmount;

    const _agreeAmount = ((agreeAmount * 100) / totalVoteAmount).toFixed();
    const _disagreeAmount = ((disagreeAmount * 100) / totalVoteAmount).toFixed();
    const topAmount = 100 - _agreeAmount - _disagreeAmount;

    const tabVotes = this.state.tab === PROPOSAL_TABS[1];

    const tabList = this.getTabList(vote);

    function getTruncVotes(amount) {
      const totalTokenVotesNumber = Number(convertLoopToIcxDecimal(amount));
      return convertNumberToText(totalTokenVotesNumber.toFixed(0));
    }

    const Content = () => {
      if (error) {
        return <NotFoundPage error={error} />;
      } else {
        return (
          <div className="content-wrap">
            {loading && <LoadingComponent height="600px" />}
            {!loading && (
              <div className="screen0">
                <div className="wrap-holder">
                  <p className="title">Network Proposal Details</p>
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
                              <em className={`proposal-status ${ProposalStatusClass[status]}`}>
                                {ProposalStatus[status]}
                              </em>
                              {apply && (
                                <p style={{ margin: 0 }}>
                                  <span className="dot" />
                                  Applied By{" "}
                                  <span
                                    className="on proposal-pointer"
                                    onClick={() => {
                                      window.open("/address/" + apply.address, "_blank");
                                    }}
                                  >
                                    {apply.name}
                                  </span>
                                  , Tx Hash{" "}
                                  <span
                                    style={{ verticalAlign: "middle" }}
                                    className="link proposal-pointer"
                                    onClick={() => {
                                      window.open("/transaction/" + apply.id, "_blank");
                                    }}
                                  >
                                    {apply.id}
                                  </span>
                                  , <span>{dateToUTC(IconConverter.toNumber(apply.timestamp) / 1000)}</span>
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
                              <span
                                className="on proposal-pointer"
                                onClick={() => {
                                  window.open("/address/" + proposer, "_blank");
                                }}
                              >
                                {proposerName}
                              </span>
                            </td>
                          </tr>
                          <tr>
                            <td>Tx Hash</td>
                            <td>
                              <span
                                className="link proposal-pointer"
                                onClick={() => {
                                  window.open("/transaction/" + id, "_blank");
                                }}
                              >
                                {id}
                              </span>
                            </td>
                          </tr>
                          <tr>
                            <td>Start Blockheight</td>
                            {!isNaN(start) ? (
                              <td>
                                <span
                                  className="on proposal-pointer"
                                  onClick={() => {
                                    window.open("/block/" + start, "_blank");
                                  }}
                                >
                                  {start}
                                  {"~"}
                                  {new Date(this.state.startTimeDate).toDateString()}{" "}
                                  {new Date(this.state.startTimeDate).toLocaleTimeString()} UTC
                                </span>{" "}
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
                                <span
                                  className="on proposal-pointer"
                                  onClick={() => {
                                    window.open("/block/" + end, "_blank");
                                  }}
                                >
                                  {end} {"~"}
                                  {new Date(this.state.endingBlockHeight).toDateString()}{" "}
                                  {new Date(this.state.endingBlockHeight).toLocaleTimeString()} UTC
                                </span>{" "}
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
                                ref={(ref) => {
                                  if (ref) ref.innerHTML = closeEm(description);
                                }}
                              ></span>
                            </td>
                          </tr>
                          <tr>
                            <td>Value</td>
                            {/* <td><span className="comment default-style" ref={ref => { if (ref) ref.innerHTML = valueToString(Object.values(value).toString()) }}></span></td>*/}
                            <td>
                              <ReactJsonBeautify
                                data={this.getContentsValue(value)}
                                deep={this.getContentsDeepOfValue(value)}
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
                                        style={{ height: `${_agreeLength}%`, top: `${topLength}%` }}
                                      >
                                        {(VIEW_NUMBER || _agreeLength >= 25) && (
                                          <span>
                                            <em>{_agreeLength}</em>%
                                          </span>
                                        )}
                                      </div>
                                      <div
                                        className="bar-background"
                                        style={{ height: `${_disagreeLength}%`, top: `${topLength}%` }}
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
                                        <em>{agreeLength}</em> P-Reps ({_agreeLength}%)
                                      </span>
                                    </p>
                                    <p>
                                      Disagreed
                                      <span>
                                        <em>{disagreeLength}</em> P-Reps ({_disagreeLength}%)
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
                                        style={{ height: `${_agreeAmount}%`, top: `${topAmount}%` }}
                                      >
                                        {(VIEW_NUMBER || _agreeAmount >= 25) && (
                                          <span>
                                            <em>{_agreeAmount}</em>%
                                          </span>
                                        )}
                                      </div>
                                      <div
                                        className="bar-background"
                                        style={{ height: `${_disagreeAmount}%`, top: `${topAmount}%` }}
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
                                        <em>{getTruncVotes(agreeAmount)}</em> ICX ({_agreeAmount}%)
                                      </span>
                                    </p>
                                    <p>
                                      Disagreed
                                      <span>
                                        <em>{getTruncVotes(disagreeAmount)}</em> ICX ({_disagreeAmount}%)
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
                          className={this.state.tab === tab ? "on" : ""}
                          onClick={() => {
                            this.changeTab(tab);
                          }}
                        >
                          {tab}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="contents">
                    {tabList.length === 0 ? (
                      <NoBox text={`No ${this.state.tab === PROPOSAL_TABS[0] ? "Voters" : "Token Vote"}`} />
                    ) : (
                      <div className="table-box">
                        <table className={`table-typeC proposal${tabVotes ? " votes" : ""}`}>
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
                              const { id, address, name, timestamp, amount, answer } = item;
                              const _amount = amount !== "--" ? IconConverter.toNumber(amount) : "--";
                              const finalAmount =
                                _amount !== "--"
                                  ? convertNumberToText(convertLoopToIcxDecimal(_amount)).split(".")
                                  : "-";
                              return (
                                <tr key={index}>
                                  <td>
                                    <span
                                      className={address !== "--" ? "tab-color proposal-pointer" : ""}
                                      onClick={() => {
                                        if (address !== "--") window.open("/address/" + address, "_blank");
                                      }}
                                    >
                                      {name}
                                    </span>
                                  </td>
                                  <td>
                                    <span>{finalAmount[0]}</span>
                                  </td>
                                  <td className="center-align">
                                    <span>{answer}</span>
                                  </td>
                                  <td className="">
                                    <span
                                      className="ellipsis proposal-pointer"
                                      onClick={() => {
                                        window.open("/transaction/" + id, "_blank");
                                      }}
                                    >
                                      {id}
                                    </span>
                                  </td>
                                  <td>
                                    <span>{dateToUTC(IconConverter.toNumber(timestamp) / 1000)}</span>
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
    };

    return Content();
  }
}

export default withRouter(ProposalDetailPage);
