export const CONTRACT_STATUS = {
    "0": 'Pending', 
    "1": 'Success', 
    "2": 'Fail'
}
export const CONTRACT_TABS = ['Transactions', 'Token Transfers', 'Code', 'Read Contract', 'Events']
export const WALLET_TABS = ['Transactions', 'Token Transfers']

export const TX_TYPE = {
    CONTRACT_TX: 'contracttx',
    ADDRESS_TX: 'addresstx',
    ADDRESS_TOKEN_TX: 'addresstokentx',
    TRANSACTIONS: 'transactions',
    TOKEN_TRANSFERS: 'tokentransfers',







    CONTRACT_TOKEN_TX: 'contracttokentx',

    BLOCK_TX: 'blocktx',
    TOKEN_TX: 'tokentx',
    TOKEN_HOLDERS: 'tokenholders',
}

export const TX_TYPE_DATA = {
	[TX_TYPE.CONTRACT_TX]: {
		tx: 'contractTx',
		getTxList: 'contractTxList',
        className: 'table-typeF',
        noBoxText: 'No Transaction'
    },
	[TX_TYPE.ADDRESS_TX]: {
		tx: 'walletTx',
		getTxList: 'addressTxList',
        className: 'table-typeC',
        noBoxText: 'No Transaction'
    },
	[TX_TYPE.ADDRESS_TOKEN_TX]: {
		tx: 'walletTokenTx',
		getTxList: 'addressTokenTxList',
        className: 'table-typeC token',
        noBoxText: 'No Transaction'
    },
    [TX_TYPE.TRANSACTIONS]: {
		tx: 'recentTx',
		getTxList: 'transactionRecentTx',
        className: 'table-typeJ',
        noBoxText: 'No Transaction'
    },
    [TX_TYPE.TOKEN_TRANSFERS]: {
		tx: 'recentTokenTx',
		getTxList: 'tokenTxList',
		className: 'table-typeN',
        noBoxText: 'No Transaction'
	},













    [TX_TYPE.CONTRACT_TOKEN_TX]: {
		tx: 'contractTokenTx',
		getTxList: 'contractTokenTxList',
        className: 'table-typeC token tap2',
        noBoxText: 'No Transaction'
    }
}