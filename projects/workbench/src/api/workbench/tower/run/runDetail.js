import ajax from '@/api/ajax.js'

export default {
  // 获取表单信息,传入id
  getRunDetail (runInfoID) {
    return new Promise((resolve, reject) => {
      console.log(ajax)
      ajax.post({type: 173, data: {'id': runInfoID}}, data => {
        resolve(data)
      }, error => {
        reject(error)
      })
    })
  }
}
