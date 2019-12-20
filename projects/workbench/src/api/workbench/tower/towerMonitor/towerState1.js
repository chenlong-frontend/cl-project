import ajax from '@/api/ajax.js'
export default {
  getTowerState (towerID) {
    return new Promise((resolve, reject) => {
      console.log(ajax)
      ajax.post({type: 166, data: {'id': towerID}}, data => {
        resolve(data)
      }, error => {
        reject(error)
      })
    })
  }
}
