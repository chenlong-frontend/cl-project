const Mock = require('mockjs')
let backData = Mock.mock({
  'gen_cap_installed': 6198,
  'gen_reduction_c': 0.0,
  'gen_reduction_co2': 0.0,
  'gen_cap_daily': 0.0,
  'gen_cap_monthly': 0.0
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
