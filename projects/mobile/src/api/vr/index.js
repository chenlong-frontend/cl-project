import ajax from '../ajax.js'

export default {
    // ***************1051接口请求列表************//
    getList () {
        return new Promise((resolve, reject) => {
            ajax.post({type: 1051, data: {"page_index": 1, "page_size": 3}}, backData => {
                resolve(backData.data)
            }, error => {
                reject(error)
            })
        })
    },
    // 体验列表获取所有数据
    getAllList () {
        return new Promise((resolve, reject) => {
            ajax.post({type: 1099, data: {"page_index": 0, "page_size": 10000}}, backData => {
                resolve(backData.data)
            }, error => {
                reject(error)
            })
        })
    },
    // vr扫码开始请求
    getStart (item) {
        return new Promise((resolve, reject) => {
            ajax.post({type: 1054, data: item}, backData => {
                resolve(backData.data)
            }, error => {
                reject(error)
            })
        })
    },
    // 添加vr体验
    addVreXP (item) {
        return new Promise((resolve, reject) => {
            ajax.post({type: 1053, data: item}, backData => {
                resolve(backData.data)
            }, error => {
                reject(error)
            })
        })
    },
    // 轮询检查项目有没有被占用
    allCheck (item) {
        return new Promise((resolve, reject) => {
            ajax.post({type: 1062, data: item}, backData => {
                resolve(backData.data)
            }, error => {
                reject(error)
            })
        })
    },
    // 添加评论
    addComment (item) {
        return new Promise((resolve, reject) => {
            ajax.post({type: 1052, data: item}, backData => {
                resolve(backData.data)
            }, error => {
                reject(error)
            })
        })
    }
}