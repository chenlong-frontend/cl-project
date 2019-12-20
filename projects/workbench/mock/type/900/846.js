const Mock = require('mockjs')
let backData = Mock.mock({
  'year': [
    2017,
    1016,
    2015,
    2014,
    2013,
    2012
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
