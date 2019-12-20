const Mock = require('mockjs')
let Random = Mock.Random
let backData = Mock.mock({
  data: [{
    'id': Random.id(),
    'news_id': Random.id(),
    'title': [],
    'href': Random.image('150x100'),
    'class': 77,
    'time': Random.date()
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
