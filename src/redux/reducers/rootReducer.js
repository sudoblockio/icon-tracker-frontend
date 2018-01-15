import { combineReducers } from 'redux';
import { mainPageReducer } from './mainPageReducer'
import { addressesReducer } from './addressesReducer'
import { transactionsReducer } from './transactionsReducer'
import { blocksReducer } from './blocksReducer'

const rootReducer = combineReducers({
  mainPage: mainPageReducer,
  addresses: addressesReducer,
  transactions: transactionsReducer,
  blocks: blocksReducer,
});

export default rootReducer;
