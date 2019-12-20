import ajax from '@/api/ajax.js'

export default {
  // 获取表单信息,传入id
  getTowerRound () {
    return new Promise((resolve, reject) => {
      console.log(ajax)
      ajax.post({type: 181, data: null}, data => {
        resolve(data)
      }, error => {
        reject(error)
      })
    })
  }
}
