const Mock = require('mockjs')
let Random = Mock.Random
let backData = Mock.mock({
  'data|2-5': [
    {
      '项目名称': Random.cword(5),
      '姓名': Random.cword(3),
      '反馈': '',
      '时间': Random.datetime(),
      '时长': '2小时10分钟',
      'id': Random.id()
    }
  ],
  'head': [
    {
      'prop': '项目名称',
      'label': Random.cword(4)
    },
    {
      'prop': '姓名',
      'label': Random.cword(2)
    },
    {
      'prop': '反馈',
      'label': Random.cword(2)
    },
    {
      'prop': '时间',
      'label': Random.cword(2)
    },
    {
      'prop': '时长',
      'label': Random.cword(2)
    },
    {
      'prop': 'id',
      'label': Random.id()
    }
  ],
  'count|1-10': 10
})

let backDatas = {
  code: 0,
  data: {backData: backData, download_url: Random.url()},
  msg: 'ok'
}
module.exports = reponse
function reponse (param) {
  return backDatas
}
