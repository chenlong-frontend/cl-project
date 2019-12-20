const Mock = require('mockjs')
let Random = Mock.Random
let backData = Mock.mock({
  'count': 20,
  'emp_list|1-6': [{
    'emp_name': Random.cword(3),
    'emp_num': 1231415,
    'mobile': 6546576855,
    'emp_avatar': Random.image('80x50', '#4A7BF7')
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
