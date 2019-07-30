import { connect } from 'react-redux';
import { GovernancePage } from 'components';
import { withRouter } from 'react-router-dom';

function mapStateToProps(state) {
  return {
    url: state.router.location,
  };
}

function mapDispatchToProps(dispatch) {
  return {
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(GovernancePage));
