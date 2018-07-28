import { connect } from 'react-redux';
import { ContractListPage } from 'components';
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

const ContractsPageContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(ContractListPage));
export default ContractsPageContainer;
