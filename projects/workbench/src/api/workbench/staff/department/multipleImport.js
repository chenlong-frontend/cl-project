import ajax from '@/api/ajax.js'
// const DepartmentUser = [{
//   Id: '1',
//   name: '王小虎',
//   sex: '男',
//   age: '40',
//   projectId: '10000000',
//   department: '建筑一队一部',
//   title: '施工队负责人',
//   jobtype: '一线',
//   mobiPhone: '13912312345',
//   telephone: '025-12345678',
//   email: 'zhangxiaohu@yahoo.com'
// }, {
//   Id: '2',
//   name: '王小虎',
//   sex: '男',
//   age: '40',
//   projectId: '10000000',
//   department: '建筑一队一部',
//   title: '施工队负责人',
//   jobtype: '一线',
//   mobiPhone: '13912312345',
//   telephone: '025-12345678',
//   email: 'zhangxiaohu@yahoo.com'
// }, {
//   Id: '3',
//   name: '王小虎',
//   sex: '男',
//   age: '40',
//   projectId: '10000000',
//   department: '建筑一队一部',
//   title: '施工队负责人',
//   jobtype: '一线',
//   mobiPhone: '13912312345',
//   telephone: '025-12345678',
//   email: 'zhangxiaohu@yahoo.com'
// }, {
//   Id: '4',
//   name: '王小虎',
//   sex: '男',
//   age: '40',
//   projectId: '10000000',
//   department: '建筑一队一部',
//   title: '施工队负责人',
//   jobtype: '一线',
//   mobiPhone: '13912312345',
//   telephone: '025-12345678',
//   email: 'zhangxiaohu@yahoo.com'
// }, {
//   Id: '5',
//   name: '王小虎',
//   sex: '男',
//   age: '40',
//   projectId: '10000000',
//   department: '建筑一队一部',
//   title: '施工队负责人',
//   jobtype: '一线',
//   mobiPhone: '13912312345',
//   telephone: '025-12345678',
//   email: 'zhangxiaohu@yahoo.com'
// }]
  // ********上传完成后从后台返回表格数据********//
export default {
  confirm (val) {
    return new Promise((resolve, reject) => {
      ajax.post({type: 390, data: { 'isToDb': val }}, data => {
        resolve(data)
      }, error => {
        reject(error)
      })
    })
  },
  // ********获取模板********//
  downLoadDemo () {
    return new Promise((resolve, reject) => {
      ajax.post({type: 389, data: {}}, data => {
        resolve(data)
      }, error => {
        reject(error)
      })
    })
  }
}

// export default {
//   // ********344上传完成后从后台返回表格数据********//
//   confirm (val) {
//     return new Promise((resolve, reject) => {
//       resolve(DepartmentUser)
//     })
//   },
//   // ********获取模板********//
//   downLoadDemo () {
//     return new Promise((resolve, reject) => {
//       resolve({data: {data: {url: 'http://www.baidu.com'}}})
//     })
//   }
// }
