import { connect } from 'react-redux';
import { TxPage } from 'components';
import { withRouter } from 'react-router-dom';
import { 
  contractTxList,
  contractTokenTxList,
  contractEventLogList
} from '../../redux/actions/contractsActions';
import { 
  addressList,
  addressTxList,
  addressTokenTxList
} from '../../redux/actions/addressesActions';
import { 
  transactionRecentTx,
  transactionEventLogList
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
    contractTokenTx: state.contracts.contractTokenTx,
    contractEvents: state.contracts.contractEvents,
    addresses: state.addresses.addresses,
    walletTx: state.addresses.walletTx,
    walletTokenTx: state.addresses.walletTokenTx,
    recentTx: state.transactions.recentTx,
    recentTokenTx: state.tokens.recentTokenTx,
    blocks: state.blocks.blocks,
    blockTx: state.blocks.blockTx,
    tokenTransfers: state.tokens.tokenTransfers,
    tokenHolders: state.tokens.tokenHolders,
    transactionEvents: state.transactions.transactionEvents
  };
}

function mapDispatchToProps(dispatch) {
  return {
    contractTxList: payload => dispatch(contractTxList(payload)),
    contractTokenTxList: payload => dispatch(contractTokenTxList(payload)),
    contractEventLogList: payload => dispatch(contractEventLogList(payload)),
    addressList: payload => dispatch(addressList(payload)),
    addressTxList: payload => dispatch(addressTxList(payload)),
    addressTokenTxList: payload => dispatch(addressTokenTxList(payload)),
    transactionRecentTx: payload => dispatch(transactionRecentTx(payload)),
    tokenTxList: payload => dispatch(tokenTxList(payload)),
    blockList: payload => dispatch(blockList(payload)),
    blockTxList: payload => dispatch(blockTxList(payload)),
    tokenTransfersList: payload => dispatch(tokenTransfersList(payload)),
    tokenHoldersList: payload => dispatch(tokenHoldersList(payload)),
    transactionEventLogList: payload => dispatch(transactionEventLogList(payload)),
  };
}

const TxPageContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(TxPage));
export default TxPageContainer;
