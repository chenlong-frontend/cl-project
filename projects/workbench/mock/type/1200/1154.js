const Mock = require('mockjs')
let backData = Mock.mock({
  'data|10': [{
    'mon_pro_income': /\d{3}/,
    'mon_payment': /\d{3}/,
    'time': /\d{1}/
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
