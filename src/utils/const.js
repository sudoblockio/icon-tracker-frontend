export const SUPPORT_URL =
  'https://icon-project.atlassian.net/servicedesk/customer/portal/4';
export const REDUX_STEP = {
  INIT: 'init',
  READY: 'ready',
  FULFILLED: 'fulfilled',
  REJECTED: 'rejected'
};

export const INITIAL_ARRAY_STATE = {
  loading: false,
  page: 1,
  count: 25,
  data: [],
  listSize: 0,
  totalSize: 0,
  error: ''
};

export const INITIAL_OBJECT_STATE = {
  loading: false,
  data: {},
  error: ''
};

export const INITIAL_STATE = {
  ARR: INITIAL_ARRAY_STATE,
  OBJ: INITIAL_OBJECT_STATE
};

export const CONTRACT_STATUS = {
  '0': 'Pending',
  'Pending': 'Pending',
  'pending': 'Pending',
  'Accepted': 'Accepted',
  'accepted': 'Accepted',
  'Active': 'Active',
  'active': 'Active',
  '2': 'Rejected',
  'Rejected': 'Rejected',
  'rejected': 'Rejected',
  '3': 'Error'
};
export const CONTRACT_STATUS_NUM = {
  Pending: '0',
  Active: '1',
  Rejected: '2',
  Error: '3'
};

export const SERVER_TX_TYPE = {
  '0': 'Icx Transfer',
  '1': 'Token Transfer',
  '2': 'Contract Call',
  '3': 'Contract Created',
  '4': 'Contract Updated',
  '5': 'Contract Accepted',
  '6': 'Contract Rejected',
  '7': 'Update Accepted',
  '8': 'Update Rejected',
  '9': 'Update Cancelled'
};

export const IRC_VERSION = {
  '1': 'IRC1',
  '2': 'IRC2',
  '3': 'IRC3'
};

export const SORT_TYPE = [10, 25, 50, 100];
export const STATUS_TYPE = ['All', 'Active', 'Pending', 'Rejected'];
export const TOKEN_STANDARDS = ['All', 'irc2', 'irc3', 'irc31']

export const ADDRESS_TABS = [
  'Transactions',
  'Internal Transactions',
  'Token Transfers',
  'Delegations',
  'Voters',
  'Rewards',
  'Bonded',
  'Bonders'
];
export const CONTRACT_TABS = [
  'Transactions',
  'Internal Transactions',
  'Token Transfers',
  'Code',
  'Read Contract',
  'Events'
];
export const BLOCK_TABS = ['Transactions', 'Internal Transactions'];
export const TOKEN_TABS = ['Token Transfers', 'Token Holders', 'Read Contract'];
export const TRANSACTION_TABS = ['Internal Transactions', 'Events'];
export const PROPOSAL_TABS = ['Total Voters', 'Total Token Votes'];

export const NETWORK_HOST = {
  Mainnet: 'tracker.icon.community',
  Lisbon: 'tracker.lisbon.icon.community',
  Berlin: 'tracker.berlin.icon.community',
  Sejong: 'tracker.sejong.icon.community',
};

export const NETWORK_NAME = {
  'tracker.icon.community': 'Mainnet',
  'tracker.lisbon.icon.community': 'Lisbon',
  'tracker.berlin.icon.community': 'Berlin',
  'tracker.sejong.icon.community': 'Sejong',
};

export const POPUP_TYPE = {
  QR: 'qr',
  DETAIL: 'detail',
  SCAM: 'scam',
  SEARCH: 'search',
  ABOUT: 'about',
  SUGGEST: 'suggest',
  COMMISSION: 'commission',
  GOVERNANCE: 'governance',
  SPONSOR: 'sponsor',
  VERIFICATION: 'verification'
};

export const SEARCH_TYPE = {
  CONTRACTS: 'contracts',
  TOKENS: 'tokens'
};

export const SEARCH_TYPE_DATA = {
  [SEARCH_TYPE.CONTRACTS]: {
    list: 'contracts',
    getList: 'contractList',
    tableClassName: 'table-typeA contract',
    contentsClassName: 'contents',
    noBoxText: 'No Contract',
    placeholder: 'Search for contract name / address',
    title: 'Contracts'
  },
  [SEARCH_TYPE.TOKENS]: {
    list: 'tokens',
    getList: 'tokenList',
    tableClassName: 'table-typeI',
    contentsClassName: 'contents tokens',
    noBoxText: 'No Token',
    placeholder: 'Search for any token name / address / symbol',
    title: 'Tokens'
  }
};

export const TX_TYPE = {
  ADDRESS_REWARD: 'addressreward',
  ADDRESS_BONDED: 'addressbonded',
  ADDRESS_DELEGATION: 'addressdelegations',
  ADDRESS_VOTED: 'addressvoters',
  ADDRESS_TX: 'addresstx',
  ADDRESS_INTERNAL_TX: 'addressinternaltx',
  ADDRESS_TOKEN_TX: 'addresstokentx',
  CONTRACT_TX: 'contracttx',
  CONTRACT_INTERNAL_TX: 'contractinternaltx',
  CONTRACT_TOKEN_TX: 'contracttokentx',
  BLOCK_TX: 'blocktx',
  BLOCK_INTTX: 'blockinttx',
  TRANSACTIONS: 'transactions',
  TOKEN_TRANSFERS: 'tokentransfers',
  TOKEN_TX: 'tokentx',
  ADDRESSES: 'addresses',
  BLOCKS: 'blocks',
  CONTRACT_EVENTS: 'contractevents',
  TRANSACTION_EVENTS: 'transactionevents',
  TRANSACTION_INTERNAL_TX: 'transactioninternaltx',
  TRACE_TRANSACTION_INTERNAL_TX:'transactioninternaltx/trace',
  TOKEN_HOLDERS: 'tokenholders',
  ADDRESS_BONDERS: 'addressBonders'
};

export const TX_TYPE_DATA = {
  [TX_TYPE.ADDRESS_REWARD]: {
    tx: 'addressReward',
    getTxList: 'addressRewardList',
    className: 'table-typeC reward',
    noBoxText: 'No Reward'
  },
  [TX_TYPE.ADDRESS_DELEGATION]: {
    tx: 'addressDelegation',
    getTxList: 'addressDelegationList',
    className: 'table-typeC voter',
    noBoxText: 'No Delegation'
  },
  [TX_TYPE.ADDRESS_BONDED]: {
    tx: 'addressBonded',
    getTxList: 'addressBonded',
    className: 'table-typeC voter',
    noBoxText: 'No Bonds'
  },
  [TX_TYPE.ADDRESS_VOTED]: {
    tx: 'addressVoted',
    getTxList: 'addressVotedList',
    className: 'table-typeC voter',
    noBoxText: 'No Voters'
  },
  [TX_TYPE.ADDRESS_TX]: {
    tx: 'walletTx',
    getTxList: 'addressTxList',
    className: 'table-typeC',
    noBoxText: 'No Transaction'
  },
  [TX_TYPE.ADDRESS_INTERNAL_TX]: {
    tx: 'addressInternalTx',
    getTxList: 'addressInternalTxList',
    className: 'table-typeC internal',
    noBoxText: 'No Transaction'
  },
  [TX_TYPE.ADDRESS_TOKEN_TX]: {
    tx: 'walletTokenTx',
    getTxList: 'addressTokenTxList',
    className: 'table-typeC token',
    noBoxText: 'No Transaction'
  },
  [TX_TYPE.CONTRACT_TX]: {
    tx: 'contractTx',
    getTxList: 'contractTxList',
    className: 'table-typeC',
    noBoxText: 'No Transaction'
  },
  [TX_TYPE.CONTRACT_INTERNAL_TX]: {
    tx: 'contractInternalTx',
    getTxList: 'contractInternalTxList',
    className: 'table-typeC internal',
    noBoxText: 'No Transaction'
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
    noBoxText: 'No Transaction'
  },
  [TX_TYPE.BLOCK_INTTX]: {
    tx: 'blockIntTx',
    getTxList: 'blockIntTxList',
    className: 'table-typeD',
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
  [TX_TYPE.TOKEN_TX]: {
    tx: 'tokenTransfers',
    getTxList: 'tokenTransfersList',
    className: 'table-typeF token',
    noBoxText: 'No Transaction'
  },
  [TX_TYPE.ADDRESSES]: {
    tx: 'addresses',
    getTxList: 'addressList',
    className: 'table-typeA',
    noBoxText: 'No Address'
  },
  [TX_TYPE.BLOCKS]: {
    tx: 'blocks',
    getTxList: 'blockList',
    className: 'table-typeE',
    noBoxText: 'No Block'
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
    noBoxText: 'No Event'
  },
  [TX_TYPE.TRANSACTION_INTERNAL_TX]: {
    tx: 'transactionInternalTx',
    getTxList: 'transactionInternalTxList',
    className: 'table-typeC it',
    noBoxText: 'No Transaction'
  },
  [TX_TYPE.TOKEN_HOLDERS]: {
    tx: 'tokenHolders',
    getTxList: 'tokenHoldersList',
    className: 'table-typeM',
    noBoxText: 'No Holder'
  },
  [TX_TYPE.ADDRESS_BONDERS]: {
    tx: 'addressBonders',
    getTxList: 'addressBonders',
    className: 'table-typeM',
    noBoxText: 'No Bonders'
  }
};

export const ProposalType = {
  '0x0': 'Text',
  '0x1': 'Revision Update',
  '0x2': 'Malicious SCORE',
  '0x3': 'P-Rep Disqualification',
  '0x4': 'Step Price',
  '0x5': 'i_rep'
};

export const ProposalStatus = {
  '0x0': 'Voting Period',
  '0x1': 'Applied',
  '0x2': 'Disapproved',
  '0x3': 'Canceled',
  '0x4': 'Approved',
  '0x5': 'Expired'
};

export const ProposalStatusClass = {
  '0x0': 'period',
  '0x1': 'applied',
  '0x2': 'disapproved',
  '0x3': 'canceled',
  '0x4': 'approved',
  '0x5': 'expired'
};

export const VIEW_NUMBER = false;

export const SocialMediaType = [
  'facebook',
  'github',
  'reddit',
  'steemit',
  'twitter',
  'youtube',
  'wechat',
  'telegram',
  'keybase'
];

export const GetAddressForPrepList = {
  'https://tracker.icon.foundation': 'cx9f4ab72f854d3ccdc59aa6f2c3e2215dd62e879f',
  'https://trackerdev.icon.foundation': '',
  'https://bicon.tracker.solidwallet.io': 'cx9f4ab72f854d3ccdc59aa6f2c3e2215dd62e879f',
  'https://explorer.icon.geometry-dev.net': 'cx9f4ab72f854d3ccdc59aa6f2c3e2215dd62e879f'

};

export const prefixes = {
  ADDRESSES_PREFIX: '/api/v1/addresses',
  TRANSACTIONS_PREFIX: '/api/v1/transactions',
  INTERNAL_TRANSACTIONS_PREFIX: '/api/v1/transactions/internal',
  BLOCKS_PREFIX: '/api/v1/blocks',
  CONTRACTS_PREFIX: '/api/v1/contracts',

}

// from https://github.com/ibriz/CPS:
export const RELAY_REQUEST_CONST = {
  submit_proposal: 32000,
  submit_progress_report: 32001,
  sponsor_vote: 32002,
  reject_sponsor: 32003,
  vote_proposal: 32004,
  vote_progress_report: 32005,
  update_period: 32006,
  unregister_prep: 32007,
  register_prep: 32008,
  pay_prep_penalty: 32009,
  approve_sponsor: 32010,
  claim_reward: 32011,
  claim_sponsor_bond: 32012,
};