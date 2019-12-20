import ajax from '../ajax.js'

export default {
    // ***************获取新闻相关信息************//
    getNewsInfo (param) {
        return new Promise((resolve, reject) => {
            ajax.post({type: 900, data: {group: param.group, co: param.co, other: param.other, start_index: param.start_index, page_size: param.page_size}}, backData => {
                resolve(backData.data)
            }, error => {
                reject(error)
            })
        })
    },
    // ************加载更多操作*********
    getDetailNews (param) {
        return new Promise((resolve, reject) => {
            ajax.post({type: 903, data: {page_count: param.page_count, start_index: param.start_index, page_size: 20, page:param.page, news_list_clazz: param.news_list_clazz}}, backData => {
                resolve(backData.data)
            }, error => {
                reject(error)
            })
        })
    },
    returnCount (param) {
        return new Promise((resolve, reject) => {
            ajax.post({type: 903, data: {count: param.count, news_list_clazz: param.news_list_clazz}}, backData => {
                resolve(backData.data)
            }, error => {
                reject(error)
            })
        })
    },
    //  ***获取具体新闻
    getOneNews (param) {
        return new Promise((resolve, reject) => {
            ajax.post({type: 901, data: {news_id: param}}, backData => {
                resolve(backData.data)
            }, error => {
                reject(error)
            })
        })
    }
}
