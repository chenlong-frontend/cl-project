import ajax from '@/api/ajax.js'

export default {
  // *******************请求导航菜单******************//
  getIconList (param) {
    return new Promise((resolve, reject) => {
      ajax.post({type: param, data: {}}, backData => {
        resolve(backData.data.data)
      }, error => {
        reject(error)
      })
    })
  }
}
