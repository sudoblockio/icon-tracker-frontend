import { connect } from 'react-redux';
import { AddressDetailPage } from '../../components/';
import { initAddressDetail, getAddressDetail } from '../../redux/actions/addressesActions';

function mapStateToProps(state) {
  return {
    loading: state.addresses.address.loading,
    data: state.addresses.address.data,
    pageNum: state.addresses.address.pageNum,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    initAddressDetail: () => dispatch(initAddressDetail()),
    getAddressDetail: (address) => dispatch(getAddressDetail(address))
  };
}

const AddressesPageContainer = connect(mapStateToProps, mapDispatchToProps)(AddressDetailPage);

export default AddressesPageContainer;
