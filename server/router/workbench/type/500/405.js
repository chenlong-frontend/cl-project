let backData = [
  {
    flow_id: '222',
    flow_name: '黄金糕',
    icon: '/static/xls.png',
    platform: 0,
    pc_url: '/file-upload'
  }, {
    flow_id: '333',
    flow_name: '双皮奶',
    icon: '/static/ppt.png',
    platform: 1
  }]
let backDatas = {
  code: 0,
  data: backData,
  msg: 'ok'
}
module.exports = reponse
function reponse (param) {
  return backDatas
}
