const Mock = require('mockjs')
let Random = Mock.Random
let backData = Mock.mock({
    'data': {
        'doc_num': Random.cword(4),
        'emp_id': Random.id(),
        'emp_name': Random.cword(3),
        'file_access_url': Random.image('42x42'),
        'file_alias': Random.cword(5),
        'file_desc': Random.cword(20),
        'file_emp_id': Random.id(),
        'file_emp_name': Random.cword(3),
        'file_icon': Random.image('42x42'),
        'file_id': Random.id(),
        'file_name': Random.cword(7),
        'file_p_id': Random.id(),
        'file_path': '主目录>666',
        'file_pro_id': Random.id(),
        'file_real_url': Random.image('42x42'),
        'file_scan_num': '3',
        'file_size': '661.78KB',
        'file_src_size': '3347',
        'file_src_time': 1233445656775,
        'file_time': '2018-03-29',
        'file_type_id': Random.id(),
        'file_type_name': 'doc'
    }
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