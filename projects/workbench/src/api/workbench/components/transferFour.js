import ajax from '@/api/ajax.js'
export default {
  // ***************getTable1*******************
  getTable1 () {
    return new Promise((resolve, reject) => {
      ajax.post({type: 310, data: {}}, backData => {
        resolve(backData.data.data.tree)
      }, error => {
        reject(error)
      })
    })
  },
  getTable2 () {
    return new Promise((resolve, reject) => {
      ajax.post({type: 321, data: {}}, backData => {
        resolve(backData.data.data.tree)
      }, error => {
        reject(error)
      })
    })
  },
  getTable3 (param) {
    return new Promise((resolve, reject) => {
      ajax.post({type: 399, data: {search_key: param.text, page_index: param.currentPage, page_size: 7}}, backData => {
        resolve(backData.data.data)
      }, error => {
        reject(error)
      })
    })
  },
  getTable4 (param) {
    return new Promise((resolve, reject) => {
      if (param.index === '0') {
        ajax.post({type: 873, data: {gro_id: param.id, page_index: param.currentPage, page_size: 7}}, backData => {
          resolve(backData.data.data)
        }, error => {
          reject(error)
        })
      }
      if (param.index === '1') {
        ajax.post({type: 873, data: {role_id: param.id, page_index: param.currentPage, page_size: 7}}, backData => {
          resolve(backData.data.data)
        }, error => {
          reject(error)
        })
      }
      if (param.index === '2') {
        ajax.post({type: 873, data: {emp_id: param.id, page_index: param.currentPage, page_size: 7}}, backData => {
          resolve(backData.data.data)
        }, error => {
          reject(error)
        })
      }
    })
  },
  getTable5 (param) {
    return new Promise((resolve, reject) => {
      if (param.index === '0') {
        ajax.post({type: 874, data: {gro_id: param.id, search_key: param.text, page_index: param.currentPage, page_size: 7}}, backData => {
          resolve(backData.data.data)
        }, error => {
          reject(error)
        })
      }
      if (param.index === '1') {
        ajax.post({type: 874, data: {role_id: param.id, search_key: param.text, page_index: param.currentPage, page_size: 7}}, backData => {
          resolve(backData.data.data)
        }, error => {
          reject(error)
        })
      }
      if (param.index === '2') {
        ajax.post({type: 874, data: {emp_id: param.id, search_key: param.text, page_index: param.currentPage, page_size: 7}}, backData => {
          resolve(backData.data.data)
        }, error => {
          reject(error)
        })
      }
    })
  },
  //  *********************左移***************
  moveLeft (param) {
    return new Promise((resolve, reject) => {
      console.log(param)
      if (param.index === '0') {
        ajax.post({type: 871, data: {gro_id: param.choose_id, id: param.id}}, backData => {
          resolve(backData.data.data)
        }, error => {
          reject(error)
        })
      }
      if (param.index === '1') {
        ajax.post({type: 871, data: {role_id: param.choose_id, id: param.id}}, backData => {
          resolve(backData.data.data)
        }, error => {
          reject(error)
        })
      }
      if (param.index === '2') {
        ajax.post({type: 871, data: {emp_id: param.choose_id, id: param.id}}, backData => {
          resolve(backData.data.data)
        }, error => {
          reject(error)
        })
      }
    })
  },
  moveRight (param) {
    return new Promise((resolve, reject) => {
      console.log(param)
      if (param.index === '0') {
        ajax.post({type: 872, data: {gro_id: param.choose_id, id: param.id}}, backData => {
          resolve()
        }, error => {
          reject(error)
        })
      }
      if (param.index === '1') {
        ajax.post({type: 872, data: {role_id: param.choose_id, id: param.id}}, backData => {
          resolve()
        }, error => {
          reject(error)
        })
      }
      if (param.index === '2') {
        ajax.post({type: 872, data: {emp_id: param.choose_id, id: param.id}}, backData => {
          resolve()
        }, error => {
          reject(error)
        })
      }
    })
  }
}
