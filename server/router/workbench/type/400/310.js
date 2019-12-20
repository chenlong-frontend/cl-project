const Mock = require('mockjs')
let Random = Mock.Random
let backData = Mock.mock({
  'tree': [{
    name: Random.cword(3),
    id: 1,
    isDel: true,
    'children|1-5': [{
      id: Random.id(),
      name: Random.cword(7),
      'children|1-5': [{
        id: Random.id(),
        name: Random.cword(7)
      }]
    }
    ]
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
