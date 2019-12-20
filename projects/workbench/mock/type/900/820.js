const Mock = require('mockjs')
let Random = Mock.Random
let backData = Mock.mock({
  'data|4-6': [{
    text: Random.cword(3),
    'url|1': ['/permission/manage', '/item/report/graph', '/item/report'],
    'icon|1': ['fa fa-credit-card', 'fa fa-comments', 'fa fa-folder'],
    id: Random.id()
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
