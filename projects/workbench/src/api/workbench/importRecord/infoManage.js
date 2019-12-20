import ajax from '@/api/ajax.js'
export default {
  getTable (param) {
    return new Promise((resolve, reject) => {
      ajax.post({type: 1404, data: {search_key: param.search_key, page_index: param.page_index - 1, page_size: 10}}, backData => {
        resolve(backData.data.data)
      }, error => {
        reject(error)
      })
    })
  },
  getModifyData (param) {
    return new Promise((resolve, reject) => {
      console.log(param)
      ajax.post({type: 1405, data: {loadometer_id: param.id}}, backData => {
        console.log(backData.data.data)
        resolve(backData.data.data)
      }, error => {
        reject(error)
      })
    })
  },
  deleteItem (param) {
    return new Promise((resolve, reject) => {
      ajax.post({type: 1403, data: {loadometer_id: param}}, backData => {
        resolve()
      }, error => {
        reject(error)
      })
    })
  },
  // *****************提交按钮***********************
  submitData (param) {
    return new Promise((resolve, reject) => {
      ajax.post({type: 1401, data: param}, backData => {
        resolve()
      }, error => {
        reject(error)
      })
    })
  },
  submitData1 (param) {
    return new Promise((resolve, reject) => {
      ajax.post({type: 1402, data: param}, backData => {
        resolve()
      }, error => {
        reject(error)
      })
    })
  }
}
