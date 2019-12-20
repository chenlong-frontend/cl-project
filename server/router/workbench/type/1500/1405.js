const Mock = require('mockjs')
let Random = Mock.Random
let backData = Mock.mock({
  'loadometer': [{
    'loadometer_id': /\d{11}/,
    'loado_name': Random.cword(4),
    'loado_position': Random.cword(6),
    'loado_function': Random.cword(6),
    'loado_model': /\d{10}/,
    'loado_ip': /\d{10}/,
    'loado_port': /\d{3}/,
    'loado_linkman': Random.cword(3),
    'loado_linkman_id': /\d{6}/,
    'video_ip': /\d{10}/,
    'video_port': /\d{10}/,
    'username': Random.cword(4),
    'password': /\d{10}/,
    'video_name': Random.cword(4),
    'video_unit_type': Random.cword(4),
    // ************摄像头部分**********
    'camera_list': [
      {'camera_unit_type': Random.cword(4), 'camera_port': /\d{10}/, 'camera_name': Random.cword(4), 'camera_id': /\d{10}/},
      {'camera_unit_type': Random.cword(4), 'camera_port': /\d{10}/, 'camera_name': Random.cword(4), 'camera_id': /\d{10}/}
    ]
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
