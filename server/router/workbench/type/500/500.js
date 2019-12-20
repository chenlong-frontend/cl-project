const Mock = require('mockjs')
let Random = Mock.Random
let backData = Mock.mock({
  tree: [
    {
      'name': Random.cword(4),
      isDel: true,
      id: Random.id(),
      'children|2-6': [
        {
          children: [],
          'name': Random.cword(4),
          id: Random.id()
        }
      ]
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
