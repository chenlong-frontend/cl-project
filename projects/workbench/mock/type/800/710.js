let menu = [
  {
    form_id: '1',
    name: '主页',
    router_json: '{"path":"/home","component":"home/home","model":"static"}'
  },
  {
    form_id: '2',
    name: 'PC菜单管理',
    router_json: '{"path":"/adminManage-menu","component":"adminManage/menu","model":"static"}'
  },
  {
    form_id: '3',
    name: '功能管理',
    router_json: '{"path":"/adminManage-menuEdit","component":"adminManage/menuEdit","model":"static"}'
  },
  {
    form_id: '4',
    name: '功能配置',
    router_json: '{"path":"/adminManage-menuManage","component":"adminManage/menuManage","model":"static"}'
  },
  {
    form_id: '5',
    name: '流程配置',
    router_json: '{"path":"/adminManage-process","component":"adminManage/process","model":"static"}'
  },
  {
    form_id: '6',
    name: '手机菜单管理',
    router_json: '{"path":"/adminManage-menu-mobile","component":"adminManage/menuMobile","model":"static"}'
  },
  {
    form_id: '7',
    name: '项目管理',
    router_json: '{"path":"/graph-manage","component":"components/router/manage","model":"static","extra":"820"}'
  },
  {
    form_id: '8',
    name: '流程管理',
    router_json: '{"path":"/router-manage","component":"components/router/manage","model":"static","extra":"601"}'
  },
  {
    form_id: '9',
    name: '工种管理',
    router_json: '{"path":"/permission-workType","component":"permission/workType","model":"static"}'
  },
  {
    form_id: '10',
    name: '部门管理',
    router_json: '{"path":"/permission-department","component":"permission/department","model":"static"}'
  },
  {
    form_id: '11',
    name: '人员管理',
    router_json: '{"path":"/staff-department","component":"staff/department","model":"static"}'
  },
  {
    form_id: '12',
    name: '项目管理',
    router_json: '{"path":"/item-management","component":"item/management","model":"static"}'
  },
  {
    form_id: '13',
    name: '人员通讯录',
    router_json: '{"path":"/staff-contract","component":"contract/staffContract","model":"static"}'
  },
  {
    form_id: '14',
    name: '上传文档',
    router_json: '{"path":"/file-upload","component":"file/upload","model":"static"}'
  },
  {
    form_id: '15',
    name: '工作区文件夹',
    router_json: '{"path":"/file-workFolder","component":"file/workFolder","model":"file","child":[{"name": "文件夹","path":":model/:path","component": "components/file/folder"}]}'
  },
  {
    form_id: '16',
    name: '分公司管理',
    router_json: '{"path":"/subCompany-messageList","component":"subCompany/messageList","model":"static"}'
  },
  {
    form_id: '17',
    name: '体验点及二维码管理',
    router_json: '{"path":"/vrManage","component":"vr/vrManage","model":"static"}'
  },
  {
    form_id: '18',
    name: '监控列表',
    router_json: '{"path":"/monitorList","component":"videoManage/monitorList","model":"static","child":[{"name":"摄像头管理","model": "dynamic","path":"video-workFolder/:model/:path","component": "components/file/videoFolder"}]}'
  },
  {
    form_id: '19',
    name: '截屏相册',
    router_json: '{"path":"/screenAlbum","component":"videoManage/screenAlbum","model":"static"}'
  },
  {
    form_id: '20',
    name: '录像机管理',
    router_json: '{"path":"/vtrManage","component":"videoManage/vtrManage","model":"static"}'
  },
  {
    form_id: '21',
    name: '我的项目信息',
    router_json: '{"path":"/electronic-myPro","component":"electronic/myPro","model":"static"}'
  },
  {
    form_id: '22',
    name: '设备管理',
    router_json: '{"path":"/electronic-devices","component":"electronic/devices","model":"static"}'
  },
  {
    form_id: '24',
    name: '塔机状况概览',
    router_json: '{"path":"/tower-generalCondition","component":"tower/generalCondition","model":"static"}'
  },
  {
    form_id: '25',
    name: '运行统计',
    router_json: '{"path":"/tower-run","component":"tower/run","model":"static"}'
  },
  {
    form_id: '26',
    name: '报警统计',
    router_json: '{"path":"/tower-police","component":"tower/police","model":"static"}'
  },
  {
    form_id: '27',
    name: '塔吊信息管理',
    router_json: '{"path":"/tower-towerInformation","component":"tower/towerInformation","model":"static"}'
  },
  {
    form_id: '28',
    name: '工作台',
    router_json: '{"path":"/workTable","component":"approvalTable/workTable","model":"static"}'
  },
  {
    form_id: '29',
    name: '统计报表',
    router_json: '{"path":"/statement","component":"approvalTable/statement","model":"static"}'
  },
  {
    form_id: '30',
    name: '集团管理',
    router_json: '{"path":"/groupTable","component":"groupManager/groupTable","model":"static"}'
  },
  {
    form_id: '31',
    name: '工作区域分布概览',
    router_json: '{"path":"/workArea","component":"personPosition/workArea","model":"static"}'
  },
  {
    form_id: '32',
    name: '滞留情况',
    router_json: '{"path":"/stranded","component":"personPosition/stranded","model":"static"}'
  },
  {
    form_id: '33',
    name: '安全帽电量检测',
    router_json: '{"path":"/helmetDetection","component":"personPosition/helmetDetection","model":"static"}'
  },
  {
    form_id: '34',
    name: '信息录入与对接',
    router_json: '{"path":"/entryInfo","component":"personPosition/entryInfo","model":"static"}'
  },
  {
    form_id: '35',
    name: '区域设置',
    router_json: '{"path":"/areaSet","component":"personPosition/areaSet","model":"static"}'
  },
  {
    form_id: '36',
    name: '报表管理',
    router_json: '{"path":"/reportTable","component":"reportManage/reportTable","model":"static"}'
  },
  {
    form_id: '37',
    name: '报表配置',
    router_json: '{"path":"/permission-reportEdit","component":"permission/reportEdit","model":"static"}'
  },
  {
    form_id: '38',
    name: '物料信息管理',
    router_json: '{"path":"/materialManage","component":"materialRecord/materialManage","model":"static"}'
  },
  {
    form_id: '39',
    name: '车辆信息管理',
    router_json: '{"path":"/carManage","component":"materialRecord/carManage","model":"static"}'
  },
  {
    form_id: '40',
    name: '车辆进出记录',
    router_json: '{"path":"/carRecord","component":"materialRecord/carRecord","model":"static"}'
  },
  {
    form_id: '41',
    name: '路由错误',
    router_json: '{"path":"/error","component":"errorpage/errorOne","model":"static"}'
  },
  {
    form_id: '42',
    name: '公司管理',
    router_json: '{"path":"/companyTable","component":"companyManage/companyTable","model":"static"}'
  },
  {
    form_id: '43',
    name: '地磅监控',
    router_json: '{"path":"/monitor","component":"importRecord/monitor","model":"static"}'
  },
  {
    form_id: '44',
    name: '地磅信息管理',
    router_json: '{"path":"/infoManage","component":"importRecord/infoManage","model":"static"}'
  },
  {
    form_id: '45',
    name: '进度概览',
    router_json: '{"path":"/proMsg","component":"proProcess/proMsg","model":"static"}'
  },
  {
    form_id: '46',
    name: '进度管理',
    router_json: '{"path":"/proManage","component":"proProcess/proManage","model":"static"}'
  },
  {
    form_id: '47',
    name: '项目甘特图',
    router_json: '{"path":"/proCharts","component":"proProcess/proCharts","model":"static"}'
  },
  {
    form_id: '48',
    name: '绿色创优概览',
    router_json: '{"path":"/green","component":"green/green","model":"static"}'
  },
  {
    form_id: '49',
    name: '工程质量',
    router_json: '{"path":"/green-quality","component":"green/quality","model":"static"}'
  },
  {
    form_id: '50',
    name: '科技创优',
    router_json: '{"path":"/green-science","component":"green/science","model":"static"}'
  },
  {
    form_id: '51',
    name: '标准化文明示范工地',
    router_json: '{"path":"/green-plant","component":"green/plant","model":"static"}'
  },
  {
    form_id: '53',
    name: '生产资金往来账目',
    router_json: '{"path":"/exchangeFund","component":"multipleOutput/exchangeFund","model":"static"}'
  },
  {
    form_id: '54',
    name: '综合产值报表',
    router_json: '{"path":"/multipleProduction","component":"multipleOutput/multipleProduction","model":"static"}'
  }
]

let backDatas = {
  code: 0,
  data: menu,
  msg: 'ok'
}

module.exports = reponse

function reponse (param) {
  return backDatas
}
