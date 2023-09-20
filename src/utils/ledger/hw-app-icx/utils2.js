// "use strict";
/********************************************************************************
 *   Ledger Node JS API for ICON
 *   (c) 2016-2017 Ledger
 *
 *  Modifications (c) 2018 ICON Foundation
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 ********************************************************************************/
//@flow
exports.__esModule = true;
exports.hexToBase64 = exports.asyncWhile = exports.doIf = exports.foreach = exports.eachSeries = exports.splitPath = exports.defer = void 0;
function defer() {
  var resolve, reject;
  var promise = new Promise(function(success, failure) {
    resolve = success;
    reject = failure;
  });
  if (!resolve || !reject) throw new Error("defer() error"); // this never happens and is just to make flow happy
  return { promise: promise, resolve: resolve, reject: reject };
}
exports.defer = defer;
// TODO use bip32-path library
function splitPath(path) {
  var result = [];
  var components = path.split("/");
  components.forEach(function(element) {
    var number = parseInt(element, 10);
    if (isNaN(number)) {
      return; // FIXME shouldn't it throws instead?
    }
    if (element.length > 1 && element[element.length - 1] === "'") {
      number += 0x80000000;
    }
    result.push(number);
  });
  return result;
}
exports.splitPath = splitPath;
// TODO use async await
function eachSeries(arr, fun) {
  return arr.reduce(function(p, e) {
    return p.then(function() {
      return fun(e);
    });
  }, Promise.resolve());
}
exports.eachSeries = eachSeries;
function foreach(arr, callback) {
  function iterate(index, array, result) {
    if (index >= array.length) {
      return result;
    } else
      return callback(array[index], index).then(function(res) {
        result.push(res);
        return iterate(index + 1, array, result);
      });
  }
  return Promise.resolve().then(function() {
    return iterate(0, arr, []);
  });
}
exports.foreach = foreach;
function doIf(condition, callback) {
  return Promise.resolve().then(function() {
    if (condition) {
      return callback();
    }
  });
}
exports.doIf = doIf;
function asyncWhile(predicate, callback) {
  function iterate(result) {
    if (!predicate()) {
      return result;
    } else {
      return callback().then(function(res) {
        result.push(res);
        return iterate(result);
      });
    }
  }
  return Promise.resolve([]).then(iterate);
}
exports.asyncWhile = asyncWhile;
function hexToBase64(hexString) {
  return btoa(
    hexString
      .match(/\w{2}/g)
      .map(function(a) {
        return String.fromCharCode(parseInt(a, 16));
      })
      .join("")
  );
}
exports.hexToBase64 = hexToBase64;
