const Mock = require('mockjs')
let Random = Mock.Random
let backData = Mock.mock({
  'count': 50,
  'zone_list|1-10': [{
    'id': Random.id(),
    'zone_name': Random.cword(6),
    'emp_name': Random.cword(3),
    'mobile': Random.id(),
    'pos_one_lng': '12.56',   // 经度 S
    'pos_one_lat': '12.23',   // 纬度 W
    'pos_two_lat': '13.24',
    'pos_two_lng': '12.56'
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
