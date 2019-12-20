import ajax from '@/api/ajax.js'
let account
export default {
  // 退出登录
  toLogin () {
    return new Promise((resolve, reject) => {
      ajax.post({type: 415,
        data: {
        }}, backData => {
        resolve(backData.data)
      }, error => {
        reject(error)
      })
    })
  },
  // 集团下在建、竣工、未开工对话框中select框数据请求
  getComDialogSel (requestData) {
    return new Promise((resolve, reject) => {
      ajax.post({type: 1000,
        data: {
          'page_index': requestData.currentPage,
          'page_size': requestData.pageSize,
          'search_key': requestData.searchKey
        }}, backData => {
        resolve(backData.data)
      }, error => {
        reject(error)
      })
    })
  },
  // 集团下在建、竣工、未开工对话框数据请求
  getComDialogData (requestData) {
    return new Promise((resolve, reject) => {
      ajax.post({type: 1010,
        data: {
          'page_index': requestData.currentPage,
          'page_size': requestData.pageSize,
          'state': requestData.state,
          'year': requestData.year,
          'p_id': requestData.id
        }}, backData => {
        resolve(backData.data)
      }, error => {
        reject(error)
      })
    })
  },
  // 分公司下获取选择项目的表格数据
  getChooseData () {
    return new Promise((resolve, reject) => {
      ajax.post({type: 815,
        data: {
        }}, backData => {
        resolve(backData.data)
      }, error => {
        reject(error)
      })
    })
  },
  getChooseYear () {
    return new Promise((resolve, reject) => {
      ajax.post({type: 845,
        data: {
        }}, backData => {
        resolve(backData.data.data)
      }, error => {
        reject(error)
      })
    })
  },
  sqlChooseData (requestData) {
    return new Promise((resolve, reject) => {
      ajax.post({type: 816,
        data: {
          'page_index': requestData.currentPage,
          'page_size': requestData.pageSize,
          'country': requestData.country,
          'province': requestData.province,
          'city': requestData.city,
          'time': requestData.time,
          'state': requestData.state
        }}, backData => {
        resolve(backData.data)
      }, error => {
        reject(error)
      })
    })
  },
  // 分公司下获取我参加的项目表格数据
  getJoinProjectData () {
    return new Promise((resolve, reject) => {
      ajax.post({type: 817,
        data: {
        }}, backData => {
        resolve(backData.data)
      }, error => {
        reject(error)
      })
    })
  },
  getJoinProjectYear () {
    return new Promise((resolve, reject) => {
      ajax.post({type: 846,
        data: {
        }}, backData => {
        resolve(backData.data.data)
      }, error => {
        reject(error)
      })
    })
  },
  sqlJoinData (requestData) {
    return new Promise((resolve, reject) => {
      ajax.post({type: 818,
        data: {
          'country': requestData.country,
          'province': requestData.province,
          'city': requestData.city,
          'time': requestData.time
        }}, backData => {
        resolve(backData.data)
      }, error => {
        reject(error)
      })
    })
  },
  getsubCircle (id) {
    return new Promise((resolve, reject) => {
      ajax.post({type: 432,
        data: {
          'pro_id': id
        }}, backData => {
        resolve(backData.data)
      }, error => {
        reject(error)
      })
    })
  },
//   获取集团下属公司的项目详情数据
  prosDetails (param) {
    return new Promise((resolve, reject) => {
      ajax.post({type: 1006,
        data: {
          id: param
        }}, backData => {
        resolve(backData.data)
      }, error => {
        reject(error)
      })
    })
  },
  // 公司管理进项目
  toDetails () {
    return new Promise((resolve, reject) => {
      ajax.post({type: 1006,
        data: {
        }}, backData => {
        resolve(backData.data)
      }, error => {
        reject(error)
      })
    })
  },
//   获取集团显示的下属公司数据
  getproData (index) {
    return new Promise((resolve, reject) => {
      ajax.post({type: 1005,
        data: {
        }}, backData => {
        resolve(backData.data.data)
      }, error => {
        reject(error)
      })
    })
  },
  // 左侧四个圆内的数据
  getFourCirData (index) {
    return new Promise((resolve, reject) => {
      account = index
      if (account === 'company' || account === 'subCompany' || account === 'project') {
        ajax.post({type: 1007,
          data: {
          }}, backData => {
          resolve(backData.data)
        }, error => {
          reject(error)
        })
      }
    })
  },
  // 进入具体项目传递Id
  passId (id) {
    return new Promise((resolve, reject) => {
      console.log(id)
      ajax.post({type: 419,
        data: {
          'pro_id': id
        }}, backData => {
        resolve(backData.data)
      }, error => {
        reject(error)
      })
    })
  }
}
