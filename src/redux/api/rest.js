import axios from 'axios'

let axiosApi = axios.create({
  baseURL: 'http://ec2-13-125-144-157.ap-northeast-2.compute.amazonaws.com',
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
  const address = payload.address;
  const pageNum = payload.pageNum || 1;

  return new Promise((resolve, reject) => {
    axiosApi.get('/v0/wallet/walletDetailTxList?address=' + address + '&page=' + pageNum)
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
        alert(error)
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
        resolve(result.data.data)
      })
      .catch(error => {
        alert(error)
        reject(error)
      })
  })
}

export function getBlockByHashApi(payload) {
  const blockId = payload.blockHash;
  const pageId = payload.pageId || 1;

  return new Promise((resolve, reject) => {
    axiosApi.get('/v0/block/blockDetail?height='+blockId+'&page='+pageId )
      .then(result => {
        resolve(result.data.data)
      })
      .catch(error => {
        alert(error)
        reject(error)
      })
  })
}

export function searchApi(payload) {
  return new Promise((resolve, reject) => {
    axiosApi.get('/v0/search/Search?data=' + payload)
      .then(result => {
        resolve(result.data)
      })
      .catch(error => {
        alert(error)
        reject(error)
      })
  })
}

export function getTransactionsApi(payload){
  const pageNum = payload || 1;
  return new Promise((resolve, reject) => {
    axiosApi.get('v0/transaction/recentTx?page=' + pageNum)
      .then(result => {
        resolve(result.data.data);
      })
      .catch(error => {
        alert(error);
        reject(error);
      })
  });
}