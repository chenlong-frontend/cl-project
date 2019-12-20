const Mock = require('mockjs')
let Random = Mock.Random
let backData = Mock.mock({
    'index': [
        {
            area_name: '1',
            camera_port: '1',
            password: '1',
            camera_id: '1',
            TIME: '1',
            video_port: '1',
            state: '0',
            video_ip: '1',
            camera_name: '1',
            unit_type: '1',
            camera_ip: '1',
            username: '1',
        },
        {
            area_name: '1',
            camera_port: '1',
            password: '1',
            camera_id: '1',
            TIME: '1',
            video_port: '1',
            state: '0',
            video_ip: '1',
            camera_name: '1',
            unit_type: '1',
            camera_ip: '1',
            username: '1',
        },
        {
            area_name: '2',
            camera_port:  '2',
            password:  '2',
            camera_id:  '2',
            TIME:  '2',
            video_port:  '2',
            state: '1',
            video_ip:  '2',
            camera_name:  '2',
            unit_type:  '2',
            camera_ip:  '2',
            username:  '2',
        },
        {
            area_name:  '3',
            camera_port:  '3',
            password: '3',
            camera_id: '3',
            TIME: '3',
            video_port: '3',
            state: '2',
            video_ip: '3',
            camera_name: '3',
            unit_type: '3',
            camera_ip: '3',
            username: '3',
        }
    ],
    'pro_info': [{
        name: Random.cword(2),
        count: '2',
        id: Random.cword(2)
    }],
    'is_default': 0
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