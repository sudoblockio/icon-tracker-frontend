const data = {
  tracker: {
    foundation: {
      root: "https://tracker.icon.foundation",
      routes: {
        wallet: "/address/"
      }
    },
    community: {
      root: "https://tracker.icon.community",
      routes: {
        wallet: "/address/"
      }
    }
  }
};

const samples = {
  DETAILS_SAMPLE: `{
    representative: {
      logo:{
      logo_256: "http://somesite.com/logo-small.jpg",
      logo_1024: "http://somesite.com/logo-big.jpg",
      logo_svg: "http://somesite.com/logo.svg"
    },
    media: {
      steemit: "",
      twitter: "",
      youtube: "",
      facebook: "",
      github: "",
      reddit: "",
      keybase: "",
      telegram: "",
      wechat: ""
    }
  }`,
  SET_PREP_SAMPLE: `{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "icx_sendTransaction",
  "params": {
      "data": {
          "method": "setPRep",
          "params": {
              "name": "ABC Node",
              "email": "abc@example.com",
              "country": "KOR",
              "city": "Seoul",
              "website": "https://abc.example.com/",
              "details": "https://abc.example.com/details/",
              "nodeAddress": "hxe7af5fcfd8dfc67530a01a0e403882687528dfcb"
          }
      },
  }
}`,
  DETAILS_2_SAMPLE: {
    representative: {
      logo: {
        logo_256: "http://somesite.com/logo-small.jpg",
        logo_1024: "http://somesite.com/logo-big.jpg",
        logo_svg: "http://somesite.com/logo.svg"
      },
      media: {
        steemit: "",
        twitter: "",
        youtube: "",
        facebook: "",
        github: "",
        reddit: "",
        keybase: "",
        telegram: "",
        wechat: ""
      }
    },
    server: {
      location: {
        country: "USA",
        city: "Houston"
      },
      server_type: "cloud",
      api_endpoint: "127.0.0.1:9000"
    }
  }
};

const MAX_WAIT_PERIOD = 5;

const initialTxResultState = {
  txExists: false
};

function parseBonderWallet(wallet) {
  return (
    data.tracker.foundation.root +
    data.tracker.foundation.routes.wallet +
    wallet
  );
}

function parseGetBonderList(getBonderListResponse) {
  if (getBonderListResponse == null) {
    return [];
  } else {
    return getBonderListResponse.bonderList;
  }
}
function prepareForQueryMethod(url) {
  const urlObject = new URL(url);
  return urlObject;
}

function parseBonderFormInputs(rawInputState) {
  //
  const objKeys = Object.keys(rawInputState);
  let validWallets = [];
  for (let each of objKeys) {
    if (isValidICONAddress(rawInputState[each])) {
      validWallets.push(rawInputState[each]);
    }
  }
  return validWallets;
}
function parsePrepFormInputs(rawInputState) {
  let result = {};
  const objKeys = Object.keys(rawInputState);
  let resultIsNotEmpty = false;

  for (let each of objKeys) {
    if (validateNonEmptyString(rawInputState[each])) {
      result[each] = rawInputState[each];
      resultIsNotEmpty = true;
    } else {
    }
  }

  if (resultIsNotEmpty) {
    return result;
  } else {
    return null;
  }
}

function validateNonEmptyString(string) {
  //
  const regex = /^\s*$/;

  return !regex.test(string);
}

function isValidScore(scoreAddress) {
  // check is the input is a valid SCORE address
  const regex = /([cC][xX][a-fA-F0-9]{40})$/;
  return regex.test(scoreAddress);
}
function isValidICONAddress(address) {
  // check is the input is a valid ICON Wallet address
  const regex = /([hH][xX][a-fA-F0-9]{40})$/;
  return regex.test(address);
}

function parseScore(scoreApi) {
  let parsedScore = "";

  if (scoreApi == null) return "** INVALID SCORE **";

  for (let each of scoreApi) {
    parsedScore += "{\n";
    for (let key in each) {
      if (typeof each[key] === "string") {
        parsedScore += `\u00A0\u00A0 ${key}: "${each[key]}",\n`;
      } else {
        parsedScore += `\u00A0\u00A0 ${key}: ${JSON.stringify(each[key])},\n`;
      }
    }
    parsedScore += "},\n";
  }
  return parsedScore;
}

function formatResponsePayload(payload) {
  let result = { isError: null, result: null, code: null, message: null };

  if (payload.code == null) {
    // if payload.code doesnt exists then the result is not an error
    result.isError = false;
    result.result = payload.result;
  } else {
    // if payload.code exists then the result is an error
    result.isError = true;
    result.code = payload.code;
    result.message = payload.message;
  }

  return result;
}
function customWalletEventListener(
  evnt,
  mainCallback,
  preMainCallback = null,
  postMainCallback = null,
  postMainCallback2 = null
) {
  // fetch event data
  const { type, payload } = evnt.detail;
  // console.log("event");
  // console.log(evnt);

  // switch case for every type of event raised
  switch (type) {
    case "RESPONSE_JSON-RPC":
      // catching the wallet response in the case of a JSON-RPC event raised

      // if preMainCallback was defined execute before mainCallback
      if (preMainCallback == null) {
      } else {
        preMainCallback(payload);
      }

      const parsedPayload = formatResponsePayload(payload);
      const mainCallbackResponse = mainCallback(parsedPayload);
      // execute mainCallback with delay defined by setTimeout
      // setTimeout(async () => {
      //   const parsedPayload = formatResponsePayload(payload);
      //   const mainCallbackResponse = await mainCallback(parsedPayload);
      //   console.log("mainCallback response");
      //   console.log(mainCallbackResponse);
      // }, 3000);
      break;
    case "CANCEL_JSON-RPC":
      // if the user cancels ICONex tx and postMainCallback2 was defined
      if (postMainCallback2 == null) {
      } else {
        // postMainCallback2 should be a method that takes a bool value
        // where 'false' is a param that will close the modal window
        postMainCallback2(false);
      }
      break;
    default:
  }
}

function getAllPrepsAddresses(prepData) {
  let result = prepData.map(eachPrep => {
    return eachPrep.address;
  });
  return result;
}

function getProposalVotes(voteObj) {
  let result = [];
  const typeOfVote = ["agree", "disagree", "noVote"];

  for (let voteStatus of typeOfVote) {
    switch (voteStatus) {
      case typeOfVote[0]:
        for (let eachVote of voteObj[voteStatus].list) {
          result.push([eachVote.address, "0x1"]);
        }
        break;
      case typeOfVote[1]:
        for (let eachVote of voteObj[voteStatus].list) {
          result.push([eachVote.address, "0x0"]);
        }
        break;
      case typeOfVote[2]:
        for (let eachVote of voteObj[voteStatus].list) {
          result.push([eachVote, null]);
        }
        break;
      default:
        break;
    }
  }

  return result;
}

function checkIfPrepNeedToVote(arrayOfPreps, localPrep) {
  let result = false;

  for (let each of arrayOfPreps) {
    if (each[0] === localPrep) {
      result = true;
    }
  }

  return result;
}

function parsePrepData(prepData) {
  //
}

const utils = {
  data,
  samples,
  parseBonderWallet,
  parseGetBonderList,
  prepareForQueryMethod,
  parseBonderFormInputs,
  parsePrepFormInputs,
  isValidScore,
  isValidICONAddress,
  parseScore,
  customWalletEventListener,
  getAllPrepsAddresses,
  getProposalVotes,
  MAX_WAIT_PERIOD,
  initialTxResultState,
  checkIfPrepNeedToVote
};

export default utils;
