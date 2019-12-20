import ajax from '@/api/ajax.js'

export default {
  getTable (param) {
    // console.log(param)
    return new Promise((resolve, reject) => {
      ajax.post({type: 852, data: {pageSize: 10, page: param.currentPage, query: param.input}}, backData => {
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
      ajax.post({type: 802, data: param}, backData => {
        resolve()
      }, error => {
        reject(error)
      })
    })
  },
  // **************** 提交数据  ******************
  submitData (param) {
    return new Promise((resolve, reject) => {
      ajax.post({type: 850, data: {name: param.name, pro_manager: param.pro_manager}}, backData => {
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
      ajax.post({type: 851, data: {name: param.name, pro_manager: param.corp_manager, id: param.id}}, backData => {
        resolve()
      }, error => {
        reject(error)
      })
    })
  }
}
