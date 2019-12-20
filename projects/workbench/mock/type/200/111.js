const Mock = require('mockjs')
let Random = Mock.Random
let backData = Mock.mock({
  camera_detail: {
    'port': Random.integer(8000, 9000),
    'camera_id': Random.id(),
    'camera_name': Random.cword(4),
    'unit_type': Random.cword(6),
    'video_id': Random.id(),
    'ip': Random.ip()
  }
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
