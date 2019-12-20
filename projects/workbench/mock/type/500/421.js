// ***********获取个人信息***********  //
const Mock = require('mockjs')
let Random = Mock.Random
let backData = Mock.mock({
  'role_name': Random.cword(3),  // 职务
  'gro_name': Random.cword(3),   // 部门名称
  'emp_avatar': '../../assets/img/menu/head03.svg',// 头像地址
  'emp_num': Random.id(),       // 员工工号
  'phone': Random.id(),         // 手机号
  'sex': '男',                  // 性别
  'cid': Random.id(),           // 身份证
  'emp_name': Random.cword(2),  // 员工姓名
  'mobile': Random.id(),        // 手机号
  'email': Random.id(),         // 邮箱
  'age': Random.date('yyyy-MM-dd'), // 出生日期
  'emp_id': Random.id(),        // 员工id
  'pro_name': Random.cword(8),  // 项目名
  'work_type': Random.cword(3)  // 工种
})
let mockData = {
  'code': 0,
  'msg': 'OK',
  'data': backData
}
module.exports = reponse
function reponse (param) {
  // param是接收的req参数
  return mockData
}
