import ajax from '@/api/ajax.js'
// const DepartmentUser = [
//   {
//     Id: '1',
//     emp_name: '张小虎',
//     emp_sex: '男',
//     age: '35',
//     pro_id: '212121212',
//     dep_name: '建筑一部²',
//     emp_post: 'post',
//     emp_role: '角色',
//     emp_mobile: '13309878987',
//     emp_phone: '02599999999',
//     emp_email: 'zhaoxiaohu@sina.cn'
//   }, {
//     Id: '2',
//     emp_name: '张小虎',
//     emp_sex: '男',
//     age: '35',
//     pro_id: '212121212',
//     dep_name: '建筑一部²',
//     emp_post: 'post',
//     emp_role: '角色',
//     emp_mobile: '13309878987',
//     emp_phone: '02599999999',
//     emp_email: 'zhaoxiaohu@sina.cn'
//   }, {
//     Id: '3',
//     emp_name: '张小虎',
//     emp_sex: '男',
//     age: '35',
//     pro_id: '212121212',
//     dep_name: '建筑一部²',
//     emp_post: 'post',
//     emp_role: '角色',
//     emp_mobile: '13309878987',
//     emp_phone: '02599999999',
//     emp_email: 'zhaoxiaohu@sina.cn'
//   }, {
//     Id: '4',
//     emp_name: '张小虎',
//     emp_sex: '男',
//     age: '35',
//     pro_id: '212121212',
//     dep_name: '建筑一部²',
//     emp_post: 'post',
//     emp_role: '角色',
//     emp_mobile: '13309878987',
//     emp_phone: '02599999999',
//     emp_email: 'zhaoxiaohu@sina.cn'
//   }, {
//     Id: '5',
//     emp_name: '张小虎',
//     emp_sex: '男',
//     age: '35',
//     pro_id: '212121212',
//     dep_name: '建筑一部²',
//     emp_post: 'post',
//     emp_role: '角色',
//     emp_mobile: '13309878987',
//     emp_phone: '02599999999',
//     emp_email: 'zhaoxiaohu@sina.cn'
//   }, {
//     Id: '6',
//     emp_name: '张小虎',
//     emp_sex: '男',
//     age: '35',
//     pro_id: '212121212',
//     dep_name: '建筑一部²',
//     emp_post: 'post',
//     emp_role: '角色',
//     emp_mobile: '13309878987',
//     emp_phone: '02599999999',
//     emp_email: 'zhaoxiaohu@sina.cn'
//   }, {
//     Id: '7',
//     emp_name: '张小虎',
//     emp_sex: '男',
//     age: '35',
//     pro_id: '212121212',
//     dep_name: '建筑一部²',
//     emp_post: 'post',
//     emp_role: '角色',
//     emp_mobile: '13309878987',
//     emp_phone: '02599999999',
//     emp_email: 'zhaoxiaohu@sina.cn'
//   }, {
//     Id: '8',
//     emp_name: '张小虎',
//     emp_sex: '男',
//     age: '35',
//     pro_id: '212121212',
//     dep_name: '建筑一部²',
//     emp_post: 'post',
//     emp_role: '角色',
//     emp_mobile: '13309878987',
//     emp_phone: '02599999999',
//     emp_email: 'zhaoxiaohu@sina.cn'
//   }, {
//     Id: '9',
//     emp_name: '张小虎',
//     emp_sex: '男',
//     age: '35',
//     pro_id: '212121212',
//     dep_name: '建筑一部²',
//     emp_post: 'post',
//     emp_role: '角色',
//     emp_mobile: '13309878987',
//     emp_phone: '02599999999',
//     emp_email: 'zhaoxiaohu@sina.cn'
//   }, {
//     Id: '10',
//     emp_name: '张小虎',
//     emp_sex: '男',
//     age: '35',
//     pro_id: '212121212',
//     dep_name: '建筑一部²',
//     emp_post: 'post',
//     emp_role: '角色',
//     emp_mobile: '13309878987',
//     emp_phone: '02599999999',
//     emp_email: 'zhaoxiaohu@sina.cn'
//   }]
// const tempArray = {data: {data: {num: 100, emp_list: DepartmentUser}, code: 0}}

export default {
    // ********从后台返回表格内容*********//
  getTable (val1, val2, val3) {
    return new Promise((resolve, reject) => {
      // this.$message('从后台取回表格数据')
      console.log(ajax)
      //  一个可以被公用的功能，向后台传入搜索的值和当前页面数获得当前页面的10条数据 并返回满足搜索条件的总条目数给allItem
      ajax.post({type: 399, data: { 'search_key': val1, 'page_index': val2, 'page_size': val3 }}, data => {
        resolve(data)
      }, error => {
        reject(error)
      })
    })
  },
    // *****将选中的值返回后台，交由它删除 并返回code，若code为0则删除成功然后重新获取表格*******//
  deleteItem (multipleSelection) {
    return new Promise((resolve, reject) => {
      ajax.post({type: 396, data: { 'ids': multipleSelection }}, data => {
        resolve(data)
      }, error => {
        reject(error)
      })
    })
  },
      // **********返回给后台ids，然后跳转到文件ids为空则返回所有人员**********//
  download (multipleSelection) {
    return new Promise((resolve, reject) => {
      ajax.post({type: 395, data: { 'ids': multipleSelection }}, data => {
        resolve(data)
      }, error => {
        reject(error)
      })
    })
  }
}

// export default {
//   // ********从后台返回表格内容*********//
//   getTable (val1, val2, val3) {
//     return new Promise((resolve, reject) => {
//       resolve(tempArray)
//     })
//   },
//   // *****将选中的值返回后台，交由它删除 并返回code，若code为0则删除成功然后重新获取表格*******//
//   deleteItem (multipleSelection) {
//     return new Promise((resolve, reject) => {
//       resolve(tempArray)
//     })
//   },
//   // **********返回给后台ids，然后跳转到文件****************//
//   download (multipleSelection) {
//     return new Promise((resolve, reject) => {
//       resolve('http://www.baidu.com')
//     })
//   }
// }
