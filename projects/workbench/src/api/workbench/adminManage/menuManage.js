import ajax from '@/api/ajax.js'

export default {
  // ***************请求部门信息************//
  getDepartment () {
    return new Promise((resolve, reject) => {
      ajax.post({type: 310, data: {}}, backData => {
        resolve(backData.data.data.tree)
      }, error => {
        reject(error)
      })
    })
  },
  // ***************请求工种信息************//
  getWorkType () {
    return new Promise((resolve, reject) => {
      ajax.post({type: 321, data: {}}, backData => {
        resolve(backData.data.data.tree)
      }, error => {
        reject(error)
      })
    })
  },
  // ***************请求人员信息************//
  getPerson (param) {
    console.log(param)
    return new Promise((resolve, reject) => {
      ajax.post({type: 399, data: param}, backData => {
        resolve(backData.data.data)
      }, error => {
        reject(error)
      })
    })
  },
  // ***************功能信息************//
  getMenu (param) {
    console.log(param)
    return new Promise((resolve, reject) => {
      ajax.post({type: 501, data: param}, backData => {
        resolve(backData.data.data)
      }, error => {
        reject(error)
      })
    })
  },
  // ***************功能添加************//
  addMenu (param) {
    console.log(param)
    return new Promise((resolve, reject) => {
      ajax.post({type: 504,
        data: {
          gro_id: param.gro_id,
          emp_id: param.emp_id,
          role_id: param.role_id,
          id: param.id.filter(t => {
            return t !== -1
          })}
      }, backData => {
        resolve(backData.data)
      }, error => {
        reject(error)
      })
    })
  },
  // ***************功能删除************//
  removeMenu (param) {
    console.log(param)
    return new Promise((resolve, reject) => {
      ajax.post({type: 505,
        data: {
          gro_id: param.gro_id,
          id: param.id.filter(t => {
            return t !== -1
          })}
      }, backData => {
        resolve(backData.data)
      }, error => {
        reject(error)
      })
    })
  }
}
