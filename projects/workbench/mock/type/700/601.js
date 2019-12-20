const Mock = require('mockjs')
let Random = Mock.Random
let backData = Mock.mock({
  data: [{
    text: '流程配置',
    component: 'permission',
    'icon|1': ['fa fa-credit-card', 'fa fa-comments', 'fa fa-folder'],
    id: Random.id()
  },
  {
    text: '流程配置2',
    component: 'permission',
    'icon|1': ['fa fa-credit-card', 'fa fa-comments', 'fa fa-folder'],
    id: '123654'
  },
  {
    text: '表格报表',
    component: 'report',
    'icon|1': ['fa fa-credit-card', 'fa fa-comments', 'fa fa-folder'],
    id: Random.id()
  },
  {
    text: '图形报表',
    component: 'graph',
    'icon|1': ['fa fa-credit-card', 'fa fa-comments', 'fa fa-folder'],
    id: Random.id()
  }]
})
let backDatas = {
  code: 0,
  data: backData.data,
  msg: 'ok'
}
module.exports = reponse
function reponse (param) {
  return backDatas
}
