import { connect } from 'react-redux';
import { TransactionListPage } from 'components';
import {
  transactionRecentTx
} from '../../redux/actions/transactionsActions'

function mapStateToProps(state) {
  return {
    url: state.router.location,
    ...state.transactions
  };
}

function mapDispatchToProps(dispatch) {
  return {
    transactionRecentTx: payload => dispatch(transactionRecentTx(payload)),
  };
}

const TransactionsPageContainer = connect(mapStateToProps, mapDispatchToProps)(TransactionListPage);
export default TransactionsPageContainer;
