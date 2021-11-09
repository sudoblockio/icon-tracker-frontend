import { connect } from 'react-redux';
import { TokenDetailPage } from '../../components';
import { withRouter } from 'react-router-dom';
import { 
  tokenSummary,
  tokenTransfersList,
  tokenHoldersList
} from '../../redux/actions/tokensActions'
import {
  icxCallAction,
  readContractInformationAction
} from '../../redux/store/contracts'

function mapStateToProps(state) {
  return {
    url: state.router.location,
    ...state.tokens,
    contractReadInfo: state.contracts.contractReadInfo
  };
}

function mapDispatchToProps(dispatch) {
  return {
    tokenSummary: payload => dispatch(tokenSummary(payload)),
    tokenTransfersList: payload => dispatch(tokenTransfersList(payload)),
    tokenHoldersList: payload => dispatch(tokenHoldersList(payload)),
    icxCall: payload => dispatch(icxCallAction(payload)),        
    readContractInformation: payload => dispatch(readContractInformationAction(payload))
  };
}

const TokenDetailPageContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(TokenDetailPage));

export default TokenDetailPageContainer;
