let states = [
  {title: '当前风速', data: '一级', state: '安全', stateNum: 0},
  {title: '当前幅度', data: '25.6米', state: '安全', stateNum: 0},
  {title: '当前碰撞角度', data: '88.7', state: '警告', stateNum: 1},
  {title: '当前高度', data: '0.5米', state: '安全', stateNum: 0},
  {title: '当前吊重', data: '0.05T', state: '安全', stateNum: 0},
  {title: '当前倾角', data: '17', state: '危险', stateNum: 2},
  {title: '当前倍率', data: '4倍', state: '安全', stateNum: 0},
  {title: 'GPS状态', data: '', state: '信号正常', stateNum: 0}
]
let backDatas = {
  code: 0,
  data: {states: states, stateJudge: '不正常工作'},
  msg: 'ok'
}
module.exports = reponse
function reponse (param) {
  return backDatas
}
