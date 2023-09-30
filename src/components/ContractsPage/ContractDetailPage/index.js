import React, { useState, useEffect } from "react";
import ContractInfo from "./ContractInfo";
import ContractTabs from "./ContractTabs";
import { DetailPage } from "../../../components";
import { CONTRACT_TABS } from "../../../utils/const";

const ContractDetailPage = props => {
  console.log("contract detail page props");
  console.log(props);
  const { contract, contractTokenTx } = props;
  const { loading, error } = contract;
  const [tabArrayStatus, setTabArrayStatus] = useState(
    setTabArray(contractTokenTx)
  );

  useEffect(() => {
    setTabArrayStatus(setTabArray(contractTokenTx));
  }, [contractTokenTx]);

  const getInfo = addr => {
    props.contractInfo({ addr });
  };

  const getList = [
    addr => {
      props.contractTxList({ addr, page: 1, count: 10 });
    },
    addr => {
      props.contractInternalTxList({ addr, page: 1, count: 10 });
    },
    addr => {
      props.contractTokenTxList({ addr, page: 1, count: 10 });
    },
    address => {
      props.icxGetScore({ address });
    },
    address => {
      props.readContractInformation({ address });
    },
    contractAddr => {
      props.contractEventLogList({ contractAddr, page: 1, count: 10 });
    }
  ];

  return (
    <DetailPage
      {...props}
      loading={loading}
      error={error}
      TABS={tabArrayStatus}
      ROUTE="/contract"
      getInfo={getInfo}
      getList={getList}
      InfoComponent={ContractInfo}
      TabsComponent={ContractTabs}
      TxCount={props.contractTx.totalSize}
    />
  );
};

function setTabArray(arr) {
  const result =
    arr !== null && arr.data.length > 0
      ? CONTRACT_TABS
      : CONTRACT_TABS.filter(tabName => tabName !== "Token Transfers");

  return result;
}

export default ContractDetailPage;
