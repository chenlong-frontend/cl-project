const Mock = require('mockjs')
let Random = Mock.Random
let backData = Mock.mock({
    'data|5': [
        {
            news_id: Random.id(),
            news_list_clazz: Random.id(),
            news_list_href: '',
            news_list_id: Random.id(),
            news_list_src_time: Random.datetime(),
            news_list_time: Random.datetime(),
            news_list_title: Random.cword(20)
        }
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