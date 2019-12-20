const Mock = require('mockjs')
let Random = Mock.Random
let backData = Mock.mock({
  'left_form|6': [{
    pro_id: /\d{11}/,
    name: Random.cword(5),
    id: /\d{11}/
  }],
  'left_form_count': '12',
  'member|7': [{
    pro_id: /\d{10}/,
    report_form_id: /\d{10}/,
    name: Random.cword(5)
  }],
  'member_count': '16'
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
