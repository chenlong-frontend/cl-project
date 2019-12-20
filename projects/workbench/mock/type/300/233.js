const Mock = require('mockjs')
let Random = Mock.Random
let backData01 = Mock.mock({
  'child_files|1-10': [{
    'file_type_icon': Random.image('20x16', '#4A7BF7'),
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
  current_file_id: Random.id(),
  'page_count|1-101': 101
})
let backData02 = Mock.mock({
  'child_files|1-10': [{
    'file_type_icon|1': Random.image('20x16', '#54B646'),
    'file_alias': Random.cword(4),
    'file_p_id': Random.id(),
    'file_id': Random.id(),
    'file_emp_id': Random.id(),
    'file_name': Random.cword(5),
    'file_src_size': Random.integer(1, 100),
    'isfile': true,
    'file_time': Random.date('yyyy-MM-dd'),
    'file_size': Random.integer(1, 100),
    'file_access_url': Random.url()
  }]
})

let backData0 = backData01.child_files.concat(backData02.child_files)
backData01.child_files = backData0

let backDatas = {
  code: 0,
  data: backData01,
  msg: 'ok'
}

module.exports = reponse

function reponse (param) {
  return backDatas
}
