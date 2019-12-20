import ajax from '../ajax.js'

export default {
    // ***************获取最近浏览文件
    getScanFile (page_index, time_first) {
        return new Promise((resolve, reject) => {
            ajax.post({type: 207, data:{
                'page_index': page_index,
                'time_first': time_first
            }}, backData => {
                resolve(backData.data)
            }, error => {
                reject(error)
            })
        })
    },
    // *************获取工作区中的基本数据
    getWorkMess () {
        return new Promise((resolve, reject) => {
            ajax.post({type: 212, data:{

            }}, backData => {
                resolve(backData.data)
            }, error => {
                reject(error)
            })
        })
    },
    // *************获取工作区中的文件数据
    getWorkFile (p_id, page_index, passed) {
        return new Promise((resolve, reject) => {
            ajax.post({type: 233, data:{
                'p_id': p_id,
                'page_index': page_index,
                'passed': passed
            }}, backData => {
                resolve(backData.data)
            }, error => {
                reject(error)
            })
        })
    },
    // ***********************收藏成功
    saveFile (id) {
        return new Promise((resolve, reject) => {
            ajax.post({type: 232, data:{
                'file_clct_list': id
            }}, backData => {
                resolve(backData.data)
            }, error => {
                reject(error)
            })
        })
    }
}