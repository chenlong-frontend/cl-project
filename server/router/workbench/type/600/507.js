const Mock = require('mockjs')
let Random = Mock.Random
let backData = Mock.mock({
  data: [{
    id: Random.id(),
    flow_id: Random.id(),
    'is_work|1': true,
    'is_use|1': true,
    url: Random.domain(),
    pc_url: Random.domain(),
    name: Random.cword(4),
    'platform|1': [0, 1],
    'type|1': [1, 2],
    icon: Random.domain(),
    'tag|1': [0, 1]
  }]
})
let backDatas = {
  code: 0,
  data: backData.data,
  msg: 'ok'
}
module.exports = reponse
function reponse (param) {
  return backDatas
}
