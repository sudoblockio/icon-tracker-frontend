import axios from 'axios'

let axiosApi = axios.create({
<<<<<<< HEAD
  baseURL: 'http://ec2-13-125-144-157.ap-northeast-2.compute.amazonaws.com',
=======
  baseURL: 'http://ec2-13-124-239-185.ap-northeast-2.compute.amazonaws.com:8080',
>>>>>>> 449e121f7b935100fa3eb20b079eeca5acd38bbb
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
        resolve(result.data.data)
      })
      .catch(error => {
        reject(error)
      })
  })
}

export function getAddressDetailApi(payload) {
  return new Promise((resolve, reject) => {
    axiosApi.get('/v0/wallet/walletDetailTxList?address=' + payload)
      .then(result => {
        console.log(result)
        resolve(result.data.data)
      })
      .catch(error => {
        alert(error)
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
  const height = payload.height;
  const pageNum = payload.pageNum || 1;

  return new Promise((resolve, reject) => {
    axiosApi.get('/v0/block/blockDetail?height='+height+'&page='+pageNum )
      .then(result => {
        resolve(result.data)
      })
      .catch(error => {
        alert(error)
        reject(error)
      })
  })
}
