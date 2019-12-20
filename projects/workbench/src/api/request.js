import ajax from '@/api/ajax.js'
import { Notification } from 'element-ui'
export default function (param) {
  return new Promise((resolve, reject) => {
    ajax.post(param, backData => {
      if (backData.data.code === -1) {
        console.log(backData.data)
      } else if (backData.data.code === 0) {
        resolve(backData.data.data)
      } else {
        Notification.error({
          title: '错误',
          message: backData.data.msg
        })
      }
    }, error => {
      reject(error)
    })
  })
}
