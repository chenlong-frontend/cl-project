const Mock = require('mockjs')
let Random = Mock.Random
let backData = Mock.mock({
    'records': [
        {
            'start_time': '2017-12-11 16:47',
            'level': '5',
            'name': '南大鼓楼VR体验馆',
            'end_time': '2017-12-14 16:47',
            'remark': 'r3252',
            'id': 321312,
            'time': '0小时1分钟',
            'is_feedback': true,
            'emp_id': 432423
        },
        {
            'start_time': '2017-12-11 16:47',
            'level': '2',
            'name': '南大鼓楼VR体验馆',
            'end_time': '2017-12-14 16:47',
            'remark': 'r3252',
            'id': 543534,
            'time': '0小时1分钟',
            'is_feedback': false,
            'emp_id': 42345325
        },
        {
            'start_time': '2017-12-11 16:47',
            'level': '3',
            'name': '南大鼓楼VR体验馆',
            'end_time': '2017-12-14 16:47',
            'remark': 'r3252',
            'id': 52352,
            'time': '0小时1分钟',
            'is_feedback': false,
            'emp_id': 243534
        }
    ]
})
let backDatas = {
    code: 0,
    data: backData.records,
    msg: 'ok'
}
module.exports = reponse
function reponse (param) {
    return backDatas
}