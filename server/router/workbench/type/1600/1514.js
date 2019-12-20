const Mock = require('mockjs')
let Random = Mock.Random
let backData = Mock.mock({
  'award': [{
    'start_time': Random.time(),
    'award_name': '鲁班奖',
    'create_time': Random.time(),
    'end_time': Random.time(),
    'id': '1',
    'pic': `${Random.image('200x100', '#50B347')};${Random.image('200x200', '#50B347')}`,
    'category': 0,
    'award_id': Random.id()
  }, {
    'start_time': Random.time(),
    'award_name': '鲁班奖',
    'create_time': Random.time(),
    'end_time': Random.time(),
    'id': '1',
    'pic': '',
    'category': 0,
    'award_id': Random.id()
  }, {
    'start_time': Random.time(),
    'award_name': '鲁班奖',
    'create_time': Random.time(),
    'end_time': Random.time(),
    'id': '1',
    'pic': Random.image('200x100', '#50B347'),
    'category': 0,
    'award_id': Random.id()
  }, {
    'start_time': Random.time(),
    'award_name': '鲁班奖',
    'create_time': Random.time(),
    'end_time': Random.time(),
    'id': '1',
    'category': 0,
    'award_id': Random.id()
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
