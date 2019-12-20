const Mock = require('mockjs')
let backData = Mock.mock({
  'result_list': [
    {
      'eqpt_name': '设备名称1',
      'eqpt_num': 'X1234',
      'eqpt_pos': '设备位置1'
    },
    {
      'eqpt_name': '设备名称2',
      'eqpt_num': 'X12345',
      'eqpt_pos': '设备位置2'
    }
  ],
  'table_name': '20180114140359'
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
