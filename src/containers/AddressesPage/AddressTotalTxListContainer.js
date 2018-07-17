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
import {
  tokenGetTokenTransferList,
} from '../../redux/actions/tokensActions'
import { 
  tokenGetTokenTransfers,
  tokenGetTokenHolders
} from '../../redux/actions/tokenActions';

function mapStateToProps(state) {
  return {
    url: state.router.location,
    walletTx: state.addresses.walletTx,
    walletTokenTx: state.addresses.walletTokenTx,
    blockTx: state.blocks.blockTx,
    recentTx: state.transactions.recentTx,
    recentTokenTx: state.tokens.recentTokenTx,
    tokenTransfers: state.token.tokenTransfers,
    tokenHolders: state.token.tokenHolders,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addressTxList: (payload) => dispatch(addressTxList(payload)),
    addressTokenTxList: (payload) => dispatch(addressTokenTxList(payload)),
    blockTxList: (payload) => dispatch(blockTxList(payload)),
    transactionRecentTx: (payload) => dispatch(transactionRecentTx(payload)),
    tokenGetTokenTransferList: (payload) => dispatch(tokenGetTokenTransferList(payload)),
    tokenGetTokenTransfers: payload => dispatch(tokenGetTokenTransfers(payload)),
    tokenGetTokenHolders: payload => dispatch(tokenGetTokenHolders(payload))
  };
}

const AddressTotalTxListContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(AddressTotalTxList));

export default AddressTotalTxListContainer;
