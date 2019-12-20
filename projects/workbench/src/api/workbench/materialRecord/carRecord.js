import ajax from '@/api/ajax.js'

export default {
  getTable (param) {
    return new Promise((resolve, reject) => {
      ajax.post({type: 1305, data: {pro_id: param.itemId, search_key: param.input, page_index: param.currentPage, page_size: 10}}, backData => {
        resolve(backData.data.data)
      }, error => {
        reject(error)
      })
    })
  }
}
