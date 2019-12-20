const Mock = require('mockjs')
let Random = Mock.Random
let backData = Mock.mock({
  'default_pro': '首页',
  'other_pro|1-4': [{
    'pro_id': Random.id(),
    'manage_type': Random.id(),
    'pro_name': Random.cword(3)
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
