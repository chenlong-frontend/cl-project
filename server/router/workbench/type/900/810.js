const Mock = require('mockjs')
let backData = Mock.mock({
  'province|3': [{
    'id': /\d{5}/,
    'name|1': ['江苏', '湖南', '北京']
  }],
  'city|3': [{
    'id': /\d{5}/,
    'name|1': ['南京', '无锡', '苏州']
  }],
  'district|3': [{
    'id': /\d{5}/,
    'name|1': ['高邮', '鼓楼', '北京']
  }]
})

let backDatas = {
  code: 0,
  data: backData,
  msg: 'ok'
}
module.exports = reponse
function reponse (param) {
  return backDatas
}
