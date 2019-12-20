const Mock = require('mockjs')
let Random = Mock.Random
let backData = Mock.mock({
    'menu': [{
        'alias': '随手拍',
        'url': '/snapshot-index',
        'icon': Random.image('93x93'),
        'node_name': Random.cword(4),
        'flow_id': Random.id(),
    },{
        'alias': '文件上传',
        'url': '/workflow-deal',
        'icon': Random.image('93x93'),
        'node_name': Random.cword(4),
        'flow_id': Random.id()
    }]
})
let backDatas = {
    code: 0,
    data: backData.menu,
    msg: 'ok'
}
module.exports = reponse
function reponse (param) {
    return backDatas
}
