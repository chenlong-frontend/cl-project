const Mock = require('mockjs')
let Random = Mock.Random
let backData = Mock.mock({
  'data|2': [
    {
      'country': '1',
      'address': Random.cword(5),
      'manager': '20180118183017111',
      'city': '22',
      'num': '4',
      'latitude': '34.7345714420',
      'end_time': Random.date(),
      'original_pic': Random.image('65x80'),
      'acreage': 200000,
      'type': 3,
      'start_time': Random.date(),
      'administrator': '20180118183017111',
      'province': '16',
      'price': '250000',
      'district': '1931',
      'name': '沛县中江文萃苑',
      'employee_sum': '14',
      'id': '20180118183506904',
      'state': 1,
      'pro_manager': 'Admin0102',
      'p_id': '20180118182403965',
      'desc': '沛县中江文萃苑项目',
      'architecture': '无',
      'longitude': '116.9181066883'
    },
    {
      'country': '1',
      'address': Random.cword(5),
      'manager': '20180118183017111',
      'city': '229',
      'num': '16',
      'latitude': '34.7345714420',
      'end_time': Random.date(),
      'original_pic': Random.image('65x80'),
      'acreage': 200000,
      'type': 3,
      'start_time': Random.date(),
      'administrator': '20180118183017111',
      'province': '16',
      'price': '250000',
      'district': '1931',
      'name': '沛县中江文萃苑',
      'employee_sum': '14',
      'id': '20180118183506904',
      'state': 0,
      'pro_manager': 'Admin0102',
      'p_id': '20180118182403965',
      'desc': '沛县中江文萃苑项目',
      'architecture': '无',
      'longitude': '116.9181066883'
    },
    {
      'country': '1',
      'address': Random.cword(5),
      'manager': '20180118183017111',
      'city': '229',
      'num': '16',
      'latitude': '34.7345714420',
      'end_time': Random.date(),
      'original_pic': Random.image('65x80'),
      'acreage': 200000,
      'type': 3,
      'start_time': Random.date(),
      'administrator': '20180118183017111',
      'province': '16',
      'price': '250000',
      'district': '1931',
      'name': '沛县中江文萃苑',
      'employee_sum': '14',
      'id': '20180118183506904',
      'state': 2,
      'pro_manager': 'Admin0102',
      'p_id': '20180118182403965',
      'desc': '沛县中江文萃苑项目',
      'architecture': '无',
      'longitude': '116.9181066883'
      }
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
