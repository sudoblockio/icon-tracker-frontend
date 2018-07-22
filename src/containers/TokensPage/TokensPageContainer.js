import { connect } from 'react-redux';
import { TokensPage } from '../../components/';
import { withRouter } from 'react-router-dom';
import { tokenList } from '../../redux/actions/tokensActions'

function mapStateToProps(state) {
  return {
    url: state.router.location,
    ...state.tokens
  };
}

function mapDispatchToProps(dispatch) {
  return {
    tokenList: payload => dispatch(tokenList(payload))
  };
}

const TokensPageContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(TokensPage));

export default TokensPageContainer;
