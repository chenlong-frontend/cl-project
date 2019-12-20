import ajax from '@/api/ajax.js'

export default {
  // *****************提交表单******************//
  submit (param) {
    return new Promise((resolve, reject) => {
      ajax.post({type: 218, data: param}, backData => {
        resolve(backData.data)
      }, error => {
        reject(error)
      })
    })
  },
  // *****************请求文档编号******************//
  getFileNum () {
    return new Promise((resolve, reject) => {
      ajax.post({type: 216}, backData => {
        resolve(backData.data.data)
      }, error => {
        reject(error)
      })
    })
  }
}
