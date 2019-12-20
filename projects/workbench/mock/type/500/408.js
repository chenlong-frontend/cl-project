const Mock = require('mockjs')
let Random = Mock.Random
let backData = Mock.mock({
  'issue|6': [{
    'alias': Random.cword(3), // 工单状态
    'startempname': Random.cword(3), // 工单发起人
    'lastempname': Random.cword(3), // 上一节点处理人
    'history_time': Random.string('number', 10), // 工单最新变更时间
    'start_time': Random.string('number', 10) // 工单发起时间
  }],
  'count': '23'
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
