const Mock = require('mockjs')
let Random = Mock.Random
let backData01 = Mock.mock({
  'search_result|1-8': [{
    'file_type_icon': '/static/folder.png',
    'file_alias': Random.cword(4),
    'file_p_id': Random.id(),
    'file_id': Random.id(),
    'file_emp_id': Random.id(),
    'file_name': Random.cword(5),
    'file_src_size': Random.integer(1, 100),
    'isfile': false,
    'file_time': Random.date('yyyy-MM-dd'),
    'file_size': Random.integer(1, 100)
  }],
  'page_count|1-101': 101
})
let backData02 = Mock.mock({
  'search_result|1-8': [{
    'file_type_icon|1': ['/static/doc.png', '/static/pdf.png', '/static/ppt.png', '/static/text.png', '/static/unknow.png', '/static/xls.png'],
    'file_alias': Random.cword(4),
    'file_p_id': Random.id(),
    'file_id': Random.id(),
    'file_emp_id': Random.id(),
    'file_name': Random.cword(5),
    'file_src_size': Random.integer(1, 100),
    'isfile': true,
    'file_time': Random.date('yyyy-MM-dd'),
    'file_size': Random.integer(1, 100)
  }]
})

let backData0 = backData01.search_result.concat(backData02.search_result)
backData01.search_result = backData0

let backDatas = {
  code: 0,
  data: backData01,
  msg: 'ok'
}

module.exports = reponse

function reponse (param) {
  return backDatas
}
