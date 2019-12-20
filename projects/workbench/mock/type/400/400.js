const Mock = require('mockjs')
let Random = Mock.Random
let backData = Mock.mock({
  'tableData|6': [{
    'id': /\d{8}/,
    'num': Random.string('number', 5),
    'name': Random.cword(3),
    'project_area': Random.string('number', 10),
    'state': Random.string('number', 10)
  }],
  'page_count': '16'
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
