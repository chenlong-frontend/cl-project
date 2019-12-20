const Mock = require('mockjs')
let Random = Mock.Random
let backData = Mock.mock({
    'data': {
        'age': '18',
        'cid': Random.id(),
        'email': Random.email(),
        'emp_avatar': Random.image('100x100'),
        'emp_id': Random.id(),
        'emp_name': '太师',
        'emp_num': '01007',
        'gro_name': '研发部',
        'mobile': '13328070340',
        'pro_name': '沛县中江文萃苑',
        'role_name': Random.cword(3),
        'sex': '男',
        'work_type': '33'
    }
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