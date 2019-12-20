const Mock = require('mockjs')
let Random = Mock.Random
let backData = Mock.mock({
  'project|12': [{
    'id': /\d{11}/,
    'name': Random.cword(3),
    'project_area': Random.cword(3),
    'state|1': ['未开工', '已开工', '竣工'],
    'acreage': /\d{5}/,  // *****建筑总面积*************
    'price': /\d{5}/,
    'architecture': Random.cword(6),
    'manager': Random.cword(3),
    'administrator': Random.cword(3),
    'start_time': Random.date('1996-12-13 00:00:00'),
    'end_time': Random.date('1997-12-13 00:00:00')
  }],
  'count': 10
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
