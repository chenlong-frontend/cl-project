const Mock = require('mockjs')
let Random = Mock.Random
let backData = Mock.mock({
  'count|1-20': 20,
  'company_list': [
    {
      'address': Random.cword(12),
      'phone': /\d{11}/,
      'name': Random.cword(8),
      'id': '121',
      'fax': /\d{11}/,
      'email': Random.email()
    },
    {
      'address': Random.cword(12),
      'phone': /\d{11}/,
      'name': Random.cword(8),
      'id': '122',
      'fax': /\d{11}/,
      'email': Random.email()
    },
    {
      'address': Random.cword(12),
      'phone': /\d{11}/,
      'name': Random.cword(8),
      'id': '123',
      'fax': /\d{11}/,
      'email': Random.email()
    },
    {
      'address': Random.cword(12),
      'phone': /\d{11}/,
      'name': Random.cword(8),
      'id': '124',
      'fax': /\d{11}/,
      'email': Random.email()
    }
  ],
  'years': [
    2019,
    2018,
    2017
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
