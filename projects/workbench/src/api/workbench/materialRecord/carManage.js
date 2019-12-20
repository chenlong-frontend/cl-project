import ajax from '@/api/ajax.js'
// const data1 = [{car_number: '车牌号'}, {car_brand: '车辆品牌'}, {car_model: '车辆型号'}, {car_weight: '车辆自重'}, {contact_name: '联系人'}, {contact_phone: '联系方式:'}, {belong_to: '所属公司:'}, {memo: '备注:'}]
export default {
  getTable (param) {
    return new Promise((resolve, reject) => {
      if (!param.id) {
        ajax.post({type: 1304, data: {search_key: param.search_key, page_index: param.page_index - 1, page_size: 10}}, backData => {
          console.log(backData)
          resolve(backData.data.data)
        }, error => {
          reject(error)
        })
      } else {
        ajax.post({type: 1304, data: {id: param.id}}, backData => {
          console.log(backData)
          resolve(backData.data.data)
        }, error => {
          reject(error)
        })
      }
    })
  },
  deleteItem (param) {
    return new Promise((resolve, reject) => {
      ajax.post({type: 1303, data: {id: param}}, backData => {
        resolve()
      }, error => {
        reject(error)
      })
    })
  },
  // *****************提交按钮***********************
  submitData (param) {
    return new Promise((resolve, reject) => {
      ajax.post({type: 1301, data: param}, backData => {
        resolve()
      }, error => {
        reject(error)
      })
    })
  },
  submitData1 (param) {
    return new Promise((resolve, reject) => {
      ajax.post({type: 1302, data: param}, backData => {
        resolve()
      }, error => {
        reject(error)
      })
    })
  }
}
