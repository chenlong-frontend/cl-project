const Mock = require('mockjs')
let Random = Mock.Random
let backData = Mock.mock({
  'address': Random.cword(14),
  'phone': /\d{11}/,
  'name': Random.cword(3),
  'leaders': Random.cword(3),
  'remark': Random.cword(7),
  'fax': /\d{11}/,
  'email': Random.email(),
  'desc': Random.cword(9),
  'alias': Random.cword(6),
  'pro_success': [{'name': Random.cword(7), 'pic_url': Random.url()},
                    {'name': Random.cword(7), 'pic_url': Random.url()}]
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
