const tree = [{
  id: 1,
  label: '第一部门 1',
  children: [{
    id: 4,
    label: '第一部门 1-1',
    children: [{
      id: 9,
      label: '第一部门 1-1-1'
    }, {
      id: 10,
      label: '第一部门 1-1-2'
    }]
  }]
}, {
  id: 2,
  label: '第二部门 2',
  children: [{
    id: 5,
    label: '第二部门 2-1'
  }, {
    id: 6,
    label: '第二部门 2-2'
  }]
}, {
  id: 3,
  label: '第三部门 3',
  children: [{
    id: 7,
    label: '第三部门 3-1'
  }, {
    id: 8,
    label: '第三部门 3-2'
  }]
}]
const tempData = {tree: tree, description: '江苏沛县文萃苑'}
let data = {
  code: 0,
  data: tempData,
  msg: 'ok'
}

module.exports = reponse
function reponse (param) {
  return data
}
