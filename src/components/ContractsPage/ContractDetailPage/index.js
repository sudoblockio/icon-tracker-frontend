import React from "react";
import ContractInfo from "./ContractInfo";
import ContractTabs from "./ContractTabs";
import { DetailPage } from "../../../components";
import { CONTRACT_TABS } from "../../../utils/const";

const ContractDetailPage = props => {
  const { contract } = props;
  const { loading, error } = contract;

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
      TABS={CONTRACT_TABS}
      ROUTE="/contract"
      getInfo={getInfo}
      getList={getList}
      InfoComponent={ContractInfo}
      TabsComponent={ContractTabs}
      TxCount={props.contractTx.totalSize}
    />
  );
};

export default ContractDetailPage;
