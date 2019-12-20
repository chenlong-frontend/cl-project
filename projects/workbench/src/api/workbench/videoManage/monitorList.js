import ajax from '@/api/ajax.js'
let pageSize = 100
let area, camera

export default {
  // 设置区域接口
  setArea (param) {
    area = param
  },
  // 设置摄像头
  setCamera (param) {
    camera = param
  },
  // 获取文件列表数据,默认第一页
  getTable (param) {
    param.page_size = pageSize
    return new Promise((resolve, reject) => {
      ajax.post({type: 108, data: param}, backData => {
        resolve(backData.data.data)
      }, error => {
        reject(error)
      })
    })
  },
  // 获取搜索结果,默认第一页
  getSearch (param) {
    console.log(param)
    return new Promise((resolve, reject) => {
      ajax.post({type: 108, data: {search_like: param.result, page_num: param.page, page_size: pageSize}}, backData => {
        resolve(backData.data.data)
      }, error => {
        reject(error)
      })
    })
  },
  // 删除
  removeFile (param) {
    return new Promise((resolve, reject) => {
      console.log(param)
      let arr = param.map(t => {
        return {
          file_id: t.file_id,
          isfile: t.isfile
        }
      })
      ajax.post({type: 110, data: {ids: arr}}, backData => {
        resolve(backData.data)
      }, error => {
        reject(error)
      })
    })
  },
  // 新增区域
  addArea (param) {
    return new Promise((resolve, reject) => {
      ajax.post({type: area, data: {type: 0, position: param.val, file_path: param.path, file_id: param.file_id}}, backData => {
        resolve(backData.data)
      }, error => {
        reject(error)
      })
    })
  },
  // 新增摄像头
  addCamera (param) {
    return new Promise((resolve, reject) => {
      ajax.post({type: camera, data: param}, backData => {
        resolve(backData.data)
      }, error => {
        reject(error)
      })
    })
  },
  // 请求摄像机
  getCamera (param) {
    return new Promise((resolve, reject) => {
      ajax.post({type: 119, data: {}}, backData => {
        resolve(backData.data)
      }, error => {
        reject(error)
      })
    })
  },
  //  请求摄像头详细信息
  getCameraInfo (param) {
    return new Promise((resolve, reject) => {
      ajax.post({type: 111, data: {file_id: param.id}}, backData => {
        resolve(backData.data)
      }, error => {
        reject(error)
      })
    })
  }
}
