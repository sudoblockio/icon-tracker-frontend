import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { connectRouter } from 'connected-react-router'
import { createBrowserHistory } from 'history'
import blocksReducer from './blocks'
import thunk from 'redux-thunk';

const createRootReducer = (history) => combineReducers ({
    router: connectRouter(history),
    blocks: blocksReducer
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