const Mock = require('mockjs')
let Random = Mock.Random
let backData = Mock.mock({
    'data': [
        {class: '30', href: '', id: Random.id(), news_id: Random.id(), time: Random.datetime(), title: Random.cword(14)},
        {class: '30', href: '', id: Random.id(), news_id: Random.id(), time: Random.datetime(), title: Random.cword(14)},
        {class: '30', href: '', id: Random.id(), news_id: Random.id(), time: Random.datetime(), title: Random.cword(14)},
        {class: '30', href: '', id: Random.id(), news_id: Random.id(), time: Random.datetime(), title: Random.cword(14)},
        {class: '30', href: '', id: Random.id(), news_id: Random.id(), time: Random.datetime(), title: Random.cword(14)},
        {class: '31', href: '', id: Random.id(), news_id: Random.id(), time: Random.datetime(), title: Random.cword(14)},
        {class: '31', href: '', id: Random.id(), news_id: Random.id(), time: Random.datetime(), title: Random.cword(14)},
        {class: '31', href: '', id: Random.id(), news_id: Random.id(), time: Random.datetime(), title: Random.cword(14)},
        {class: '31', href: '', id: Random.id(), news_id: Random.id(), time: Random.datetime(), title: Random.cword(14)},
        {class: '31', href: '', id: Random.id(), news_id: Random.id(), time: Random.datetime(), title: Random.cword(14)},
        {class: '77', href: '', id: Random.id(), news_id: Random.id(), time: Random.datetime(), title: Random.cword(14)},
        {class: '77', href: '', id: Random.id(), news_id: Random.id(), time: Random.datetime(), title: Random.cword(14)},
        {class: '77', href: '', id: Random.id(), news_id: Random.id(), time: Random.datetime(), title: Random.cword(14)},
        {class: '77', href: '', id: Random.id(), news_id: Random.id(), time: Random.datetime(), title: Random.cword(14)},
        {class: '77', href: '', id: Random.id(), news_id: Random.id(), time: Random.datetime(), title: Random.cword(14)}
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