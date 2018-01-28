const actionTypes = {
  getMainInfo: 'GET_MAIN_INFO',
  getMainInfoFulfilled: 'GET_MAIN_INFO_FULFILLED',
  getMainInfoRejected: 'GET_MAIN_INFO_REJECTED',

  getMainChart: 'GET_MAIN_CHART',
  getMainChartFulfilled: 'GET_MAIN_CHART_FULFILLED',
  getMainChartRejected: 'GET_MAIN_CHART_REJECTED',

  getAddresses: 'GET_ADDRESSES',
  getAddressesFulfilled: 'GET_ADDRESSES_FULFILLED',
  getAddressesRejected:'GET_ADDRESSES_REJECTED',

  getAddressDetail: 'GET_ADDRESS_DETAIL',
  getAddressDetailFulfilled: 'GET_ADDRESS_DETAIL_FULFILLED',
  getAddressDetailRejected:'GET_ADDRESS_DETAIL_REJECTED',

  getBlocks: 'GET_BLOCKS',
  getBlocksFulfilled: 'GET_BLOCKS_FULFILLED',
  getBlocksRejected:'GET_BLOCKS_REJECTED',
  resetBlocksReducer: 'RESET_BLOCKS_REDUCER',

  getBlock: 'GET_BLOCK',
  getBlockFulfilled: 'GET_BLOCK_FULFILLED',
  getBlockRejected:'GET_BLOCK_REJECTED',


  getTransactions: 'GET_TRANSACTIONS',
  getTransactionsFulfilled: 'GET_TRANSACTIONS_FULFILLED',
  getTransactionsRejected: 'GET_TranSACTIONS_REJECTED',

  getTransaction: 'GET_TRANSACTION',
  getTransactionFulfilled: 'GET_TRANSACTION_FULFILLED',
  getTransactionRejected: 'GET_TRANSACTION_REJECTED',

  resetBlockReducer: 'RESET_BLOCK_REDUCER',

  search: 'SEARCH',
  searchFulfilled: 'SEARCH_FULFILLED',
  searchRejected: 'SEARCH_REJECTED',
  searchErrorReset: 'SEARCH_ERROR_RESET',
}

export default actionTypes
