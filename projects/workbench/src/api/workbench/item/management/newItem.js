import ajax from '@/api/ajax.js'

// *****************工程状态
const works = [{
  number: '0',
  level: '未开工'
}, {
  number: '1',
  level: '在建'
}, {
  number: '2',
  level: '竣工'
}]
// const countries = [{
//   id: '1',
//   value: '选项1',
//   name: '中国'
// }, {
//   id: '2',
//   value: '选项2',
//   name: '美国'
// }, {
//   id: '3',
//   value: '选项3',
//   name: '俄罗斯'
// }, {
//   id: '4',
//   value: '选项4',
//   name: '法国'
// }, {
//   id: '5',
//   value: '选项5',
//   name: '英国'
// }]

let groId = ''
let query = ''
let manageData = ''
let superviseData = ''
export default {
  submitData (param) {
    return new Promise((resolve, reject) => {
      console.log(param)
      ajax.post({type: 801, data: {param}}, backData => {
        resolve(backData.data.data)
      }, error => {
        reject(error)
      })
    })
  },
  // *****************提交修改数据******//
  updateData (param) {
    return new Promise((resolve, reject) => {
      console.log(param)
      ajax.post({type: 803, data: {param}}, backData => {
        resolve()
      }, error => {
        reject(error)
      })
    })
  },
  // ******************工作状态
  workStatus (param) {
    return new Promise((resolve, reject) => {
      resolve(works)
    })
  },
  // // ***********获取选取项目经理的部门部分************************
  // getPersonData (param) {
  //   return new Promise((resolve, reject) => {
  //     resolve(PersonData)
  //     console.log(param)
  //   })
  // },
  // ******************获取项目经理点击后的分页********************
  getPage (param) {
    return new Promise((resolve, reject) => {
      console.log(param)
      ajax.post({type: 311, data: {'id': groId, 'page': param - 1, 'page_size': 8, 'query': query}}, backData => {
        console.log(backData)
        resolve(backData.data.data)
      }, error => {
        reject(error)
      })
    })
  },
  // ******************获取项目经理点击后的分页2********************
  getPage1 (param) {
    return new Promise((resolve, reject) => {
      console.log(param)
      ajax.post({type: 324, data: {'id': groId, 'page': param - 1, 'page_size': 8, 'query': query}}, backData => {
        console.log(backData)
        resolve(backData.data.data)
      }, error => {
        reject(error)
      })
    })
  },
  //   ***************获得部门所ß选行***********
  getCurrentDep (param) {
    return new Promise((resolve, reject) => {
      console.log(param)
      groId = param.id
      ajax.post({type: 311, data: {'id': param.id, 'page': 0, 'page_size': 8}}, backData => {
        console.log(backData)
        resolve(backData.data.data)
      }, error => {
        reject(error)
      })
    })
  },
  // *********获取工种部分所选行
  getChooseRow (param) {
    return new Promise((resolve, reject) => {
      console.log(param)
      groId = param.id
      ajax.post({type: 324, data: {'id': param.id, 'page': 0, 'page_size': 8}}, backData => {
        console.log(backData)
        resolve(backData.data)
      }, error => {
        reject(error)
      })
    })
  },
  // *******************获取项目经理后点击所需的名字**************
  getManagerName (param) {
    return new Promise((resolve, reject) => {
      console.log(param)
      manageData = param
      resolve(param)
    })
  },
  getManagerData (param) {
    return new Promise((resolve, reject) => {
      resolve(manageData)
    })
  },
  getSuperviseName (param) {
    return new Promise((resolve, reject) => {
      console.log(param)
      superviseData = param
      resolve(param)
    })
  },
  getSuperviseData (param) {
    return new Promise((resolve, reject) => {
      resolve(superviseData)
    })
  },
  // ***************获取国家*****************
  getParams (param) {
    return new Promise((resolve, reject) => {
      ajax.post({type: 806, data: {}}, backData => {
        console.log(backData)
        resolve(backData.data.data)
      }, error => {
        reject(error)
      })
    })
  },
  // getRegion
  getRegion (param) {
    console.log(param)
    return new Promise((resolve, reject) => {
      ajax.post({type: 807, data: {param}}, backData => {
        console.log(backData)
        resolve(backData.data)
      }, error => {
        reject(error)
      })
      // resolve(countries)
    })
  },
  // ***********获取选取项目经理的部门部分************************
  getPersonData (param) {
    console.log(param)
    return new Promise((resolve, reject) => {
      ajax.post({type: 310, data: {}}, backData => {
        console.log(backData)
        resolve(backData.data.data.tree)
      }, error => {
        reject(error)
      })
    })
  },
  // ***********获取选取项目经理的工种部分************************
  getRoleData (param) {
    return new Promise((resolve, reject) => {
      ajax.post({type: 808, data: {}}, backData => {
        console.log(backData)
        resolve(backData.data.data)
      }, error => {
        reject(error)
      })
    })
  },
  // *************点击选人后的搜索框*************
  choosesInput (param) {
    return new Promise((resolve, reject) => {
      console.log(param)
      console.log(param.index)
      if (param.index === 0) {
        ajax.post({type: 311, data: {'id': param.id, 'page': param.currentPage - 1, 'page_size': 8, 'query': param.text}}, backData => {
          console.log(backData)
          resolve(backData.data.data)
        }, error => {
          reject(error)
        })
      } else {
        ajax.post({type: 324, data: {'id': param.id, 'page': param.currentPage - 1, 'page_size': 8, 'query': param.text}}, backData => {
          resolve(backData.data.data)
        }, error => {
          reject(error)
        })
      }
    })
  }
}
