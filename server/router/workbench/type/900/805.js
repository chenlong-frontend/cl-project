const Mock = require('mockjs')
let Random = Mock.Random
let backData = Mock.mock({
  'project': [{
    name: Random.cword(12),
    area: Random.cword(8),
    start_time: Random.date('yyyy-MM-dd'),
    desc: Random.cparagraph(2),
    preview_pic: Random.image('110x80', '#1AB394'),
    manage_name: Random.cword(3),
    longitude: '116.404',
    latitude: '39.915'
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
