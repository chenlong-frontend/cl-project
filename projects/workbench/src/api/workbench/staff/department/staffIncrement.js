import ajax from '@/api/ajax.js'
import { Notification } from 'element-ui'
export default {
  // ***************向后台返回人员id如果人员id为0则只需要返回部门列表，否则返回人员信息和部门信息*******//
  getdataUtil1 (val1) {
    return new Promise((resolve, reject) => {
      ajax.post({type: 398, data: {'emp_id': val1}}, data => {
        resolve(data)
      }, error => {
        reject(error)
      })
    })
  },
  // ******提交表单（包括修改和新增）修改的表单form.id是不为0的，而新增的表单则id为0**********//
  getdataUtil2 (val1) {
    return new Promise((resolve, reject) => {
      ajax.post({type: 397, data: val1}, data => {
        Notification({
          title: '成功',
          message: '表单提交成功',
          type: 'success'
        })
        resolve(data)
      }, error => {
        reject(error)
      })
    })
  }
}
