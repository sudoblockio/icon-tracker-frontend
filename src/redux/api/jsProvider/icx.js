import { requestJsonRpc } from "../../../utils/connect";

export async function icxSendTransaction(payload) {
  console.log("icxSendTransaction payload:", payload);

  // payload will always have an 'index' field
  const { index } = payload;
  const result = {
    status: 200,
    data: null,
    index: index,
    error: { message: "" }
  };
  try {
    // validate the payload
    const rawTx =
      payload.params != null
        ? payload.params
        : payload.rawTx != null
        ? payload.rawTx
        : null;
    if (rawTx == null) {
      throw new Error("Invalid payload for icxSendTransaction");
    }
    result.data = await requestJsonRpc(rawTx.params);
    console.log("result success");
  } catch (e) {
    console.log("result error");
    console.log(e);
    result.status = 500;
    result.error.message =
      typeof e === "string"
        ? e
        : e.message != null && typeof e.message === "string"
        ? e.message
        : JSON.stringify(e);
  }
  return result;
}
