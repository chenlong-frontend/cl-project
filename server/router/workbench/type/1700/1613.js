const Mock = require('mockjs')
let Random = Mock.Random
let backData = Mock.mock({
  'page_info': {
    'page_num': '2',
    'page_no': '1',
    'start_index': '0',
    'page_count': '60',
    'page_size': '10'
  },
  'record_list|1-5': [
    {
      'rec_id': 1,
      'rec_pro_id': '111',
      'rec_task_id': '10000',
      'rec_con': '3sefsdvds',
      'rec_pic_url': Random.image('280x120', '#50B347'),
      'rec_prog': 60,
      'emp_id_cre': 123123,
      'rec_gmt_cre': Random.date('yyyy-MM-dd'),
      'rec_gmt_mod': Random.date('yyyy-MM-dd')
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
