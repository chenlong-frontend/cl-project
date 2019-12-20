import ajax from '@/api/ajax.js'

export default {
  // 获取表单信息,传入id
  getForm (val) {
    return new Promise((resolve, reject) => {
      console.log(ajax)
      ajax.post({type: 151, data: {'id': val}}, data => {
        resolve(data)
      }, error => {
        reject(error)
      })
    })
  },
  submitForm (towerForm) {
    return new Promise((resolve, reject) => {
      console.log(ajax)
      ajax.post({type: 152, data: towerForm}, data => {
        resolve(data)
      }, error => {
        reject(error)
      })
    })
  }
}
