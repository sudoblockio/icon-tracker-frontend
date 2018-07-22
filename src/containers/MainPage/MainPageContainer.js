import { connect } from 'react-redux';
import { MainPage } from '../../components/';
import { withRouter } from 'react-router-dom';
import { getMainInfo, getMainChart } from '../../redux/actions/mainPageActions'

function mapStateToProps(state) {
  return state.mainPage;
}

function mapDispatchToProps(dispatch) {
  return {
    getMainInfo: () => dispatch(getMainInfo()),
    getMainChart: () => dispatch(getMainChart())
  };
}

const MainPageContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(MainPage));

export default MainPageContainer;
