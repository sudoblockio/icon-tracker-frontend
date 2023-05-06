import { requestJsonRpc } from "../../../utils/connect";

export async function icxSendTransaction({ params, index }) {
  const result = {
    status: 200,
    data: null,
    index: index,
    error: { message: "" }
  };
  try {
    result.data = await requestJsonRpc(params.params);
    console.log("result success");
  } catch (error) {
    console.log("result error");
    console.log(error);
    result.status = 500;
    result.error.message = error;
  }
  return result;
}
