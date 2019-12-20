const Mock = require('mockjs')
let Random = Mock.Random
let backData = Mock.mock({
    // 'data|2-3': [{
    //     file_id:Random.id(),
    //     file_name:Random.cword(3),
    //     file_size:'44.00KB',
    //     file_time:Random.datetime(),
    //     type_icon:Random.image('42x42'),
    //     type_id:'45',
    //     type_name: 'xls'
    // },
    // {
    //     file_id:Random.id(),
    //     file_name:Random.cword(3),
    //     file_size:'33.43KB',
    //     file_time:Random.datetime(),
    //     type_icon:Random.image('42x42'),
    //     type_id:'12',
    //     type_name: 'ppt'
    // }, 
    // {
    //     file_id:Random.id(),
    //     file_name:Random.cword(3),
    //     file_size:'66.42KB',
    //     file_time:Random.datetime(),
    //     type_icon:Random.image('42x42'),
    //     type_id:'34',
    //     type_name: 'word'
    // }]
    'data': []
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