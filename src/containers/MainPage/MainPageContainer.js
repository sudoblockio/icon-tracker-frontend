import { connect } from 'react-redux';
import { MainPage } from '../../components';
import { withRouter } from 'react-router-dom';
import { getMainInfo, getMainChart } from '../../redux/actions/mainPageActions'
import { blockListAction } from '../../redux/store/blocks'
import { transactionRecentTxAction } from '../../redux/store/transactions'

function mapStateToProps(state) {
  
  return state.mainPage;
}

function mapDispatchToProps(dispatch) {
  return {
    getBlockList: () => dispatch(blockListAction()),
    getRecentTransactions: () => dispatch(transactionRecentTxAction()),
    // getMainChart: () => dispatch(getMainChart())
  };
}

const MainPageContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(MainPage));

export default MainPageContainer;
