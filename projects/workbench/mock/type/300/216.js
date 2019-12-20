const Mock = require('mockjs')
let Random = Mock.Random
let backData = Mock.mock({
  'doc_num': Random.id(),
  'rvw_emps|1-10': [{
    'emp_num': Random.id(),
    'name': Random.cword(3),
    'emp_id': Random.id()
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
