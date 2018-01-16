import { createStore, applyMiddleware, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';
import createHistory from 'history/createBrowserHistory'
import rootReducer from '../reducers/rootReducer';
import rootSaga from '../sagas/rootSaga';
import { routerMiddleware } from 'react-router-redux'

const history = createHistory()
const routeMiddleware = routerMiddleware(history)

const sagaMiddleware = createSagaMiddleware();

const store = createStore(rootReducer, {}, composeWithDevTools(
  applyMiddleware(sagaMiddleware),
  applyMiddleware(routeMiddleware)
));

sagaMiddleware.run(rootSaga);

export {
  store,
  history
}
