import { createBrowserHistory as createHistory } from 'history'

const history = createHistory()
const config = {
  // API Endpoints
  'blockList': 'endpoint',
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
