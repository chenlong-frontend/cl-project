const Mock = require('mockjs')
let Random = Mock.Random
let backData = Mock.mock({
  'count': 100,
  'helment_list|1-10': [{
    'id': Random.id(),
    'emp_name': Random.cword(3),
    'no': Random.id(),
    'mobile': Random.id(),
    'emp_id': Random.id(),
    'create_time': Random.date('yyyy-MM-dd')
  }]
})
let mockData = {
  'code': 0,
  'msg': 'OK',
  'data': backData
}
module.exports = reponse
function reponse (param) {
  // param是接收的req参数
  return mockData
}
