import axios from 'axios'

const productionURL = 'https://tracker.icon.foundation'
const developmentURL = 'https://trackerdev.icon.foundation'
const axiosApi = axios.create({
  baseURL: process.env.NODE_ENV === 'development' ? developmentURL : productionURL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
})

export function getMainInfo() {
  return new Promise((resolve, reject) => {
    axiosApi.get('/v0/main/mainInfo')
      .then(result => {
        resolve(result.data)
      })
      .catch(error => {
        reject(error)
      })
  })
}

export function getMainChart() {
  return new Promise((resolve, reject) => {
    axiosApi.get('/v0/main/mainChart')
      .then(result => {
        resolve(result.data.data)
      })
      .catch(error => {
        reject(error)
      })
  })
}

export function getAddressesApi(payload) {
  const pageNum = payload || 1
  return new Promise((resolve, reject) => {
    axiosApi.get('/v0/wallet/addrList?page=' + pageNum)
      .then(result => {
        resolve(result.data)
      })
      .catch(error => {
        reject(error)
      })
  })
}

export function getAddressDetailApi(payload) {
  const addressId = payload.addressId;
  const pageId = payload.pageId || 1;

  return new Promise((resolve, reject) => {
    axiosApi.get('/v0/wallet/walletDetailTxList?address=' + addressId + '&page=' + pageId)
      .then(result => {
        resolve(result.data)
      })
      .catch(error => {
        reject(error)
      })
  })
}

export function getBlocksApi(payload) {
  const pageNum = payload || 1
  return new Promise((resolve, reject) => {
    axiosApi.get('/v0/block/recentBlock?page=' + pageNum)
      .then(result => {
        resolve(result.data)
      })
      .catch(error => {
        reject(error)
      })
  })
}

export function getBlockApi(payload) {
  const blockId = payload.blockId;
  const pageId = payload.pageId || 1;

  return new Promise((resolve, reject) => {
    axiosApi.get('/v0/block/blockDetail?height='+blockId+'&page='+pageId )
      .then(result => {
        resolve(result.data)
      })
      .catch(error => {
        reject(error)
      })
  })
}

export function getBlockByHashApi(payload) {
  const blockHash = payload.hash;
  const pageId = payload.pageId || 1;

  return new Promise((resolve, reject) => {
    axiosApi.get('/v0/block/blockDetailByHash?hash='+blockHash+'&page='+pageId )
      .then(result => {
        resolve(result.data.data)
      })
      .catch(error => {
        reject(error)
      })
  })
}

export function searchApi(payload) {
  return new Promise((resolve, reject) => {
    axiosApi.get('/v0/search/Search?data=' + payload)
      .then(result => {
        resolve(result.data.data)
      })
      .catch(error => {
        reject(error)
      })
  })
}

export function getTransactionsApi(payload){
  const pageNum = payload || 1;
  return new Promise((resolve, reject) => {
    axiosApi.get('v0/transaction/recentTx?page=' + pageNum)
      .then(result => {
        resolve(result.data);
      })
      .catch(error => {
        reject(error);
      })
  });
}

export function getTransactionApi(payload){
  const txHash = payload;
  return new Promise((resolve, reject) => {
    axiosApi.get('v0/transaction/txDetail?txHash=' + txHash)
      .then(result => {
        resolve(result.data);
      })
      .catch(error => {
        reject(error);
      })
  });
}
