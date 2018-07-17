import { connect } from 'react-redux';
import { TxPage } from '../../components/';
import { withRouter } from 'react-router-dom';
import { 
  contractTxList
} from '../../redux/actions/contractAction';

function mapStateToProps(state) {
  return {
    url: state.router.location,
    contractTx: state.contract.contractTx,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    contractTxList: (payload) => dispatch(contractTxList(payload))
  };
}

const TxPageContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(TxPage));
export default TxPageContainer;
