import ajax from '@/api/ajax.js'

export default {
  // *******************得到请求vr体验点******************//
  // 页面需要请求的数据
  getVrManagements (val1, val2, val3) {
    return new Promise((resolve, reject) => {
      ajax.post({type: 1055, data: {'page_index': val1, 'page_size': val2, 'search_key': val3}}, data => {
        resolve(data.data)
      }, error => {
        console.log(error)
      })
    })
  },
// *****将选中的值返回后台，交由它删除 并返回code，若code为0则删除成功然后重新获取表格*******//
  deleteItem (ids) {
    return new Promise((resolve, reject) => {
      ajax.post({type: 1059, data: { 'ids': ids }}, data => {
        resolve(data)
      }, error => {
        reject(error)
      })
    })
  },
  // 新增保存
  addNewItem (item) {
    console.log(item)
    return new Promise((resolve, reject) => {
      ajax.post({type: 1058,
        data: {
          'name': item.name,
          'address': item.address,
          'administrator': item.manage,
          'admin_id': item.admin_id,
          'phone': item.phone
        }}, data => {
        resolve(data)
      }, error => {
        reject(error)
      })
    })
  },
  // 编辑保存
  editSaveItem (item) {
    console.log(item)
    return new Promise((resolve, reject) => {
      ajax.post({type: 1060,
        data: {
          'id': item.id,
          'name': item.name,
          'address': item.address,
          'administrator': item.manage,
          'admin_id': item.admin_id,
          'phone': item.phone
        }
      }, data => {
        resolve(data)
      }, error => {
        reject(error)
      })
     // resolve(mockData)
    })
  }

}
