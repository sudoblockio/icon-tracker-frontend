import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import ContractTransactions from "./ContractTransactions";
import ContractInternalTransactions from "./ContractInternalTransactions";
import ContractTokenTransfers from "./ContractTokenTransfers";
import ContractCode from "./ContractCode";
import ContractComponent from "./ContractComponent";
import ContractEvents from "./ContractEvents";
import { NoBox, TabTable2 } from "../../../../components";
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
    changeTab,
    history,
    icxCall,
    icxSendTransaction,
    walletAddress
  } = props;

  console.log("contract detail page");
  console.log(props);
  const { loading, data } = contract;
  const { address } = data;

  const [tabArrayStatus, setTabArrayStatus] = useState(
    setTabArray(contractTokenTx)
  );
  const [activeTab, setActiveTab] = useState(0);
  const [tabContent, setTabContent] = useState(
    getTabContent(
      activeTab,
      contractTx,
      contractInternalTx,
      contractTokenTx,
      contractEvents,
      contractAbi,
      contractReadInfo,
      contract,
      history,
      icxCall,
      icxSendTransaction,
      walletAddress,
      address,
      tabArrayStatus
    )
  );

  const handleTabClick = tabIndex => {
    setActiveTab(tabIndex);
    changeTab(tabIndex);
  };

  useEffect(() => {
    setTabArrayStatus(setTabArray(contractTokenTx));
  }, [contractTokenTx]);

  useEffect(() => {
    setTabContent(
      getTabContent(
        activeTab,
        contractTx,
        contractInternalTx,
        contractTokenTx,
        contractEvents,
        contractAbi,
        contractReadInfo,
        contract,
        history,
        icxCall,
        icxSendTransaction,
        walletAddress,
        address,
        tabArrayStatus
      )
    );
  }, [activeTab, contractTx, contractAbi, contractReadInfo, contractEvents, contractInternalTx, contractTokenTx]);

  useEffect(() => {
    console.log("active tab and tab array status", activeTab, tabArrayStatus);
    console.log(tabContent);
  });

  console.log("active tab", on);
  return (
    <TabTable2
      onClickTab={handleTabClick}
      TABS={tabArrayStatus}
      on={on}
      loading={loading}
      TableContents={null}
      {...props}
    >
      {tabContent}
    </TabTable2>
  );
}

function setTabArray(arr) {
  const result =
    arr !== null && arr.data.length > 0
      ? CONTRACT_TABS
      : CONTRACT_TABS.filter(tabName => tabName !== "Token Transfers");

  return result;
}

function getTabContent(
  activeTab,
  contractTx,
  contractInternalTx,
  contractTokenTx,
  contractEvents,
  contractAbi,
  contractReadInfo,
  contract,
  history,
  icxCall,
  icxSendTransaction,
  walletAddress,
  address,
  tabArrayStatus
) {
  let content;
  switch (activeTab) {
    case 0:
      content = (
        <ContractTransactions
          txData={contractTx}
          goAllTx={() => {
            history.push(`/${TX_TYPE.CONTRACT_TX}/${address}`);
          }}
          txType={TX_TYPE.CONTRACT_TX}
          address={address}
        />
      );
      break;
    case 1:
      content = (
        <ContractInternalTransactions
          txData={contractInternalTx}
          goAllTx={() => {
            history.push(`/${TX_TYPE.CONTRACT_INTERNAL_TX}/${address}`);
          }}
          txType={TX_TYPE.CONTRACT_INTERNAL_TX}
          address={address}
        />
      );
      break;
    case 2:
      if (tabArrayStatus.length === 5) {
        content = (
          <ContractCode contract={contract} contractAbi={contractAbi} />
        );
      } else {
        content = (
          <ContractTokenTransfers
            txData={contractTokenTx}
            goAllTx={() => {
              history.push(`/${TX_TYPE.CONTRACT_TOKEN_TX}/${address}`);
            }}
            txType={TX_TYPE.CONTRACT_TOKEN_TX}
            address={address}
          />
        );
      }
      break;
    case 3:
      if (tabArrayStatus.length === 5) {
        content = (
          <ContractComponent
            contract={contract}
            contractReadWriteInfo={contractReadInfo}
            icxCall={icxCall}
            icxSendTransaction={icxSendTransaction}
            walletAddress={walletAddress}
          />
        );
      } else {
        content = (
          <ContractCode contract={contract} contractAbi={contractAbi} />
        );
      }
      break;
    case 4:
      if (tabArrayStatus.length === 5) {
        content = (
          <ContractEvents
            txData={contractEvents}
            goAllTx={() => {
              history.push(`/${TX_TYPE.CONTRACT_EVENTS}/${address}`);
            }}
            txType={TX_TYPE.CONTRACT_EVENTS}
          />
        );
      } else {
        content = (
          <ContractComponent
            contract={contract}
            contractReadWriteInfo={contractReadInfo}
            icxCall={icxCall}
            icxSendTransaction={icxSendTransaction}
            walletAddress={walletAddress}
          />
        );
      }
      break;
    case 5:
      if (tabArrayStatus.length === 5) {
        content = <NoBox text="No Data" />;
      } else {
        content = (
          <ContractEvents
            txData={contractEvents}
            goAllTx={() => {
              history.push(`/${TX_TYPE.CONTRACT_EVENTS}/${address}`);
            }}
            txType={TX_TYPE.CONTRACT_EVENTS}
          />
        );
      }
      break;
    default:
      content = <NoBox text="No Data" />;
  }
  return content;
}
export default withRouter(ContractTabs);
