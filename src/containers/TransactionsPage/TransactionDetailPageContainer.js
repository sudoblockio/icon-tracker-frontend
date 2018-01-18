import { connect } from 'react-redux';
import { TransactionDetailPage } from '../../components/';
import { withRouter } from 'react-router-dom';
import { getTransaction } from '../../redux/actions/transactionAction';

function mapStateToProps(state) {
  return {
    loading: state.transactions.transaction.loading,
    data: state.transactions.transaction.data,
    url: state.router.location,
    error: state.transactions.transaction.error
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getTransaction: (payload) => dispatch(getTransaction(payload))
  };
}

const TransactionDetailPageContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(TransactionDetailPage));

export default TransactionDetailPageContainer;
