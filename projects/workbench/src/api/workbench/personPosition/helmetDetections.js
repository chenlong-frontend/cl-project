import ajax from '@/api/ajax.js'

export default {
  getDetetions () {
    return new Promise((resolve, reject) => {
      ajax.post({type: 1205}, data => {
        resolve(data)
      }, error => {
        reject(error)
      })
    })
  },
  getTables  (val1, val2, val3) {
    return new Promise((resolve, reject) => {
      ajax.post({type: 1206, data: {'page_index': val1, 'page_size': val2, 'flag': val3}}, data => {
        resolve(data.data)
      }, error => {
        console.log(error)
      })
    })
  }
}
