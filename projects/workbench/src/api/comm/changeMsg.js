import ajax from '@/api/ajax.js'

export default {
  changePwd (item) {
    return new Promise((resolve, reject) => {
      ajax.post({type: 428, data: {'new_pwd': item.pass, 'old_pwd': item.prePass}}, data => {
        resolve(data)
      }, error => {
        console.log(error)
      })
    })
  },
  getpersonMsg () {
    return new Promise((resolve, reject) => {
      ajax.post({type: 421}, data => {
        resolve(data.data.data)
      }, error => {
        console.log(error)
      })
    })
  },
  changePersonMsg (item) {
    return new Promise((resolve, reject) => {
      ajax.post({type: 426, data: item},
          data => {
            resolve(data)
          }, error => {
            console.log(error)
          })
    })
  },
  settingIndex () {
    return new Promise((resolve, reject) => {
      ajax.post({type: 387},
        data => {
          resolve(data.data.data)
        }, error => {
          console.log(error)
        })
    })
  },
  sendSettingChange () {
    return new Promise((resolve, reject) => {
      ajax.post({type: 388},
        data => {
          resolve(data)
        }, error => {
          console.log(error)
        })
    })
  },
  changeProject (item) {
    return new Promise((resolve, reject) => {
      ajax.post({type: 1009, data: item},
        data => {
          resolve(data)
        }, error => {
          console.log(error)
        })
    })
  },
  changeIndex (item) {
    return new Promise((resolve, reject) => {
      ajax.post({type: 419, data: item},
        data => {
          resolve(data)
        }, error => {
          console.log(error)
        })
    })
  }
}
