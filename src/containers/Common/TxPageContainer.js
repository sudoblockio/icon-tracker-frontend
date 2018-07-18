import { connect } from 'react-redux';
import { TxPage } from '../../components/';
import { withRouter } from 'react-router-dom';
import { 
  contractTxList,
} from '../../redux/actions/contractsActions';
import { 
  addressTxList,
  addressTokenTxList
} from '../../redux/actions/addressesActions';
import { 
  transactionRecentTx,
} from '../../redux/actions/transactionsActions';
import { 
  tokenTxList,
  tokenTransfersList,
  tokenHoldersList
} from '../../redux/actions/tokensActions';
import { 
  blockTxList,
} from '../../redux/actions/blocksActions';

function mapStateToProps(state) {
  return {
    url: state.router.location,
    contractTx: state.contracts.contractTx,
    walletTx: state.addresses.walletTx,
    walletTokenTx: state.addresses.walletTokenTx,
    recentTx: state.transactions.recentTx,
    recentTokenTx: state.tokens.recentTokenTx,
    blockTx: state.blocks.blockTx,
    tokenTransfers: state.tokens.tokenTransfers,
    tokenHolders: state.tokens.tokenHolders,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    contractTxList: payload => dispatch(contractTxList(payload)),
    addressTxList: payload => dispatch(addressTxList(payload)),
    addressTokenTxList: payload => dispatch(addressTokenTxList(payload)),
    transactionRecentTx: payload => dispatch(transactionRecentTx(payload)),
    tokenTxList: payload => dispatch(tokenTxList(payload)),
    blockTxList: payload => dispatch(blockTxList(payload)),
    tokenTransfersList: payload => dispatch(tokenTransfersList(payload)),
    tokenHoldersList: payload => dispatch(tokenHoldersList(payload)),
  };
}

const TxPageContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(TxPage));
export default TxPageContainer;
