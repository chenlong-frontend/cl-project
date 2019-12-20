const Mock = require('mockjs')
let Random = Mock.Random
let backData = Mock.mock({
  'count|30-80': 80,
  'pro_list|6-9': [
    {
      'start_time': Random.cword(4),
      'address': Random.cword(8),
      'pro_id': Random.id(),
      'manager': Random.cword(3),
      'preview_pic': Random.image('65x80'),
      'pro_name': Random.cword(4)
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
