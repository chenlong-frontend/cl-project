import ajax from '@/api/ajax.js'
export default {
  // 使用了报警模块的接口
  getWarnNums () {
    return new Promise((resolve, reject) => {
      ajax.post({type: 163, data: null}, data => {
        resolve(data)
      }, error => {
        reject(error)
      })
    })
  },
  // 使用了运行模块的接口
  getRunNums () {
    return new Promise((resolve, reject) => {
      ajax.post({type: 164, data: null}, data => {
        resolve(data)
      }, error => {
        reject(error)
      })
    })
  },
  // 获取工地上所有塔吊的一些简略信息
  getTowersInfo () {
    return new Promise((resolve, reject) => {
      ajax.post({type: 160, data: null}, data => {
        resolve(data)
      }, error => {
        reject(error)
      })
    })
  }
}
