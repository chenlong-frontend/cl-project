import ajax from '@/api/ajax.js'

export default {
  getAreaList (item) {
    return new Promise((resolve, reject) => {
      ajax.post({type: 1210, data: item}, data => {
        resolve(data)
      }, error => {
        reject(error)
      })
    })
  },
  getAreaList1 () {
    return new Promise((resolve, reject) => {
      ajax.post({type: 1210}, data => {
        resolve(data)
      }, error => {
        reject(error)
      })
    })
  },
  // 请求王师傅的接口
  getAreaPointList () {},
  getAreaRight (item) {
    return new Promise((resolve, reject) => {
      ajax.post({type: 1211, data: item}, data => {
        resolve(data)
      }, error => {
        reject(error)
      })
    })
  },
  // 请求点hover数据
  getPointHoverData (item) {
    return new Promise((resolve, reject) => {
      ajax.post({type: 1214, data: item}, data => {
        resolve(data)
      }, error => {
        reject(error)
      })
    })
  },
  // 请求点击点请求数据
  getPointClickData (item) {
    return new Promise((resolve, reject) => {
      ajax.post({type: 1215, data: item}, data => {
        resolve(data)
      }, error => {
        reject(error)
      })
    })
  },
  // 请求查看所有人员
  getAllPersonData (val1, val2, val3, val4) {
    return new Promise((resolve, reject) => {
      ajax.post({type: 1213, data: {'zone_id': val1, 'page_index': val2, 'page_size': val3, 'search_key': val4}}, data => {
        resolve(data)
      }, error => {
        reject(error)
      })
    })
  },
  getHistoryData (val1, val2, val3, val4) {
    return new Promise((resolve, reject) => {
      ajax.post({type: 1216, data: {'helment_id': val1, 'page_index': val2, 'page_size': val3, 'days': val4}}, data => {
        resolve(data)
      }, error => {
        reject(error)
      })
    })
  }
}
