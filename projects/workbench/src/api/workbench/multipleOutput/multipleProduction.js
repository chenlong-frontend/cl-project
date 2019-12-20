import ajax from '@/api/ajax.js'
export default {
  getBarData (param) {
    return new Promise((resolve, reject) => {
      ajax.post({type: 1153, data: {}}, backData => {
        console.log(backData)
        resolve(backData.data.data)
      }, error => {
        reject(error)
      })
    })
  },
  // 获取表格数据
  getTableData (param) {
    return new Promise((resolve, reject) => {
      console.log(param)
      ajax.post({type: 1150, data: { dateTime: param }}, backData => {
        console.log(backData)
        resolve(backData.data.data)
      }, error => {
        reject(error)
      })
    })
  },
  // 更新提交
  modifyForm (param) {
    return new Promise((resolve, reject) => {
      console.log(param)
      ajax.post({type: 1152, data: {create_time: param.create_time, info: param.info, detail: param.detail}}, backData => {
        resolve(backData.data)
      }, error => {
        reject(error)
      })
    })
  },
  // 添加数据
  addForm (param) {
    return new Promise((resolve, reject) => {
      console.log(param)
      ajax.post({type: 1151, data: {create_time: param.create_time, info: param.info, detail: param.detail}}, backData => {
        resolve(backData.data)
      }, error => {
        reject(error)
      })
    })
  }
}
