const Mock = require('mockjs')
let Random = Mock.Random
let backData = Mock.mock({
  'material': [{
    'car_number': /\d{11}/,
    'material_num': /\d{10}/,
    'material_name': Random.cword(4),
    'whole_weight': /\d{3}/,
    'car_weight': /\d{3}/,
    'target_weight': /\d{3}/,
    'actual_weight': /\d{3}/,
    'action': Random.cword(3),
    'loadometer_id': Random.cword(4),
    'time': Random.cword(6),
    'contact_name': Random.cword(6),
    'sign_name': Random.cword(4),
    'memo': Random.cword(16)
  }],
  'pic_list|3': [{
    'pic_url': Random.image('80x50'),
    'pic_name': Random.cword(7)
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
