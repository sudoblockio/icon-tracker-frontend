import { connect } from 'react-redux';
import { TransactionDetailPage } from '../../components/';
import { withRouter } from 'react-router-dom';
import { 
  transactionTxDetail,
  transactionEventLogList
} from '../../redux/actions/transactionsActions';

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
  };
}

const TransactionDetailPageContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(TransactionDetailPage));

export default TransactionDetailPageContainer;
