import ajax from '@/api/ajax.js'
export default {
  // 获取当前页面表格信息,传入页码和搜索框
  getPersonInfo (towerID) {
    return new Promise((resolve, reject) => {
      console.log(ajax)
      ajax.post({type: 155, data: {'id': towerID}}, data => {
        resolve(data)
      }, error => {
        reject(error)
      })
    })
  }
}
