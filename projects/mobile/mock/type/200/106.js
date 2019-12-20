const Mock = require('mockjs')
let Random = Mock.Random
let backData = Mock.mock({
    data: {
        album_id: '5',
        name: '5',
        org_pic: Random.image('122x122'),
        position: '仓库区-堆料仓库-左侧区域5',
        thumbnail: Random.image('120x90'),
        time: '2017-10-30 15:35',
        unit_type: '5'
    }
})
let backDatas = {
    code: 201,
    data: backData.data,
    msg: 'ok'
}
module.exports = reponse
function reponse (param) {
    return backDatas
}