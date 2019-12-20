const Mock = require('mockjs')
let Random = Mock.Random
let backData = Mock.mock({
    'data': [
        {count: '61'}
    ]
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