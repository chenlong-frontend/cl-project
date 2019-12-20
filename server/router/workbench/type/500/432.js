const Mock = require('mockjs')
let backData = Mock.mock({
  'human_count|20-43': 43,
  'live_count|32-56': 56,
  'accumulate_count|15-34': 34
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
