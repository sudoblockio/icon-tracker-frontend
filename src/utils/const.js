export const REDUX_STEP = {
    READY: 'ready',
    FULFILLED: 'fulfilled',
    REJECTED: 'rejected',
}

export const INITIAL_ARRAY_STATE = {
    loading: false,
    page: 1,
    count: 20,
    data: [],
    listSize: 0,
    totalSize: 0,
    error: '',    
}

export const INITIAL_OBJECT_STATE = {
    loading: false,
    data: {},
    error: '',    
}

export const INITIAL_STATE = {
    'ARR': INITIAL_ARRAY_STATE,
    'OBJ': INITIAL_OBJECT_STATE
}

export const CONTRACT_STATUS = {
    "0": 'Pending', 
    "1": 'Success', 
    "2": 'Fail'
}

export const CONTRACT_TABS = ['Transactions', 'Token Transfers', 'Code', 'Read Contract', 'Events']
export const WALLET_TABS = ['Transactions', 'Token Transfers']
export const BLOCK_TABS = ['Transactions']
export const TOKEN_TABS = ['Token Transfers', 'Token Holders', 'Read Contract']

export const POPUP_TYPE = {
    AddressQrCode: 'AddressQrCode',
    ContractDetail: 'ContractDetail'
}

export const TX_TYPE = {
    BLOCKS: 'blocks',
    ADDRESSES: 'addresses',
    CONTRACT_TX: 'contracttx',
    CONTRACT_TOKEN_TX: 'contracttokentx',
    CONTRACT_EVENTS: 'contractevents',
    ADDRESS_TX: 'addresstx',
    ADDRESS_TOKEN_TX: 'addresstokentx',
    TRANSACTIONS: 'transactions',
    TOKEN_TRANSFERS: 'tokentransfers',
    BLOCK_TX: 'blocktx',
    TOKEN_TX: 'tokentx',
    TOKEN_HOLDERS: 'tokenholders',
}

export const TX_TYPE_DATA = {
	[TX_TYPE.BLOCKS]: {
		tx: 'blocks',
		getTxList: 'blockList',
        className: 'table-typeE',
        noBoxText: 'No Block',
    },
	[TX_TYPE.ADDRESSES]: {
		tx: 'addresses',
		getTxList: 'addressList',
        className: 'table-typeA',
        noBoxText: 'No Address',
    },
    [TX_TYPE.CONTRACT_TX]: {
		tx: 'contractTx',
		getTxList: 'contractTxList',
        className: 'table-typeF',
        noBoxText: 'No Transaction',
    },
    [TX_TYPE.CONTRACT_TOKEN_TX]: {
		tx: 'contractTokenTx',
		getTxList: 'contractTokenTxList',
        className: 'table-typeC token tap2',
        noBoxText: 'No Transaction'
    },
    [TX_TYPE.CONTRACT_EVENTS]: {
		tx: 'contractEvents',
		getTxList: 'contractEventLogList',
        className: 'table-typeH',
        noBoxText: 'No Event'
    },
	[TX_TYPE.ADDRESS_TX]: {
		tx: 'walletTx',
		getTxList: 'addressTxList',
        className: 'table-typeC',
        noBoxText: 'No Transaction',
    },
	[TX_TYPE.ADDRESS_TOKEN_TX]: {
		tx: 'walletTokenTx',
		getTxList: 'addressTokenTxList',
        className: 'table-typeC token',
        noBoxText: 'No Transaction',
    },
    [TX_TYPE.TRANSACTIONS]: {
		tx: 'recentTx',
		getTxList: 'transactionRecentTx',
        className: 'table-typeJ',
        noBoxText: 'No Transaction',
    },
    [TX_TYPE.TOKEN_TRANSFERS]: {
		tx: 'recentTokenTx',
		getTxList: 'tokenTxList',
		className: 'table-typeN',
        noBoxText: 'No Transaction',
	},
    [TX_TYPE.BLOCK_TX]: {
		tx: 'blockTx',
		getTxList: 'blockTxList',
		className: 'table-typeD',
        noBoxText: 'No Transaction',
	},
    [TX_TYPE.TOKEN_TX]: {
		tx: 'tokenTransfers',
		getTxList: 'tokenTransfersList',
		className: 'table-typeF',
        noBoxText: 'No Transaction',
	},
    [TX_TYPE.TOKEN_HOLDERS]: {
		tx: 'tokenHolders',
		getTxList: 'tokenHoldersList',
		className: 'table-typeM',
        noBoxText: 'No Holders',
    },
}