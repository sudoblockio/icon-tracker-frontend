import { connect } from 'react-redux';
import { ContractsPage } from '../../components/';
import { withRouter } from 'react-router-dom';

function mapStateToProps(state) {
  return {
  };
}

function mapDispatchToProps(dispatch) {
  return {
  };
}

const ContractsPageContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(ContractsPage));
export default ContractsPageContainer;
