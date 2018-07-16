import { connect } from 'react-redux';
import { TokenDetailPage } from '../../components/';
import { withRouter } from 'react-router-dom';

function mapStateToProps(state) {
  return {
  };
}

function mapDispatchToProps(dispatch) {
  return {
  };
}

const TokenDetailPageContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(TokenDetailPage));

export default TokenDetailPageContainer;
