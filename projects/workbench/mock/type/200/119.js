const Mock = require('mockjs')
let Random = Mock.Random
let backData = Mock.mock({
  'data|1-10': [{
    'video_name': Random.cword(4),
    'video_id': Random.id()
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
