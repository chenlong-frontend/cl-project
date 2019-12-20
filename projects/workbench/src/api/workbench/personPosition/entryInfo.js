import ajax from '@/api/ajax.js'

export default {
  // 页面需要请求的数据
  getHelmetTables (val1, val2, val3) {
    return new Promise((resolve, reject) => {
      ajax.post({type: 1200, data: {'page_index': val1, 'page_size': val2, 'search_key': val3}}, data => {
        resolve(data.data)
      }, error => {
        console.log(error)
      })
    })
  },
  // *****将选中的值返回后台，交由它删除 并返回code，若code为0则删除成功然后重新获取表格*******//
  deleteItem (ids) {
    return new Promise((resolve, reject) => {
      ajax.post({type: 1201, data: { 'ids': ids }}, data => {
        resolve(data)
      }, error => {
        reject(error)
      })
    })
  },
  // 添加安全帽
  addHelemt (item) {
    return new Promise((resolve, reject) => {
      ajax.post({type: 1202, data: item}, data => {
        resolve(data)
      }, error => {
        reject(error)
      })
    })
  },
  // 确认上传
  confirm (val) {
    return new Promise((resolve, reject) => {
      ajax.post({type: 1204, data: { 'isToDb': val }}, data => {
        resolve(data)
      }, error => {
        reject(error)
      })
    })
  }
}
