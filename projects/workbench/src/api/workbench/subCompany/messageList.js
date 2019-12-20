import ajax from '@/api/ajax.js'
let manageData = ''
export default {
  // 获取表格内容
  getTableData (seo) {
    return new Promise((resolve, reject) => {
      ajax.post({type: 1000,
        data: {
          'page_index': 1,
          'page_size': 10,
          'search_key': seo
        }}, backData => {
        resolve(backData.data)
      }, error => {
        reject(error)
      })
    })
  },
  // 向后台校验超级管理员
  validateManager (manager) {
    return new Promise((resolve, reject) => {
      ajax.post({type: 380,
        data: {
          'pro_manager': manager
        }}, backData => {
        resolve(backData.data)
      }, error => {
        reject(error)
      })
    })
  },
  // 获取分公司详情
  getEditData (id) {
    console.log(id)
    return new Promise((resolve, reject) => {
      ajax.post({type: 1001,
        data: {
          'id': id
        }}, backData => {
        resolve(backData.data)
      }, error => {
        reject(error)
      })
    })
  },
  // 将修改好后公司信息提交
  saveEditData (form) {
    return new Promise((resolve, reject) => {
      ajax.post({type: 1004,
        data: {
          'id': form.id,
          'address': form.address,
          'alias': form.alias,
          'phone': form.phone1,
          'name': form.name,
          'super_manager': form.super_manager,
          'leaders': form.leaders,
          'remark': form.remark,
          'fax': form.fax1,
          'email': form.email,
          'desc': form.desc,
          'pro_success': form.pro_success
        }}, backData => {
        resolve(backData.data)
      }, error => {
        reject(error)
      })
    })
  },
  // 将新建公司信息提交
  saveNewData (form) {
    return new Promise((resolve, reject) => {
      ajax.post({type: 1003,
        data: {
          'address': form.address,
          'alias': form.alias,
          'phone': form.phone1,
          'name': form.name,
          'super_manager': form.super_manager,
          'leaders': form.leaders,
          'remark': form.remark,
          'fax': form.fax1,
          'email': form.email,
          'desc': form.desc,
          'pro_success': form.pro_success1
        }}, backData => {
        resolve(backData.data)
      }, error => {
        reject(error)
      })
    })
  },
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
  // 删除批量信息
  clear (ids) {
    console.log(ids)
    return new Promise((resolve, reject) => {
      ajax.post({type: 1002,
        data: {
          'ids': ids
        }}, backData => {
        resolve(backData.data)
      }, error => {
        reject(error)
      })
    })
  },
  // 获取当前分页数的表格数据
  getPage (currentPage) {
    return new Promise((resolve, reject) => {
      ajax.post({type: 1000,
        data: {
          'page_index': currentPage,
          'page_size': 10,
          'search_key': ''
        }}, backData => {
        resolve(backData.data)
      }, error => {
        reject(error)
      })
    })
  }
}
