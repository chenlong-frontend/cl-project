const Mock = require('mockjs')
let backData = Mock.mock({
  'data|3': [{
    'id': /\d{3}/,
    'name|1': ['部门1', '部门2', '部门3']
  }]
})

let backDatas = {
  code: 0,
  data: backData.data,
  msg: 'ok'
}

module.exports = reponse
function reponse (param) {
  return backDatas
}
