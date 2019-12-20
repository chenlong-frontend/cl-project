const Mock = require('mockjs')
let Random = Mock.Random
let backData = Mock.mock({
  'count|13-67': 67,
  'project': [
    {
      'country': '1',
      'address': Random.cword(5),
      'manager': '20180118183017111',
      'city': '22',
      'num': '4',
      'latitude': Random.float(80, 100, 3, 5),
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
      'longitude': Random.float(80, 110, 3, 5)
    },
    {
      'country': '1',
      'address': Random.cword(5),
      'manager': '20180118183017111',
      'city': '229',
      'num': '16',
      'latitude': Random.float(20, 50, 2, 4),
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
      'longitude': Random.float(30, 50, 1, 6)
    },
    {
      'country': '1',
      'address': Random.cword(5),
      'manager': '20180118183017111',
      'city': '229',
      'num': '16',
      'latitude': Random.float(30, 40, 3, 5),
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
      'longitude': Random.float(50, 70, 2, 5)
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
