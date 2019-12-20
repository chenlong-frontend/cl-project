const mockData = {
  'code': 0,
  'msg': 'OK',
  'data': {
    'spell': 'zhangleiyun',
    'password': '123',
    'emp_num': 'zj000025',
    'initial': 'z',
    'name': '章雷云',
    'mobile': '18770032137',
    'id': '20170831145328055',
    'email': '',
    'cid': '25',
    'emp_post': '总经理',
    'project_name': '中江国际',
    'index': 'subCompany',
    'emp_avatar': 'url',
    'pro_type': 1,
    'pro_id': 1234
  }
}

const error = {
  'code': 202,
  'msg': '用户名或密码错误',
  'data': null
}

module.exports = reponse
function reponse (param) {
  let backData
  console.log(param)
  if (JSON.parse(param.data).password === '123') {
    backData = mockData
  } else {
    backData = error
  }
  return backData
}
