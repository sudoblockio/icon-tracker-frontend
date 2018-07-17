import { connect } from 'react-redux';
import { ContractsPage } from '../../components/';
import { withRouter } from 'react-router-dom';
import { selectContractList } from '../../redux/actions/contractsAction';

function mapStateToProps(state) {
  return {
    url: state.router.location,
    contracts: state.contracts.contracts
  };
}

function mapDispatchToProps(dispatch) {
  return {
    selectContractList: payload => dispatch(selectContractList(payload))
  };
}

const ContractsPageContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(ContractsPage));
export default ContractsPageContainer;
