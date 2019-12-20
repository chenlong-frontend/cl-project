const Mock = require('mockjs')
let Random = Mock.Random
let backData = Mock.mock({
  'news_list|15': [
    {
      'news_id': Random.id(),
      'id': Random.id(),
      'title': Random.cword(20),
      'href': '',
      'class': '77',
      'time': Random.date()
    },
    {
      'news_id': Random.id(),
      'id': Random.id(),
      'title': Random.cword(20),
      'href': '',
      'class': '30',
      'time': Random.date()
    },
    {
      'news_id': Random.id(),
      'id': Random.id(),
      'title': Random.cword(20),
      'href': '',
      'class': '31',
      'time': Random.date()
    }
  ],
  'page_info': {
    'page_no': '',
    'page_num': '',
    'page_size': 6,
    'page_count': 8,
    'start_index': 0
  }
})
let backDatas = {
  code: 0,
  data: backData,
  msg: 'ok'
}
module.exports = reponse
function reponse (param) {
  return backDatas
}
