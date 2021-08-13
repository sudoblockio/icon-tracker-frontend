import { createBrowserHistory as createHistory } from 'history'

const history = createHistory()
const config = {
  // API Endpoints
  'BLOCKS_PREFIX': 'endpoint',
  // or:
  'SINGLE_BLOCK_PREFIX': 'endpoint',
  'BLOCK_TX_PREFIX': 'endpoint',
  'SEARCH_ADD_PREFIX': 'endpoint'
  // Non-sensitive env variables? 
  // mainnet:
  // testnet:

}

export {
  history,
  config
}
