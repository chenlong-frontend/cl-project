const Mock = require('mockjs')
let Random = Mock.Random
let backData = Mock.mock({
  'file_par_file': {
    'pp_id': Random.id(),
    'p_name': Random.cword(3),
    'p_id': Random.id()
  },
  'file_child_file|1-4': [{
    'file_name': Random.cword(3),
    'file_id': Random.id()
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
