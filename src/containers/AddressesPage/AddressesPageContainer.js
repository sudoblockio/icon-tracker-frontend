import { connect } from 'react-redux';
import { AddressesPage } from '../../components/';
import { getAddresses } from '../../redux/actions/addressesActions';

function mapStateToProps(state) {
  return {
    loading: state.addresses.addresses.loading,
    data: state.addresses.addresses.data,
    pageNum: state.addresses.addresses.pageNum,
    maxPageNum: state.addresses.addresses.maxPageNum,
    location: state.router.location
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getAddresses: (pageNum) => dispatch(getAddresses(pageNum))
  };
}

const AddressDetailPageContainer = connect(mapStateToProps, mapDispatchToProps)(AddressesPage);

export default AddressDetailPageContainer;
