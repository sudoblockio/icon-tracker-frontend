import { connect } from 'react-redux';
import { AddressTxList } from '../../components/';
import { withRouter } from 'react-router-dom';
import { 
  addressTxList,
} from '../../redux/actions/addressesActions';

function mapStateToProps(state) {
  return {
    url: state.router.location,
    walletTx: state.addresses.walletTx,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addressTxList: (payload) => dispatch(addressTxList(payload)),
  };
}

const AddressTxListContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(AddressTxList));

export default AddressTxListContainer;
