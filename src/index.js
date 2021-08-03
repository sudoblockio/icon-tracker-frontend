import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';
import configureStore, { history } from './redux/store';
import './index.css';
import './style/css/font.css'
import './style/css/common.css'
import './style-custom/default.css'
import './style-custom/custom.css'

const store = configureStore();

ReactDOM.render(
  <ReduxProvider store={store}>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </ReduxProvider>,
  document.getElementById('root')
);