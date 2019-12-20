import ajax from '@/api/ajax.js'
export default {
  // 页面刚加载时获取设备种类信息
  getStart (param) {
    return new Promise((resolve, reject) => {
      let requestData = {}
      requestData.page_num = param.page_num
      requestData.page_size = param.page_size
      if (param.like.length > 0) {
        requestData.like = param.like
      }
      if (param.eqpt_is_gen_list.length > 0) {
        requestData.eqpt_type_is_gen_list = param.eqpt_is_gen_list
      }
      ajax.post({type: 1104, data: requestData}, data => {
        resolve(data.data)
      }, error => {
        reject(error)
      })
    })
  },
  // 新增一个设备种类
  addOneDeviceType (form) {
    return new Promise((resolve, reject) => {
      ajax.post({type: 1100,
        data: {
          eqpt_type_name: form.eqpt_type_name,
          eqpt_type_pow: form.eqpt_type_pow,
          eqpt_type_dur: form.eqpt_type_dur,
          eqpt_type_is_gen: form.eqpt_type_is_gen
        }}, data => {
        console.log(data)
        resolve(data.data)
      }, error => {
        reject(error)
      })
    })
  },
  // 保存编辑后的设备种类信息
  SaveEditData (data) {
    return new Promise((resolve, reject) => {
      ajax.post({type: 1103,
        data: {
          eqpt_type_name: data.eqpt_type_name,
          eqpt_type_pow: data.eqpt_type_pow,
          eqpt_type_dur: data.eqpt_type_dur,
          eqpt_type_is_gen: data.eqpt_type_is_gen,
          where: {eqpt_type_id: data.eqpt_type_id}
        }}, data => {
        resolve(data.data)
      }, error => {
        reject(error)
      })
    })
  },
  // 删除设备种类信息
  strike (strikeId) {
    return new Promise((resolve, reject) => {
      ajax.post({type: 1102,
        data: {
          where: {eqpt_type_id: strikeId}
        }}, data => {
        console.log(data)
        resolve(data.data)
      }, error => {
        reject(error)
      })
    })
  },
  // 点击去详情
  getDetailTable (param) {
    return new Promise((resolve, reject) => {
      ajax.post({type: 1109, data: {page_num: param.page_num, page_size: param.page_size, eqpt_type_id: param.id, like: param.like}}, data => {
        resolve(data.data)
      }, error => {
        reject(error)
      })
    })
  },
  // 详情页刚加载的时候获取表格数据
  // getDetailTable () {
  //   return new Promise((resolve, reject) => {
  //     ajax.post({type: 1109,
  //       data: {
  //         page_num: '1',
  //         page_size: '10',
  //         like: '',
  //         eqpt_id: '',
  //         eqpt_id_list: '',
  //         eqpt_type_id: '',
  //         eqpt_type_id_list: '',
  //         eqpt_is_gen_list: ''
  //       }}, data => {
  //       console.log(data)
  //       resolve(data.data)
  //     }, error => {
  //       reject(error)
  //     })
  //   })
  // },
  // 详情页中新增一个设备
  addOneDevice (param) {
    return new Promise((resolve, reject) => {
      ajax.post({type: 1105, data: {eqpt_type_id: param.eqpt_type_id, eqpt_name: param.eqpt_name, eqpt_num: param.eqpt_num, eqpt_pos: param.eqpt_pos, eqpt_is_gen: param.eqpt_is_gen}}, data => {
        console.log(data)
        resolve(data.data)
      }, error => {
        reject(error)
      })
    })
  },
  // 详情页中删除设备
  strikeDevice (ids) {
    return new Promise((resolve, reject) => {
      ajax.post({type: 1107,
        data: {
          where: { eqpt_id_list: ids }
        }}, data => {
        console.log(data)
        resolve(data.data)
      }, error => {
        reject(error)
      })
    })
  },
  // 保存设备信息修改
  storageData (data) {
    return new Promise((resolve, reject) => {
      ajax.post({type: 1108,
        data: {
          eqpt_type_id: data.eqpt_type_id,
          eqpt_name: data.eqpt_name,
          eqpt_num: data.eqpt_num,
          eqpt_pos: data.eqpt_pos,
          eqpt_is_gen: data.eqpt_is_gen,
          where: {eqpt_id: data.eqpt_id}
        }}, data => {
        console.log(data)
        resolve(data)
      }, error => {
        reject(error)
      })
    })
  },
  // 我的项目信息数据展示
  getData () {
    return new Promise((resolve, reject) => {
      ajax.post({type: 1110,
        data: {
        }}, data => {
        console.log(data)
        resolve(data.data)
      }, error => {
        reject(error)
      })
    })
  },
  // 我的项目信息图表信息展示
  getChartData (date) {
    return new Promise((resolve, reject) => {
      ajax.post({type: 1111,
        data: {
          date: {
            'time': date,
            'format': 'yyyy-MM'
          }
        }}, data => {
        console.log(data)
        resolve(data.data)
      }, error => {
        reject(error)
      })
    })
  },
  // href跳转时的路由获取
  getRouter () {
    return new Promise((resolve, reject) => {
      ajax.post({type: 710}, backData => {
        resolve(backData.data)
      }, error => {
        reject(error)
      })
    })
  }
}
