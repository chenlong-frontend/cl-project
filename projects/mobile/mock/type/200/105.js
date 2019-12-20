const Mock = require('mockjs')
let Random = Mock.Random
let backData = Mock.mock({
    'albums': [
        {
            album_id: '1',
            name: '1',
            org_pic: Random.image('122x122'),
            position: '仓库区-堆料仓库-左侧区域1',
            thumbnail: Random.image('120x90'),
            time: '2017-10-30 15:35',
            unit_type: '1'
        },
        {
            album_id: '4',
            name: '4',
            org_pic: Random.image('122x122'),
            position: '仓库区-堆料仓库-左侧区域4',
            thumbnail: Random.image('120x90'),
            time: '2017-11-29 15:35',
            unit_type: '4'
        },
        {
            album_id: '2',
            name: '2',
            org_pic: Random.image('122x122'),
            position: '仓库区-堆料仓库-左侧区域2',
            thumbnail: Random.image('120x90'),
            time: '2017-11-30 15:35',
            unit_type: '2'
        },
        {
            album_id: '3',
            name: '3',
            org_pic: Random.image('122x122'),
            position: '仓库区-堆料仓库-左侧区域3',
            thumbnail: Random.image('120x90'),
            time: '2017-12-30 15:35',
            unit_type: '3'
        }
    ]
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