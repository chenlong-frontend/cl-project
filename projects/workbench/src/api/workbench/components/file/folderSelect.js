import ajax from '@/api/ajax.js'
export default {
  // *****************请求文件夹******************//
  getLevel0 () {
    return new Promise((resolve, reject) => {
      ajax.post({type: 210, data: {isfile: 0, p_id: -1}}, backData => {
        resolve(backData.data.data.file_child_file)
      }, error => {
        reject(error)
      })
    })
  },
  getLevel1 (param) {
    // 传回对象包含leaf: true的说明没有子节点
    return new Promise((resolve, reject) => {
      ajax.post({type: 210, data: {isfile: 0, p_id: param}}, backData => {
        resolve(backData.data.data.file_child_file)
      }, error => {
        reject(error)
      })
    })
  }
}
