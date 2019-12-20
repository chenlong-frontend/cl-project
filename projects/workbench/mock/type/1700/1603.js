const Mock = require('mockjs')
let backData = Mock.mock({
  'page_info': {
    'page_num': '2',
    'page_no': '1',
    'start_index': '0',
    'page_count': '60',
    'page_size': '10'
  },
  'task_list': [
    {
      'task_name': '任务1',
      'task_p_id': 111,
      'task_emp_name_chg': '张成功',
      'task_prog_act': 162.5,
      'task_id': '1',
      'task_emp_name_cre': '张成功',
      'task_gmt_end': '2018-03-23',
      'task_prog_plan': 100,
      'task_emp_id_chg': '20180302101126184',
      'task_gmt_cre': '1520904465000',
      'task_is_last': 0,
      'task_gmt_mod': 1520904465000,
      'task_emp_id_cre': '20180302101126184',
      'task_gmt_start': '2018-03-01',
      'task_pro_id': '1',
      'task_num': '1'
    },
    {
      'task_name': '任务2',
      'task_p_id': '0',
      'task_emp_name_chg': '张成功',
      'task_prog_act': 62.3433,
      'task_id': '2',
      'task_emp_name_cre': '张成功',
      'task_gmt_end': '2018-03-23',
      'task_prog_plan': 100.0000,
      'task_emp_id_chg': '20180302101126184',
      'task_gmt_cre': '1520904465000',
      'task_is_last': 0,
      'task_gmt_mod': 1520904465000,
      'task_emp_id_cre': '20180302101126184',
      'task_gmt_start': '2018-03-01',
      'task_pro_id': '1',
      'task_num': '1'
    },
    {
      'task_name': '任务3',
      'task_p_id': 333,
      'task_emp_name_chg': '张成功',
      'task_prog_act': 92.5,
      'task_id': '3',
      'task_emp_name_cre': '张成功',
      'task_gmt_end': '2018-04-22',
      'task_prog_plan': 100,
      'task_emp_id_chg': '20180302101126184',
      'task_gmt_cre': '1520904465000',
      'task_is_last': 1,
      'task_gmt_mod': 1520904465000,
      'task_emp_id_cre': '20180302101126184',
      'task_gmt_start': '2018-03-01',
      'task_pro_id': '1',
      'task_num': '1'
    },
    {
      'task_name': '任务4',
      'task_p_id': 444,
      'task_emp_name_chg': '张成功',
      'task_prog_act': 62.5,
      'task_id': '4',
      'task_emp_name_cre': '张成功',
      'task_gmt_end': '2018-03-12',
      'task_prog_plan': 100,
      'task_emp_id_chg': '20180302101126184',
      'task_gmt_cre': '1520904465000',
      'task_is_last': 1,
      'task_gmt_mod': 1520904465000,
      'task_emp_id_cre': '20180302101126184',
      'task_gmt_start': '2018-03-01',
      'task_pro_id': '1',
      'task_num': '1'
    },
    {
      'task_name': '任务5',
      'task_p_id': 555,
      'task_emp_name_chg': '张成功',
      'task_prog_act': 22.5,
      'task_id': '5',
      'task_emp_name_cre': '张成功',
      'task_gmt_end': '2018-03-22',
      'task_prog_plan': 100,
      'task_emp_id_chg': '20180302101126184',
      'task_gmt_cre': '1520904465000',
      'task_is_last': 1,
      'task_gmt_mod': 1520904465000,
      'task_emp_id_cre': '20180302101126184',
      'task_gmt_start': '2018-03-01',
      'task_pro_id': '1',
      'task_num': '1'
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
