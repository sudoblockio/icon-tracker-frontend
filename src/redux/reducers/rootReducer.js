import { combineReducers } from 'redux';
import { mainPageReducer } from './mainPageReducer'
import { walletReducer } from './walletReducer'
import { transactionsReducer } from './transactionsReducer'
import { blocksReducer } from './blocksReducer'

const rootReducer = combineReducers({
  mainPage: mainPageReducer,
  wallet: walletReducer,
  transactions: transactionsReducer,
  blocks: blocksReducer,
});

export default rootReducer;
