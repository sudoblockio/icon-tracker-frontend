import { connect } from 'react-redux';
import { AddressDetailPage } from '../../components/';
import { withRouter } from 'react-router-dom';
import { 
  addressInfo,
  addressTxList,
  addressTokenTxList
} from '../../redux/actions/addressesActions';

function mapStateToProps(state) {
  return {
    url: state.router.location,
    ...state.addresses
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addressInfo: (payload) => dispatch(addressInfo(payload)),
    addressTxList: (payload) => dispatch(addressTxList(payload)),
    addressTokenTxList: (payload) => dispatch(addressTokenTxList(payload)),
  };
}

const AddressesPageContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(AddressDetailPage));

export default AddressesPageContainer;
