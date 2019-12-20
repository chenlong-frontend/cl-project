const Mock = require('mockjs')
let Random = Mock.Random
let backData = Mock.mock({
    'count': [{
        'form_id': Random.id(),
        'name': Random.cword(3),
        'count|1-100': 100
    }]
})
let backDatas = {
    code: 0,
    data: backData.count,
    msg: 'ok'
}
module.exports = reponse
function reponse (param) {
    return backDatas
}
