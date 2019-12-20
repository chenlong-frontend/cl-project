import ajax from '../ajax.js'

export default {
    // ***************请求搜索结果************//
    getList (param) {
        return new Promise((resolve, reject) => {
            ajax.post({type: 408, data: {"flow_id":"-1","type":param,"search_key":"","page_index":"0","page_size":"500"}}, backData => {
                resolve(backData.data)
            }, error => {
                reject(error)
            })
        })
    }
}
