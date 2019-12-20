import ajax from '@/api/ajax.js'
export default {
  getLineData (param) {
    return new Promise((resolve, reject) => {
      ajax.post({type: 1154, data: {}}, backData => {
        console.log(backData)
        resolve(backData.data.data)
      }, error => {
        reject(error)
      })
    })
  }
}
