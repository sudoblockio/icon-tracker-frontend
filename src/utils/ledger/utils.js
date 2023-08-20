export function isArray(obj) {
  return Array.isArray(obj);
}
export function generateHashKey(obj) {
  const resultStr = objTraverse(obj);
  const resultStrReplaced = resultStr.substring(1).slice(0, -1);
  return `icx_sendTransaction.${resultStrReplaced}`;
}

export function arrTraverse(arr) {
  let result = "";

  result += "[";
  for (let j = 0; j < arr.length; j += 1) {
    const value = arr[j];
    if (value === undefined) continue;
    switch (true) {
      case value === null: {
        result += String.raw`\0`;
        break;
      }
      case typeof value === "string": {
        result += escapeString(value);
        break;
      }
      case Array.isArray(value): {
        result += arrTraverse(value);
        break;
      }
      case typeof value === "object": {
        result += objTraverse(value);
        break;
      }
      default:
        break;
    }
    result += ".";
  }

  if (result.endsWith(".")) {
    result = result.slice(0, -1);
  }

  result += "]";

  return result;
}

export function objTraverse(obj) {
  let result = "";
  result += "{";

  const keys = Object.keys(obj);
  keys.sort();

  if (keys.length > 0) {
    for (let i = 0; i < keys.length; i += 1) {
      const key = keys[i];
      const value = obj[key];
      if (value === undefined) continue;
      switch (true) {
        case value === null: {
          result += `${key}.`;
          result += String.raw`\0`;
          break;
        }
        case typeof value === "string": {
          result += `${key}.`;
          result += escapeString(value);
          break;
        }
        case Array.isArray(value): {
          result += `${key}.`;
          result += arrTraverse(value);
          break;
        }
        case typeof value === "object": {
          result += `${key}.`;
          result += objTraverse(value);
          break;
        }
        default:
          break;
      }
      result += ".";
    }
    result = result.slice(0, -1);
    result += "}";
  } else {
    result += "}";
  }

  return result;
}

export function escapeString(value) {
  let newString = String.raw`${value}`;
  newString = newString.split("\\").join("\\\\");
  newString = newString.split(".").join("\\.");
  newString = newString.split("{").join("\\{");
  newString = newString.split("}").join("\\}");
  newString = newString.split("[").join("\\[");
  newString = newString.split("]").join("\\]");

  return newString;
}
