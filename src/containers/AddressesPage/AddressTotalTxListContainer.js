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
} from '../../redux/actions/transactionsActions'
import {
  tokenTxList,
} from '../../redux/actions/tokensActions'
import { 
  tokenTransfersList,
  tokenHoldersList
} from '../../redux/actions/tokensActions';

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
    tokenTxList: (payload) => dispatch(tokenTxList(payload)),
    tokenTransfersList: payload => dispatch(tokenTransfersList(payload)),
    tokenHoldersList: payload => dispatch(tokenHoldersList(payload))
  };
}

const AddressTotalTxListContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(AddressTotalTxList));

export default AddressTotalTxListContainer;
