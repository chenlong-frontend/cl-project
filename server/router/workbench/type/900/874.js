const Mock = require('mockjs')
let Random = Mock.Random
let backData = Mock.mock({
  'left_form|6': [{
    id: /\d{11}/,
    name: Random.cword(5)
  }],
  'left_form_count': [{
    'left_form_count': '12'
  }]
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
