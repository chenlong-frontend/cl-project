import ajax from '@/api/ajax.js'
// const pagesize1 = 7
// const pagesize2 = 7
// let requestData = {}
let configValue = []
// let paramId = ''

export default {
  // setConfigValue (param) {
  //   configValue = param
  //   console.log(configValue.getData1)
  // },
  // ***********获取请求id号*****************
  setRequestData (param) {
    console.log(param.config)
    configValue = param.config
  },
  // ******************获取第一张table的信息***********
  getTable1 (param) {
    return new Promise((resolve, reject) => {
      console.log(param.node_id)
      ajax.post({type: configValue.getData1, data: {node_id: param.nodeId, page_size: 7, page_index: param.currentPage}}, backData => {
        // console.log(backData)
        resolve(backData.data.data)
      }, error => {
        reject(error)
      })
    })
  },
  // ***************获得第二张表的信息*********
  getTable2 (param) {
    return new Promise((resolve, reject) => {
      ajax.post({type: configValue.getData2, data: {node_id: param.nodeId}}, backData => {
        // console.log(backData.data)
        resolve(backData.data)
      }, error => {
        reject(error)
      })
    })
  },
  // **********获取第三张表的信息**************
  getTable3 (param) {
    return new Promise((resolve, reject) => {
      console.log(param)
      let groIds = [{gro_id: param.gro_ids}]
      let roleIds = [{role_id: param.role_ids}]
      if (param.gro_ids === '' && param.role_ids === '') {
        ajax.post({type: configValue.getData3, data: {node_id: param.nodeId, page_size: 7, page_index: param.currentPage, value: param.input}}, backData => {
          console.log(backData.data)
          resolve(backData.data.data)
        }, error => {
          reject(error)
        })
      }
      if (param.gro_ids === '' && param.role_ids !== '') {
        ajax.post({type: configValue.getData3, data: {node_id: param.nodeId, page_size: 7, page_index: param.currentPage, role_list: roleIds, value: param.input}}, backData => {
          console.log(backData.data)
          resolve(backData.data.data)
        }, error => {
          reject(error)
        })
      }
      if (param.gro_ids !== '' && param.role_ids === '') {
        ajax.post({type: configValue.getData3, data: {node_id: param.nodeId, page_size: 7, page_index: param.currentPage, gro_list: groIds, value: param.input}}, backData => {
          console.log(backData.data)
          resolve(backData.data.data)
        }, error => {
          reject(error)
        })
      }
    })
  },
  // ************右移按钮****************
  moveRight (param) {
    return new Promise((resolve, reject) => {
      ajax.post({type: configValue.getData6, data: {node_id: param.nodeId, gro_list: param.departmentType, role_list: param.workerType, emp_list: param.person}}, backData => {
        // console.log(backData.data.data)
        resolve(backData.data.data)
      }, error => {
        reject(error)
      })
    })
  },
  // *************左移按钮****************
  moveLeft (param) {
    return new Promise((resolve, reject) => {
      // console.log(param)
      ajax.post({type: configValue.getData5, data: {node_id: param.nodeId, gro_list: param.middleData1, role_list: param.middleData2, emp_list: param.rightData}}, backData => {
        console.log(backData.data.data)
        resolve(backData.data.data)
      }, error => {
        reject(error)
      })
    })
  }
}
