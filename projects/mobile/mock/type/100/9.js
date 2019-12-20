const Mock = require('mockjs')
let Random = Mock.Random
let backData = Mock.mock({
    'list': [
        {
            "process_id":"23123",
            "record_id":"23123234",
            "from_id":"233123",
            "iss_id":"234324",
            "process":"sdf",
            "content":"dfdf",
            "pic":"dfdf",
            "create_time":"2017-09-09 14:33:33",
            "emp_name":"dfdf",
            "emp_avatar":Random.image('42x42')
        },
        {
            "process_id":"23123",
            "record_id":"23123234",
            "from_id":"233123",
            "iss_id":"234324",
            "process":"dsf",
            "content":"发个",
            "pic":"dfdf",
            "create_time":"2017-09-09 14:33:33",
            "emp_name":"325",
            "emp_avatar":Random.image('42x42')
        }
    ]
})
let backDatas = {
    code: 0,
    data: backData.list,
    msg: 'ok'
}
module.exports = reponse
function reponse (param) {
    return backDatas
}