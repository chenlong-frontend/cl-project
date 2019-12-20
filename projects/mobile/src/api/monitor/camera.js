import ajax from '../ajax.js'

export default {
    getCameraInfo() {
        return new Promise((resolve, reject) => {
            ajax.post({type: 100, data: {}}, backData => {
                resolve(backData.data.data)
            }, error => {
                reject(error)
            })
        })
    },
    // ****取消默认***
    dealCamera (param) {
        return new Promise((resolve, reject) => {
            ajax.post({type: 101, data: {camera_id: param}}, backData => {
                resolve()
            }, error => {
                reject(error)
            })
        })
    },
    // ****访问监控****
    visitMonitor (param) {
        return new Promise((resolve, reject) => {
            ajax.post({type: 102, data: {camera_id: param}}, backData => {
                resolve()
            }, error => {
                reject(error)
            })
        })
    },
    getListInfo(param) {
        return new Promise((resolve, reject) => {
            ajax.post({type: 104, data: {id: param}}, backData => {
                resolve(backData.data.data)
            }, error => {
                reject(error)
            })
        })
    },
    getAlbumInfo(param) {
        return new Promise((resolve, reject) => {
            ajax.post({type: 105, data: {page_index: 0, page_size: 20}}, backData => {
                resolve(backData.data.data)
            }, error => {
                reject(error)
            })
        })
    },
    // ***切换图片*****
    changePhoto(param) {
        return new Promise((resolve, reject) => {
            console.log(param)
            ajax.post({type: 106, data: {album_id: param.id, flag: param.flag}}, backData => {
                resolve(backData.data)
            }, error => {
                reject(error)
            })
        })
    }
}