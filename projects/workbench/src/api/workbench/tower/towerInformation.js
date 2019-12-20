import ajax from '@/api/ajax.js'
export default {
  // 获取当前页面表格信息,传入页码和搜索框
  getCurrentPage (page, input) {
    return new Promise((resolve, reject) => {
      console.log(ajax)
      ajax.post({type: 150, data: {'page_index': page, 'page_size': 10, 'search_key': input}}, data => {
        resolve(data)
      }, error => {
        reject(error)
      })
    })
  },
  // 删除塔机信息
  deleteItem (multipleSelsetion) {
    return new Promise((resolve, reject) => {
      ajax.post({type: 154, data: {'ids': multipleSelsetion}}, data => {
        resolve(data)
      }, error => {
        reject(error)
      })
    })
  }
}
