import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer'
import App from './App';
import TxTableBody from '../src/components/CommonPage/TxPage/TxTableBody'
import {makeUrl} from './utils/utils'

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});

it('Table values do not change unexpectedly, no undefined or NaN', () => {
  const component = renderer.create(
    <TxTableBody/>
  )
  let tree = component.toJSON();
  expect(tree).toMatchSnapShot()
  });

it ('makeURL fn works, does not send undefined or NaN values', () => {
  const inputs = [
    ["/api/v1/transactions", {limit: 1, skip: 0}],
    ["/api/v1/blocks", {count: 100, skip: 0}],
    ["/api/v1/tokens", {page: 100, total: 0}],
    ["/api/v1/blocks", {count: 100, skip: 0}],
    ["/api/v1/tokentx/cx2137642d0bf1926fbe23a3688d042a0f34bc2b9a", {count: 10, skip: 10}]

  ]
  inputs.forEach(input => {
    const result = makeUrl(input)
    expect(result).not.toContain('NaN')
  })
});

