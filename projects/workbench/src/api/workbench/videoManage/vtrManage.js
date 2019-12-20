import ajax from '@/api/ajax.js'
export default {
  // *******************得到请求录像机列表******************//
  getVtrData (val1, val2, val3) {
    return new Promise((resolve, reject) => {
      ajax.post({type: 112, data: {'page_index': val1, 'page_size': val2, 'search_key': val3}}, data => {
        resolve(data.data)
      }, error => {
        console.log(error)
      })
    })
  },
 // 删除录像机
  deleteItem (ids) {
    return new Promise((resolve, reject) => {
      ajax.post({type: 115, data: { 'ids': ids }}, data => {
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
      ajax.post({type: 114,
        data: {
          'name': item.name,
          'ip': item.ip,
          'unit_type': item.unit_type,
          'port': item.port,
          'username': item.username,
          'password': item.password
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
      ajax.post({type: 113,
        data: {
          'id': item.id,
          'name': item.video_name,
          'ip': item.ip,
          'administrator': item.manage,
          'unit_type': item.unit_type,
          'port': item.port,
          'username': item.username,
          'password': item.password
        }
      }, data => {
        resolve(data)
      }, error => {
        reject(error)
      })
    })
  }
}
