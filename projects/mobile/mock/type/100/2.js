const Mock = require('mockjs')
let Random = Mock.Random
let backData = Mock.mock({
    'info': {
        dep_name: Random.cword(3),
        emp_avatar: Random.image('50x50'),
        id: Random.id(),
        name: Random.cword(3)
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