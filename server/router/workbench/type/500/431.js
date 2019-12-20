const Mock = require('mockjs')
let Random = Mock.Random
let backData = Mock.mock({
  'live_count': Random.integer(1, 100),
  'accumulate_count': Random.integer(1, 100),
  'temp_card_count': Random.integer(1, 100),
  'live_card_count': Random.integer(1, 100),
  'live_role|2-10': [{
    'id': Random.id(),
    'name': Random.cword(),
    'ct': Random.integer(1, 100)
  }],
  'live_group': [{
    'id': Random.id(),
    'name': Random.cword(),
    'ct': Random.integer(1, 100)
  }],
  'current_time': Random.date()
})
let mockData = {
  'code': 0,
  'msg': 'OK',
  'data': backData
}
module.exports = reponse
function reponse (param) {
  return mockData
}
