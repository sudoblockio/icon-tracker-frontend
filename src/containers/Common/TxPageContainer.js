import { connect } from 'react-redux';
import { TxPage } from '../../components/';
import { withRouter } from 'react-router-dom';
import { 
  contractTxList,
} from '../../redux/actions/contractAction';
import { 
  addressTxList,
} from '../../redux/actions/addressesActions';

function mapStateToProps(state) {
  return {
    url: state.router.location,
    contractTx: state.contract.contractTx,
    walletTx: state.addresses.walletTx,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    contractTxList: payload => dispatch(contractTxList(payload)),
    addressTxList: payload => dispatch(addressTxList(payload))
  };
}

const TxPageContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(TxPage));
export default TxPageContainer;
