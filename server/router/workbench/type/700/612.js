const Mock = require('mockjs')
let Random = Mock.Random
let backData = Mock.mock({
  'tableData1|7': [{
    'name': Random.cword(4),
    'type|1': ['部门', '工种', '产品部'],
    'id|1': ['1', '2', '3', '4', '5', '6', '7']
  }],
  'page_count': '7'
})
let tableData1 = {
  code: 0,
  data: backData,
  msg: 'ok'
}
module.exports = response
function response (param) {
  return tableData1
}
