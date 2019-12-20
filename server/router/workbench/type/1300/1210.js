const Mock = require('mockjs')
let Random = Mock.Random
let backData = Mock.mock({
  'list': [{
    'zone_name': Random.cword(3),
    'zone_id': Random.id()
  }, {
    'zone_name': Random.cword(3),
    'zone_id': Random.id()
  }]
})
let mockData = {
  'code': 0,
  'msg': 'OK',
  'data': backData.list
}
module.exports = reponse
function reponse (param) {
  // param是接收的req参数
  return mockData
}
