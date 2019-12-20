const Mock = require('mockjs')
let Random = Mock.Random
let backData = Mock.mock({
  'issue|5': [{
    icon: Random.image('22x22', '#1AB394'),
    vio_type_name: Random.cword(4),
    vio_desc: Random.cword(8),
    start_emp_name: Random.cword(3),
    start_time: Random.date('yyyy-MM-dd'),
    last_emp_name: Random.cword(3),
    history_time: Random.date('yyyy-MM-dd')
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
