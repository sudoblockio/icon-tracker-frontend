import { connect } from 'react-redux';
import { TxPage } from '../../components/';
import { withRouter } from 'react-router-dom';
import { 
  contractTxList,
} from '../../redux/actions/contractAction';
import { 
  addressTxList,
  addressTokenTxList
} from '../../redux/actions/addressesActions';

function mapStateToProps(state) {
  return {
    url: state.router.location,
    contractTx: state.contract.contractTx,
    walletTx: state.addresses.walletTx,
    walletTokenTx: state.addresses.walletTokenTx,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    contractTxList: payload => dispatch(contractTxList(payload)),
    addressTxList: payload => dispatch(addressTxList(payload)),
    addressTokenTxList: payload => dispatch(addressTokenTxList(payload)),
  };
}

const TxPageContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(TxPage));
export default TxPageContainer;
