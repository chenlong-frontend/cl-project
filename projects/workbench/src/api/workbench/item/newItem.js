const pageSize = 9
const PersonData = [{
  label: '一级 1',
  children: [{
    label: '二级 1-1',
    children: [{
      label: '三级 1-1-1'
    }]
  }]
}, {
  label: '一级 2',
  children: [{
    label: '二级 2-1',
    children: [{
      label: '三级 2-1-1'
    }]
  }, {
    label: '二级 2-2'
  }]
}, {
  label: '一级 3',
  children: [{
    label: '二级 3-1',
    children: [{
      label: '三级 3-1-1'
    }]
  }, {
    label: '二级 3-2',
    children: [{
      label: '三级 3-2-1'
    }]
  }]
}]
// **************点击选择项目经理的右边员工部分
const lidata = [
  {index1: 0, name: '张成功', number: 'zj20140403'},
  {index1: 1, name: '张成功', number: 'zj20140403'},
  {index1: 3, name: '张成功', number: 'zj20140403'},
  {index1: 4, name: '张成功', number: 'zj20140403'}]
// *****************工程状态
const works = [{
  number: '0',
  level: '未开工'
}, {
  number: '1',
  level: '已开工'
}, {
  number: '2',
  level: '已完工'
}]
const countries = [{
  value: '选项1',
  label: '黄金糕'
}, {
  value: '选项2',
  label: '双皮奶'
}, {
  value: '选项3',
  label: '蚵仔煎'
}, {
  value: '选项4',
  label: '龙须面'
}, {
  value: '选项5',
  label: '北京烤鸭'
}]
export default {
  submitData (param) {
    return new Promise((resolve, reject) => {
      resolve(PersonData)
      console.log(param)
    })
  },
  // ******************工作状态
  workStatus (param) {
    return new Promise((resolve, reject) => {
      resolve(works)
    })
  },
  // ***********获取选取项目经理的部门部分************************
  getPersonData (param) {
    return new Promise((resolve, reject) => {
      resolve(PersonData)
    })
  },
  // ****************获取选取项目经理的员工部分***************
  getWorker (param) {
    return new Promise((resolve, reject) => {
      resolve(lidata)
    })
  },
  // ***************获取国家*****************
  getCountry (param) {
    return new Promise((resolve, reject) => {
      resolve(countries)
    })
  },
  // *******************选择国家***************
  chooseCountry (param) {
    return new Promise((resolve, reject) => {
      resolve()
      console.log(param)
    })
  },
  // ******************获取项目经理点击后的选择框********************
  chooseInput (param) {
    return new Promise((resolve, reject) => {
      resolve()
      console.log(param)
    })
  },
  // ******************获取项目经理点击后的分页********************
  getPage (param) {
    return new Promise((resolve, reject) => {
      resolve()
      console.log(param)
      console.log(pageSize)
    })
  }
  //
}
