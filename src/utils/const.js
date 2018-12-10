export const REDUX_STEP = {
    INIT: 'init',
    READY: 'ready',
    FULFILLED: 'fulfilled',
    REJECTED: 'rejected',
}

export const INITIAL_ARRAY_STATE = {
    loading: false,
    page: 1,
    count: 25,
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
    "1": 'Active', 
    "2": 'Rejected',
}
export const CONTRACT_STATUS_NUM = {
    "Pending": '0', 
    "Active": '1', 
    "Rejected": '2',
}

export const SERVER_TX_TYPE = {
    "0": "Icx Transfer",
    "1": "Token Transfer",
    "2": "Contract Call",
    "3": "Contract Created",
    "4": "Contract Updated",
    "5": "Contract Accepted",
    "6": "Contract Rejected",
    "7": "Update Accepted",
    "8": "Update Rejected",
    "9": "Update Cancelled"
}

export const IRC_VERSION = {
    "1": "IRC1",
    "2": "IRC2",
    "3": "IRC3"
}

export const SORT_TYPE = [10, 25, 50, 100]
export const STATUS_TYPE = ['All', 'Active', 'Pending', 'Rejected']

export const ADDRESS_TABS = ['Transactions', 'Internal Transactions', 'Token Transfers']
export const CONTRACT_TABS = ['Transactions', 'Internal Transactions', 'Token Transfers', 'Code', 'Read Contract', 'Events']
export const BLOCK_TABS = ['Transactions']
export const TOKEN_TABS = ['Token Transfers', 'Token Holders', 'Read Contract']
export const TRANSACTION_TABS = ['Internal Transactions', 'Events']

export const POPUP_TYPE = {
    QR: 'qr',
    DETAIL: 'detail'
}

export const SEARCH_TYPE = {
    CONTRACTS: 'contracts',
    TOKENS: 'tokens'
}

export const SEARCH_TYPE_DATA = {
    [SEARCH_TYPE.CONTRACTS]: {
        list: 'contracts',
        getList: 'contractList',
        tableClassName: 'table-typeA contract',
        contentsClassName: 'contents',
        noBoxText: 'No Contract',
        placeholder: "Search for contract name / address",
        title: 'Contracts',
    },
    [SEARCH_TYPE.TOKENS]: {
        list: 'tokens',
        getList: 'tokenList',
        tableClassName: 'table-typeI',
        contentsClassName: 'contents tokens',
        noBoxText: 'No Token',      
        placeholder: "Search for any token name / address / symbol",
        title: 'Tokens',
    },
}

export const TX_TYPE = {
    ADDRESS_TX: 'addresstx',
    ADDRESS_INTERNAL_TX: 'addressinternaltx',
    ADDRESS_TOKEN_TX: 'addresstokentx',
    CONTRACT_TX: 'contracttx',
    CONTRACT_INTERNAL_TX: 'contractinternaltx',
    CONTRACT_TOKEN_TX: 'contracttokentx',
    BLOCK_TX: 'blocktx',
    TRANSACTIONS: 'transactions',
    TOKEN_TRANSFERS: 'tokentransfers',
    TOKEN_TX: 'tokentx',
    ADDRESSES: 'addresses',
    BLOCKS: 'blocks',
    CONTRACT_EVENTS: 'contractevents',
    TRANSACTION_EVENTS: 'transactionevents',
    TRANSACTION_INTERNAL_TX: 'transactioninternaltx',
    TOKEN_HOLDERS: 'tokenholders',
}

export const TX_TYPE_DATA = {
    [TX_TYPE.ADDRESS_TX]: {
		tx: 'walletTx',
		getTxList: 'addressTxList',
        className: 'table-typeC',
        noBoxText: 'No Transaction',
    },
    [TX_TYPE.ADDRESS_INTERNAL_TX]: {
		tx: 'addressInternalTx',
		getTxList: 'addressInternalTxList',
        className: 'table-typeC internal',
        noBoxText: 'No Transaction',
    },
	[TX_TYPE.ADDRESS_TOKEN_TX]: {
		tx: 'walletTokenTx',
		getTxList: 'addressTokenTxList',
        className: 'table-typeC token',
        noBoxText: 'No Transaction',
    },
    [TX_TYPE.CONTRACT_TX]: {
		tx: 'contractTx',
		getTxList: 'contractTxList',
        className: 'table-typeC',
        noBoxText: 'No Transaction',
    },
    [TX_TYPE.CONTRACT_INTERNAL_TX]: {
		tx: 'contractInternalTx',
		getTxList: 'contractInternalTxList',
        className: 'table-typeC internal',
        noBoxText: 'No Transaction',
    },
    [TX_TYPE.CONTRACT_TOKEN_TX]: {
		tx: 'contractTokenTx',
		getTxList: 'contractTokenTxList',
        className: 'table-typeC token tap2',
        noBoxText: 'No Transaction'
    },
    [TX_TYPE.BLOCK_TX]: {
		tx: 'blockTx',
		getTxList: 'blockTxList',
		className: 'table-typeD',
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
    [TX_TYPE.TOKEN_TX]: {
		tx: 'tokenTransfers',
		getTxList: 'tokenTransfersList',
		className: 'table-typeF token',
        noBoxText: 'No Transaction',
	},
	[TX_TYPE.ADDRESSES]: {
		tx: 'addresses',
		getTxList: 'addressList',
        className: 'table-typeA',
        noBoxText: 'No Address',
    },
    [TX_TYPE.BLOCKS]: {
		tx: 'blocks',
		getTxList: 'blockList',
        className: 'table-typeE',
        noBoxText: 'No Block',
    },
    [TX_TYPE.CONTRACT_EVENTS]: {
		tx: 'contractEvents',
		getTxList: 'contractEventLogList',
        className: 'table-typeH',
        noBoxText: 'No Event'
    },
    [TX_TYPE.TRANSACTION_EVENTS]: {
		tx: 'transactionEvents',
		getTxList: 'transactionEventLogList',
		className: 'table-typeH log',
        noBoxText: 'No Event',
    },
    [TX_TYPE.TRANSACTION_INTERNAL_TX]: {
		tx: 'transactionInternalTx',
		getTxList: 'transactionInternalTxList',
		className: 'table-typeC it',
        noBoxText: 'No Transaction',
    },
    [TX_TYPE.TOKEN_HOLDERS]: {
		tx: 'tokenHolders',
		getTxList: 'tokenHoldersList',
		className: 'table-typeM',
        noBoxText: 'No Holder',
    },
}