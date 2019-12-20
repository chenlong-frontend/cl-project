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
    'loado_linkman': Random.cword(3)
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
