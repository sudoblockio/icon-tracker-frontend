import { connect } from 'react-redux';
import { AddressesPage } from '../../components/';
import { withRouter } from 'react-router-dom';
import { getAddresses } from '../../redux/actions/addressesActions';

function mapStateToProps(state) {
  return {
    loading: state.addresses.addresses.loading,
    data: state.addresses.addresses.data,
    pageNum: state.addresses.addresses.pageNum,
    maxPageNum: state.addresses.addresses.maxPageNum,
    url: state.router.location
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getAddresses: (pageNum) => dispatch(getAddresses(pageNum))
  };
}

const AddressDetailPageContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(AddressesPage));

export default AddressDetailPageContainer;
