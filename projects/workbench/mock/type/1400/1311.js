const Mock = require('mockjs')
let Random = Mock.Random
let backData = Mock.mock({
  'material|6': [{
    'material_num': /\d{10}/,
    'memo': Random.cword(4),
    'id': /\d{3}/,
    'tag': /\d{3}/,
    'material_name': Random.cword(3)
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
