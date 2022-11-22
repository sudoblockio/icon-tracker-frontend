import {createStore, applyMiddleware} from 'redux';
import {createLogger} from 'redux-logger'
import createSagaMiddleware from 'redux-saga';
import {composeWithDevTools} from 'redux-devtools-extension';
import {createBrowserHistory as createHistory} from 'history'
import rootReducer from '../reducers/rootReducer';
import rootSaga from '../store/sagas/rootSaga';
import {routerMiddleware} from 'react-router-redux'
import persistState from 'redux-localstorage'

const logger = createLogger()
const history = createHistory()
const routeMiddleware = routerMiddleware(history)
const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer, {}, composeWithDevTools(
  applyMiddleware(sagaMiddleware),
  applyMiddleware(routeMiddleware),
  applyMiddleware(logger),
  persistState(null, {
    slicer: () => state => {
      return {storage: state.storage}
    }
  })
));

sagaMiddleware.run(rootSaga);

export {
  store,
  history
}
