import ajax from '../ajax.js'

export default {
    // ***************请求违章信息************//
    getIssueInfo () {
        return new Promise((resolve, reject) => {
            ajax.post({type: 7, data: {}}, backData => {
                resolve(backData.data)
            }, error => {
                reject(error)
            })
        })
    }
}