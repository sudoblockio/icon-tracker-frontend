import { connect } from 'react-redux';
import { ContractsPage } from '../../components/';
import { withRouter } from 'react-router-dom';
import { 
  contractList,
  contractListSearch
} from '../../redux/actions/contractsActions';

function mapStateToProps(state) {
  return {
    url: state.router.location,
    ...state.contracts
  };
}

function mapDispatchToProps(dispatch) {
  return {
    contractList: payload => dispatch(contractList(payload)),
    contractListSearch: payload => dispatch(contractListSearch(payload)),
  };
}

const ContractsPageContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(ContractsPage));
export default ContractsPageContainer;
