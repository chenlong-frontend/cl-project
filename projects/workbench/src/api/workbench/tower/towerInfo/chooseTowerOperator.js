import ajax from '@/api/ajax.js'
export default {
  getTree () {
    return new Promise((resolve, reject) => {
      ajax.post({type: 394, data: null}, data => {
        resolve(data)
      }, error => {
        reject(error)
      })
    })
  },
  // getPage (val) {
  //   return new Promise((resolve, reject) => {
  //     ajax.post({type: 1160, data: val}, data => {
  //       resolve(data)
  //     }, error => {
  //       reject(error)
  //     })
  //   })
  // }
  // { 'gro_id': val1, 'page_index': val2, 'page_size': 10 }
  getPage (departmentId, page, input) {
    return new Promise((resolve, reject) => {
      ajax.post({type: 393, data: { 'gro_id': departmentId, 'page_index': page, 'value': input, 'page_size': 8 }}, data => {
        resolve(data)
      }, error => {
        reject(error)
      })
    })
  }
}
