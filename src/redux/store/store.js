import { createBrowserHistory as createHistory } from 'history'

const history = createHistory()
const config = {
  // API Endpoints
  'BLOCKS_PREFIX': 'endpoint',
  // or:
  'singleBlock': 'endpoint',
  'blockTxList': 'endpoint',
  // Non-sensitive env variables? 
  // mainnet:
  // testnet:

}

export {
  history,
  config
}
