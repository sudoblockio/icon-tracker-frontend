import { connect } from "react-redux";
import { TokenDetailPage } from "../../components";
import { withRouter } from "react-router-dom";
import {
  tokenSummary,
  tokenTransfersList,
  tokenHoldersList,
  tokenTxList
} from "../../redux/actions/tokensActions";
import {
  icxCallAction,
  readContractInformationAction,
  contractTxListAction,
  contractEventLogListAction,
  contractInfoAction,
  contractDetailAction
} from "../../redux/store/contracts";
import { getTokenTotalSupply } from "../../redux/store/iiss";

function mapStateToProps(state) {
  console.log(state, "token cx state");
  return {
    url: state.router.location,
    contractInfo: state.contracts.contractReadInfo,
    contractTx: state.contracts.contractTx,
    contractEvents: state.contracts.contractEvents,
    contractDetails: state.contracts.contractDetail,
    ...state.tokens
  };
}

function mapDispatchToProps(dispatch) {
  return {
    contractTxList: payload => dispatch(contractTxListAction(payload)),
    tokenTotalSupply: payload => dispatch(getTokenTotalSupply(payload)),
    tokenSummary: payload => dispatch(tokenSummary(payload)),
    contractDetail: payload => dispatch(contractDetailAction(payload)),
    contractEventLogList: payload =>
      dispatch(contractEventLogListAction(payload)),
    tokenTransfersList: payload => dispatch(tokenTransfersList(payload)),
    tokenHoldersList: payload => dispatch(tokenHoldersList(payload)),
    icxCall: payload => dispatch(icxCallAction(payload)),
    readContractInformation: payload =>
      dispatch(readContractInformationAction(payload))
  };
}

const TokenDetailPageContainer = withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(TokenDetailPage)
);

export default TokenDetailPageContainer;
