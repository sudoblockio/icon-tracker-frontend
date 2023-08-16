import actionTypes from "../actionTypes/actionTypes";

const initialState = {
  bannerExpireDate: undefined,
  walletAddress: "",
  walletNotification: false,
  walletLanding: false,
  walletType: ""
};

function checkPayloadNotNull(payload, label) {
  if (payload == null) {
    throw new Error(
      `Updating global state for label = ${label}. expected 'payload' not to be null. Payload => ${payload}`
    );
  }
}

export function storageReducer(state = initialState, action) {
  const { type, payload } = action;

  if (type == null) {
    throw new Error(
      `Updating global state. expected 'type' not to be null. Type => ${payload}`
    );
  }

  switch (type) {
    case actionTypes.setBannerOption:
      checkPayloadNotNull(payload, actionTypes.setBannerOption);
      return Object.assign({}, state, {
        bannerExpireDate: payload.bannerExpireDate
      });
    case actionTypes.setAddressSuccess:
      checkPayloadNotNull(payload, actionTypes.setAddressSuccess);
      return Object.assign({}, state, {
        walletAddress: payload
      });
    case actionTypes.setWalletTypeSuccess:
      checkPayloadNotNull(payload, actionTypes.setWalletTypeSuccess);
      return Object.assign({}, state, {
        walletType: payload
      });
    case actionTypes.setNotificationSuccess:
      checkPayloadNotNull(payload, actionTypes.setNotificationSuccess);
      return Object.assign({}, state, {
        walletNotification: payload
      });
    case actionTypes.clearWalletSuccess:
      return Object.assign({}, state, {
        walletAddress: "",
        walletNotification: false,
        walletLanding: false,
        walletType: ""
      });
    default: {
      return state;
    }
  }
}
