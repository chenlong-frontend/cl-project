const Mock = require('mockjs')
let Random = Mock.Random
let backData = Mock.mock({
  'count': 100,
  'exp_list|1-10': [{
    'admin_id': Random.id(),
    'administrator': Random.cword(3),
    'phone': Random.id(),
    'name': Random.cword(8),
    'qr_code': 'url',
    'id': Random.id(),
    'address': Random.cword(4)
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
