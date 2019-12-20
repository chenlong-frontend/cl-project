const DepartmentUser =
  {
    Id: '1',
    name: '张小虎',
    birthday: '2017-11-06',
    sex: '男',
    cid: '320121199203231844',
    emp_num: '1234567',
    department: ['20170831145801048', '20170831145801072', '20170831145801076'],
    emp_post: '经理',
    mobile: '13209879823',
    telephone: '025-528888888',
    email: 'zhangxiaohu@sina.cn',
    remark: '水平一流',
    imageUrl: '',
    pass: '',
    checkPass: '',
    otherPhones: []
  }
const opt = [
  {
    id: '20170831145801048',
    parent_id: '1',
    label: '项目经理部',
    children: [
      {
        id: '20170831145801072',
        parent_id: '20170831145801048',
        label: '经理1部',
        children: [
          {
            id: '20170831145801073',
            parent_id: '20170831145801072',
            label: '经理1部1分部',
            children: null
          },
          {
            id: '20170831145801076',
            parent_id: '20170831145801072',
            label: '经理1部2分部',
            children: null
          },
          {
            id: '20170831145801099',
            parent_id: '20170831145801072',
            label: '经理1部4分部',
            children: null
          }
        ]
      },
      {
        id: '20170831145801074',
        parent_id: '20170831145801048',
        label: '经理2部',
        children: null
      },
      {
        id: '20170831145801075',
        parent_id: '20170831145801048',
        label: '经理3部',
        children: null
      },
      {
        id: '20170831145801200',
        parent_id: '20170831145801048',
        label: 'test',
        children: null
      }
    ]
  },
  {
    id: '20170831145801049',
    parent_id: '1',
    label: '安全部',
    children: null
  },
  {
    id: '20170831145801050',
    parent_id: '1',
    label: '工程部',
    children: null
  },
  {
    id: '20170831145801052',
    parent_id: '1',
    label: '质保部',
    children: null
  },
  {
    id: '20170831145801053',
    parent_id: '1',
    label: '综合办',
    children: null
  },
  {
    id: '20170831145801054',
    parent_id: '1',
    label: '合约部',
    children: null
  },
  {
    id: '20170831145801056',
    parent_id: '1',
    label: '技术部',
    children: null
  },
  {
    id: '20170831145801060',
    parent_id: '1',
    label: '财务部',
    children: null
  },
  {
    id: '20170831145801062',
    parent_id: '1',
    label: '物资部',
    children: null
  },
  {
    id: '20170831145801107',
    parent_id: '1',
    label: '1546Test',
    children: null
  }
]
const tempArray = {gro_list: opt, emp_detail: DepartmentUser}
let data = {
  code: 0,
  data: tempArray,
  msg: 'ok'
}

module.exports = reponse
function reponse (param) {
  return data
}
