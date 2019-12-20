import ajax from '../ajax'

export default {
    // 获取用户基本信息
    getUserMessage() {
        return new Promise ((resolve, reject) => {
            ajax.post({type: 421, data: {

            }}, backData => {
                resolve(backData.data.data)
            }, error => {
                reject(error)
            })
        })
    } 
}