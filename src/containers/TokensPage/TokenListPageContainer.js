import { connect } from 'react-redux';
import { TokenListPage } from '../../components/';
import { withRouter } from 'react-router-dom';
import { tokenGetTokenList } from '../../redux/actions/tokensActions'

function mapStateToProps(state) {
  return {
    url: state.router.location,
    tokenList: state.tokens.tokenList,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    tokenGetTokenList: payload => dispatch(tokenGetTokenList(payload))
  };
}

const TokenListPageContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(TokenListPage));

export default TokenListPageContainer;
