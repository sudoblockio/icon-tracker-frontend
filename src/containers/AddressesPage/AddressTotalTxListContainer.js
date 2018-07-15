import { connect } from 'react-redux';
import { AddressTotalTxList } from '../../components/';
import { withRouter } from 'react-router-dom';
import { 
  addressTxList,
  addressTokenTxList
} from '../../redux/actions/addressesActions';
import {
  blockTxList,
} from '../../redux/actions/blocksActions'
import {
  transactionRecentTx,
} from '../../redux/actions/transactionAction'

function mapStateToProps(state) {
  return {
    url: state.router.location,
    walletTx: state.addresses.walletTx,
    tokenTx: state.addresses.tokenTx,
    blockTx: state.blocks.blockTx,
    recentTx: state.transactions.recentTx,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addressTxList: (payload) => dispatch(addressTxList(payload)),
    addressTokenTxList: (payload) => dispatch(addressTokenTxList(payload)),
    blockTxList: (payload) => dispatch(blockTxList(payload)),
    transactionRecentTx: (payload) => dispatch(transactionRecentTx(payload)),
  };
}

const AddressTotalTxListContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(AddressTotalTxList));

export default AddressTotalTxListContainer;
