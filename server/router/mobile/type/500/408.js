const Mock = require('mockjs')
let Random = Mock.Random
let backData = Mock.mock({
    'issue|15-20': [{
        flow_name:Random.cword(6),
        alias:Random.cword(3),
        start_emp_name:Random.cword(3),
        last_emp_name:Random.cword(3),
        history_time:Random.datetime(),
        alias_css:Random.color(),
        icon: Random.image('42x42')
    }],
    "count|1-100": 100
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
