const Mock = require('mockjs')
let Random = Mock.Random
let backData = Mock.mock({
  'material|3': [{
    'id': /\d{11}/,
    'car_number': /\d{11}/,
    'material_num': /\d{10}/,
    'material_name': Random.cword(4),
    'target_weight': /\d{3}/,
    'actual_weight': /\d{3}/,
    'action': Random.cword(3),
    'time': Random.cword(6),
    'contact_name': Random.cword(6)
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
