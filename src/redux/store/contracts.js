import { trackerApiInstance } from "../api/restV3/config";
import actionTypes from "../actionTypes/actionTypes";
import { getState, makeUrl, makeEventUrl } from "../../utils/utils";
import { REDUX_STEP, INITIAL_STATE } from "../../utils/const";
import { prefixes } from "../../utils/const";

// ACTIONS
export function contractListAction(payload) {
  return {
    type: actionTypes.contractList,
    payload
  };
}

export function contractListSearchAction(payload) {
  return {
    type: actionTypes.contractListSearch,
    payload
  };
}

export function contractInfoAction(payload) {
  return {
    type: actionTypes.contractInfo,
    payload
  };
}

export function contractDetailAction(payload) {
  return {
    type: actionTypes.contractDetail,
    payload
  };
}

export function contractDetailPopupAction(payload) {
  return {
    type: actionTypes.contractDetailPopup,
    payload
  };
}

export function contractTxListAction(payload) {
  return {
    type: actionTypes.contractTxList,
    payload
  };
}

export function contractInternalTxListAction(payload) {
  return {
    type: actionTypes.contractInternalTxList,
    payload
  };
}

export function contractTokenTxListAction(payload) {
  return {
    type: actionTypes.contractTokenTxList,
    payload
  };
}

export function contractEventLogListAction(payload) {
  return {
    type: actionTypes.contractEventLogList,
    payload
  };
}

export function icxGetScoreAction(payload) {
  return {
    type: actionTypes.icxGetScore,
    payload
  };
}

export function icxCallAction(payload) {
  return {
    type: actionTypes.icxCall,
    payload
  };
}

export function icxSendTransactionAction(payload) {
  return {
    type: actionTypes.icxSendTransaction,
    payload
  };
}

export function readContractInformationAction(payload) {
  return {
    type: actionTypes.readContractInformation,
    payload
  };
}

// API

const { CONTRACTS_PREFIX, ADDRESSES_PREFIX, TRANSACTIONS_PREFIX } = prefixes;

export async function contractList(payload) {
  const trackerApi = await trackerApiInstance();
  return new Promise((resolve, reject) => {
    trackerApi
      .get(makeUrl(`${ADDRESSES_PREFIX}/contracts`, payload))
      .then(result => {
        resolve(result);
      })
      .catch(error => {
        reject(error);
      });
  });
}

export async function contractInfo(payload) {
  const trackerApi = await trackerApiInstance();
  return new Promise((resolve, reject) => {
    trackerApi
      .get(`${ADDRESSES_PREFIX}/details/${payload}`)
      .then(result => {
        resolve(result);
      })
      .catch(error => {
        reject(error);
      });
  });
}

export async function contractDetail(payload) {
  const trackerApi = await trackerApiInstance();
  return new Promise((resolve, reject) => {
    trackerApi
      .get(`${CONTRACTS_PREFIX}/${payload}`)
      .then(result => {
        resolve(result);
      })
      .catch(error => {
        reject(error);
      });
  });
}

export async function contractTxList(payload) {
  if (!payload.addr) payload = { addr: payload, count: 10, skip: 0 };
  const trackerApi = await trackerApiInstance();
  return new Promise((resolve, reject) => {
    trackerApi
      .get(makeUrl(`${TRANSACTIONS_PREFIX}/address/${payload.addr}`, payload))
      .then(result => {
        resolve(result);
      })
      .catch(error => {
        reject(error);
      });
  });
}

export async function contractTokenTxList(payload) {
  if (!payload.addr) payload = { addr: payload, count: 10, skip: 0 };
  const trackerApi = await trackerApiInstance();
  return new Promise((resolve, reject) => {
    trackerApi
      .get(
        makeUrl(
          `${TRANSACTIONS_PREFIX}/token-transfers/token-contract/${payload.addr}`,
          payload
        )
      )
      .then(result => {
        resolve(result);
      })
      .catch(error => {
        reject(error);
      });
  });
}

export async function contractEventLogList(payload) {
  console.log(payload, "the cx log payload");
  payload.contractAddr
    ? (payload.address = payload.contractAddr)
    : console.log("no contractAddr");
  delete payload.contractAddr;
  const trackerApi = await trackerApiInstance();
  return new Promise((resolve, reject) => {
    trackerApi
      .get(
        makeEventUrl(`/api/v1/logs?score_address=${payload.address}`, payload)
      )
      .then(result => {
        resolve(result);
      })
      .catch(error => {
        reject(error);
      });
  });
}

export async function contractInternalTxList(payload) {
  const trackerApi = await trackerApiInstance();
  return new Promise((resolve, reject) => {
    trackerApi
      .get(
        makeUrl(
          `${TRANSACTIONS_PREFIX}/internal/address/${payload.addr}`,
          payload
        )
      )
      .then(result => {
        resolve(result);
      })
      .catch(error => {
        reject(error);
      });
  });
}

export async function cxSocialMedia(cxAddr) {
  const trackerApi = await trackerApiInstance();
  return new Promise((resolve, reject) => {
    trackerApi
      .get(`${CONTRACTS_PREFIX}/social-media/${cxAddr}`)
      .then(result => {
        resolve(result);
      })
      .catch(error => {
        reject(error);
      });
  });
}

// REDUCER

const initialState = {
  contracts: INITIAL_STATE["ARR"],
  contractsSearch: INITIAL_STATE["ARR"],
  contract: INITIAL_STATE["OBJ"],
  contractDetail: INITIAL_STATE["OBJ"],
  contractTx: INITIAL_STATE["ARR"],
  contractInternalTx: INITIAL_STATE["ARR"],
  contractTokenTx: INITIAL_STATE["ARR"],
  contractEvents: INITIAL_STATE["ARR"],
  contractAbi: INITIAL_STATE["OBJ"],
  contractReadInfo: {
    loading: false,
    funcList: [],
    writeFuncList: [],
    funcOutputs: [],
    funcError: [],
    error: ""
  },
  contractWriteInfo: {
    loading: false,
    funcList: [],
    funcOutputs: [],
    funcError: [],
    error: ""
  }
};

export function contractsReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.contractList:
      return getState("ARR", REDUX_STEP.READY, state, action, "contracts");
    case actionTypes.contractListFulfilled:
      return getState("ARR", REDUX_STEP.FULFILLED, state, action, "contracts");
    case actionTypes.contractListRejected:
      return getState("ARR", REDUX_STEP.REJECTED, state, action, "contracts");

    case actionTypes.contractListSearch:
      return getState(
        "ARR",
        REDUX_STEP.READY,
        state,
        action,
        "contractsSearch"
      );
    case actionTypes.contractListSearchFulfilled:
      return getState(
        "ARR",
        REDUX_STEP.FULFILLED,
        state,
        action,
        "contractsSearch"
      );
    case actionTypes.contractListSearchRejected:
      return getState(
        "ARR",
        REDUX_STEP.REJECTED,
        state,
        action,
        "contractsSearch"
      );

    case actionTypes.contractInfo:
      return getState("OBJ", REDUX_STEP.READY, state, action, "contract");
    case actionTypes.contractInfoFulfilled:
      return getState("OBJ", REDUX_STEP.FULFILLED, state, action, "contract");
    case actionTypes.contractInfoRejected:
      return getState("OBJ", REDUX_STEP.REJECTED, state, action, "contract");

    case actionTypes.contractDetail:
      return getState("OBJ", REDUX_STEP.READY, state, action, "contractDetail");
    case actionTypes.contractDetailFulfilled:
      return getState(
        "OBJ",
        REDUX_STEP.FULFILLED,
        state,
        action,
        "contractDetail"
      );
    case actionTypes.contractDetailRejected:
      return getState(
        "OBJ",
        REDUX_STEP.REJECTED,
        state,
        action,
        "contractDetail"
      );

    case actionTypes.contractTxList:
      return getState("ARR", REDUX_STEP.READY, state, action, "contractTx");
    case actionTypes.contractTxListFulfilled:
      return getState("ARR", REDUX_STEP.FULFILLED, state, action, "contractTx");
    case actionTypes.contractTxListRejected:
      return getState("ARR", REDUX_STEP.REJECTED, state, action, "contractTx");

    case actionTypes.contractInternalTxList:
      return getState(
        "ARR",
        REDUX_STEP.READY,
        state,
        action,
        "contractInternalTx"
      );
    case actionTypes.contractInternalTxListFulfilled:
      return getState(
        "ARR",
        REDUX_STEP.FULFILLED,
        state,
        action,
        "contractInternalTx"
      );
    case actionTypes.contractInternalTxListRejected:
      return getState(
        "ARR",
        REDUX_STEP.REJECTED,
        state,
        action,
        "contractInternalTx"
      );

    case actionTypes.contractTokenTxList:
      return getState(
        "ARR",
        REDUX_STEP.READY,
        state,
        action,
        "contractTokenTx"
      );
    case actionTypes.contractTokenTxListFulfilled:
      return getState(
        "ARR",
        REDUX_STEP.FULFILLED,
        state,
        action,
        "contractTokenTx"
      );
    case actionTypes.contractTokenTxListRejected:
      return getState(
        "ARR",
        REDUX_STEP.REJECTED,
        state,
        action,
        "contractTokenTx"
      );

    case actionTypes.contractEventLogList:
      return getState("ARR", REDUX_STEP.READY, state, action, "contractEvents");
    case actionTypes.contractEventLogListFulfilled:
      return getState(
        "ARR",
        REDUX_STEP.FULFILLED,
        state,
        action,
        "contractEvents"
      );
    case actionTypes.contractEventLogListRejected:
      return getState(
        "ARR",
        REDUX_STEP.REJECTED,
        state,
        action,
        "contractEvents"
      );

    case actionTypes.icxGetScore:
      return getState("OBJ", REDUX_STEP.READY, state, action, "contractAbi");
    case actionTypes.icxGetScoreFulfilled:
      return getState(
        "OBJ",
        REDUX_STEP.FULFILLED,
        state,
        action,
        "contractAbi"
      );
    case actionTypes.icxGetScoreRejected:
      return getState("OBJ", REDUX_STEP.REJECTED, state, action, "contractAbi");

    case actionTypes.icxCall:
      return state;
    case actionTypes.icxCallFulfilled:
      return {
        ...state,
        contractReadInfo: {
          ...state.contractReadInfo,
          funcOutputs: action.payload.funcOutputs
        }
      };
    case actionTypes.icxCallRejected:
      return state;

    case actionTypes.icxSendTransaction:
      return state;
    case actionTypes.icxSendTransactionFulfilled:
      return {
        ...state,
        contractReadInfo: {
          ...state.contractReadInfo,
          writeFuncOutputs: action.payload.writeFuncOutputs
        }
      };
    case actionTypes.icxSendTransactionRejected:
      return state;

    case actionTypes.readContractInformation:
      return {
        ...state,
        contractReadInfo: {
          ...state.contractReadInfo,
          loading: true,
          error: ""
        }
      };
    case actionTypes.readContractInformationFulfilled:
      return {
        ...state,
        contractReadInfo: {
          ...action.payload,
          loading: false,
          error: ""
        }
      };
    case actionTypes.readContractInformationRejected:
      return {
        ...state,
        contractReadInfo: {
          ...state.contractReadInfo,
          loading: false,
          error: action.error
        }
      };

    default: {
      return state;
    }
  }
}
