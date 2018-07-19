import { connect } from 'react-redux';
import { TransactionDetailPage } from '../../components/';
import { withRouter } from 'react-router-dom';
import { transactionTxDetail } from '../../redux/actions/transactionsActions';

function mapStateToProps(state) {
  return {
    url: state.router.location,
    transaction: state.transactions.transaction,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    transactionTxDetail: (payload) => dispatch(transactionTxDetail(payload))
  };
}

const TransactionDetailPageContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(TransactionDetailPage));

export default TransactionDetailPageContainer;
