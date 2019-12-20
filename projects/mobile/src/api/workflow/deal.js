import ajax from '../ajax.js'

export default {
    // ***************请求待我处理列表************//
    getDealList () {
        return new Promise((resolve, reject) => {
            ajax.post({type: 400, data: {"emp_id":1,"page_size":"500","page_index":"0"}}, backData => {
                resolve(backData.data)
            }, error => {
                reject(error)
            })
        })
    },
    // ***************请求流程进行中列表************//
    getProcessList () {
        return new Promise((resolve, reject) => {
            ajax.post({type: 401, data: {"emp_id":1,"page_size":"500","page_index":"0"}}, backData => {
                resolve(backData.data)
            }, error => {
                reject(error)
            })
        })
    },
    // ***************请求流程结束列表************//
    getEndList () {
        return new Promise((resolve, reject) => {
            ajax.post({type: 402, data: {"emp_id":1,"page_size":"500","page_index":"0"}}, backData => {
                resolve(backData.data)
            }, error => {
                reject(error)
            })
        })
    }
}
