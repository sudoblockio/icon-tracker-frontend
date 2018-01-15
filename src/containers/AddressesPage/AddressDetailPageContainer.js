import { connect } from 'react-redux';
import { AddressDetailPage } from '../../components/';
import { getAddressDetail } from '../../redux/actions/addressesActions';

function mapStateToProps(state) {
  return {
    loading: state.addresses.address.loading,
    data: state.addresses.address.data,
    pageNum: state.addresses.address.pageNum,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getAddressDetail: (address) => dispatch(getAddressDetail(address))
  };
}

const AddressesPageContainer = connect(mapStateToProps, mapDispatchToProps)(AddressDetailPage);

export default AddressesPageContainer;
