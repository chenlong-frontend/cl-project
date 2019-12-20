let detailData = {
  name: 'TD0001',
  position: 'E:113.2243 ; N:23.1260',
  person: 'xxxx001',
  tel: '13328070340',
  time: '2017/11/20     12:00',
  reason: ['碰撞值预警', '塔机承重超过最大值', '风速大于6级'],
  project: ['调整塔机碰撞值', '调整塔机承受的重物重量', '等待风速变小'],
  imgs: [
    {src: '/static/home/art (3).jpeg'}, {src: '/static/home/art (3).jpeg'}, {src: '/static/home/art (3).jpeg'}, {src: '/static/home/art (3).jpeg'},
    {src: '/static/home/art (3).jpeg'}, {src: '/static/home/art (3).jpeg'}, {src: '/static/home/art (3).jpeg'}, {src: '/static/home/art (3).jpeg'},
    {src: '/static/home/art (3).jpeg'}, {src: '/static/home/art (3).jpeg'}, {src: '/static/home/art (3).jpeg'}, {src: '/static/home/art (3).jpeg'},
    {src: '/static/home/art (3).jpeg'}, {src: '/static/home/art (3).jpeg'}, {src: '/static/home/art (3).jpeg'}, {src: '/static/home/art (3).jpeg'}
  ]
}
let backDatas = {
  code: 0,
  data: {detailData: detailData},
  msg: 'ok'
}
module.exports = reponse
function reponse (param) {
  return backDatas
}
