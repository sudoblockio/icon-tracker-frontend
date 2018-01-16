import { combineReducers } from 'redux';
import { mainPageReducer } from './mainPageReducer'
import { addressesReducer } from './addressesReducer'
import { transactionsReducer } from './transactionsReducer'
import { blocksReducer } from './blocksReducer'
import { routerReducer } from 'react-router-redux'

const rootReducer = combineReducers({
  mainPage: mainPageReducer,
  addresses: addressesReducer,
  transactions: transactionsReducer,
  blocks: blocksReducer,
  router: routerReducer
});

export default rootReducer;
