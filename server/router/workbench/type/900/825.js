const Mock = require('mockjs')
let Random = Mock.Random
let backData = Mock.mock({
  'array|5': [{
    'icon|1': Random.image('22x22', '#1AB394'),
    file_name: Random.cword(15),
    emp_name: Random.cword(2),
    file_time: Random.date('yyyy-MM-dd')
  }]
})
let backDatas = {
  code: 0,
  data: backData.array,
  msg: 'ok'
}

module.exports = reponse
function reponse (param) {
  return backDatas
}
