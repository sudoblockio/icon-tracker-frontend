import { connect } from 'react-redux';
import { TxPage } from '../../components';
import { withRouter } from 'react-router-dom';
import { 
  contractTxList,
  contractInternalTxList,
  contractTokenTxList,
  contractEventLogList
} from '../../redux/actions/contractsActions';
import { 
  addressList,
  addressTxList,
  addressInternalTxList,
  addressTokenTxList,
  addressRewardList,
  addressVotedList
} from '../../redux/actions/addressesActions';
import { 
  transactionRecentTx,
  transactionEventLogListAction,
  transactionInternalTxList
} from '../../redux/actions/transactionsActions';
import { 
  tokenTxList,
  tokenTransfersList,
  tokenHoldersList
} from '../../redux/actions/tokensActions';
import { 
  blockList,
  blockTxList,
} from '../../redux/actions/blocksActions';

function mapStateToProps(state) {
  return {
    url: state.router.location,
    contractTx: state.contracts.contractTx,
    contractInternalTx: state.contracts.contractInternalTx,
    contractTokenTx: state.contracts.contractTokenTx,
    contractEvents: state.contracts.contractEvents,
    addresses: state.addresses.addresses,
    walletTx: state.addresses.walletTx,
    addressInternalTx: state.addresses.addressInternalTx,
    walletTokenTx: state.addresses.walletTokenTx,
    recentTx: state.transactions.recentTx,
    recentTokenTx: state.tokens.recentTokenTx,
    blocks: state.blocks.blocks,
    blockTx: state.blocks.blockTx,
    tokenTransfers: state.tokens.tokenTransfers,
    tokenHolders: state.tokens.tokenHolders,
    transactionEvents: state.transactions.transactionEvents,
    transactionInternalTx: state.transactions.transactionInternalTx,
    addressReward: state.addresses.addressReward,
    addressVoted: state.addresses.addressVoted
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addressVotedList: payload => dispatch(addressVotedList(payload)),
    contractTxList: payload => dispatch(contractTxList(payload)),
    contractInternalTxList: payload => dispatch(contractInternalTxList(payload)),
    contractTokenTxList: payload => dispatch(contractTokenTxList(payload)),
    contractEventLogList: payload => dispatch(contractEventLogList(payload)),
    addressList: payload => dispatch(addressList(payload)),
    addressInternalTxList: payload => dispatch(addressInternalTxList(payload)),
    addressTxList: payload => dispatch(addressTxList(payload)),
    addressTokenTxList: payload => dispatch(addressTokenTxList(payload)),
    transactionRecentTx: payload => dispatch(transactionRecentTx(payload)),
    tokenTxList: payload => dispatch(tokenTxList(payload)),
    blockList: payload => dispatch(blockList(payload)),
    blockTxList: payload => dispatch(blockTxList(payload)),
    tokenTransfersList: payload => dispatch(tokenTransfersList(payload)),
    tokenHoldersList: payload => dispatch(tokenHoldersList(payload)),
    transactionEventLogListAction: payload => dispatch(transactionEventLogListAction(payload)),
    transactionInternalTxList: payload => dispatch(transactionInternalTxList(payload)),
    addressRewardList: payload => dispatch(addressRewardList(payload)),
  };
}

const TxPageContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(TxPage));
export default TxPageContainer;
