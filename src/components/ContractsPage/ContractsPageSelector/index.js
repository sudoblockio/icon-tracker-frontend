import React, { Component } from "react";
import { ContractListPage, ContractExplorerPage } from "../../../components";

class ContractsPageSelector extends Component {
  render() {
    console.log("inside contracts page selector");
    console.log(this.props);

    return this.props.location.pathname === "/contracts/tool" ? (
      <ContractExplorerPage {...this.props} />
    ) : (
      <ContractListPage {...this.props} />
    );
  }
}
export default ContractsPageSelector;
