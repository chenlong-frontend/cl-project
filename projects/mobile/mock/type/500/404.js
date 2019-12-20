const Mock = require('mockjs')
let Random = Mock.Random
let backData = Mock.mock({
    'data': {
        "role": 1,
        "vio_type_name": "违反“四口”规定",
        "is_over": 1,
        "history_time": "2018-01-29 10:43",
        "flow_id": "20180118183507033",
        "vio_desc": "1",
        "vio_level": [
            {
                "_id": 1,
                "_name": "一般问题",
                "_level": 1
            },
            {
                "_id": 2,
                "_name": "重大问题",
                "_level": 2
            }
        ],
        'next_nodes':[
            {
                "id":"123123",
                "flow_id":"123123",
                "name":"财务部",
                "alias":"待处理",
                "alias_css":"#ff00ff",
                "form_id":"2",
                "is_fail":"0",
                "tag":false
            },
            {
                "id":"1231236",
                "flow_id":"1231236",
                "name":"安全部",
                "alias":"待处理",
                "alias_css":"#ff00ff",
                "form_id":"2",
                "is_fail":"0",
                "tag":false
            },
        ],
        "state": 5,
        "vio_level_name": "一般问题",
        "process_advise": "已处理",
        "m_platform": 1,
        "address": "江苏省徐州市沛县经济开发区",
        "iss_id": "20180129104340830",
        "vio_level_id": 1,
        "gro_id": "20180118183507041",
        "cur_node_id": "20180118183507048",
        "history_id": "20180129104341294",
        "process_pic": Random.image('150x100'),
        "processor": "张鉴熙",
        "vio_type_id": 2,
        "upload_time": "2018-01-29 10:43",
        "gro_name": "工程部",
        "record_id": "20180129104147257",
        "vio_pic": Random.image('150x100'),
        "form_url": "/snapshot-issueReWrite",
        "form_table_name": "p_iss_snapshot",
        "fail_reason": [
            {
                "_id": 1,
                "_name": "图片不清晰"
            },
            {
                "_id": 2,
                "_name": "位置不在范围内"
            }
        ],
        "verify_advise": "1",
        "upload_name": "陆健龙"
    }
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