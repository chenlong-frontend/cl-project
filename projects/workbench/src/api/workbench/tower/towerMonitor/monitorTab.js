import ajax from '@/api/ajax.js'
export default {
  getInfo (towerID) {
    return new Promise((resolve, reject) => {
      console.log(ajax)
      ajax.post({type: 167, data: {'id': towerID}}, data => {
        resolve(data)
      }, error => {
        reject(error)
      })
    })
  }
}
