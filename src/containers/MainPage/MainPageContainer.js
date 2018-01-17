import { connect } from 'react-redux';
import { MainPage } from '../../components/';
import { withRouter } from 'react-router-dom';
import { getMainInfo } from '../../redux/actions/mainPageActions'

function mapStateToProps(state) {
  return {
    mainPage: state.mainPage
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getMainInfo: () => dispatch(getMainInfo())
  };
}

const MainPageContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(MainPage));

export default MainPageContainer;
