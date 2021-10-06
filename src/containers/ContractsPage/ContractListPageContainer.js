import { connect } from 'react-redux';
import { ContractListPage } from '../../components';
import { withRouter } from 'react-router-dom';
import { 
  contractListSearch
} from '../../redux/actions/contractsActions';
import { contractList } from '../../redux/store/contracts'

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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ContractListPage));
