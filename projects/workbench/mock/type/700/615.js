const Mock = require('mockjs')
let Random = Mock.Random
let backData = Mock.mock({
  'query_list|6': [{
    'emp_num': Random.string('number', 5),
    'emp_name': Random.cword(3),
    'emp_id': Random.string('number', 3)
  }],
  'page_count': '8'
})
let tableData3 = {
  code: 0,
  data: backData,
  msg: 'ok'
}
module.exports = response
function response (param) {
  return tableData3
}
