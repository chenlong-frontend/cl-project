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
              'value': '101'
            },
            {
              'text': Random.cword(3),
              'value': '100'
            },
            {
              'text': Random.cword(2),
              'value': '102'
            }],
          'text': Random.cword(2),
          'value': '11'
        },
        {
          'children': [
            {
              'text': Random.cword(3),
              'value': '120'
            },
            {
              'text': Random.cword(2),
              'value': '121'
            }
          ],
          'text': Random.cword(2),
          'value': '22'
        }
      ],
      'text': '中国',
      'value': '1'
    },
    {
      'children': [],
      'text': Random.cword(2),
      'value': '2'
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
