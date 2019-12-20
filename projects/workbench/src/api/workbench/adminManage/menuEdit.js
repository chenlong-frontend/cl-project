import ajax from '@/api/ajax.js'

export default {
  // ***************请求树形结构内部数据************//
  getDataInTree () {
    return new Promise((resolve, reject) => {
      ajax.post({type: 500, data: {}}, backData => {
        resolve(backData.data.data.tree)
      }, error => {
        reject(error)
      })
    })
  },
  // *****************树添加***************//
  addTree (param) {
    console.log(param)
    return new Promise((resolve, reject) => {
      ajax.post({type: 502, data: {name: param.data.name, p_id: param.parent.id}}, backData => {
        resolve(backData.data.data)
      }, error => {
        reject(error)
      })
    })
  },
  // *****************树删除***************//
  removeTree (param) {
    return new Promise((resolve, reject) => {
      ajax.post({type: 503, data: {id: param.id}}, backData => {
        resolve(backData.data.data)
      }, error => {
        reject(error)
      })
    })
  },
  // *****************数据取得***************//
  getData (param) {
    return new Promise((resolve, reject) => {
      ajax.post({type: 507, data: {id: param.id}}, backData => {
        resolve(backData.data.data)
      }, error => {
        reject(error)
      })
    })
  },
  // *****************提交表单***************//
  submit (param) {
    return new Promise((resolve, reject) => {
      ajax.post({type: 506, data: param}, backData => {
        resolve(backData.data)
      }, error => {
        reject(error)
      })
    })
  }
}
