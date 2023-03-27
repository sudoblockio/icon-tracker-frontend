export function requestAddress() {
    return new Promise(resolve => {
      window.removeEventListener("ICONEX_RELAY_RESPONSE", eventHandler, false);
      window.addEventListener("ICONEX_RELAY_RESPONSE", eventHandler, false);
      window.dispatchEvent(
        new CustomEvent("ICONEX_RELAY_REQUEST", {
          detail: {
            type: "REQUEST_ADDRESS"
          }
        })
      );
      function eventHandler(event) {
        const { type, payload } = event.detail;
        if (type === "RESPONSE_ADDRESS") {
          window.removeEventListener("ICONEX_RELAY_RESPONSE", eventHandler, false);
          resolve(payload);
        }
      }
    });
  }
  
export function requestJsonRpc(rawTransaction) {
  return new Promise(resolve => {
    window.removeEventListener("ICONEX_RELAY_RESPONSE", eventHandler, false);
    window.addEventListener("ICONEX_RELAY_RESPONSE", eventHandler, false);
    window.dispatchEvent(
      new CustomEvent("ICONEX_RELAY_REQUEST", {
        detail: {
          type: "REQUEST_JSON-RPC",
          payload: {
            jsonrpc: "2.0",
            method: "icx_sendTransaction",
            params: rawTransaction,
            id: 50889
          }
        }
      })
    );
    function eventHandler(event) {
      console.log("in event handler")
      const { type, payload } = event.detail;
      console.log(event, "connect payload")
      if (type === "RESPONSE_JSON-RPC") {
        window.removeEventListener("ICONEX_RELAY_RESPONSE", eventHandler, false);
        resolve(payload);
      }
    }
  });
};
