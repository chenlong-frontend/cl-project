const Mock = require('mockjs')
let Random = Mock.Random
let backData = Mock.mock({
  'page_info': {
    'start_index': '0',
    'page_num': '1',
    'page_no': '1',
    'page_count': '2',
    'page_size': '10'
  },
  'result_list|2-3': [
    {
      'eqpt_type_dur': '15',
      'eqpt_type_id': Random.id(),
      'eqpt_type_pro_id': Random.increment(),
      'eqpt_type_name': Random.cword(4),
      'eqpt_type_time': Random.date(),
      'eqpt_type_is_gen': -1,
      'eqpt_type_pow': '500',
      'eqpt_type_src_time': '10000',
      'eqpt_type_qty': '100',
      'eqpt_type_tag': '50'
    },
    {
      'eqpt_type_dur': '15',
      'eqpt_type_id': Random.id(),
      'eqpt_type_pro_id': Random.increment(),
      'eqpt_type_name': Random.cword(4),
      'eqpt_type_time': Random.date(),
      'eqpt_type_is_gen': 1,
      'eqpt_type_pow': '500',
      'eqpt_type_src_time': '10000',
      'eqpt_type_qty': '100',
      'eqpt_type_tag': '50'
    },
    {
      'eqpt_type_dur': '15',
      'eqpt_type_id': Random.id(),
      'eqpt_type_pro_id': Random.increment(),
      'eqpt_type_name': Random.cword(4),
      'eqpt_type_time': Random.date(),
      'eqpt_type_is_gen': 0,
      'eqpt_type_pow': '500',
      'eqpt_type_src_time': '10000',
      'eqpt_type_qty': '100',
      'eqpt_type_tag': '50'
    }]
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
