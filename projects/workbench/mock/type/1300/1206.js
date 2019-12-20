const Mock = require('mockjs')
let Random = Mock.Random
let backData = Mock.mock({
  'count': 100,
  'power_list|1-10': [{
    'emp_name': Random.cword(3),
    'no': Random.id(),
    'mobile': Random.id(),
    'power': '20%'
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
