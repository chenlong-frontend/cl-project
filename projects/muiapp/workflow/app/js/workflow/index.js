var home={};
home.banner = [
    {pic:"http://www.zjgj.com/cn/myEditor/uploadfile/20160520083344103.jpg ",text:"彭向峰董事长出席莫桑比克－江苏企业家见面.."},
    {pic:"http://www.zjgj.com/cn/myEditor/uploadfile/20170428172619440.jpg",text:"中阿（联酋）产能合作示范园投资推介会在南.."},
    {pic:"http://www.zjgj.com/cn/myEditor/uploadfile/20170612150224132.jpg",text:"江苏银行与中江国际PPP项目融资支持基金.."},
    {pic:"http://www.zjgj.com/cn/myEditor/uploadfile/20170405093538108.jpg",text:"集团公司与上海电气集团共商深化合作.."},
    {pic:"http://www.zjgj.com/cn/myEditor/uploadfile/20170306104755305.jpg",text:"中江国际集团与上海国盛集团、中信锦绣资本.."},
    {pic:"http://www.zjgj.com/cn/myEditor/uploadfile/20160520083344103.jpg",text:"彭向峰董事长出席莫桑比克－江苏企业家见面.."},
    {pic:"http://www.zjgj.com/cn/myEditor/uploadfile/20170428172619440.jpg",text:"中阿（联酋）产能合作示范园投资推介会在南.."}
];
home.count = 8;
home.nav = {
    light:[{form_icon:"img/workflow/plat_camera.png",form_name:"施工随手拍",url:"../snapshot/index.html"},
        {form_icon:"img/workflow/plat_file.png",form_name:"文档管理",url:""},
        {form_icon:"img/workflow/monitor.png",form_name:"视频监控",url:""}],
    office:[{form_icon:"img/workflow/toDo.png",form_name:"待办事项",url:"working.html"},
        {form_icon:"img/workflow/attendance.png",form_name:"劳务实名制",url:""},
        {form_icon:"img/workflow/manager.png",form_name:"项目看板",url:""},
        {form_icon:"img/workflow/group.png",form_name:"集团门户",url:""},
        {form_icon:"img/workflow/approve.png",form_name:"审批",url:""},
        {form_icon:"img/workflow/leave.png",form_name:"请假",url:""},
        {form_icon:"img/workflow/workreport.png",form_name:"工作汇报",url:""},
        {form_icon:"img/workflow/announcement.png",form_name:"通知公告",url:""},
        {form_icon:"img/workflow/metting.png",form_name:"会议通知",url:""}]
};

app.workflowindex = new Vue({
   el:"#app-workflow-index",
   beforeMount:function () {
       tool.cookie.set([{name:"name",value:"章雷云",time:1},
                        {name:"dep_name",value:"技术部",time:1},
                        {name:"emp_post",value:"技术部负责人",time:1},
                        {name:"id",value:"20170831145328055",time:1},
                        {name:"avatar",value:"img/profile_small.jpg",time:1}]);
       this.banner=home.banner;
       this.count = 8;
       this.nav.light = home.nav.light;
       this.nav.office = home.nav.office;
   },
   mounted:function () {
       tool.waitLoad.display=false;
   },
   data:{
       banner:[],
       count:0,
       nav:{
           light:[],
           office:[]
       }
   },
   methods:{
       turnOut:function (url) {
            if (url.length === 0){
                mui.toast('功能开发中...',{ duration:'short', type:'div' });
            } else {
                window.location.href=url;
            }
       },
       msg:function () {
           mui.toast('功能开发中...',{ duration:'short', type:'div' });
       }
   }
});