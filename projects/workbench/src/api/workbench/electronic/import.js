import ajax from '@/api/ajax.js'
import download from '@/api/download.js'
export default {
  // 导入模板数据
  goOut () {
    download.download({type: 1114, data: {}})
    // return new Promise((resolve, reject) => {
    //   download.post({type: 1114,
    //     data: {
    //     }}, data => {
    //     console.log(data)
    //     resolve(data.data)
    //   }, error => {
    //     reject(error)
    //   })
    // })
  },
  // 上传
  up (gen, id) {
    return new Promise((resolve, reject) => {
      ajax.post({type: 1112,
        data: {
          'type_id': id,
          'is_gen': gen
        }}, data => {
        console.log(data)
        resolve(data.data)
      }, error => {
        reject(error)
      })
    })
  },
  // 提交
  sub (tableName) {
    return new Promise((resolve, reject) => {
      ajax.post({type: 1113,
        data: {
          'isToDB': '1',
          'table_name': tableName
        }}, data => {
        console.log(data)
        resolve(data.data)
      }, error => {
        reject(error)
      })
    })
  }
}
