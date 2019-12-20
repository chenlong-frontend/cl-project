const Mock = require('mockjs')
let Random = Mock.Random
let backData = {
  'detail': {
    'helment_id': '12345343',
    'no': '000001',
    'mobile': '13878686899',
    'emp_id': '342312312313',
    'emp_name': '张雷云',
    'emp_avatar': Random.image('50x50', '#4A7BF7'),
    'role_name': '瓦匠',
    'gro_name': '施工部'
  },
  'attendance': [
    {
      'io': '1',
      'time': '2017-12-15 10:46:49'
    },
    {
      'io': '1',
      'time': '暂无打卡记录'
    }
  ]
}
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
