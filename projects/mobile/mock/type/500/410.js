const Mock = require('mockjs')
let Random = Mock.Random
let backData1 = Mock.mock({
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
let backDatas1 = {
    code: 0,
    data: backData1.issue,
    msg: 'ok'
}
let backData2 = Mock.mock({
    'nodes': [{
        alias:Random.cword(4),
        node_ids:Random.id()
    },{
        alias:Random.cword(4),
        node_ids:Random.id()
    },{
        alias:Random.cword(4),
        node_ids:Random.id()
    }],
    "orders|15-20": [{
        flow_name:Random.cword(6),
        alias:Random.cword(3),
        start_emp_name:Random.cword(3),
        last_emp_name:Random.cword(3),
        history_time:Random.datetime(),
        alias_css:Random.color(),
        icon: Random.image('42x42')
    }]
})
let backDatas2 = {
    code: 0,
    data: backData2,
    msg: 'ok'
}
module.exports = reponse
function reponse (param) {
    if (param.data === '{}') {
        return backDatas1
    } else {
        return backDatas2
    }
}