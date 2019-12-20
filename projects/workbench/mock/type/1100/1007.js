const Mock = require('mockjs')
let backData = Mock.mock({
  'done_num|10-50': 50,
  'human_num|8-30': 30,
  'not_start_num|20-60': 60,
  'building_num|20-40': 40,
  'pro_num|50-100': 100
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
