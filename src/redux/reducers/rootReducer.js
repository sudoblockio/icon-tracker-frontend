import { combineReducers } from 'redux'
import { mainPageReducer } from './mainPageReducer'
import { addressesReducer } from '../store/addresses'
import { transactionsReducer } from '../store/transactions'
import { blocksReducer } from '../store/blocks'
import { searchReducer } from '../store/search'
import { routerReducer } from 'react-router-redux'
import { tokensReducer } from './tokensReducer'
import { contractsReducer } from '../store/contracts'
import { popupReducer } from '../store/popups'
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
})

export default rootReducer
