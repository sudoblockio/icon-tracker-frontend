import { connect } from 'react-redux';
import { TxPage } from '../../components/';
import { withRouter } from 'react-router-dom';
import { 
  contractTxList,
} from '../../redux/actions/contractAction';
import { 
  addressTxList,
  addressTokenTxList
} from '../../redux/actions/addressesActions';
import { 
  transactionRecentTx,
} from '../../redux/actions/transactionAction';
import { 
  tokenTxList,
} from '../../redux/actions/tokensActions';

function mapStateToProps(state) {
  return {
    url: state.router.location,
    contractTx: state.contract.contractTx,
    walletTx: state.addresses.walletTx,
    walletTokenTx: state.addresses.walletTokenTx,
    recentTx: state.transactions.recentTx,
    recentTokenTx: state.tokens.recentTokenTx
  };
}

function mapDispatchToProps(dispatch) {
  return {
    contractTxList: payload => dispatch(contractTxList(payload)),
    addressTxList: payload => dispatch(addressTxList(payload)),
    addressTokenTxList: payload => dispatch(addressTokenTxList(payload)),
    transactionRecentTx: payload => dispatch(transactionRecentTx(payload)),
    tokenTxList: payload => dispatch(tokenTxList(payload)),
  };
}

const TxPageContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(TxPage));
export default TxPageContainer;
