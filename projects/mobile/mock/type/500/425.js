const Mock = require('mockjs')
let Random = Mock.Random
let backData = Mock.mock({
    'pro_name': Random.cword(5)
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