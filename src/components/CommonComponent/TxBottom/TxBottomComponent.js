import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import TxBottomTitle from "./TxBottomTitle";
import { TxTableHead, TxTableBody, LoadingComponent, NoBox } from "../../../components";
import { getBondList } from "../../../redux/store/iiss";

class TxBottomComponent extends Component {
  render() {
    const { 
      txData,
      txType,
      goAllTx,
      address,
      tableClassName,
      noBoxText,
      tokenTotal,
      onClickTab
    } = this.props;
    const { data, listSize, totalSize, loading } = txData;

    let totalCount = txData.headers ? txData.headers["x-total-count"] : 0;

    let tableBodyData;
    if (txType === "addressBonders") {
      tableBodyData = txData.filter((f) => this.props.bondMap[f] !== null);
      totalCount = tableBodyData.length;
    } else if (txType === "addressdelegations") {
      tableBodyData = txData.delegations;
    } else tableBodyData = txData.data;

    const Content = () => {
      console.log(txType, "tx comp props bonder");
      if (loading) {
        return <LoadingComponent height="349px" />;
      } else if (
        txType === "addressbonded" ||
        txType === "addressbonders" ||
        txType === "addressBonded" ||
        txType === "addressBonders"
      ) {
        return (
          <div className="contents">
            <TxBottomTitle
              txType={txType}
              listSize={Number(txData.length)}
              totalSize={txType === "addressBonders" ? totalCount : Number(txData.length)}
              goAllTx={goAllTx}
              fromAddr={"hello"}
            />
            <div className="table-box">
              <table className={tableClassName}>
                <thead>
                  <TxTableHead txType={txType} />
                </thead>
                <tbody>
                  {tableBodyData.map((item, index) => (
                    <TxTableBody
                      key={`${index}-${address}`}
                      bondMap={this.props.bondMap}
                      totalSupply={tokenTotal}
                      rank={index + 1}
                      data={item}
                      txType={txType}
                      address={address}
                      tokenTotal={tokenTotal}
                      onClickTab={onClickTab}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      } else if ((!tableBodyData || tableBodyData.length === 0) && txType !== "addressBonded") {
        return <NoBox text={noBoxText} />;
      } else {
        const { from_address, to_address } = tableBodyData[0] || this.props.txData;

        return (
          <div className="contents">
            <TxBottomTitle
              txType={txType}
              total={this.props.total}
              listSize={Number(tableBodyData.length)}
              totalSize={
                txType === "addressvoters" ||
                txType === "addressreward" ||
                txType === "addresstokentx" ||
                txType === "addressinternaltx"
                  ? totalCount
                  : totalSize
              }
              goAllTx={goAllTx}
              fromAddr={from_address || tableBodyData[0].token_contract_address}
              toAddr={to_address}
            />

            <div className="table-box">
              <table className={tableClassName}>
                <thead>
                  <TxTableHead txType={txType} />
                </thead>
                <tbody>
                  {(tableBodyData || []).map((item, index) => {
                    return (
                      <TxTableBody
                        key={index}
                        totalSupply={tokenTotal}
                        rank={index + 1}
                        data={item}
                        txType={txType}
                        address={address}
                        tokenTotal={tokenTotal}
                      />
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        );
      }
    };
    return Content();
  }
}

export default withRouter(TxBottomComponent);
