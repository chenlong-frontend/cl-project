const Mock = require('mockjs')
let Random = Mock.Random
let backData = Mock.mock({
  'amount|1-100': 100,
  'member|1-7': [
    {
      emp_num: Random.id(),
      emp_name: Random.cword(3),
      emp_id: Random.id(),
      emp_phone: Random.id(),
      backup_phone: '12345;56789;12556'
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
