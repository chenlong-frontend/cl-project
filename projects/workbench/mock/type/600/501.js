const Mock = require('mockjs')
let Random = Mock.Random
let backData = Mock.mock({
  'left_form|2-5': [
    {
      'id': Random.id(),
      name: Random.cword(4),
      'children|2-6': [
        {
          children: [],
          'name': Random.cword(4),
          id: Random.id()
        }
      ]
    }
  ],
  'member|1-3': [
    {
      'id': Random.id(),
      name: Random.cword(4),
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
