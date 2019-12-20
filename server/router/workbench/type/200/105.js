const Mock = require('mockjs')
let Random = Mock.Random
let backData = Mock.mock({
  'albums|18': [{
    'thumbnail|1': ['/static/monitor.png', '/static/ppt.png', '/static/pdf.png', '/static/plat_file.png', '/static/text.png', '/static/xls.png'],
    'album_id': /\d{11}/,
    'org_pic|1': ['/static/monitor.png', '/static/ppt.png', '/static/pdf.png', '/static/plat_file.png', '/static/text.png', '/static/xls.png'],
    'time': Random.string('number', 10),
    'position': Random.cword(8),
    'unit_type': Random.cword(7),
    'name': Random.cword(5)
  }],
  'count': '55'
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
