import { connect } from 'react-redux';
import { AddressDetailPage } from '../../components/';
import { getAddressDetail } from '../../redux/actions/addressesActions';

function mapStateToProps(state) {
  return {
    loading: state.addresses.address.loading,
    data: state.addresses.address.data,
    pageNum: state.addresses.address.pageNum,
    maxPageNum: state.addresses.address.maxPageNum,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getAddressDetail: (address, pageNum) => dispatch(getAddressDetail(address, pageNum))
  };
}

const AddressesPageContainer = connect(mapStateToProps, mapDispatchToProps)(AddressDetailPage);

export default AddressesPageContainer;
