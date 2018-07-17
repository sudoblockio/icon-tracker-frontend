import { combineReducers } from 'redux';
import { mainPageReducer } from './mainPageReducer'
import { addressesReducer } from './addressesReducer'
import { transactionsReducer } from './transactionsReducer'
import { blocksReducer } from './blocksReducer'
import { searchReducer } from './searchReducer'
import { routerReducer } from 'react-router-redux'
import { tokenReducer } from './tokenReducer'
import { tokensReducer } from './tokensReducer'

const rootReducer = combineReducers({
  mainPage: mainPageReducer,
  addresses: addressesReducer,
  transactions: transactionsReducer,
  blocks: blocksReducer,
  search: searchReducer,
  router: routerReducer,
  token: tokenReducer,
  tokens: tokensReducer,
});

export default rootReducer;
