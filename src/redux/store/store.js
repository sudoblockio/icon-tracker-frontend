// import { createStore, applyMiddleware } from 'redux';
// import createSagaMiddleware from 'redux-saga';
// import { composeWithDevTools } from 'redux-devtools-extension';
import { createBrowserHistory as createHistory } from 'history'
// import rootReducer from '../reducers/rootReducer';
// import rootSaga from '../sagas/rootSaga';
// import { routerMiddleware } from 'react-router-redux'
// import persistState from 'redux-localstorage'

const history = createHistory()
// const routeMiddleware = routerMiddleware(history)
// const sagaMiddleware = createSagaMiddleware();
// const store = createStore(rootReducer, {}, composeWithDevTools(
//   applyMiddleware(sagaMiddleware),
//   applyMiddleware(routeMiddleware),
//   persistState(null, {
//     slicer: () => state => {
//       return { storage: state.storage }
//     }
//   })
// ));

// sagaMiddleware.run(rootSaga);

export {
//   store,
  history
}
