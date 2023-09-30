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
  contractTxListAction
} from "../../redux/store/contracts";
import { getTokenTotalSupply } from "../../redux/store/iiss";

function mapStateToProps(state) {
  return {
    url: state.router.location,
    contractInfo: state.contracts.contractReadInfo,
    contractTx: state.contracts.contractTx,
    ...state.tokens
  };
}

function mapDispatchToProps(dispatch) {
  return {
    contractTxList: payload => dispatch(contractTxListAction(payload)),
    tokenTotalSupply: payload => dispatch(getTokenTotalSupply(payload)),
    tokenSummary: payload => dispatch(tokenSummary(payload)),
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
