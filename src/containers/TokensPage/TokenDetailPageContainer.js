import { connect } from 'react-redux';
import { TokenDetailPage } from '../../components/';
import { withRouter } from 'react-router-dom';
import { 
  tokenGetTokenSummary,
  tokenGetTokenTransfers,
  tokenGetTokenHolders
} from '../../redux/actions/tokenActions'

function mapStateToProps(state) {
  return {
    url: state.router.location,
    token: state.token.token,
    tokenTransfers: state.token.tokenTransfers,
    tokenHolders: state.token.tokenHolders
  };
}

function mapDispatchToProps(dispatch) {
  return {
    tokenGetTokenSummary: payload => dispatch(tokenGetTokenSummary(payload)),
    tokenGetTokenTransfers: payload => dispatch(tokenGetTokenTransfers(payload)),
    tokenGetTokenHolders: payload => dispatch(tokenGetTokenHolders(payload)),
  };
}

const TokenDetailPageContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(TokenDetailPage));

export default TokenDetailPageContainer;
