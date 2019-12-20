import ajax from '@/api/ajax.js'

export default {
  getAreaList (val1, val2, val3) {
    return new Promise((resolve, reject) => {
      ajax.post({type: 1207, data: {'page_index': val1, 'page_size': val2, 'search_key': val3}}, data => {
        resolve(data.data)
      }, error => {
        console.log(error)
      })
    })
  },
  // *****将选中的值返回后台，交由它删除 并返回code，若code为0则删除成功然后重新获取表格*******//
  deleteItem (ids) {
    return new Promise((resolve, reject) => {
      ajax.post({type: 1209, data: { 'ids': ids }}, data => {
        resolve(data)
      }, error => {
        reject(error)
      })
    })
  },
  addArea (item) {
    return new Promise((resolve, reject) => {
      ajax.post({type: 1208, data: item}, data => {
        resolve(data)
      }, error => {
        reject(error)
      })
    })
  }
}
