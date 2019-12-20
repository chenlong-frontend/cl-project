import ajax from '@/api/ajax.js'
export default {
  // 获取运行数据，三个数字
  getRunNums () {
    return new Promise((resolve, reject) => {
      ajax.post({type: 164, data: null}, data => {
        resolve(data)
      }, error => {
        reject(error)
      })
    })
  },
  // 获取右侧列表 只需要20条
  getRunList () {
    return new Promise((resolve, reject) => {
      ajax.post({type: 165, data: {'index': 1, 'input': '', 'page_size': 20}}, data => {
        resolve(data)
      }, error => {
        reject(error)
      })
    })
  },
  getRunChart (flag) {
    return new Promise((resolve, reject) => {
      ajax.post({type: 157, data: {'flag': flag}}, data => {
        resolve(data)
      }, error => {
        reject(error)
      })
    })
  }
}
