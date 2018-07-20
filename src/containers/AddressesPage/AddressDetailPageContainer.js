import { connect } from 'react-redux';
import { AddressDetailPage } from '../../components/';
import { withRouter } from 'react-router-dom';
import { 
  addressInfo,
  addressTxList,
  addressTokenTxList
} from '../../redux/actions/addressesActions';
import { 
  setPopup,
} from '../../redux/actions/popupActions';

function mapStateToProps(state) {
  return {
    url: state.router.location,
    wallet: state.addresses.wallet,
    walletTx: state.addresses.walletTx,
    walletTokenTx: state.addresses.walletTokenTx,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addressInfo: (payload) => dispatch(addressInfo(payload)),
    addressTxList: (payload) => dispatch(addressTxList(payload)),
    addressTokenTxList: (payload) => dispatch(addressTokenTxList(payload)),
    setPopup: (payload) => dispatch(setPopup(payload))
  };
}

const AddressesPageContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(AddressDetailPage));

export default AddressesPageContainer;
