import ajax from '@/api/ajax.js'

export default {
  // *******************请求工地文档记录******************//
  getDocumentData () {
    return new Promise((resolve, reject) => {
      ajax.post({type: 825}, backData => {
        resolve(backData.data.data)
      }, error => {
        reject(error)
      })
    })
  },
  // *******************请求施工记录******************//
  getCameraData () {
    return new Promise((resolve, reject) => {
      ajax.post({type: 422, data: {'page_index': 0, 'page_size': 4}}, backData => {
        // console.log(backData)
        resolve(backData.data.data.issue)
      }, error => {
        reject(error)
      })
    })
  },
  // *******************请求项目信息******************//
  getProjectData () {
    return new Promise((resolve, reject) => {
      ajax.post({type: 805}, backData => {
        resolve(backData.data.data.project[0])
      }, error => {
        reject(error)
      })
    })
  },
  // *******************请求在场人数******************//
  getCount () {
    return new Promise((resolve, reject) => {
      ajax.post({type: 431}, backData => {
        resolve(backData.data.data)
      }, error => {
        reject(error)
      })
    })
  }
}
