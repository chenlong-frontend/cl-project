const Mock = require('mockjs')
let Random = Mock.Random
let backData = Mock.mock({
  'news_home_id': Random.id(),
  'news_id': Random.id(),
  'news_home_pic': Random.image('150x100'),
  'news_home_link': '',
  'news_home_text': Random.cword(18)
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
