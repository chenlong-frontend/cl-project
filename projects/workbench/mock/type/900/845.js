const Mock = require('mockjs')
let backData = Mock.mock({
  'year': [
    2018,
    2017,
    1016,
    2015
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
