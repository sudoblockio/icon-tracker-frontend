import { connect } from "react-redux";
import { ContractsPageSelector } from "../../components";
import { withRouter } from "react-router-dom";
import {
  contractListAction,
  contractListSearchAction,
  contractInfoAction,
  contractDetailAction,
  readContractInformationAction,
  icxSendTransactionAction,
  icxCallAction,
  icxGetScoreAction
} from "../../redux/store/contracts";
import { setPopup } from "../../redux/store/popups";

function mapStateToProps(state) {
  console.log(state, "whole state in ContractsPageSelectorContainer.js");
  const copyLocation = JSON.parse(JSON.stringify(state.router.location));
  console.log(state.router);
  console.log(state.router.location);
  console.log("copyLocation");
  console.log(copyLocation);
  console.log(copyLocation.pathname);
  return {
    url: state.router.location,
    ...state.contracts,
    wallet: state.storage.walletAddress
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setPopup: payload => dispatch(setPopup(payload)),
    contractList: payload => dispatch(contractListAction(payload)),
    contractListSearch: payload => dispatch(contractListSearchAction(payload)),
    contractInfo: payload => dispatch(contractInfoAction(payload)),
    contractDetail: payload => dispatch(contractDetailAction(payload)),
    readContractInformation: payload =>
      dispatch(readContractInformationAction(payload)),
    icxSendTransaction: payload => dispatch(icxSendTransactionAction(payload)),
    icxCall: payload => dispatch(icxCallAction(payload)),
    icxGetScore: payload => dispatch(icxGetScoreAction(payload))
  };
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ContractsPageSelector)
);
