import ajax from '@/api/ajax.js'
import download from '@/api/download.js'
let pageSize = 100

export default {
  // 获取文件列表数据,默认第一页
  getTable (param) {
    param.page_size = pageSize
    param.tag = '0'
    return new Promise((resolve, reject) => {
      ajax.post({type: 233, data: param}, backData => {
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
      ajax.post({type: 224, data: {search_like: param.result, passed: 0, tag: 0, page_num: param.page, page_size: pageSize, public: '1'}}, backData => {
        resolve(backData.data.data.search_result)
      }, error => {
        reject(error)
      })
    })
  },
  // 请求path
  getPath (param) {
    return new Promise((resolve, reject) => {
      ajax.post({type: 202, data: {file_id: param, separator: '/'}}, backData => {
        resolve(backData.data)
      }, error => {
        reject(error)
      })
    })
  },
  // 删除
  removeFile (param) {
    return new Promise((resolve, reject) => {
      let arr = param.map(t => {
        return t.file_id
      })
      ajax.post({type: 235,
        data: {
          file_update_list: [{
            file_tag: '1',
            file_id_list_where: arr
          }]
        }}, backData => {
        resolve(backData.data)
      }, error => {
        reject(error)
      })
    })
  },
  // 移动文件夹
  moveFile (param) {
    return new Promise((resolve, reject) => {
      let arr = param.folderId.map(t => {
        return t.file_id
      })
      console.log(param)
      ajax.post({type: 235,
        data: {
          file_update_list: [{
            file_p_id: param.pId,
            file_id_list_where: arr
          }]
        }}, backData => {
        resolve(backData.data)
      }, error => {
        reject(error)
      })
    })
  },
  // 新增文件夹
  addFolder (param) {
    return new Promise((resolve, reject) => {
      console.log(param)
      ajax.post({type: 236,
        data: {
          file_insert_list: [{
            file_name: param.name,
            file_p_id: param.file_p_id,
            file_emp_id: param.file_emp_id
          }]
        }}, backData => {
        resolve(backData.data)
      }, error => {
        reject(error)
      })
    })
  },
  // 请求权限
  getRole (param) {
    return new Promise((resolve, reject) => {
      ajax.post({type: 508, data: {form_id: param}}, backData => {
        resolve(backData.data)
      }, error => {
        reject(error)
      })
    })
  },
  // 文件下载
  getFile (param) {
    download.download({type: 240, data: {file_id: param}})
  }
}
