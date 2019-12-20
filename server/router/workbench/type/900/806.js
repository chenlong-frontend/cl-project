const Mock = require('mockjs')
let backData = Mock.mock({
  'country|3': [{
    'id': /\d{5}/,
    'name|1': ['中国', '美国', '英国']
  }],
  'company|3': [{
    'id': /\d{5}/,
    'name|1': ['项目1', '项目2', '项目3']
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
