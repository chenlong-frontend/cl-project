import ajax from '@/api/ajax.js'

export default {
  getCurrentPage (page, input) {
    return new Promise((resolve, reject) => {
      console.log(ajax)
      ajax.post({type: 161, data: {'index': page, 'input': input, 'page_size': 10}}, data => {
        resolve(data)
      }, error => {
        reject(error)
      })
    })
  }
}
