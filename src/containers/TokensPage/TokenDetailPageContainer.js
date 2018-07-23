import { connect } from 'react-redux';
import { TokenDetailPage } from '../../components/';
import { withRouter } from 'react-router-dom';
import { 
  tokenSummary,
  tokenTransfersList,
  tokenHoldersList
} from '../../redux/actions/tokensActions'
import {
  icxCall,
  readContractInformation
} from '../../redux/actions/contractsActions'

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
    icxCall: payload => dispatch(icxCall(payload)),        
    readContractInformation: payload => dispatch(readContractInformation(payload))
  };
}

const TokenDetailPageContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(TokenDetailPage));

export default TokenDetailPageContainer;
