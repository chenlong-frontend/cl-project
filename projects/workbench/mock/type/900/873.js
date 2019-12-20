const Mock = require('mockjs')
let Random = Mock.Random
let backData = Mock.mock({
  'member|7': [{
    id: /\d{10}/,
    name: Random.cword(5)
  }],
  'member_count': [{
    'member_count': '16'
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
