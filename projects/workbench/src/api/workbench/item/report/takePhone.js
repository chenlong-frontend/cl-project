import ajax from '@/api/ajax.js'
// 年
const years = [{
  value: '2015',
  label: '2015'
}, {
  value: '2016',
  label: '2016'
}, {
  value: '2017',
  label: '2017'
}, {
  value: '2018',
  label: '2018'
}, {
  value: '2019',
  label: '2019'
}, {
  value: '2020',
  label: '2020'
}, {
  value: '2021',
  label: '2021'
}, {
  value: '2022',
  label: '2022'
}, {
  value: '2023',
  label: '2023'
}, {
  value: '2024',
  label: '2024'
}, {
  value: '2025',
  label: '2025'
}, {
  value: '2026',
  label: '2026'
}, {
  value: '2027',
  label: '2027'
}, {
  value: '2028',
  label: '2028'
}, {
  value: '2029',
  label: '2029'
}, {
  value: '2030',
  label: '2030'
}]
// 月
const months = [{
  value: '01',
  label: '01'
}, {
  value: '02',
  label: '02'
}, {
  value: '03',
  label: '03'
}, {
  value: '04',
  label: '04'
}, {
  value: '05',
  label: '05'
}, {
  value: '06',
  label: '06'
}, {
  value: '07',
  label: '07'
}, {
  value: '08',
  label: '08'
}, {
  value: '09',
  label: '09'
}, {
  value: '10',
  label: '10'
}, {
  value: '11',
  label: '11'
}, {
  value: '12',
  label: '12'
}]
const day = [{
  value: '01',
  label: '01'
}, {
  value: '02',
  label: '02'
}, {
  value: '03',
  label: '03'
}, {
  value: '04',
  label: '04'
}, {
  value: '05',
  label: '05'
}, {
  value: '06',
  label: '06'
}, {
  value: '07',
  label: '07'
}, {
  value: '08',
  label: '08'
}, {
  value: '09',
  label: '09'
}, {
  value: '10',
  label: '10'
}, {
  value: '11',
  label: '11'
}, {
  value: '12',
  label: '12'
}, {
  value: '13',
  label: '13'
}, {
  value: '14',
  label: '14'
}, {
  value: '15',
  label: '15'
}, {
  value: '16',
  label: '16'
}, {
  value: '17',
  label: '17'
}, {
  value: '18',
  label: '18'
}, {
  value: '19',
  label: '19'
}, {
  value: '20',
  label: '20'
}, {
  value: '21',
  label: '21'
}, {
  value: '22',
  label: '22'
}, {
  value: '23',
  label: '23'
}, {
  value: '24',
  label: '24'
}, {
  value: '25',
  label: '25'
}, {
  value: '26',
  label: '26'
}, {
  value: '27',
  label: '27'
}, {
  value: '28',
  label: '28'
}, {
  value: '29',
  label: '29'
}, {
  value: '30',
  label: '30'
}, {
  value: '31',
  label: '31'
}]
export default {
   // 页面加载时获取年份
  initYear () {
    return new Promise((resolve, reject) => {
      resolve(years)
    })
  },
  // 页面加载时获取月份
  initMonth () {
    return new Promise((resolve, reject) => {
      resolve(months)
    })
  },
  initDay () {
    return new Promise((resolve, reject) => {
      resolve(day)
    })
  },
  // 获取导航数据
  getNav (id) {
    return new Promise((resolve, reject) => {
      ajax.post({type: 423,
        data: {
          'report_id': id
        }}, backData => {
        resolve(backData.data)
      }, error => {
        reject(error)
      })
    })
  },
  // 页面加载时获取表格数据\导航\分页数   导航切换时的表格数据
  getTable (id) {
    return new Promise((resolve, reject) => {
      ajax.post({type: 424,
        data: {
          'report_id': id,
          'time': '',
          'name': '',
          'num': 0,
          'page_index': 1,
          'page_size': 10,
          'excel': 0
        }}, backData => {
        resolve(backData.data)
      }, error => {
        reject(error)
      })
    })
  },
  // 年份发生变化时获取的数据
  getYear (value1, id) {
    return new Promise((resolve, reject) => {
      ajax.post({type: 424,
        data: {
          'report_id': id,
          'time': value1,
          'name': '',
          'num': 0,
          'page_index': 1,
          'page_size': 10,
          'excel': 0
        }}, backData => {
        resolve(backData.data)
      }, error => {
        reject(error)
      })
    })
  },
  // 月份发生变化时获取的数据
  getMonth (value1, value2, id) {
    return new Promise((resolve, reject) => {
      ajax.post({type: 424,
        data: {
          'report_id': id,
          'time': value1 + '-' + value2,
          'name': '',
          'num': 0,
          'page_index': 1,
          'page_size': 10,
          'excel': 0
        }}, backData => {
        resolve(backData.data)
      }, error => {
        reject(error)
      })
    })
  },
  // 天发生变化时获取的数据
  getDay (value1, value2, value3, id) {
    return new Promise((resolve, reject) => {
      ajax.post({type: 424,
        data: {
          'report_id': id,
          'time': value1 + '-' + value2 + '-' + value3,
          'name': '',
          'num': 0,
          'page_index': 1,
          'page_size': 10,
          'excel': 0
        }}, backData => {
        resolve(backData.data)
      }, error => {
        reject(error)
      })
    })
  },
  // 搜索按钮的点击事件也需要tabindex
  seoData (value1, value2, value3, input, index, id) {
    if (value3) {
      return new Promise((resolve, reject) => {
        ajax.post({type: 424,
          data: {
            'report_id': id,
            'time': value1 + '-' + value2 + '-' + value3,
            'name': input,
            'num': index,
            'page_index': 1,
            'page_size': 10,
            'excel': 0
          }}, backData => {
          resolve(backData.data)
        }, error => {
          reject(error)
        })
      })
    } else {
      return new Promise((resolve, reject) => {
        ajax.post({type: 424,
          data: {
            'report_id': id,
            'time': value1 + '-' + value2,
            'name': input,
            'num': index,
            'page_index': 1,
            'page_size': 10,
            'excel': 0
          }}, backData => {
          resolve(backData.data)
        }, error => {
          reject(error)
        })
      })
    }
  },
  // 选择分页时执行的事件 需要年月和输入框以及tab
  pageRequest (value1, value2, value3, input, index, currentPage, id) {
    return new Promise((resolve, reject) => {
      ajax.post({type: 424,
        data: {
          'report_id': id,
          'time': value1 + '-' + value2 + '-' + value3,
          'name': input,
          'num': index,
          'page_index': currentPage,
          'page_size': 10,
          'excel': 0
        }}, backData => {
        resolve(backData.data)
      }, error => {
        reject(error)
      })
    })
  },
  // 导出Excel的点击事件 需要时间
  outExcel (value1, value2, value3, input, index, id) {
    return new Promise((resolve, reject) => {
      ajax.post({type: 424,
        data: {
          'report_id': id,
          'time': value1 + '-' + value2 + '-' + value3,
          'name': input,
          'num': index,
          'page_index': 1,
          'page_size': 10,
          'excel': 1
        }}, backData => {
        resolve(backData.data)
      }, error => {
        reject(error)
      })
    })
  }
}
