import { connect } from 'react-redux';
import { TransactionDetailPage } from '../../components';
import { withRouter } from 'react-router-dom';
import {transactionEventLogListAction, transactionTxDetailAction, transactionInternalTxListAction} from '../../redux/store/transactions'

function mapStateToProps(state) {
  return {
    url: state.router.location,
    ...state.transactions
  };
}

function mapDispatchToProps(dispatch) {
  return {
  transactionTxDetail: (payload) => dispatch(transactionTxDetailAction(payload)),
    transactionEventLogListAction: (payload) => dispatch(transactionEventLogListAction(payload)),
    transactionInternalTxList: (payload) => dispatch(transactionInternalTxListAction(payload)),
  };
}

const TransactionDetailPageContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(TransactionDetailPage));

export default TransactionDetailPageContainer;
