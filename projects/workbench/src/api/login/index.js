import ajax from '@/api/ajax.js'

export default {
  // *******************登录请求******************//
  submit (param) {
    return new Promise((resolve, reject) => {
      ajax.post({type: 403, data: param}, data => {
        if (data.data.code === 0) {
          resolve(data.data)
        } else {
          reject(data.data)
        }
      }, error => {
        reject(error)
      })
    })
  },
  getRouter () {
    return new Promise((resolve, reject) => {
      ajax.post({type: 710}, backData => {
        resolve(backData.data)
      }, error => {
        reject(error)
      })
    })
  }
}
