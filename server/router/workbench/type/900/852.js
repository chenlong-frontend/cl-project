const Mock = require('mockjs')
let Random = Mock.Random
let backData = Mock.mock({
  'project|6': [{
    'id': /\d{8}/,
    'corp_name': Random.string('number', 5),
    'corp_manager': Random.string('number', 10),
    'manager_name': Random.string('number', 10)
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
