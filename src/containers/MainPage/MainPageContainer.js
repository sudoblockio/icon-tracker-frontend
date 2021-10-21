import { connect } from 'react-redux';
import { MainPage } from '../../components';
import { withRouter } from 'react-router-dom';
import { getMainInfo, getMainChart } from '../../redux/actions/mainPageActions'
import { blockList } from '../../redux/actions/blocksActions'
import { transactionRecentTx } from '../../redux/actions/transactionsActions'

function mapStateToProps(state) {
  
  return state.mainPage;
}

function mapDispatchToProps(dispatch) {
  return {
    getBlockList: () => dispatch(blockList()),
    getRecentTransactions: () => dispatch(transactionRecentTx()),
    // getMainChart: () => dispatch(getMainChart())
  };
}

const MainPageContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(MainPage));

export default MainPageContainer;
