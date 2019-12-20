const Mock = require('mockjs')
let backData = Mock.mock({
  'region|3': [{
    'id': /\d{5}/,
    'name|1': ['江苏', '湖南', '北京']
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
