// utils.js
//
// Functions
export function getLocalKey() {
  return "NB-3bfa24fc-763b-4369-a5ff-c229708817d1";
}

export function getLoginMethods() {
  return {
    iconex: "ICONEX",
    ledger: "LEDGER"
  };
}

export function getBlankLogin() {
  return {
    selectedWallet: null,
    methodUsed: null,
    bip44Path: null,
    successfulLogin: false
  };
}

export function getInitLocalData() {
  return {
    auth: getBlankLogin()
  };
}

export function validationResponse(isValid, key = null, value = null) {
  return {
    isValid: isValid,
    key: key,
    value: value
  };
}

export function deepMergeObjects(oldObj, newObj) {
  let mergedObj = {};
  const keys = Object.keys(oldObj);
  const newKeys = Object.keys(newObj);

  for (let key of keys) {
    mergedObj[key] = oldObj[key];
    if (newKeys.includes(key)) {
      mergedObj[key] = newObj[key];
      if (
        typeof oldObj[key] === "object" &&
        !Array.isArray(oldObj[key]) &&
        oldObj[key] !== null &&
        oldObj[key] !== undefined
      ) {
        // oldObj[key] is an object
        if (
          typeof newObj[key] === "object" &&
          !Array.isArray(newObj[key]) &&
          newObj[key] !== null &&
          newObj[key] !== undefined
        ) {
          mergedObj[key] = deepMergeObjects(oldObj[key], newObj[key]);
        } else {
          // mergedObj[key] = oldObj[key];
        }
      } else {
      }
    }
  }

  return mergedObj;
}

export function getLocalData(fileKey) {
  // get data saved locally in user pc
  try {
    const data = JSON.parse(window.localStorage.getItem(fileKey));
    let mergedData = deepMergeObjects(getInitLocalData(), data);
    // console.log("Reading local Data");
    // console.log("Checking validation of local data");
    // console.log("Local data:");
    // console.log(data);
    // console.log("Init data and local data merged:");
    // console.log(mergedData);
    if (validateLocalData(mergedData).isValid === true) {
      // console.log("Data validation result. isValid = true");
      return mergedData;
    } else {
      // console.log("Data validation result. isValid = false");
      return getInitLocalData();
    }
  } catch (err) {
    console.log(
      "error while fetching local data, returning getInitLocalData() instead"
    );
    console.log(err);
    return getInitLocalData();
  }
}

export function saveDataToLocal(data, fileKey) {
  const localData = getLocalData(fileKey);
  // console.log("Validating data before saving to local");
  // console.log("LocalData:");
  // console.log(localData);
  // console.log("Data to save");
  // console.log(data);
  let dataToSave = deepMergeObjects(localData, data);
  // console.log("Data post-merge");
  // console.log(dataToSave);

  if (validateLocalData(dataToSave).isValid === true) {
    // console.log("Data validation result. isValid = true");
  } else {
    // console.log("Data validation result. isValid = false");
    dataToSave = { ...localData };
  }

  try {
    window.localStorage.setItem(fileKey, JSON.stringify(dataToSave));
  } catch (err) {
    console.log("error while saving local data");
    console.log(err);
    return false;
  }
}

export function validateLocalData(newData) {
  // Validates data saved to local client computer

  // so far only validating newData.auth
  const data = { ...newData.auth };

  const dataKeys = Object.keys(data);
  const arrayOfKeys = [
    "selectedWallet", // default = null
    "methodUsed", // default = null
    "bip44Path", // default = null
    "successfulLogin" // default = false
  ];

  let validationResult = {
    isValid: null,
    key: null,
    value: null
  };

  if (dataKeys.length === arrayOfKeys.length) {
    dataKeys.forEach(key => {
      if (!arrayOfKeys.includes(key)) {
        validationResult = validationResponse(false, key, data[key]);
        return validationResult;
      } else {
        switch (key) {
          case arrayOfKeys[0]:
            if (
              (typeof data[key] === "string" &&
                data[key].slice(0, 2) === "hx") ||
              data[key] === null
            ) {
              validationResult = validationResponse(true);
            } else {
              validationResult = validationResponse(false, key, data[key]);
              return validationResult;
            }
            break;
          case arrayOfKeys[1]:
            if (
              data[key] === getLoginMethods().iconex ||
              data[key] === getLoginMethods().ledger
            ) {
              validationResult = validationResponse(true);
            } else {
              validationResult = validationResponse(false, key, data[key]);
              return validationResult;
            }
            break;
          case arrayOfKeys[2]:
            if (typeof key === "string") {
              validationResult = validationResponse(true);
            } else {
              validationResult = validationResponse(false, key, data[key]);
              return validationResult;
            }
            break;
          case arrayOfKeys[3]:
            if (typeof key === "boolean") {
              validationResult = validationResponse(true);
            } else {
              validationResult = validationResponse(false, key, data[key]);
              return validationResult;
            }
            break;
          default:
        }
      }
    });
  } else {
    validationResult = validationResponse(false);
    return validationResult;
  }
  validationResult = validationResponse(true);
  return validationResult;
}

const utils = {
  getLocalKey,
  getLoginMethods,
  getBlankLogin,
  getInitLocalData,
  deepMergeObjects,
  getLocalData,
  saveDataToLocal,
  validateLocalData
};

export default utils;
