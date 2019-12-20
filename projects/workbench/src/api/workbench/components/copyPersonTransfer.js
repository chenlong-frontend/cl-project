const tableData2 = [{
  id: 1,
  label: '一级 1',
  children: [{
    id: 4,
    label: '二级 1-1',
    children: [{
      id: 9,
      label: '三级 1-1-1'
    }, {
      id: 10,
      label: '三级 1-1-2'
    }, {
      id: 11,
      label: '三级 1-1-3'
    }]
  }]
}, {
  id: 2,
  label: '一级 2',
  children: [{
    id: 5,
    label: '二级 2-1'
  }, {
    id: 6,
    label: '二级 2-2'
  }]
}, {
  id: 3,
  label: '一级 3',
  children: [{
    id: 7,
    label: '二级 3-1'
  }, {
    id: 8,
    label: '二级 3-2'
  }]
}]
const tableData4 = [{
  id: 1,
  label: '一级 4',
  children: [{
    id: 4,
    label: '二级 1-1',
    children: [{
      id: 9,
      label: '三级 1-1-1'
    }, {
      id: 10,
      label: '三级 1-1-2'
    }, {
      id: 11,
      label: '三级 1-1-3'
    }]
  }]
}, {
  id: 2,
  label: '一级 2',
  children: [{
    id: 5,
    label: '二级 2-1'
  }, {
    id: 6,
    label: '二级 2-2'
  }]
}, {
  id: 3,
  label: '一级 3',
  children: [{
    id: 7,
    label: '二级 3-1'
  }, {
    id: 8,
    label: '二级 3-2'
  }]
}]
const tableData3 = [{
  workerId: '1',
  name: '软件工程部',
  address: '上海市哈哈haahah'
}, {
  workerId: '2',
  name: '王小虎',
  address: '上海市haha'
}, {
  workerId: '3',
  name: '王小虎',
  address: '上海市'
}, {
  workerId: '4',
  name: '王小虎',
  address: '上海市'
}, {
  workerId: '5',
  name: '王小虎',
  address: '上海市'
}, {
  workerId: '6',
  name: '王小虎',
  address: '上海市'
}, {
  workerId: '7',
  name: '王小虎',
  address: '上海市'
}]
export default{
  // ************获取第二张表的部门部分的信息
  getTable2 (param) {
    return new Promise((resolve, reject) => {
      resolve(tableData2)
    })
  },
  // *************获得第二张表的工种部分的信息
  getTable4 (param) {
    return new Promise((resolve, reject) => {
      resolve(tableData4)
    })
  },
  getTable3 (param) {
    return new Promise((resolve, reject) => {
      resolve(tableData3)
    })
  }

}
