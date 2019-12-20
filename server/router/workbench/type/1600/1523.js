const Mock = require('mockjs')
let Random = Mock.Random
let backData = Mock.mock({
  'categorys': {
    '0': [
      {
        'start_time': Random.time(),
        'award_name': Random.cword(3),
        'end_time': Random.time(),
        'id': Random.id(),
        'category': 0,
        'options': 'update',
        'desc': '说明233333'
      },
      {
        'start_time': Random.time(),
        'award_name': Random.cword(3),
        'end_time': Random.time(),
        'id': Random.id(),
        'options': 'insert',
        'category': 0
      },
      {
        'start_time': Random.time(),
        'award_name': Random.cword(3),
        'end_time': Random.time(),
        'id': Random.id(),
        'category': 0,
        'options': 'update',
        'desc': '说明233333'
      }
    ],
    '1': [
      {
        'start_time': Random.time(),
        'award_name': Random.cword(3),
        'end_time': Random.time(),
        'options': 'insert',
        'id': Random.id(),
        'category': 0,
        'desc': '说明233333'
      }
    ],
    '2': []
  },
  'info': [{
    'start_time': '2018-04-01',
    'amount': '体量22',
    'charge': '负责人22',
    'contract': '合同额22',
    'end_time': '2018-04-21',
    'mobile': '负责人手机22',
    'project': '2期项目22',
    'company': '单位22',
    'id': '20180316101920841',
    'target': '目标22',
    'desc': '下方说明22'
  }],
  'options': 'insert'
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
