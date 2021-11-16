import { connect } from 'react-redux';
import { AddressDetailPage } from '../../components';
import { withRouter } from 'react-router-dom';
import { 
  addressDelegationListAction,
  addressInfoAction,
  addressTxListAction,
  addressInternalTxListAction,
  addressTokenTxListAction,
  addressVotedListAction,
  addressRewardListAction
} from '../../redux/store/addresses';
import { 
  setPopup 
} from '../../redux/store/popups'
import { 
  setNotification,
} from '../../redux/actions/storageActions';

function mapStateToProps(state) {
  return {
    url: state.router.location,
    ...state.addresses,
    walletAddress: state.storage.walletAddress,
    walletNotification: state.storage.walletNotification
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addressRewardList: payload => dispatch(addressRewardListAction(payload)),
    addressDelegationList: (payload) => dispatch(addressDelegationListAction(payload)),
    addressVotedList: (payload) => dispatch(addressVotedListAction(payload)),
    addressInfo: (payload) => dispatch(addressInfoAction(payload)),
    addressTxList: (payload) => dispatch(addressTxListAction(payload)),
    addressInternalTxList: (payload) => dispatch(addressInternalTxListAction(payload)),
    addressTokenTxList: (payload) => dispatch(addressTokenTxListAction(payload)),
    setNotification: (payload) => dispatch(setNotification(payload)),
    setPopup: (payload) => dispatch(setPopup(payload))
  };
}

const AddressListPageContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(AddressDetailPage));

export default AddressListPageContainer;
