import { connect } from 'react-redux';
import { TransactionsPage } from '../../components';
import { getTransactions } from '../../redux/actions/transactionAction';
import { withRouter } from 'react-router-dom';

function mapStateToProps(state) {
  console.log(state.transactions.transactions.data);
  return {
    loading: state.transactions.transactions.loading,
    data: state.transactions.transactions.data,
    pageNum: state.transactions.transactions.pageNum
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getTransactions : (pageId) => dispatch(getTransactions(pageId))
  };
}

const TransactionsPageContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(TransactionsPage));

export default TransactionsPageContainer;
