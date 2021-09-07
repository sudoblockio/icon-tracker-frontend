import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk'
import { connectRouter } from 'connected-react-router'
import { createBrowserHistory } from 'history'
import blocksReducer from './blocks'
import transactionsReducer from './transactions'
import popupReducer from './popup';
import searchReducer from './search'
import { storageReducer } from '../reducers/storageReducer';

const createRootReducer = (history) => combineReducers ({
    router: connectRouter(history),
    blocks: blocksReducer,
    transactions: transactionsReducer,
    search: searchReducer,
    popup: popupReducer,
    storage: storageReducer
});

let enhancer;

if (process.env.NODE_ENV === "production") {
    enhancer = applyMiddleware(thunk);
  } else {
    const logger = require("redux-logger").default;
    const composeEnhancers =
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    enhancer = composeEnhancers(applyMiddleware(thunk, logger));
  }

export const history = createBrowserHistory()
const configureStore = (preloadedState) => {
    return createStore(createRootReducer(history), preloadedState, enhancer);
  };

const store = configureStore();
if (process.env.NODE_ENV !== "production") {
    window.store = store;
  }

export default configureStore;