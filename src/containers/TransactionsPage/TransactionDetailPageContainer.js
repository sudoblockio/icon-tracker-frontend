import { connect } from 'react-redux';
import { TransactionDetailPage } from '../../components';
import { withRouter } from 'react-router-dom';
import { transactionEventLogList } from '../../redux/actions/transactionsActions';
import { transactionInternalTxList, transactionTxDetail } from '../../redux/store/transactions'

function mapStateToProps(state) {
  return {
    url: state.router.location,
    ...state.transactions
  };
}

function mapDispatchToProps(dispatch) {
  return {
    transactionTxDetail: (payload) => dispatch(transactionTxDetail(payload)),
    transactionEventLogList: (payload) => dispatch(transactionEventLogList(payload)),
    transactionInternalTxList: (payload) => dispatch(transactionInternalTxList(payload)),
  };
}

const TransactionDetailPageContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(TransactionDetailPage));

export default TransactionDetailPageContainer;
