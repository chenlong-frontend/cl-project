const Mock = require('mockjs')
// let Random = Mock.Random
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
      'eqpt_pos': '1',
      'eqpt_type_id': '1',
      'eqpt_num': '发电/用电1',
      'eqpt_id': '1',
      'eqpt_type_name': 'name1',
      'eqpt_name': '发电/用电',
      'eqpt_is_gen': -1,
      'eqpt_pro_id': '1',
      'eqpt_time': 1515128720000,
      'eqpt_tag': 0,
      'eqpt_type_pow': '500'
    },
    {
      'eqpt_pos': '不知道在哪里',
      'eqpt_type_id': '1',
      'eqpt_num': '发电/用电2',
      'eqpt_id': '20180108091900001',
      'eqpt_type_name': 'name2',
      'eqpt_name': '发电/用电1',
      'eqpt_type_pow': '500',
      'eqpt_is_gen': -1,
      'eqpt_pro_id': '1',
      'eqpt_time': 1515374340000,
      'eqpt_tag': 0
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
