import { connect } from 'react-redux';
import { AddressListPage } from 'components';
import { withRouter } from 'react-router-dom';
import { addressList } from '../../redux/actions/addressesActions';

function mapStateToProps(state) {
  return {
    url: state.router.location,
    ...state.addresses
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addressList: (payload) => dispatch(addressList(payload)),
  };
}

const AddressDetailPageContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(AddressListPage));

export default AddressDetailPageContainer;
