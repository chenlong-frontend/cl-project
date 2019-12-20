import ajax from '../ajax'

export default {
    // **************收藏中的数据
    getNewCollection (page_count, start_index, page_size, page, time_first) {
        return new Promise ((resolve, reject) => {
            ajax.post({type:227,
                data: {
                    'page_count': page_count,
                    'start_index': start_index,
                    'page_size': page_size,
                    'page': page,
                    'time_first': time_first
                }
            }, backData => {
                resolve(backData.data)
            }, error => {
                reject(error)
            })
        })
    },
    // **************收藏中的数据条数
    getNewCollectionCount (count) {
        return new Promise ((resolve, reject) => {
            ajax.post({type: 227,
                data: {
                    'count': count
                }
            }, backData => {
                resolve(backData.data)
            }, error => {
                reject(error)
            })
        })
    },
    // **************取消收藏成功
    deleteFile (id) {
        return new Promise ((resolve, reject) => {
            ajax.post({type: 229,
                data: {
                    'file_clct_id_list': id
                }
            }, backData => {
                resolve(backData.data)
            }, error => {
                reject(error)
            })
        })
    },
    // **************从搜索页中进   我的上传文件
    getDataMyup (page_count, start_index, page_size, page, time_first, isfile, type_alias) {
        return new Promise ((resolve, reject) => {
            ajax.post({type:226,
                data: {
                    'page_count': page_count,
                    'start_index': start_index,
                    'page_size': page_size,
                    'page': page,
                    'isfile': isfile,
                    'time_first': time_first,
                    'type_alias': type_alias
                }
            }, backData => {
                resolve(backData.data)
            }, error => {
                reject(error)
            })
        })
    },
    // **************从搜索页中进   我的上传文件条数
    getCountMyup (page_count, start_index, page_size, page, time_first, isfile, type_alias) {
        return new Promise ((resolve, reject) => {
            ajax.post({type: 226,
                data: {
                    'page_count': page_count,
                    'start_index': start_index,
                    'page_size': page_size,
                    'page': page,
                    'isfile': isfile,
                    'time_first': time_first,
                    'type_alias': type_alias
                }
            }, backData => {
                resolve(backData.data)
            }, error => {
                reject(error)
            })
        })
    },
    // **************从搜索页中进   我的分享文件
    getDataShare (page_count, start_index, page_size, page, time_first, isfile, type_alias) {
        return new Promise ((resolve, reject) => {
            ajax.post({type:225,
                data: {
                    'page_count': page_count,
                    'start_index': start_index,
                    'page_size': page_size,
                    'page': page,
                    'isfile': isfile,
                    'time_first': time_first,
                    'type_alias': type_alias
                }
            }, backData => {
                resolve(backData.data)
            }, error => {
                reject(error)
            })
        })
    },
    // **************从搜索页中进   我的分享文件条数
    getCountShare (page_count, start_index, page_size, page, time_first, isfile, type_alias) {
        return new Promise ((resolve, reject) => {
            ajax.post({type: 225,
                data: {
                    'page_count': page_count,
                    'start_index': start_index,
                    'page_size': page_size,
                    'page': page,
                    'isfile': isfile,
                    'time_first': time_first,
                    'type_alias': type_alias
                }
            }, backData => {
                resolve(backData.data)
            }, error => {
                reject(error)
            })
        })
    },

}