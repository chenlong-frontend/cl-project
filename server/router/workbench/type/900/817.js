const Mock = require('mockjs')
let Random = Mock.Random
let backData = Mock.mock({
  'area': [
    {
      'children': [
        {
          'children': [
            {
              'text': Random.cword(2),
              'value': '301'
            },
            {
              'text': Random.cword(3),
              'value': '300'
            },
            {
              'text': Random.cword(2),
              'value': '302'
            }],
          'text': Random.cword(2),
          'value': '33'
        },
        {
          'children': [
            {
              'text': Random.cword(3),
              'value': '320'
            },
            {
              'text': Random.cword(2),
              'value': '321'
            }
          ],
          'text': Random.cword(2),
          'value': '44'
        }
      ],
      'text': '中国',
      'value': '3'
    },
    {
      'children': [],
      'text': '美国',
      'value': '4'
    }
  ]
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
