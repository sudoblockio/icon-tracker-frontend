import { connect } from 'react-redux';
import { AddressListPage } from '../../components';
import { withRouter } from 'react-router-dom';
import { addressList } from '../../redux/store/addresses';

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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AddressListPage));

