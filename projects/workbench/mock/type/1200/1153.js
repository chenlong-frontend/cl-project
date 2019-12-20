const Mock = require('mockjs')
let backData = Mock.mock({
  'data': [
    {
      'mon_cons_out_value': '4310',
      'acc_out_value': '3839',
      'type': '0',
      'name': '自包'
    },
    {
      'mon_cons_out_value': '5310',
      'acc_out_value': '4839',
      'type': '1',
      'name': '自营'
    },
    {
      'mon_cons_out_value': '6310',
      'acc_out_value': '2839',
      'type': '-1',
      'name': '分包'
    },
    {
      'mon_cons_out_value': '7310',
      'acc_out_value': '6839',
      'type': '4',
      'name': '设计'
    },
    {
      'mon_cons_out_value': '1310',
      'acc_out_value': '3839',
      'type': '4',
      'name': 'aa'
    },
    {
      'mon_cons_out_value': '2310',
      'acc_out_value': '6839',
      'type': '4',
      'name': 'bb'
    },
    {
      'mon_cons_out_value': '3310',
      'acc_out_value': '8839',
      'type': '4',
      'name': 'cc'
    }
  ]
})

let backDatas = {
  code: 0,
  data: backData.data,
  msg: 'ok'
}

module.exports = reponse
function reponse (param) {
  return backDatas
}
