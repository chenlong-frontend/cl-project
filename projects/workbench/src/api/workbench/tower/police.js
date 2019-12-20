import ajax from '@/api/ajax.js'
export default {
  // 获取运行数据，三个数字
  getWarnNums () {
    return new Promise((resolve, reject) => {
      ajax.post({type: 163, data: null}, data => {
        resolve(data)
      }, error => {
        reject(error)
      })
    })
  },
  // 获取右侧列表 只需要20条
  getWarnList () {
    return new Promise((resolve, reject) => {
      ajax.post({type: 158, data: {'index': 1, 'input': '', 'page_size': 20}}, data => {
        resolve(data)
      }, error => {
        reject(error)
      })
    })
  },
  getWarnChart (flag) {
    return new Promise((resolve, reject) => {
      ajax.post({type: 159, data: {'flag': flag}}, data => {
        resolve(data)
      }, error => {
        reject(error)
      })
    })
  }
}
