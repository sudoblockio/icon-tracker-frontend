import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootSaga from '../sagas/rootSaga';
import { routerMiddleware } from 'react-router-redux'
import thunk from 'redux-thunk'
import persistState from 'redux-localstorage'
import { connectRouter } from 'connected-react-router'
import { createBrowserHistory } from 'history'
import blocksReducer from './blocks'
import transactionsReducer from './transactions'
import popupReducer from './popup';
import searchReducer from './search';
import { contractsReducer } from './contracts';
import { storageReducer } from '../reducers/storageReducer';

const createRootReducer = (history) => combineReducers ({
    router: connectRouter(history),
    blocks: blocksReducer,
    transactions: transactionsReducer,
    contracts: contractsReducer,
    search: searchReducer,
    popup: popupReducer,
    storage: storageReducer,
    
});

let enhancer;
export const history = createBrowserHistory();
const sagaMiddleware = createSagaMiddleware();
const routeMiddleware = routerMiddleware(history)

if (process.env.NODE_ENV === "production") {
    enhancer = applyMiddleware(thunk, sagaMiddleware);
  } else {
    const logger = require("redux-logger").default;
    const composeEnhancers =
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    enhancer = composeEnhancers(applyMiddleware(thunk, logger, sagaMiddleware, routeMiddleware),
    persistState(null, {
      slicer: () => state => {
        return { storage: state.storage }
      }
    }));
  }



const configureStore = (preloadedState) => {
    return createStore(createRootReducer(history), preloadedState, enhancer);
  };

const store = configureStore();
if (process.env.NODE_ENV !== "production") {
    window.store = store;
  }


  sagaMiddleware.run(rootSaga);
export default configureStore;