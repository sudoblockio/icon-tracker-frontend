import { randomUint32 } from '../../../utils/utils'
import { requestJsonRpc } from "../../../utils/connect";

// export async function icxCall(params) {
// console.log(params, "What params")
//   // const walletApi = await walletApiInstance()
//   return new Promise(resolve => {
//     const param = {
//       jsonrpc: "2.0",
//       method: "icx_call",
//       params: params,
//       id: randomUint32()
//     }

    // walletApi.post(`/api/v3`, JSON.stringify(param))
    //   .then(response => {

    //     resolve(response);
    //   })
    //   .catch(error => {
    //     if (!!error.response) {
    //       resolve(error.response.data);
    //     }
    //     else {
    //       resolve({
    //         error: {
    //           message: error.message
    //         }
    //       })
    //     }
    //   })
  // });
// }

export async function icxSendTransaction({ params, index }) {
  const result = {
    status: 200,
    data: null,
    index: index,
    error: { message: "" }
  };
  try {
    result.data = await requestJsonRpc(params.params);
    console.log('result success');
  } catch (error) {
    console.log('result error');
    console.log(error);
    result.status = 500;
    result.error.message = error;;
  }
  return result;
}
