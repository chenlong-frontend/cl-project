const Mock = require('mockjs')
let Random = Mock.Random
let backData = Mock.mock({
    'data|2-3': [{
        'file_icon':Random.image('42x42'),
        'file_id': Random.id(),
        'file_name':'毕业论文涉及摘要.doc',
        'file_p_id': Random.id(),
        'file_p_name': '3',
        'file_size':'66.8KB',
        'file_src_size':'4478',
        'file_src_time':1521703709000,
        'file_time':Random.datetime(),
        'type_id':'96',
        'type_name': 'doc'
    },
    {
        'file_icon':Random.image('42x42'),
        'file_id': Random.id(),
        'file_name':'毕业论文涉及.ppt',
        'file_p_id': Random.id(),
        'file_p_name': '3',
        'file_size':'66.8KB',
        'file_src_size':'4478',
        'file_src_time':1521703709000,
        'file_time':Random.datetime(),
        'type_id':'96',
        'type_name': 'ppt'
    }, 
    {
        'file_icon':Random.image('42x42'),
        'file_id': Random.id(),
        'file_name':'文涉及摘要.txt',
        'file_p_id': Random.id(),
        'file_p_name': '3',
        'file_size':'66.8KB',
        'file_src_size':'4478',
        'file_src_time':1521703709000,
        'file_time':Random.datetime(),
        'type_id':'96',
        'type_name': 'txt'
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