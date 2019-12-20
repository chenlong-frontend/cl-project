import ajax from '@/api/ajax.js'
const options = [
  {
    value: '',
    label: '所有'
  },
  {
    value: 'in',
    label: '进场'
  }, {
    value: 'out',
    label: '出场'
  }
]
let item = ''
// const data1 = {n1: '阿萨德八十多发', n18: 'sdasd', n2: '奥术大师多', n3: '按时大大', n4: '车辆净重', n5: '应收重量', n6: '实收重量', n7: '任务种类', n8: '进场地磅', n9: '出场地磅', n10: '进场时间', n11: '出场时间', n12: '进场操作员', n13: '出场操作员', n14: '进场签收人', n15: '出场签收人', n16: '备注打打打啊大大炒的菜砂撒大声地垫层'}
export default {
  // **************下拉框的内容*************
  selectBox () {
    return new Promise((resolve, reject) => {
      resolve(options)
    })
  },
  getTable (param) {
    return new Promise((resolve, reject) => {
      ajax.post({type: 1306, data: {pro_id: param.itemId, action: param.action, start_time: param.start_time, end_time: param.end_time, search_key: param.input, page_index: param.currentPage, page_size: 10}}, backData => {
        resolve(backData.data.data)
      }, error => {
        reject(error)
      })
    })
  },
  showInfo (param) {
    return new Promise((resolve, reject) => {
      ajax.post({type: 1307, data: {id: param}}, backData => {
        resolve(backData.data.data)
      }, error => {
        reject(error)
      })
    })
  },
  getItemInfo (param) {
    return new Promise((resolve, reject) => {
      ajax.post({type: 814, data: {search_key: param.input, page_size: 7, page_index: param.currentPage}}, backData => {
        resolve(backData.data.data)
      }, error => {
        reject(error)
      })
    })
  },
  getItemId (param) {
    return new Promise((resolve, reject) => {
      item = param
      resolve()
    })
  },
  sendItemId () {
    return new Promise((resolve, reject) => {
      resolve(item)
    })
  }
}
