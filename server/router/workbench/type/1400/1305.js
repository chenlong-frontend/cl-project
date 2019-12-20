const Mock = require('mockjs')
let Random = Mock.Random
let backData = Mock.mock({
  'car|3': [{
    'pro_id': /\d{3}/,
    'id': /\d{11}/,
    'car_number': /\d{11}/,
    'current_time': Random.cword(6),
    'direction': Random.cword(6),
    'weight': /\d{3}/
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
