let data = {
  'role_list': [
    {
      'name': '普通员工',
      'id': '-12'
    },
    {
      'name': '项目经理',
      'id': '39'
    },
    {
      'name': '项目总工',
      'id': '40'
    },
    {
      'name': '生产经理',
      'id': '41'
    },
    {
      'name': '技术部负责人',
      'id': '42'
    },
    {
      'name': '质保部负责人',
      'id': '43'
    },
    {
      'name': '安全部负责人',
      'id': '44'
    },
    {
      'name': '工程部负责人',
      'id': '45'
    },
    {
      'name': '物资部负责人',
      'id': '46'
    },
    {
      'name': '合约部负责人',
      'id': '47'
    },
    {
      'name': '综合办负责人',
      'id': '48'
    }
  ],
  'gro_trees': [
    {
      'id': '20170831145801048',
      'parent_id': '1',
      'label': '项目经理部',
      'children': [
        {
          'id': '20170831145801072',
          'parent_id': '20170831145801048',
          'label': '经理1部',
          'children': [
            {
              'id': '20170831145801073',
              'parent_id': '20170831145801072',
              'label': '经理1部1分部',
              'children': null
            },
            {
              'id': '20170831145801076',
              'parent_id': '20170831145801072',
              'label': '经理1部2分部',
              'children': null
            },
            {
              'id': '20170831145801099',
              'parent_id': '20170831145801072',
              'label': '经理1部4分部',
              'children': null
            }
          ]
        },
        {
          'id': '20170831145801074',
          'parent_id': '20170831145801048',
          'label': '经理2部',
          'children': null
        },
        {
          'id': '20170831145801075',
          'parent_id': '20170831145801048',
          'label': '经理3部',
          'children': null
        },
        {
          'id': '20170831145801200',
          'parent_id': '20170831145801048',
          'label': 'test',
          'children': null
        }
      ]
    },
    {
      'id': '20170831145801049',
      'parent_id': '1',
      'label': '安全部',
      'children': null
    },
    {
      'id': '20170831145801052',
      'parent_id': '1',
      'label': '质保部',
      'children': null
    },
    {
      'id': '20170831145801053',
      'parent_id': '1',
      'label': '综合办',
      'children': null
    },
    {
      'id': '20170831145801054',
      'parent_id': '1',
      'label': '合约部',
      'children': null
    },
    {
      'id': '20170831145801056',
      'parent_id': '1',
      'label': '技术部',
      'children': null
    },
    {
      'id': '20170831145801060',
      'parent_id': '1',
      'label': '财务部',
      'children': null
    },
    {
      'id': '20170831145801062',
      'parent_id': '1',
      'label': '物资部',
      'children': null
    },
    {
      'id': '20170831145801107',
      'parent_id': '1',
      'label': '1546Test',
      'children': null
    }
  ]
}

module.exports = reponse

function reponse () {
  return data
}
