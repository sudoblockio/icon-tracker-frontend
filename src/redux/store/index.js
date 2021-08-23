import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk'
import { connectRouter } from 'connected-react-router'
import { createBrowserHistory } from 'history'
import blocksReducer from './blocks'
import popupReducer from './popup';
import searchReducer from './search'
import { storageReducer } from '../reducers/storageReducer';

const createRootReducer = (history) => combineReducers ({
    router: connectRouter(history),
    blocks: blocksReducer,
    search: searchReducer,
    popup: popupReducer,
    storage: storageReducer
});

let enhancer;

// TODO: add all the env vars
if (process.env.NODE_ENV === "production") {
    enhancer = applyMiddleware(thunkMiddleware);
  } else {
    const logger = require("redux-logger").default;
    const composeEnhancers =
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    enhancer = composeEnhancers(applyMiddleware(thunkMiddleware, logger));
  }

  // if (process.env.REACT_APP_ENV) {
  //   switch (process.env.REACT_APP_ENV) {
  //     case 'mainnet':
  //       return 'https://tracker.icon.foundation';
  //     // return 'https://bicon.tracker.solidwallet.io';
  //     case 'testnet':
  //       return 'https://trackerdev.icon.foundation';
  //     // return 'http://10.201.11.74:8081';
  //     case 'testnet1':
  //       return 'https://bicon.tracker.solidwallet.io';
  //     // return 'http://10.201.11.74:8081';
  //     case 'sejong':
  //       return 'https://sejong.tracker.solidwallet.io';
  //     case 'custom':
  //       return 'http://trackerlocaldev.icon.foundation';
  //     case 'prep':
  //     case 'np':
  //       return 'http://54.180.16.76';
  //     case 'qa':
  //       return 'http://13.125.236.68';
  //     default:
  //   }
  // }

export const history = createBrowserHistory()
const configureStore = (preloadedState) => {
    return createStore(createRootReducer(history), applyMiddleware(thunkMiddleware), preloadedState, enhancer);
  };

const store = configureStore();
if (process.env.NODE_ENV !== "production") {
    window.store = store;
  }

export default configureStore;