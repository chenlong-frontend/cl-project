const Mock = require('mockjs')
let Random = Mock.Random
let backData = Mock.mock({
  'data|5-8': [
    {
      'buliding_num|0-10': 10,
      'done_num|0-10': 10,
      'name': Random.cword(4),
      'id': Random.id(),
      'p_id': Random.id(),
      'pro_num|0-10': 10
    }
  ]
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
