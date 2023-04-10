import React, { Component, useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { SocialMediaType } from "../../../utils/const";
import {
  CopyButton,
  TransactionLink,
  LoadingComponent,
  QrCodeButton,
  AddressLink,
  ReportButton
} from "../../../components";
import {
  convertNumberToText,
  numberWithCommas,
  tokenText,
  isValidData,
  isUrl,
  addAt
} from "../../../utils/utils";
import { cxSocialMedia } from "../../../redux/store/contracts";
import { getBalance } from "../../../redux/store/iiss";

function ContractInfo(props) {
  const [verified_data, setVerified_Data] = useState("");
  const [cxBalance, setCxBalance] = useState(0);

  const getCxBalance = async addr => {
    const result = await getBalance(addr);
    setCxBalance(Number(Number(result) / Math.pow(10, 18)).toFixed(3));
  };
  const onMouseOver = param => {
    window.dispatchEvent(
      new CustomEvent("CUSTOM_FX", { detail: { type: "CONTRACT_OVER", param } })
    );
  };

  const onMouseOut = param => {
    window.dispatchEvent(
      new CustomEvent("CUSTOM_FX", { detail: { type: "CONTRACT_OUT", param } })
    );
  };

  const media = [
    "twitter",
    "wechat",
    "youtube",
    "telegram",
    "steemit",
    "reddit",
    "keybase",
    "github",
    "facebook"
  ];
  const checkLinks = {
    twitter: "",
    wechat: "",
    youtube: "",
    telegram: "",
    steemit: "",
    reddit: "",
    keybase: "",
    github: "",
    facebook: ""
  };

  const getSocialMediaLinks = async contract => {
    const socialLinksMap = await cxSocialMedia(contract);
    let data = socialLinksMap.data;
    setVerified_Data(data);
    media.map(site => {
      if (checkLinks && socialLinksMap) {
        return checkLinks[site] !== socialLinksMap.data[site]
          ? (checkLinks[site] = socialLinksMap.data[site])
          : console.log("no link");
      }
    });
  };

  const onSocialClick = async link => {
    if (isUrl(link)) {
      window.open(link, "_blank");
    }
  };

  useEffect(() => {
    const payload = { contractAddr: props.match.params.contractId };
    props.getTokenSummary(payload);
    props.contractDetail(props.match.params.contractId);
    getSocialMediaLinks(props.match.params.contractId);
    props.contractTxList(props.match.params.contractId);
    getCxBalance(props.match.params.contractId);
  }, [props.match.params.contractId]);

  const { contract, walletAddress, contractDetails } = props;
  const { loading, data } = contract;
  let ircVersion, reportedCount;

  const Contents = () => {
    if (loading) {
      return <LoadingComponent height="206px" />;
    } else {
      const isCreator = isValidData(contractDetails.owner_address);
      const isCreateTx = isValidData(contractDetails.creation_hash);
      const scam = reportedCount >= 100 ? true : false;
      return (
        <div className="screen0">
          <div className="wrap-holder">
            <p className="title">Contract</p>
            <div className={"cx-submit"}></div>
            <div className="contents">
              <div className="table-box">
                <table className="table-typeB contract">
                  <tbody>
                    <tr className="p-rep">
                      <td>Address</td>
                      <td colSpan="3" className={scam ? "scam" : ""}>
                        {scam && <span className="scam-tag">Scam</span>}
                        {data.address}
                        <span>
                          {" "}
                          <CopyButton
                            data={data.address}
                            title={"Copy Address"}
                            isSpan
                          />
                        </span>
                        {contractDetails.owner_address === walletAddress ? (
                          <QrCodeButton address={data.address} />
                        ) : (
                          ""
                        )}
                        {verified_data.website && (
                          <span
                            className="home"
                            onClick={() => {
                              onSocialClick(verified_data.website);
                            }}
                          >
                            <i className="img"></i>
                          </span>
                        )}
                        {SocialMediaType.map((type, index) => {
                          const mediaValue = verified_data[type];
                          if (!mediaValue) {
                            return null;
                          }
                          return (
                            <>
                              {mediaValue && (
                                <span
                                  key={index}
                                  className={`table-typeB ${type} i`}
                                  onClick={() => {
                                    onSocialClick(mediaValue);
                                  }}
                                >
                                  {isUrl(mediaValue) ? (
                                    <i className="img"></i>
                                  ) : (
                                    [
                                      <i key="i" className="img tooltip"></i>,
                                      <div key="div" className="help-layer">
                                        <p className="txt">
                                          {addAt(mediaValue)}
                                        </p>
                                        <div className="tri"></div>
                                      </div>
                                    ]
                                  )}
                                </span>
                              )}
                            </>
                          );
                        })}
                        <ReportButton address={data.address} />
                      </td>
                    </tr>
                    <tr>
                      <td>Name</td>

                      <TokenContractCell
                        isToken={contractDetails.is_token}
                        tokenName={contractDetails.name}
                        symbol={contractDetails.symbol}
                        address={contractDetails.address}
                        ircVersion={ircVersion}
                        onMouseOver={onMouseOver}
                        onMouseOut={onMouseOut}
                      />
                      <td>Contract Creator</td>
                      {isCreator && isCreateTx ? (
                        <td>
                          <span className="help address">Creator Address</span>
                          <span className="help hash">
                            Creator Transaction Hash
                          </span>
                          <span
                            className="link address ellipsis"
                            onMouseOver={() => {
                              onMouseOver("address");
                            }}
                            onMouseOut={() => {
                              onMouseOut("address");
                            }}
                          >
                            <AddressLink to={contractDetails.owner_address} />
                          </span>
                          <em>at Txn</em>
                          <span
                            className="link hash ellipsis"
                            onMouseOver={() => {
                              onMouseOver("hash");
                            }}
                            onMouseOut={() => {
                              onMouseOut("hash");
                            }}
                          >
                            <TransactionLink
                              to={contractDetails.creation_hash}
                            />
                          </span>
                        </td>
                      ) : (
                        <td>-</td>
                      )}
                    </tr>
                    <tr>
                      <td>Balance</td>
                      <td>{convertNumberToText(cxBalance || 0)} ICX</td>
                      <td>Transactions</td>
                      <td>
                        {numberWithCommas(props.contractTx.totalSize)} Txns
                      </td>
                    </tr>

                    {verified_data ? (
                      <tr>
                        <td>Team Name</td>
                        <td>
                          {verified_data ? (
                            <a
                              href={`${window.location.origin}/address/${verified_data.p_rep_address}`}
                            >
                              {verified_data.team_name}
                            </a>
                          ) : (
                            "-"
                          )}
                        </td>
                        <td>Description</td>
                        <td>
                          {verified_data ? verified_data.short_description : ""}
                        </td>
                      </tr>
                    ) : (
                      ""
                    )}

                    <tr>
                      {/* <td>Balance</td> */}

                      {/* <td>{convertNumberToText(data.balance? data.balance.toFixed(): 0)} ICX</td> */}
                      {/* <td>Virtual Step</td> */}
                      {/* {availableVirtualStep? <td>{convertNumberToText(availableVirtualStep)} Steps</td> : <td>-</td>} */}
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      );
    }
  };
  return Contents();
}

class DetailButton extends Component {
  handleClick = () => {
    const { contractAddr } = this.props;
    this.props.contractDetailPopup({ contractAddr });
  };

  render() {
    return (
      <button onClick={this.handleClick} className="btn-type-normal status">
        Detail
      </button>
    );
  }
}

class TokenContractCell extends Component {
  render() {
    const {
      tokenName,
      symbol,
      address,
      ircVersion,
      onMouseOver,
      onMouseOut,
      isToken
    } = this.props;
    const Content = () => {
      if (isToken) {
        return (
          <td>
            <span className="help token">{ircVersion} Token</span>
            <span
              className="link token"
              onMouseOver={() => {
                onMouseOver("token");
              }}
              onMouseOut={() => {
                onMouseOut("token");
              }}
            >
              {tokenText(tokenName, symbol, address)}
            </span>
          </td>
        );
      } else {
        return <td>{tokenName}</td>;
      }
    };
    return Content();
  }
}

export default withRouter(ContractInfo);
