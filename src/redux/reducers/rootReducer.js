import { combineReducers } from 'redux';
import { mainPageReducer } from './mainPageReducer'
import { addressesReducer } from './addressesReducer'
import { transactionsReducer } from '../store/transactions';
import { blocksReducer } from '../store/blocks'
import { searchReducer } from './searchReducer'
import { routerReducer } from 'react-router-redux'
import { tokensReducer } from './tokensReducer'
import { contractsReducer } from './contractsReducer'
import { popupReducer } from './popupReducer'
import { storageReducer } from './storageReducer'

const rootReducer = combineReducers({
  mainPage: mainPageReducer,
  addresses: addressesReducer,
  transactions: transactionsReducer,
  blocks: blocksReducer,
  search: searchReducer,
  router: routerReducer,
  tokens: tokensReducer,
  contracts: contractsReducer,
  popup: popupReducer,
  storage: storageReducer,
});

export default rootReducer;
