import ajax from '@/api/ajax.js'
// const pageSize = 9
// const DepartmentUser = [
//   {
//     Id: '1',
//     number: 'ZJ20170205',
//     name: '高空坠落',
//     address: '中国-江苏-徐州-沛县',
//     status: '未开工',
//     area: '975d367m²',
//     price: '3000万元',
//     unit: '中江集团',
//     manager: '张成功',
//     supervise: '张成功',
//     startTime: '2017-07-07',
//     endTime: '2017-11-14'
//   }, {
//     Id: '2',
//     number: 'ZJ20170205',
//     name: '高空坠落',
//     address: '中国-江苏-徐州-沛县',
//     status: '未开工',
//     area: '975d367m²',
//     price: '3000万元',
//     unit: '中江集团',
//     manager: '张成功',
//     supervise: '张成功',
//     startTime: '2017-07-07',
//     endTime: '2017-11-14'
//   }, {
//     Id: '3',
//     number: 'ZJ20170205',
//     name: '高空坠落',
//     address: '中国-江苏-徐州-沛县',
//     status: '未开工',
//     area: '975d367m²',
//     price: '3000万元',
//     unit: '中江集团',
//     manager: '张成功',
//     supervise: '张成功',
//     startTime: '2017-07-07',
//     endTime: '2017-11-14'
//   }, {
//     Id: '4',
//     number: 'ZJ20170205',
//     name: '高空坠落',
//     address: '中国-江苏-徐州-沛县',
//     status: '未开工',
//     area: '975d367m²',
//     price: '3000万元',
//     unit: '中江集团',
//     manager: '张成功',
//     supervise: '张成功',
//     startTime: '2017-07-07',
//     endTime: '2017-11-14'
//   }, {
//     Id: '5',
//     number: 'ZJ20170205',
//     name: '高空坠落',
//     address: '中国-江苏-徐州-沛县',
//     status: '未开工',
//     area: '975d367m²',
//     price: '3000万元',
//     unit: '中江集团',
//     manager: '张成功',
//     supervise: '张成功',
//     startTime: '2017-07-07',
//     endTime: '2017-11-14'
//   }, {
//     Id: '6',
//     number: 'ZJ20170205',
//     name: '高空坠落',
//     address: '中国-江苏-徐州-沛县',
//     status: '未开工',
//     area: '975d367m²',
//     price: '3000万元',
//     unit: '中江集团',
//     manager: '张成功',
//     supervise: '张成功',
//     startTime: '2017-07-07',
//     endTime: '2017-11-14'
//   }, {
//     Id: '7',
//     number: 'ZJ20170205',
//     name: '高空坠落',
//     address: '中国-江苏-徐州-沛县',
//     status: '未开工',
//     area: '975d367m²',
//     price: '3000万元',
//     unit: '中江集团',
//     manager: '张成功',
//     supervise: '张成功',
//     startTime: '2017-07-07',
//     endTime: '2017-11-14'
//   }, {
//     Id: '8',
//     number: 'ZJ20170205',
//     name: '高空坠落',
//     address: '中国-江苏-徐州-沛县',
//     status: '未开工',
//     area: '975d367m²',
//     price: '3000万元',
//     unit: '中江集团',
//     manager: '张成功',
//     supervise: '张成功',
//     startTime: '2017-07-07',
//     endTime: '2017-11-14'
//   }, {
//     Id: '9',
//     number: 'ZJ20170205',
//     name: '高空坠落',
//     address: '中国-江苏-徐州-沛县',
//     status: '未开工',
//     area: '975d367m²',
//     price: '3000万元',
//     unit: '中江集团',
//     manager: '张成功',
//     supervise: '张成功',
//     startTime: '2017-07-07',
//     endTime: '2017-11-14'
//   }, {
//     Id: '10',
//     number: 'ZJ20170205',
//     name: '高空坠落',
//     address: '中国-江苏-徐州-沛县',
//     status: '未开工',
//     area: '975d367m²',
//     price: '3000万元',
//     unit: '中江集团',
//     manager: '张成功',
//     supervise: '张成功',
//     startTime: '2017-07-07',
//     endTime: '2017-11-14'
//   }, {
//     Id: '11',
//     number: 'ZJ20170205',
//     name: '高空坠落',
//     address: '中国-江苏-徐州-沛县',
//     status: '未开工',
//     area: '975d367m²',
//     price: '3000万元',
//     unit: '中江集团',
//     manager: '张成功',
//     supervise: '张成功',
//     startTime: '2017-07-07',
//     endTime: '2017-11-14'
//   }]
// //  ****************模拟的修改那一列的数据**********************
// const userForm1 = {
//   name: '高空坠落',
//   unit: '中江接团',
//   number: '张成功',
//   status: '未开工',
//   area: '978787',
//   price: '3000',
//   manager: '张成功',
//   supervise: '张成功',
//   startTime: '2017-01-01',
//   endTime: '2017-07-07',
//   longitude: '90',
//   latitude: '90',
//   address1: '中国',
//   address2: '江苏省',
//   address3: '南京',
//   address4: '江宁区',
//   detailAddress: 'ok'
// }
let currentPage = 1
var modifyData = {}
export default {
  getTable (param) {
    // console.log(param)
    return new Promise((resolve, reject) => {
      ajax.post({type: 800, data: param}, backData => {
        console.log(backData)
        resolve(backData.data.data)
      }, error => {
        reject(error)
      })
    })
  },
  // *************分页
  getPage (param) {
    return new Promise((resolve, reject) => {
      // resolve(DepartmentUser)
      console.log(param)
      currentPage = param
      ajax.post({type: 800, data: {query: '', page: param - 1, pageSize: 10}}, backData => {
        console.log(backData)
        resolve(backData.data.data)
      }, error => {
        reject(error)
      })
    })
  },
  //  批量删除
  deleteAll (param) {
    return new Promise((resolve, reject) => {
      ajax.post({type: 802, data: param}, backData => {
        resolve()
      }, error => {
        reject(error)
      })
    })
  },
  modify (param) {
    return new Promise((resolve, reject) => {
      console.log(param)
      modifyData = param
      console.log(param, modifyData)
    })
  },
  modify1 (param) {
    return new Promise((resolve, reject) => {
      ajax.post({type: 810, data: {'country': modifyData[0].country, 'province': modifyData[0].province, 'city': modifyData[0].city}}, backData => {
        console.log(backData)
        resolve(backData.data.data)
      }, error => {
        reject(error)
      })
    })
  },
  searchInput (param) {
    return new Promise((resolve, reject) => {
      // resolve(DepartmentUser)
      // console.log(param)
      ajax.post({type: 800, data: {query: param, page: currentPage - 1, pageSize: 10}}, backData => {
        console.log(backData)
        resolve(backData.data.data)
      }, error => {
        reject(error)
      })
    })
  },
  returnModifyData (param) {
    return new Promise((resolve, reject) => {
      console.log(modifyData[0])
      console.log(typeof (modifyData))
      resolve(modifyData[0])
    })
  }
}
