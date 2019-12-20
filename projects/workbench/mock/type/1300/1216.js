const Mock = require('mockjs')
let Random = Mock.Random
let backData = Mock.mock({
  'count': 20,
  'record|1-6': [{
    'zone_name': Random.cword(3),
    'time_len': '20min',
    'time_interval': '01/14 13:12-13:12'
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
