let tree = [{
  id: '1',
  label: '第一部门 1',
  children: [{
    id: '4',
    label: '第一部门 1-1',
    children: [{
      id: '9',
      label: '第一部门 1-1-1'
    }, {
      id: '10',
      label: '第一部门 1-1-2'
    }]
  }]
}, {
  id: '2',
  label: '第二部门 2',
  children: [{
    id: '5',
    label: '第二部门 2-1'
  }, {
    id: '6',
    label: '第二部门 2-2'
  }]
}, {
  id: '3',
  label: '第三部门 3',
  children: [{
    id: '7',
    label: '第三部门 3-1'
  }, {
    id: '8',
    label: '第三部门 3-2'
  }]
}]

let backDatas = {
  code: 0,
  data: {tree: tree},
  msg: 'ok'
}
module.exports = reponse
function reponse (param) {
  return backDatas
}
