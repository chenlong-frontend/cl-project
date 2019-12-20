import ajax from '@/api/ajax.js'

export default {
  getTable (param) {
    // console.log(param)
    return new Promise((resolve, reject) => {
      ajax.post({type: 863, data: {pageSize: 10, page: param.currentPage, query: param.input}}, backData => {
        console.log(backData)
        resolve(backData.data.data)
      }, error => {
        reject(error)
      })
    })
  },
  // **************删除数据*******************
  deleteData (param) {
    return new Promise((resolve, reject) => {
      ajax.post({type: 861, data: param}, backData => {
        resolve()
      }, error => {
        reject(error)
      })
    })
  },
  // **************** 提交数据  ******************
  submitData (param) {
    return new Promise((resolve, reject) => {
      ajax.post({type: 860, data: {name: param.name, script: param.script, icon: param.icon, pro_id: param.pro_id, url: param.url}}, backData => {
        console.log(backData.data.data)
        resolve(backData.data.data)
      }, error => {
        reject(error)
      })
    })
  },
  // ****************修改数据*************************
  submitData1 (param) {
    return new Promise((resolve, reject) => {
      ajax.post({type: 862, data: {name: param.name, script: param.script, icon: param.icon, pro_id: param.pro_id, url: param.url}}, backData => {
        resolve()
      }, error => {
        reject(error)
      })
    })
  }
}
