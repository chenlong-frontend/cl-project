import ajax from '../ajax'

export default {
    // **************获取最近上传中的数据
    getNewShare (page_count, start_index, page_size, page, to) {
        return new Promise ((resolve, reject) => {
            ajax.post({type:226,
                data: {
                    'page_count': page_count,
                    'start_index': start_index,
                    'page_size': page_size,
                    'page': page,
                    'to': to
                }
            }, backData => {
                resolve(backData.data)
            }, error => {
                reject(error)
            })
        })
    },
    // **************获取最近上传的数据条数
    getShareCount (to, count) {
        return new Promise ((resolve, reject) => {
            ajax.post({type: 226,
                data: {
                    'to': to,
                    'count': count
                }
            }, backData => {
                resolve(backData.data)
            }, error => {
                reject(error)
            })
        })
    },
    //******************* 去文件详情页
    toFileDetail (id) {
        return  new Promise((resolve, reject) => {
            ajax.post({type: 211,
                data: {
                    file_id: id
                }
            }, backData => {
                resolve(backData.data)
            }, error => {
                reject(error)
            })
        }) 
    }
}