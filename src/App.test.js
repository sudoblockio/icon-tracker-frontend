import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});

it('does not contain NaN values', () => {
  // get matching refs for tricky data
  // check that none of the values are NaN
}
)