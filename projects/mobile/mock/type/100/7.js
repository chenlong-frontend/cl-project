const Mock = require('mockjs')
let Random = Mock.Random
let backData = Mock.mock({
    'list': [{
        _name: Random.cword(4),
        _id: Random.id()
    },{
        _name: Random.cword(4),
        _id: Random.id()
    }]
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