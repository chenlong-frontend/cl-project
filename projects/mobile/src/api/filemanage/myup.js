import ajax from '../ajax'

export default {
    // **************获取最近上传中的数据
    getNewUp (page_count, start_index, page_size, page, isfile, time_first) {
        return new Promise ((resolve, reject) => {
            ajax.post({type:225,
                data: {
                    'page_count': page_count,
                    'start_index': start_index,
                    'page_size': page_size,
                    'page': page,
                    'isfile': isfile,
                    'time_first': time_first
                }
            }, backData => {
                resolve(backData.data)
            }, error => {
                reject(error)
            })
        })
    },
    // **************获取最近上传的数据条数
    getNewUpCount (isfile, count) {
        return new Promise ((resolve, reject) => {
            ajax.post({type: 225,
                data: {
                    'isfile': isfile,
                    'count': count
                }
            }, backData => {
                resolve(backData.data)
            }, error => {
                reject(error)
            })
        })
    }
}