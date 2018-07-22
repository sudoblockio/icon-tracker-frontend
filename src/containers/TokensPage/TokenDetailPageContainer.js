import { connect } from 'react-redux';
import { TokenDetailPage } from '../../components/';
import { withRouter } from 'react-router-dom';
import { 
  tokenSummary,
  tokenTransfersList,
  tokenHoldersList
} from '../../redux/actions/tokensActions'

function mapStateToProps(state) {
  return {
    url: state.router.location,
    ...state.tokens
  };
}

function mapDispatchToProps(dispatch) {
  return {
    tokenSummary: payload => dispatch(tokenSummary(payload)),
    tokenTransfersList: payload => dispatch(tokenTransfersList(payload)),
    tokenHoldersList: payload => dispatch(tokenHoldersList(payload)),
  };
}

const TokenDetailPageContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(TokenDetailPage));

export default TokenDetailPageContainer;
