import ajax from '@/api/ajax.js'

export default {
  // ****************获取缩略图*****************
  getImage (param) {
    return new Promise((resolve, reject) => {
      console.log(param)
      ajax.post({type: 105, data: { page_index: param, page_size: 18, type: 1 }}, backData => {
        console.log(backData.data.data)
        resolve(backData.data.data)
      }, error => {
        reject(error)
      })
    })
  },
  // **************删除图片*********************
  deletePic (param) {
    return new Promise((resolve, reject) => {
      ajax.post({type: 116, data: {ids: param}}, backData => {
        resolve()
      }, error => {
        reject(error)
      })
    })
  }
}
