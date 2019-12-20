const Mock = require('mockjs')
let backData = Mock.mock({
  'data|11': [{
    'company': /\d{3}/,
    'pro_name': /\d{3}/,
    'pro_address': /\d{3}/,
    'build_co': /\d{3}/,
    'build_acreage': /\d{3}/,
    'contract_price': /\d{3}/,
    'settlement_price': /\d{3}/,
    'start_time': '2017-11-29',
    'end_time': '2018-3-19',
    'id': /\d{3}/,
    'detail_id': /\d{3}/,
    'type': /\d{3}/,
    'mon_acreage': /\d{3}/,
    'mon_cons_out_value': /\d{3}/,
    'acc_out_value': /\d{3}/,
    'mon_pro_income': /\d{3}/,
    'acc_income': /\d{3}/,
    'mon_payment': /\d{3}/,
    'acc_payment': /\d{3}/
  }]
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
