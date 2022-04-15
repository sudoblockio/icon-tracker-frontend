import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

import './index.css';
import './style/css/font.css'
import './style/css/common.css'
import './style-custom/default.css'
import './style-custom/custom.css'
import './style-custom/shape.css'

ReactDOM.render(
  <BrowserRouter>
    <App/>
  </BrowserRouter>,
  document.getElementById('root')
);