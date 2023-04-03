import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import ContractTransactions from "./ContractTransactions";
import ContractInternalTransactions from "./ContractInternalTransactions";
import ContractTokenTransfers from "./ContractTokenTransfers";
import ContractCode from "./ContractCode";
import ContractRead from "./ContractRead";
import ContractEvents from "./ContractEvents";
import ContractWrite from "./ContractWrite";
import { NoBox, TabTable } from "../../../../components";
import { TX_TYPE, CONTRACT_TABS } from "../../../../utils/const";

function ContractTabs(props) {
  const {
    on,
    contract,
    contractTx,
    contractInternalTx,
    contractTokenTx,
    contractEvents,
    contractAbi,
    contractReadInfo,
    contractWriteInfo,
    changeTab,
    history,
    icxCall
  } = props;

  const { loading, data } = contract;
  const { address } = data;

  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = tabIndex => {
    setActiveTab(tabIndex);
    changeTab(tabIndex);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 0:
        return (
          <ContractTransactions
            txData={contractTx}
            goAllTx={() => {
              history.push(`/${TX_TYPE.CONTRACT_TX}/${address}`);
            }}
            txType={TX_TYPE.CONTRACT_TX}
            address={address}
          />
        );
      case 1:
        return (
          <ContractInternalTransactions
            txData={contractInternalTx}
            goAllTx={() => {
              history.push(`/${TX_TYPE.CONTRACT_INTERNAL_TX}/${address}`);
            }}
            txType={TX_TYPE.CONTRACT_INTERNAL_TX}
            address={address}
          />
        );
      case 2:
        return (
          <ContractTokenTransfers
            txData={contractTokenTx}
            goAllTx={() => {
              history.push(`/${TX_TYPE.CONTRACT_TOKEN_TX}/${address}`);
            }}
            txType={TX_TYPE.CONTRACT_TOKEN_TX}
            address={address}
          />
        );
      case 3:
        return <ContractCode contract={contract} contractAbi={contractAbi} />;
      case 4:
        return (
          <ContractRead
            contract={contract}
            contractReadInfo={contractReadInfo}
            icxCall={icxCall}
          />
        );
      case 5:
        return (
          <ContractWrite
            contract={contract}
            contractWriteInfo={contractWriteInfo}
          />
        );
      case 6:
        return (
          <ContractEvents
            txData={contractEvents}
            goAllTx={() => {
              history.push(`/${TX_TYPE.CONTRACT_EVENTS}/${address}`);
            }}
            txType={TX_TYPE.CONTRACT_EVENTS}
          />
        );
      default:
        return <NoBox text="No Data" />;
    }
  };

  return (
    <TabTable
      onClickTab={handleTabClick}
      TABS={CONTRACT_TABS}
      on={on}
      loading={loading}
      TableContents={renderTabContent}
      {...props}
    />
  );
}

export default withRouter(ContractTabs);

