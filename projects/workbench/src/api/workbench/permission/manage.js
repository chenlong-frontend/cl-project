import ajax from '@/api/ajax.js'

export default {
  getData (param) {
    console.log(param)
    return new Promise((resolve, reject) => {
      ajax.post({type: 602, data: { flow_id: param }}, backData => {
        console.log(backData)
        resolve(backData.data.data)
      }, error => {
        reject(error)
      })
    })
  }
}
