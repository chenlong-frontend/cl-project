const Mock = require('mockjs')
let Random = Mock.Random
let backData = Mock.mock({
  'name': Random.cword(4),
  'original_pic': Random.image('200x64'),
  'preview_pic': Random.image('200x64'),
  'desc': Random.cword(120)
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
