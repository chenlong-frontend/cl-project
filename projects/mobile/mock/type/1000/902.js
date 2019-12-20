const Mock = require('mockjs')
let Random = Mock.Random
let backData = Mock.mock({
    'news|5': [
        {
            'news_home_text': Random.cword(10),
            'news_home_link': Random.url(),
            'news_home_pic': Random.image('414x220' , '#50B347', '#FFF', 'Hello'),
            'news_home_id': Random.id(),
            'news_id': Random.id()
        }
    ]
})
let backDatas = {
    code: 0,
    data: backData.news,
    msg: 'ok'
}
module.exports = reponse
function reponse (param) {
    return backDatas
}
