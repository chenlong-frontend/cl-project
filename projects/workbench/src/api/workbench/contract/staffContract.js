import ajax from '@/api/ajax.js'
// const contractInformation = [
//   {
//     avatar: require('@/assets/img/menu/headpic.png'),
//     name: '王小虎',
//     title: '项目经理',
//     phone: '10010011000',
//     mail: 'wwwwwww@sina.com'
//   },
//   {
//     avatar: require('@/assets/img/menu/headpic.png'),
//     name: '王小虎',
//     title: '项目经理',
//     phone: '10010011000',
//     mail: 'wwwwwww@sina.com'
//   },
//   {
//     avatar: require('@/assets/img/menu/headpic.png'),
//     name: '王小虎',
//     title: '项目经理',
//     phone: '10010011000',
//     mail: 'wwwwwww@sina.com'
//   },
//   {
//     avatar: require('@/assets/img/menu/headpic.png'),
//     name: '王小虎',
//     title: '项目经理',
//     phone: '10010011000',
//     mail: 'wwwwwww@sina.com'
//   },
//   {
//     avatar: require('@/assets/img/menu/headpic.png'),
//     name: '王小虎',
//     title: '项目经理',
//     phone: '10010011000',
//     mail: 'wwwwwww@sina.com'
//   },
//   {
//     avatar: require('@/assets/img/menu/headpic.png'),
//     name: '王小虎',
//     title: '项目经理',
//     phone: '10010011000',
//     mail: 'wwwwwww@sina.com'
//   }]
// const tree = [{
//   id: 1,
//   label: '第一部门 1',
//   children: [{
//     id: 4,
//     label: '第一部门 1-1',
//     children: [{
//       id: 9,
//       label: '第一部门 1-1-1'
//     }, {
//       id: 10,
//       label: '第一部门 1-1-2'
//     }]
//   }]
// }, {
//   id: 2,
//   label: '第二部门 2',
//   children: [{
//     id: 5,
//     label: '第二部门 2-1'
//   }, {
//     id: 6,
//     label: '第二部门 2-2'
//   }]
// }, {
//   id: 3,
//   label: '第三部门 3',
//   children: [{
//     id: 7,
//     label: '第三部门 3-1'
//   }, {
//     id: 8,
//     label: '第三部门 3-2'
//   }]
// }]
// const tempData = {data: {data: {tree: tree, description: '江苏沛县文萃苑'}}}
// const tempPage = {data: {data: {num: 100, contact: contractInformation}}}
export default {
  firstGet () {
    return new Promise((resolve, reject) => {
      ajax.post({type: 394, data: {}}, data => {
        console.log(data)
        resolve(data)
      }, error => {
        reject(error)
      })
    })
  },
  getDepartmentInformation (val1, val2) {
    return new Promise((resolve, reject) => {
      ajax.post({type: 393, data: { 'gro_id': val1, 'page_index': val2, 'page_size': 10 }}, data => {
        console.log(data)
        resolve(data)
      }, error => {
        reject(error)
      })
    })
  }
}

// export default {
//   getDepartmentInformation (val1, val2) {
//     return new Promise((resolve, reject) => {
//       resolve(tempPage)
//     })
//   },
//   firstGet () {
//     return new Promise((resolve, reject) => {
//       resolve(tempData)
//     })
//   }
// }
