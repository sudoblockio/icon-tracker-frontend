import { connect } from 'react-redux';
import { MainPage } from '../../components/';
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

const MainPageContainer = connect(mapStateToProps, mapDispatchToProps)(MainPage);

export default MainPageContainer;
