import ajax from '@/api/ajax.js'

export default {
  // *******************得到请求菜单******************//
  getMenu () {
    return new Promise((resolve, reject) => {
      let empty = JSON.parse(sessionStorage.menu).filter(val => {
        return val.router_json.length !== 0
      }).map(val => {
        return JSON.parse(val.router_json).path
      })
      ajax.post({type: 701, data: {router: empty}}, data => {
        data.data.data.menu_info.forEach(t => {
          t.child.length === 0 ? delete t.child : delete t.href
        })
        resolve(data.data.data.menu_info)
      }, error => {
        console.log(error)
      })
    })
  },
  // *******************退出登录******************//
  logout () {
    return new Promise((resolve, reject) => {
      ajax.post({type: 415, data: {}}, data => {
        resolve(data.data)
      }, error => {
        console.log(error)
      })
    })
  },
  getRouter () {
    return new Promise((resolve, reject) => {
      ajax.post({type: 710}, backData => {
        resolve(backData.data)
      }, error => {
        reject(error)
      })
    })
  }
}
