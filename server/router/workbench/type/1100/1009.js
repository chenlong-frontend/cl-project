const Mock = require('mockjs')
let Random = Mock.Random
let backData = Mock.mock({
  'exp_list': [{
    'pro_id': 123,
    'value': '花生',
    'manage_type': 1,
    'index': 'company'
  }, {
    'pro_id': 124,
    'value': '水果哟',
    'manage_type': 2,
    'index': 'company'
  }, {
    'pro_id': 125,
    'value': '牛奶',
    'manage_type': 3,
    'index': 'company'
  }, {
    'pro_id': 126,
    'value': '酥饼啊',
    'manage_type': 2,
    'index': 'company'
  }]
})
let mockData = {
  'code': 0,
  'msg': 'OK',
  'data': backData.exp_list
}
module.exports = reponse
function reponse (param) {
  // param是接收的req参数
  return mockData
}
