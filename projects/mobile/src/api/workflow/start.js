import ajax from '../ajax.js'

export default {
    // ***************请求列表************//
    getList (param) {
        return new Promise((resolve, reject) => {
            ajax.post({type: 410, data: {}}, backData => {
                resolve(backData.data)
            }, error => {
                reject(error)
            })
        })
    },
    // ***************请求节点列表************//
    getNodeList (param) {
        return new Promise((resolve, reject) => {
            ajax.post({type: 409, data: {flow_id: param.flow_id, node_ids: [param.node_ids]}}, backData => {
                resolve(backData.data)
            }, error => {
                reject(error)
            })
        })
    },
    // ***************请求头部tab************//
    getTopTab () {
        return new Promise((resolve, reject) => {
            ajax.post({type: 405, data: {}}, backData => {
                resolve(backData.data)
            }, error => {
                reject(error)
            })
        })
    },
    // ***************请求详细tab************//
    getDeepTab (param) {
        return new Promise((resolve, reject) => {
            ajax.post({type: 410, data: {flow_id: param}}, backData => {
                resolve(backData.data)
            }, error => {
                reject(error)
            })
        })
    }
}