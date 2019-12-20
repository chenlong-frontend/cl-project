// import ajax from '../ajax.js'
const pageSize = 9
const DepartmentUser = [
  {
    Id: '1',
    number: 'ZJ20170205',
    name: '高空坠落',
    address: '中国-江苏-徐州-沛县',
    status: '未开工',
    area: '975d367m²',
    price: '3000万元',
    unit: '中江集团',
    manager: '张成功',
    supervise: '张成功',
    startTime: '2017-07-07',
    endTime: '2017-11-14'
  }, {
    Id: '2',
    number: 'ZJ20170205',
    name: '高空坠落',
    address: '中国-江苏-徐州-沛县',
    status: '未开工',
    area: '975d367m²',
    price: '3000万元',
    unit: '中江集团',
    manager: '张成功',
    supervise: '张成功',
    startTime: '2017-07-07',
    endTime: '2017-11-14'
  }, {
    Id: '3',
    number: 'ZJ20170205',
    name: '高空坠落',
    address: '中国-江苏-徐州-沛县',
    status: '未开工',
    area: '975d367m²',
    price: '3000万元',
    unit: '中江集团',
    manager: '张成功',
    supervise: '张成功',
    startTime: '2017-07-07',
    endTime: '2017-11-14'
  }, {
    Id: '4',
    number: 'ZJ20170205',
    name: '高空坠落',
    address: '中国-江苏-徐州-沛县',
    status: '未开工',
    area: '975d367m²',
    price: '3000万元',
    unit: '中江集团',
    manager: '张成功',
    supervise: '张成功',
    startTime: '2017-07-07',
    endTime: '2017-11-14'
  }, {
    Id: '5',
    number: 'ZJ20170205',
    name: '高空坠落',
    address: '中国-江苏-徐州-沛县',
    status: '未开工',
    area: '975d367m²',
    price: '3000万元',
    unit: '中江集团',
    manager: '张成功',
    supervise: '张成功',
    startTime: '2017-07-07',
    endTime: '2017-11-14'
  }, {
    Id: '6',
    number: 'ZJ20170205',
    name: '高空坠落',
    address: '中国-江苏-徐州-沛县',
    status: '未开工',
    area: '975d367m²',
    price: '3000万元',
    unit: '中江集团',
    manager: '张成功',
    supervise: '张成功',
    startTime: '2017-07-07',
    endTime: '2017-11-14'
  }, {
    Id: '7',
    number: 'ZJ20170205',
    name: '高空坠落',
    address: '中国-江苏-徐州-沛县',
    status: '未开工',
    area: '975d367m²',
    price: '3000万元',
    unit: '中江集团',
    manager: '张成功',
    supervise: '张成功',
    startTime: '2017-07-07',
    endTime: '2017-11-14'
  }, {
    Id: '8',
    number: 'ZJ20170205',
    name: '高空坠落',
    address: '中国-江苏-徐州-沛县',
    status: '未开工',
    area: '975d367m²',
    price: '3000万元',
    unit: '中江集团',
    manager: '张成功',
    supervise: '张成功',
    startTime: '2017-07-07',
    endTime: '2017-11-14'
  }, {
    Id: '9',
    number: 'ZJ20170205',
    name: '高空坠落',
    address: '中国-江苏-徐州-沛县',
    status: '未开工',
    area: '975d367m²',
    price: '3000万元',
    unit: '中江集团',
    manager: '张成功',
    supervise: '张成功',
    startTime: '2017-07-07',
    endTime: '2017-11-14'
  }, {
    Id: '10',
    number: 'ZJ20170205',
    name: '高空坠落',
    address: '中国-江苏-徐州-沛县',
    status: '未开工',
    area: '975d367m²',
    price: '3000万元',
    unit: '中江集团',
    manager: '张成功',
    supervise: '张成功',
    startTime: '2017-07-07',
    endTime: '2017-11-14'
  }, {
    Id: '11',
    number: 'ZJ20170205',
    name: '高空坠落',
    address: '中国-江苏-徐州-沛县',
    status: '未开工',
    area: '975d367m²',
    price: '3000万元',
    unit: '中江集团',
    manager: '张成功',
    supervise: '张成功',
    startTime: '2017-07-07',
    endTime: '2017-11-14'
  }]
export default {
  getTable () {
    return new Promise((resolve, reject) => {
      resolve(DepartmentUser)
    })
  },
  // *************分页
  getPage (param) {
    return new Promise((resolve, reject) => {
      resolve(DepartmentUser)
      console.log(param)
      console.log(pageSize)
    })
  },
  //  批量删除
  deleteAll (param) {
    return new Promise((resolve, reject) => {
      resolve(DepartmentUser)
      console.log(param)
    })
  },
  modify (param) {
    return new Promise((resolve, reject) => {
      resolve(DepartmentUser)
      console.log(param)
    })
  },
  searchInput (param) {
    return new Promise((resolve, reject) => {
      resolve(DepartmentUser)
      console.log(param)
    })
  }
}
