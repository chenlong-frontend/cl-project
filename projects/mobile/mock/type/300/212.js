const Mock = require('mockjs')
let Random = Mock.Random
let backData = Mock.mock({
    'data': [{
        count:'3',
        pro_id:Random.id(),
        pro_name: Random.cword(5)
    }]
})
let backDatas = {
    code: 0,
    data: backData.data,
    msg: 'ok'
}
module.exports = reponse
function reponse (param) {
    return backDatas
}