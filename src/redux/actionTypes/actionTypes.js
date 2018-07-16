const actionTypes = {
  getMainInfo: 'GET_MAIN_INFO',
  getMainInfoFulfilled: 'GET_MAIN_INFO_FULFILLED',
  getMainInfoRejected: 'GET_MAIN_INFO_REJECTED',

  getMainChart: 'GET_MAIN_CHART',
  getMainChartFulfilled: 'GET_MAIN_CHART_FULFILLED',
  getMainChartRejected: 'GET_MAIN_CHART_REJECTED',

  addressList: 'ADDRESS_LIST',
  addressListFulfilled: 'ADDRESS_LIST_FULFILLED',
  addressListRejected: 'ADDRESS_LIST_REJECTED',

  blockList: 'BLOCK_LIST',
  blockListFulfilled: 'BLOCK_LIST_FULFILLED',
  blockListRejected: 'BLOCK_LIST_REJECTED',

  getTransactions: 'GET_TRANSACTIONS',
  getTransactionsFulfilled: 'GET_TRANSACTIONS_FULFILLED',
  getTransactionsRejected: 'GET_TranSACTIONS_REJECTED',

  getTransaction: 'GET_TRANSACTION',
  getTransactionFulfilled: 'GET_TRANSACTION_FULFILLED',
  getTransactionRejected: 'GET_TRANSACTION_REJECTED',

  search: 'SEARCH',
  searchFulfilled: 'SEARCH_FULFILLED',
  searchRejected: 'SEARCH_REJECTED',
  searchErrorReset: 'SEARCH_ERROR_RESET',

  addressInfo: 'ADDRESS_INFO',
  addressInfoFulfilled: 'ADDRESS_INFO_FULFILLED',
  addressInfoRejected: 'ADDRESS_INFO_REJECTED',
  
  addressTxList: 'ADDRESS_TX_LIST',
  addressTxListFulfilled: 'ADDRESS_TX_LIST_FULFILLED',
  addressTxListRejected: 'ADDRESS_TX_LIST_REJECTED',

  addressTokenTxList: 'ADDRESS_TOKEN_TX_LIST',
  addressTokenTxListFulfilled: 'ADDRESS_TOKEN_TX_LIST_FULFILLED',
  addressTokenTxListRejected: 'ADDRESS_TOKEN_TX_LIST_REJECTED',

  blockInfo: 'BLOCK_INFO',
  blockInfoFulfilled: 'BLOCK_INFO_FULFILLED',
  blockInfoRejected: 'BLOCK_INFO_REJECTED',

  blockTxList: 'BLOCK_TX_LIST',
  blockTxListFulfilled: 'BLOCL_TX_LIST_FULFILLED',
  blockTxListRejected: 'BLOCK_TX_LIST_REJECTED',

  transactionRecentTx: 'TRANSACTION_RECENT_TX',
  transactionRecentTxFulfilled: 'TRANSACTION_RECENT_TX_FULFILLED',
  transactionRecentTxRejected: 'TRANSACTION_RECENT_TX_REJECTED',

  tokenGetTokenList: 'TOKEN_GET_TOKEN_LIST',
  tokenGetTokenListFulfilled: 'TOKEN_GET_TOKEN_LIST_FULFILLED',
  tokenGetTokenListRejected: 'TOKEN_GET_TOKEN_LIST_REJECTED',

  tokenGetTokenTransferList: 'TOKEN_GET_TOKEN_TRANSFER_LIST',
  tokenGetTokenTransferListFulfilled: 'TOKEN_GET_TOKEN_TRANSFER_LIST_FULFILLED',
  tokenGetTokenTransferListRejected: 'TOKEN_GET_TOKEN_TRANSFER_LIST_REJECTED',
}

export default actionTypes
