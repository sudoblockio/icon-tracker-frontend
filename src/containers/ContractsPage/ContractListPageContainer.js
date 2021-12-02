import { connect } from 'react-redux';
import { ContractListPage } from '../../components';
import { withRouter } from 'react-router-dom';
import { 
  contractListAction,
  contractListSearchAction
} from '../../redux/store/contracts';
import { setPopup } from '../../redux/store/popups'

function mapStateToProps(state) {
  return {
    url: state.router.location,
    ...state.contracts
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setPopup: payload => dispatch(setPopup(payload)),
    contractList: payload => dispatch(contractListAction(payload)),
    contractListSearch: payload => dispatch(contractListSearchAction(payload)),
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ContractListPage));
