import { connect } from 'react-redux';
import Routes from '../../Routes.js';

function mapStateToProps(state) {
  return {
    location: state.router.location
  };
}

function mapDispatchToProps(dispatch) {
  return {

  };
}

const RoutesContainer = connect(mapStateToProps, mapDispatchToProps)(Routes);

export default RoutesContainer;
