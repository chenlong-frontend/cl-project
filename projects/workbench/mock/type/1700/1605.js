const Mock = require('mockjs')
let backData = Mock.mock({
  'rows': [
    {
      'name': '任务1',
      'link': '#',
      'values': [
        {
          'desc': '100.0000,62.5000',
          'from': 1519867665000,
          'to': 1519954065000,
          'color': '#D0E4FD'
        },
        {
          'desc': '超限',
          'from': 1519954065000,
          'to': 1521108643000,
          'color': '#F9C4E1'
        }
      ]
    },
    {
      'name': '任务2',
      'link': '#',
      'values': [
        {
          'desc': '100.0000,100.0000',
          'from': 1520558865000,
          'to': 1520645265000,
          'color': '#D0E4FD'
        }
      ]
    }
  ]
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
