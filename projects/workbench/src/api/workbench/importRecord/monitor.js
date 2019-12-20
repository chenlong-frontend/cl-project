import ajax from '@/api/ajax.js'
// const picItems = [
//   {id: '1', url: '../../../assets/img/home/build.png', text: 'sada'},
//   {id: '2', url: '../../../assets/img/home/proBg.png', text: 'sada'},
//   {id: '3', url: '../../../assets/img/home/build.png', text: 'sada'},
//   {id: '4', url: '../../../assets/img/home/proBg.png', text: 'sada'},
//   {id: '5', url: '../../../assets/img/home/build.png', text: 'sada'}
// ]
export default {
  getCarInfo (param) {
    return new Promise((resolve, reject) => {
      console.log(param)
      ajax.post({type: 1310, data: {loado_num: param.id, car_number: param.carNum}}, backData => {
        resolve(backData.data.data)
      }, error => {
        reject(error)
      })
    })
  },
  // /**********************点击出料收料获取信息****************/
  dealMaterial (param) {
    return new Promise((resolve, reject) => {
      ajax.post({type: 1311, data: {material_type: param}}, backData => {
        resolve(backData.data.data)
      }, error => {
        reject(error)
      })
    })
  },
  // *********************提交表单**********************
  submitData (param) {
    return new Promise((resolve, reject) => {
      ajax.post({type: 1312, data: param}, backData => {
        resolve()
      }, error => {
        reject(error)
      })
    })
  }
}
