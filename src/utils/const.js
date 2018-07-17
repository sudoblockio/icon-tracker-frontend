export const TX_TYPE = {
    CONTRACT_TX: 'contracttx',

    ADDRESS_TX: 'addresstx',
    ADDRESS_TOKEN_TX: 'addresstokentx',
    BLOCK_TX: 'blocktx',
    TRANSACTIONS: 'transactions',
    TOKEN_TRANSFERS: 'tokentransfers',
    TOKEN_TX: 'tokentx',
    TOKEN_HOLDERS: 'tokenholders',
    CONTRACT_TOKEN_TX: 'contracttokentx',
}

export const CONTRACT_STATUS = {
    "0": 'Pending', 
    "1": 'Success', 
    "2": 'Fail'
}

export const TX_TYPE_DATA = {
	[TX_TYPE.CONTRACT_TX]: {
		tx: 'contractTx',
		getTxList: 'contractTxList',
        className: 'table-typeF',
        noBoxText: 'No Transaction'
    },
    [TX_TYPE.CONTRACT_TOKEN_TX]: {
		tx: 'contractTokenTx',
		getTxList: 'contractTokenTxList',
        className: 'table-typeC token tap2',
        noBoxText: 'No Transaction'
    }
}