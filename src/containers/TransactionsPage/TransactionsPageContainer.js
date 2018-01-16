import { connect } from 'react-redux';
import { TransactionsPage } from '../../components/';
import { withRouter } from 'react-router-dom';

function mapStateToProps(state) {
  return {
  };
}

function mapDispatchToProps(dispatch) {
  return {
  };
}

const TransactionsPageContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(TransactionsPage));

export default TransactionsPageContainer;
