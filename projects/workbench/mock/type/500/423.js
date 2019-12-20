const Mock = require('mockjs')
let Random = Mock.Random
let backData = Mock.mock({
  'data': [
    {
      'tab': Random.cword(3)
    },
    {
      'tab': Random.cword(3)
    }
  ]
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
