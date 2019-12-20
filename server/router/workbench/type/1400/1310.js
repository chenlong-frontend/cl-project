const Mock = require('mockjs')
let Random = Mock.Random
let backData = Mock.mock({
  'car': [{
    'car_model': /\d{11}/,
    'contact_name': Random.cword(4),
    'pro_id': /\d{3}/,
    'contact_phone': /\d{11}/,
    'car_number': /\d{3}/,
    'car_brand': Random.cword(4),
    'belong_to': Random.cword(4),
    'memo': Random.cword(6),
    'id': /\d{3}/,
    'tag': Random.cword(6),
    'car_weight': /\d{3}/
  }],
  'loado': [{
    'loado_name': /\d{3}/,
    'loado_ip': Random.cword(4),
    'loado_port': /\d{3}/,
    'loado_linkman': /\d{11}/,
    'loadometer_id': /\d{3}/,
    'loado_model': Random.cword(4),
    'loado_position': Random.cword(4),
    'loado_num': Random.cword(6),
    'loado_function': /\d{3}/,
    'loado_linkman_id': Random.cword(6)
  }],
  'pic_list|3': [{
    'thumbnail': Random.image('250x100'),
    'original': Random.image('800x400'),
    // 'camera_id': /\d{3}/,
    'camera_name': Random.cword(7)
  }],
  'last_record': [{
    'actual_weight': /\d{3}/,
    'name': Random.cword(3),
    'target_weight': /\d{3}/,
    'whole_weight': /\d{3}/,
    'time': /\d{3}/,
    'car_weight': /\d{3}/
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
