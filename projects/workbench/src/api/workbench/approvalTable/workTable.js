import ajax from '@/api/ajax.js'

// const options = [
//   {
//     value: '选项1',
//     label: '黄金糕'
//   }, {
//     value: '选项2',
//     label: '双皮奶'
//   }, {
//     value: '选项3',
//     label: '蚵仔煎'
//   }, {
//     value: '选项4',
//     label: '龙须面'
//   }, {
//     value: '选项5',
//     label: '北京烤鸭'
//   }]

export default {
  getData () {
    return new Promise((resolve, reject) => {
      ajax.post({type: 405, data: {}}, backData => {
        console.log(backData.data)
        resolve(backData.data.data)
      }, error => {
        reject(error)
      })
    })
  },
  getTable (param) {
    return new Promise((resolve, reject) => {
      let pageIndex = (param.currentPage - 1).toString()
      // console.log(param)
      console.log(pageIndex)
      ajax.post({type: 408, data: {type: param.type, page_size: '10', search_key: param.input, flow_id: param.selectId, page_index: pageIndex}}, backData => {
        console.log(backData.data.data)
        resolve(backData.data.data)
      }, error => {
        reject(error)
      })
    })
  }
}
