const Mock = require('mockjs')
let Random = Mock.Random
let backData = Mock.mock({
    'data|2-3': [{
        'file_clct_emp_id':Random.id(),
        'file_clct_emp_name':'管理员',
        'file_clct_file_id':Random.id(),
        'file_clct_id':Random.id(),
        'file_clct_time':'2018-04-22',
        'file_emp_id':'45',
        'file_emp_name': '管理员',
        'file_icon': Random.image('42x42'),
        'file_id': Random.id(),
        'file_name': '毕业论文涉及摘要.doc',
        'file_p_id': Random.id(),
        'file_p_name': '1',
        'file_size': '44KB',
        'file_src_clct_tiem': 1521703704000,
        'file_src_size': '5454',
        'file_src_time': 1521703709000,
        'file_time': '2018-03-22',
        'type_alias': 'Word',
        'type_id': '98',
        'type_name': "doc"
    },
    {
        'file_clct_emp_id':Random.id(),
        'file_clct_emp_name':'管理员',
        'file_clct_file_id':Random.id(),
        'file_clct_id':Random.id(),
        'file_clct_time':'2018-04-22',
        'file_emp_id':'45',
        'file_emp_name': '管理员',
        'file_icon': Random.image('42x42'),
        'file_id': Random.id(),
        'file_name': '面试要求涉及摘要.doc',
        'file_p_id': Random.id(),
        'file_p_name': '1',
        'file_size': '44KB',
        'file_src_clct_tiem': 1521703704000,
        'file_src_size': '5454',
        'file_src_time': 1521703709000,
        'file_time': '2018-03-22',
        'type_alias': 'PPT',
        'type_id': '98',
        'type_name': "ppt"
    }, 
    {
        'file_clct_emp_id':Random.id(),
        'file_clct_emp_name':'管理员',
        'file_clct_file_id':Random.id(),
        'file_clct_id':Random.id(),
        'file_clct_time':'2018-04-22',
        'file_emp_id':'45',
        'file_emp_name': '管理员',
        'file_icon': Random.image('42x42'),
        'file_id': Random.id(),
        'file_name': '学年论文涉及摘要.doc',
        'file_p_id': Random.id(),
        'file_p_name': '1',
        'file_size': '44KB',
        'file_src_clct_tiem': 1521703704000,
        'file_src_size': '5454',
        'file_src_time': 1521703709000,
        'file_time': '2018-03-22',
        'type_alias': 'TXT',
        'type_id': '98',
        'type_name': "txt"
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