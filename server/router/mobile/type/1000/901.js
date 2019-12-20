const Mock = require('mockjs')
let Random = Mock.Random
let backData = Mock.mock({
    'data': [
        {
            news_con: '[<div>sss</div>]',
            news_head: '[sssss]',
            news_id: Random.id(),
            news_img: '[<img src=' + Random.image('414x220') + '>, <img src=' + Random.image('414x220') +'>]',
            news_src_time: Random.datetime(),
            news_time: Random.datetime()
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