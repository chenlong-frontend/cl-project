// const Mock = require('mockjs')
// let Random = Mock.Random
let form = {
  id: '1111',
  name: '一号塔吊',
  location: '西南角',
  responsible: {emp_id: '1212121', name: '张三'},
  operator: [
    {emp_id: '10', name: '张三2'},
    {emp_id: '11', name: '李四'},
    {emp_id: '12', name: '王二'}],
  JD: 60,
  WD: 120,
  type: '22',
  safeWeight: '120',
  topRatio: '2',
  safeHeight: '30',
  remark: '小心操作',
  IP: '192.168.0.1',
  port: '8888',
  video_id: '0',
  username: '录像机一号',
  password: '12345',
  video_unit_type: 'snapshot',
  video_ip: '192.168.0.8',
  video_port: '233',
  CCTVInfo: [
    {camera_id: '20180118190508853', camera_name: '一号监控', camera_unit_type: '12型', camera_port: '2222'},
    {camera_id: '20180118190508853', camera_name: '二号监控', camera_unit_type: '12型', camera_port: '2222'}
  ]
}
let backDatas = {
  code: 0,
  data: form,
  msg: 'ok'
}
module.exports = reponse
function reponse (param) {
  return backDatas
}
