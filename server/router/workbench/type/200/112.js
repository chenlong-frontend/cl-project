const Mock = require('mockjs')
let Random = Mock.Random
let backData = Mock.mock({
  'count': 100,
  'videolist|1-10': [{
    'video_name': Random.cword(3),
    'ip': Random.id(),
    'id': Random.id(),
    'time': Random.date('yyyy-MM-dd'),
    'unit_type': Random.cword(3),
    'port': Random.id(),
    'username': Random.cword(3),
    'password': Random.id()
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
