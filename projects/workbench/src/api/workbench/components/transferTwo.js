import ajax from '@/api/ajax.js'
let configValue = []
let selectID = ''
let queryString = ''

export default {
  // 设置搜索框数据方法
  setQueryStringValue (param) {
    queryString = param
  },
  // 设置config参数方法
  setConfigValue (param) {
    configValue = param
  },
  // 设置选中ID方法
  setselectIDValue (param) {
    selectID = param
  },
  // ***************请求树形结构内部数据************//
  getDataInTree (param) {
    console.log(param)
    return new Promise((resolve, reject) => {
      ajax.post({type: param.treeType}, backData => {
        resolve(backData.data.data.tree)
      }, error => {
        reject(error)
      })
    })
  },
  // *****************树添加***************//
  addTree (param) {
    return new Promise((resolve, reject) => {
      console.log(param)
      ajax.post({type: configValue.treeAddType, data: {'id': param.parent.id, 'name': param.data.name}}, backData => {
        resolve(backData.data)
      }, error => {
        reject(error)
      })
    })
  },
  // *****************树删除***************//
  removeTree (param) {
    return new Promise((resolve, reject) => {
      console.log(param)
      ajax.post({type: configValue.treeDeleteType, data: {'id': param.id}}, backData => {
        resolve()
      }, error => {
        reject(error)
      })
    })
  },
  // *****************中间数据***************//
  selectDataPage (param) {
    return new Promise((resolve, reject) => {
      ajax.post({type: configValue.selectType, data: {'id': selectID, 'page': param - 1, 'page_size': 7}}, backData => {
        resolve(backData.data.data)
      }, error => {
        reject(error)
      })
    })
  },
  // *****************右边数据***************//
  allDataPage (param) {
    return new Promise((resolve, reject) => {
      ajax.post({type: configValue.allType, data: {'id': selectID, 'page': param - 1, 'page_size': 7, 'query': queryString}}, backData => {
        resolve(backData.data.data)
      }, error => {
        reject(error)
      })
    })
  },
  // ******************添加数据(左移)***************//
  addData (param) {
    return new Promise((resolve, reject) => {
      let arr = param.map(t => {
        return t.emp_id
      })
      ajax.post({type: configValue.addToBox, data: {'left_id': selectID, 'right_id': arr}}, backData => {
        console.log(backData)
        resolve(backData)
      }, error => {
        reject(error)
      })
    })
  },
  // ******************添加数据(右移)***************//
  deleteData (param) {
    return new Promise((resolve, reject) => {
      let arr = param.map(t => {
        return t.emp_id
      })
      ajax.post({type: configValue.deleteFromBox, data: {'left_id': selectID, 'right_id': arr}}, backData => {
        console.log(backData)
        resolve(backData)
      }, error => {
        reject(error)
      })
    })
  },
  // ******************添加修改***************//
  editTree ({id, name}) {
    return new Promise((resolve, reject) => {
      ajax.post({type: configValue.editTree, data: {'id': id, 'name': name}}, backData => {
        console.log(backData)
        resolve(backData)
      }, error => {
        reject(error)
      })
    })
  }
}
