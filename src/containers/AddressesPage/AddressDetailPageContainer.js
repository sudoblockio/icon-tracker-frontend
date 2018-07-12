import { connect } from 'react-redux';
import { AddressDetailPage } from '../../components/';
import { withRouter } from 'react-router-dom';
import { 
  // getAddressDetail, 
  setAddress,
  addressInfo,
  addressTxList,
  addressTokenTxList
} from '../../redux/actions/addressesActions';

function mapStateToProps(state) {
  return {
    url: state.router.location,
    walletDetail: state.addresses.walletDetail,
    walletTx: state.addresses.walletTx,
    tokenTx: state.addresses.tokenTx,


    loading: state.addresses.address.loading,
    error: state.addresses.address.error,

    // data: state.addresses.address.data,
    // pageNum: state.addresses.address.pageNum,
    // maxPageNum: state.addresses.address.maxPageNum,
    // totalData: state.addresses.address.totalData,
    // url: state.router.location,
    // error: state.addresses.address.error,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    // getAddressDetail: (address, pageNum) => dispatch(getAddressDetail(address, pageNum)),
    setAddress: (address) => dispatch(setAddress(address)),
    addressInfo: (payload) => dispatch(addressInfo(payload)),
    addressTxList: (payload) => dispatch(addressTxList(payload)),
    addressTokenTxList: (payload) => dispatch(addressTokenTxList(payload)),
  };
}

const AddressesPageContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(AddressDetailPage));

export default AddressesPageContainer;
