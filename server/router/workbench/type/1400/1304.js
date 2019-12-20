const Mock = require('mockjs')
let Random = Mock.Random
let backData = Mock.mock({
  'car': [{
    'id': /\d{11}/,
    'car_number': /\d{10}/,
    'car_brand': Random.cword(6),
    'car_model': Random.cword(6),
    'car_weight': /\d{10}/,
    'contact_name': Random.cword(3),
    'contact_phone': /\d{10}/,
    'belong_to': Random.cword(3),
    'memo': Random.cword(13)
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
