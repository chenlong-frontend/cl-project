const Mock = require('mockjs')
let backData = Mock.mock({
  'x_list': ['2018-01', '2018-02', '2018-03', '2018-04', '2018-05', '2018-06', '2018-07', '2018-08', '2018-09', '2018-10', '2018-11', '2018-12'],
  'y_list': [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
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
