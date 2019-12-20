const Mock = require('mockjs')
let Random = Mock.Random
let backData = Mock.mock({
  'report|6': [{
    'id': /\d{8}/,
    'name': Random.string('number', 5),
    'icon': Random.string('number', 10),
    'url': Random.string('number', 10),
    'script': Random.string('number', 6),
    'pro_id': /\d{7}/
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
