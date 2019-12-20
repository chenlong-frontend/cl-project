let backData = {
  'total_num': '10',
  'power_num': {
    'full_power': 1,
    'normal_power': 2,
    'low_power': 2,
    'need_power': 4
  }
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
