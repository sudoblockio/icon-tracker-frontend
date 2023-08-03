// httpsRequest.js
// This module is an https request wrapped in a promise design to be used
// to interact with the ICON Blockchain
//
// Imports
import https from "https-browserify";
import http from "stream-http";
import SCORES from "./scores";

/**
 * async https/http request wrapped in a promise
 * @param {Object} param - params for the http request
 * @param {string} param.hostname
 * @param {string} param.ip
 * @param {number} param.port
 * @param {number} param.timeout
 * @param {string} param.path
 */
async function httpx(params, data = false, runSecured = true) {
  let method = http;
  if (runSecured) {
    method = https;
  }

  const promisifiedQuery = new Promise((resolve, reject) => {
    const query = method.request(params, res => {
      // Print status code on console
      console.log("Status Code: " + res.statusCode);
      console.log("headers: ", res.headers);
      console.log("Params:");
      console.log(params);
      console.log("data:");
      console.log(data);

      // Process chunked data
      let rawData = "";
      res.on("data", chunk => {
        rawData += chunk;
      });

      // for (let item in res.headers) {
        // console.log(item + ": " + res.headers[item]);
      // }

      // when request completed, pass the data to the 'resolve' callback
      res.on("end", () => {
        let data;
        try {
          data = JSON.parse(rawData);
          resolve(data);
        } catch (err) {
          data = { error: err.message, message: rawData };
          reject(data);
        }
      });

      // if error, print on console
      res.on("error", err => {
        console.log("Got error: ", +err.message);
      });
    });
    // If request timeout destroy request
    query.on("timeout", () => {
      console.log("timeout. destroying query");
      query.destroy();
    });
    // Handle query error
    query.on("error", err => {
      console.log("error running query, passing error to callback reject");
      reject(err);
    });
    if (data !== false) {
      // If data param is passed into function we write the data
      query.write(data);
    }
    // end request
    query.end();
  });
  // wait for the response and return it
  try {
    return await promisifiedQuery;
  } catch (err) {
    console.log("error while running promisifiedQuery");
    console.log(err);
    throw new Error("error connecting to node")
  }
}

export default async function customRequest(
  path,
  data = false,
  hostname = SCORES.apiHostnames.espanicon,
  https = true,
  port = false
) {
  let request;
  try {
    let params = {
      hostname: hostname,
      path: path,
      method: data ? "POST" : "GET",
      headers: {
        "Content-Type": "text/plain",
        charset: "UTF-8"
      },
      port: port ? port : https ? 443 : 80
    };

    if (https) {
      request = await httpx(params, data);
    } else {
      request = await httpx(params, data, false);
    }

    if (request.error == null) {
      // if there is no error
      return request;
    } else {
      throw new Error(
        "Request made successfully but returned Error from the node"
      );
    }
  } catch (err) {
    console.log("Error running customRequest");
    console.log(err.message);
    console.log(request);
    return null;
  }
}
