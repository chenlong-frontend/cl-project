const Mock = require('mockjs')
let Random = Mock.Random
let menu = [
  {id: 1, name: '主页', order: 0, icon: Random.image('50x50', '#FF6600'), child: [{id: '001', icon: 'fa fa-gears', name: '主页', href: '/home'}]},
  {
    id: 3000,
    name: '后台管理',
    order: 1,
    icon: Random.image('50x50', '#FF6600'),
    child: [{id: 3001, name: 'PC菜单管理', icon: 'fa fa-gears', href: '/adminManage-menu'}, {
      id: 3100,
      name: '功能管理',
      href: '/adminManage-menuEdit'
    }, {
      id: 3101, name: '功能配置', icon: 'fa fa-gears', href: '/adminManage-menuManage'
    }, {
      id: 3102, name: '流程配置', icon: 'fa fa-gears', href: '/adminManage-process'
    }, {id: 3103, name: '手机菜单管理', icon: 'fa fa-gears', href: '/adminManage-menu-mobile'}]
  },
  {
    id: 111,
    name: '权限管理',
    order: 2,
    icon: Random.image('50x50', '#FF6600'),
    child: [{id: 2, name: '流程管理', href: '/router-manage'}, {
      id: 202,
      name: '工种管理',
      href: '/permission-workType'
    }, {id: 201, name: '部门管理', icon: 'fa fa-gears', href: '/permission-department'}, {id: 205, icon: 'fa fa-gears', name: '报表配置', href: '/permission-reportEdit'}]
  },
  {id: 4, name: '人员管理', icon: Random.image('50x50', '#FF6600'), order: 3, child: [{id: 5, icon: 'fa fa-gears', name: '人员管理', href: '/staff-department'}]},
  {
    id: 6,
    name: '项目管理',
    order: 4,
    icon: Random.image('50x50', '#FF6600'),
    child: [{id: 7, name: '项目管理', icon: 'fa fa-gears', href: '/item-management'}, {id: 8, name: '项目统计报表', icon: 'fa fa-gears', href: '/graph-manage'}]
  },
  {
    id: 2000,
    name: '光伏发电管理',
    order: 0,
    icon: Random.image('50x50', '#FF6600'),
    child: [{id: 2007, name: '我的项目信息', href: '/electronic-myPro'},
            {id: 2008, name: '设备管理', href: '/electronic-devices'}]
  },
  {
    id: 20000,
    name: '绿色创优概览',
    order: 0,
    icon: Random.image('50x50', '#FF6600'),
    child: [{id: 20001, name: '工程质量', icon: 'fa fa-joomla', href: '/green-quality'},
            {id: 20002, name: '科技创优', icon: 'fa fa-hourglass', href: '/green-science'},
            {id: 20003, name: '标准化文明示范工地', icon: 'fa fa-gavel', href: '/green-plant'},
            {id: 20004, name: '绿色创优概览', icon: 'fa fa-gavel', href: '/green'}]
  },
  {
    id: 5000,
    name: '塔吊检测',
    order: 0,
    icon: Random.image('50x50', '#FF6600'),
    child: [{id: 5001, name: '塔机状况概览', icon: 'fa fa-gears', href: '/tower-generalCondition'},
            {id: 5002, name: '运行统计', icon: 'fa fa-gears', href: '/tower-run'},
            {id: 5003, name: '报警统计', icon: 'fa fa-gears', href: '/tower-police'},
            {id: 5004, name: '塔吊信息管理', icon: 'fa fa-gears', href: '/tower-towerInformation'}]
  },
  {
    id: 5200,
    name: '项目进度',
    order: 0,
    icon: Random.image('50x50', '#FF6600'),
    child: [
      {id: 5211, icon: 'fa fa-gears', name: '进度概览', href: '/proMsg'},
      {id: 5212, icon: 'fa fa-gears', name: '进度管理', href: '/proManage'},
      {id: 5213, icon: 'fa fa-gears', name: '项目甘特图', href: '/proCharts'}
    ]
  },
  {
    id: 5100,
    name: '人员定位',
    order: 0,
    icon: Random.image('50x50', '#FF6600'),
    child: [
      {id: 5111, name: '工作区域分布概览', href: '/workArea'},
      {id: 5112, name: '滞留情况', href: '/stranded'},
      {id: 5113, name: '安全帽电量检测', href: '/helmetDetection'},
      {id: 5114, name: '信息录入与对接', href: '/entryInfo'},
      {id: 5115, name: '区域设置', href: '/areaSet'}
    ]
  },
  {
    id: 20,
    name: '人员通讯录',
    order: 0,
    icon: Random.image('50x50', '#FF6600'),
    child: [{id: 5, name: '人员通讯录', icon: 'fa fa-gears', href: '/staff-contract'}]
  },
  {
    id: 202,
    name: '文档管理',
    order: 0,
    icon: Random.image('50x50', '#FF6600'),
    child: [{id: 203, name: '上传文档', icon: 'fa fa-gears', href: '/file-upload'}, {
      id: 204,
      name: '工作区文件夹',
      href: '/file-workFolder/list/%E4%B8%BB%E7%9B%AE%E5%BD%95'
    }]
  },
  {
    id: 4000,
    name: '分公司管理',
    order: 0,
    icon: Random.image('50x50', '#FF6600'),
    child: [{id: 4001, name: '分公司管理', icon: 'fa fa-gears', href: '/subCompany-messageList'}]
  },
  {
    id: 4002,
    name: 'VR体验点',
    order: 0,
    icon: Random.image('50x50', '#FF6600'),
    child: [{id: 4003, name: '体验点及二维码管理', icon: 'fa fa-gears', href: '/vrManage'}]
  },
  {
    id: 4004,
    name: '视频监控管理',
    order: 0,
    icon: Random.image('50x50', '#FF6600'),
    child: [
      {id: 4005, name: '监控列表', icon: 'fa fa-gears', href: '/monitorList/video-workFolder/list/%E4%B8%BB%E7%9B%AE%E5%BD%95'},
      {id: 4006, name: '截屏相册', icon: 'fa fa-gears', href: '/screenAlbum'},
      {id: 4007, name: '录像机管理', icon: 'fa fa-gears', href: '/vtrManage'}
    ]
  },
  {
    id: 4008,
    name: '审批台',
    order: 0,
    icon: Random.image('50x50', '#FF6600'),
    child: [
      {id: 5012, name: '工作台', icon: 'fa fa-gears', href: '/workTable'},
      {id: 5013, name: '统计报表', icon: 'fa fa-gears', href: '/statement'}
    ]
  },
  {
    id: 4050,
    name: '集团管理',
    order: 0,
    icon: Random.image('50x50', '#FF6600'),
    child: [{id: 4051, name: '集团管理', icon: 'fa fa-gears', href: '/groupTable'}]
  },
  {
    id: 4052,
    name: '报表管理',
    order: 0,
    icon: Random.image('50x50', '#FF6600'),
    child: [{id: 4053, name: '报表管理', href: '/reportTable'}]
  },
  {
    id: 4054,
    name: '进场物料记录',
    order: 0,
    icon: Random.image('50x50', '#FF6600'),
    child: [
      {id: 4055, name: '物料信息管理', icon: 'fa fa-gears', href: '/materialManage'},
      {id: 4056, name: '车辆信息管理', icon: 'fa fa-gears', href: '/carManage'},
      {id: 4057, name: '车辆进出记录', icon: 'fa fa-gears', href: '/carRecord'}
    ]
  },
  {
    id: 4058,
    name: '公司管理',
    order: 0,
    icon: Random.image('50x50', '#FF6600'),
    child: [{id: 4059, name: '公司管理', icon: 'fa fa-gears', href: '/companyTable'}]
  },
  {
    id: 4060,
    name: '进场物料记录',
    order: 0,
    icon: Random.image('50x50', '#FF6600'),
    child: [
      {id: 4061, name: '地磅监控', icon: 'fa fa-gears', href: '/monitor'},
      {id: 4062, name: '地磅信息管理', icon: 'fa fa-gears', href: '/infoManage'}
    ]
  },
  {
    id: 4063,
    name: '综合产值报表',
    order: 0,
    icon: Random.image('50x50', '#FF6600'),
    child: [
      {id: 4064, name: '生产资金往来账目', icon: 'fa fa-gears', href: '/exchangeFund'},
      {id: 4065, name: '综合产值报表', icon: 'fa fa-gears', href: '/multipleProduction'}
    ]
  }
]

let backDatas = {
  code: 0,
  data: {menu_info: menu},
  msg: 'ok'
}

module.exports = reponse

function reponse (param) {
  return backDatas
}
