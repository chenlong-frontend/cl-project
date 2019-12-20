const Mock = require('mockjs')
let Random = Mock.Random
let backData = Mock.mock({
    'app|2': [
        {
            'name': Random.cword(3),
            'id': Random.id(),
            'form_id': Random.id(),
            'child': [
                {
                    'name': '我代办的',
                    'mobile_url': '/workflow-deal',
                    'id': Random.id(),
                    'form_id': Random.id(),
                    'icon': Random.image('93x93')
                },
                {
                    'name': '随手拍',
                    'mobile_url': '/snapshot-index',
                    'id': Random.id(),
                    'form_id': Random.id(),
                    'icon': Random.image('93x93')
                },
                {
                    'name': '工作台',
                    'mobile_url': '/workflow-working',
                    'id': Random.id(),
                    'form_id': Random.id(),
                    'icon': Random.image('93x93')
                },
                {
                    'name': '视频监控',
                    'mobile_url': '/monitor-index',
                    'id': Random.id(),
                    'form_id': Random.id(),
                    'icon': Random.image('93x93')
                },
                {
                    'name': '文档管理',
                    'mobile_url': '/filemanage-index',
                    'id': Random.id(),
                    'form_id': Random.id(),
                    'icon': Random.image('93x93')
                },
                {
                    'name': '用户管理',
                    'mobile_url': '/userinfo-index',
                    'id': Random.id(),
                    'form_id': Random.id(),
                    'icon': Random.image('93x93')
                },
                {
                    'name': 'vr',
                    'mobile_url': '/vr-index',
                    'id': Random.id(),
                    'form_id': Random.id(),
                    'icon': Random.image('93x93')
                },
                {
                    'name': '看板',
                    'mobile_url': '/statistics-index',
                    'id': Random.id(),
                    'form_id': Random.id(),
                    'icon': Random.image('93x93')
                },
                {
                    'name': '集团门户',
                    'mobile_url': '/home-index',
                    'id': Random.id(),
                    'form_id': Random.id(),
                    'icon': Random.image('93x93')
                }
            ]
        }
    ]
})
let backDatas = {
    code: 0,
    data: backData.app,
    msg: 'ok'
}
module.exports = reponse
function reponse (param) {
    return backDatas
}
