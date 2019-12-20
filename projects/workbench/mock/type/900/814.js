const Mock = require('mockjs')
let Random = Mock.Random
let backData = Mock.mock({
  'project|7': [{
    'id': /\d{11}/,
    'name': Random.cword(6)
  }],
  'count': '16'
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
