import ajax from '@/api/ajax.js'

export default {
  // 获取表单信息,传入id
  getWarnDetail (warnInfoID) {
    return new Promise((resolve, reject) => {
      ajax.post({type: 178, data: {'id': warnInfoID}}, data => {
        resolve(data)
      }, error => {
        reject(error)
      })
    })
  }
}
