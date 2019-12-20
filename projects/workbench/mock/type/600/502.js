const Mock = require('mockjs')
let Random = Mock.Random
let backData = Mock.mock({
  id: Random.id()
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
