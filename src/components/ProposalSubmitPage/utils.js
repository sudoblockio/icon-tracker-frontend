// utils.js
//

function stripString(string, length = 6) {
  if (string.length < length) {
    return string
  } else {
    return string.slice(0, length) + "..."
  }
}

function makeNetworkProposalRpcObj(title, description, value) {
  //
}

const typesOfProposals = [
  "text",
  "revision",
  "maliciousScore",
  "prepDisqualification",
  "stepPrice",
  "stepCosts",
  "rewardFund",
  "rewardFundsAllocation",
  "networkScoreDesignation",
  "networkScoreUpdate",
  "accumulatedValidationFailureSlashingRate",
  "missedNetworkProposalVoteSlashingRate",
  "call"
];

function getContentOfType(type) {
  try {
    return JSON.stringify(proposalTypesData[type], null, 3);
  } catch (e) {
    return ""
  }
}

const proposalTypesData = {
  text: {
    name: "text",
    value: {
      text: "text proposals example"
    }
  },
  revision: {
    name: "revision",
    value: {
      revision: "0x11"
    }
  },
  maliciousScore: {
    name: "maliciousScore",
    value: {
      address: "cx7cc546bf908018b5602b66fa65ff5fdacef45fe0",
      type: "0x0"
    }
  },
  prepDisqualification: {
    name: "prepDisqualification",
    value: {
      address: "hx7cc546bf908018b5602b66fa65ff5fdacef45fe0"
    }
  },
  stepPrice: {
    name: "stepPrice",
    value: {
      stepPrice: "0x2e90edd00"
    }
  },
  stepCosts: {
    name: "stepCosts",
    value: {
      costs: {
        schema: "0x1",
        default: "0x2",
        contractCall: "0x3",
        contractCreate: "0x4",
        contractUpdate: "0x5",
        contractSet: "0x6",
        get: "0x7",
        getBase: "0x8",
        set: "0x9",
        setBase: "0x10",
        delete: "0x11",
        deleteBase: "0x12",
        input: "0x13",
        log: "0x14",
        logBase: "0x15",
        apiCall: "0x16"
      }
    }
  },
  rewardFund: {
    name: "rewardFund",
    value: {
      iglobal: "0x27b4"
    }
  },
  rewardFundsAllocation: {
    name: "rewardFundsAllocation",
    value: {
      iprep: "0x10",
      icps: "0xa",
      irelay: "0xa",
      ivoter: "0xb"
    }
  },
  networkScoreDesignation: {
    name: "networkScoreDesignation",
    value: {
      networkScores: [
        {
          role: "cps", // cps | relay
          address: "cx7cc546bf908018b5602b66fa65ff5fdacef45fe0"
        }
      ]
    }
  },
  networkScoreUpdate: {
    name: "networkScoreUpdate",
    value: {
      address: "cx7cc546bf908018b5602b66fa65ff5fdacef45fe0",
      content:
        "0x504b0304107082bc2bf352a000000280...00000504b03041400080808000000210000000",
      params: ["0x10", "Hello"]
    }
  },
  accumulatedValidationFailureSlashingRate: {
    name: "accumulatedValidationFailureSlashingRate",
    value: {
      slashingRate: "0x5" // [0 ~ 100]
    }
  },
  missedNetworkProposalVoteSlashingRate: {
    name: "missedNetworkProposalVoteSlashingRate",
    value: {
      slashingRate: "0x5"
    }
  },
  call: {
    name: "call",
    value: {
      to: "cx0000000000000000000000000000000000000000",
      method: "someMethod",
      params: [
        {
          type: "str",
          value: "Alice"
        },
        {
          type: "struct",
          value: {
            nickName: "Bob",
            address: "hxb6b5791be0b5ef67063b3c10b840fb81514db2fd"
          },
          fields: {
            nickName: "str",
            address: "address"
          }
        }
      ]
    }
  }
};

const utils = {
  typesOfProposals,
  proposalTypesData,
  stripString,
  getContentOfType
};

export default utils;
