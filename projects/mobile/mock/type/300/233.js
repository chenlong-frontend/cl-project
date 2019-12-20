const Mock = require('mockjs')
let Random = Mock.Random
let backData = Mock.mock({
    'child_files|2-3': [{
        file_access_url: '',
        file_alias: '',
        file_emp_id: '-1',
        file_id: Random.id(),
        file_name: Random.cword(5),
        file_p_id: '-1',
        file_pic_url: Random.image('42x42'),
        file_real_url: '',
        file_size: '0B',
        file_src_size: '0',
        file_time: Random.datetime(),
        file_type_icon: Random.image('46x46'),
        file_type_id: '999',
        file_type_name: 'folder',
        isfile: false
    },
    {
        file_access_url: '',
        file_alias: '',
        file_emp_id: '-1',
        file_id: Random.id(),
        file_name: Random.cword(5),
        file_p_id: '-1',
        file_pic_url: Random.image('42x42'),
        file_real_url: '',
        file_size: '0B',
        file_src_size: '0',
        file_time: Random.datetime(),
        file_type_icon: Random.image('46x46'),
        file_type_id: '999',
        file_type_name: 'file',
        isfile: false
    }],
    "current_file_id": '-1'
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