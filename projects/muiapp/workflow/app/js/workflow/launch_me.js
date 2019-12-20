var launch = {};
launch.nav = [
    {node_name:"安全质量拍照"},{node_name:"上传新文档"}
];
launch.allData=[
    {flow_name:"文件上传申请",alias:"待审核",last_emp_name:"张雷云",icon:"img/workflow/list_folder.png",history_time:"2017-10-23 16:02",alias_css:"#4B0082"},
    {flow_name:"文件上传申请",alias:"待审核",last_emp_name:"张雷云",icon:"img/workflow/list_folder.png",history_time:"2017-10-23 16:02",alias_css:"#4B0082"},
    {flow_name:"文件上传申请",alias:"待审核",last_emp_name:"张雷云",icon:"img/workflow/list_folder.png",history_time:"2017-10-23 16:02",alias_css:"#4B0082"},
    {flow_name:"文件上传申请",alias:"待审核",last_emp_name:"张雷云",icon:"img/workflow/list_folder.png",history_time:"2017-10-23 16:02",alias_css:"#4B0082"},
    {flow_name:"文件上传申请",alias:"待审核",last_emp_name:"张雷云",icon:"img/workflow/list_folder.png",history_time:"2017-10-23 16:02",alias_css:"#4B0082"},
    {flow_name:"文件上传申请",alias:"待审核",last_emp_name:"张雷云",icon:"img/workflow/list_folder.png",history_time:"2017-10-23 16:02",alias_css:"#4B0082"},
    {flow_name:"文件上传申请",alias:"待审核",last_emp_name:"张雷云",icon:"img/workflow/list_folder.png",history_time:"2017-10-23 16:02",alias_css:"#4B0082"}
];
launch.tab = [
    {alias:"待处理"},{alias:"待审核"},{alias:"待确认"},{alias:"待重传"}
];
launch.tabData=[
    {flow_name:"文件上传申清",alias:"待审核",last_emp_name:"张雷云",icon:"img/workflow/list_folder.png",history_time:"2017-10-23 16:02",alias_css:"#4B0082"},
    {flow_name:"文件上传申请",alias:"待审核",last_emp_name:"张雷云",icon:"img/workflow/list_folder.png",history_time:"2017-10-23 16:02",alias_css:"#4B0082"},
    {flow_name:"文件上传申请",alias:"待审核",last_emp_name:"张雷云",icon:"img/workflow/list_folder.png",history_time:"2017-10-23 16:02",alias_css:"#4B0082"},
    {flow_name:"文件上传申请",alias:"待审核",last_emp_name:"张雷云",icon:"img/workflow/list_folder.png",history_time:"2017-10-23 16:02",alias_css:"#4B0082"},
    {flow_name:"文件上传申请",alias:"待审核",last_emp_name:"张雷云",icon:"img/workflow/list_folder.png",history_time:"2017-10-23 16:02",alias_css:"#4B0082"},
    {flow_name:"文件上传申请",alias:"待审核",last_emp_name:"张雷云",icon:"img/workflow/list_folder.png",history_time:"2017-10-23 16:02",alias_css:"#4B0082"}
];
launch.tabData2=[
    {flow_name:"文件上传申清2",alias:"待审核",last_emp_name:"张雷云",icon:"img/workflow/list_folder.png",history_time:"2017-10-23 16:02",alias_css:"#4B0082"},
    {flow_name:"文件上传申请",alias:"待审核",last_emp_name:"张雷云",icon:"img/workflow/list_folder.png",history_time:"2017-10-23 16:02",alias_css:"#4B0082"},
    {flow_name:"文件上传申请",alias:"待审核",last_emp_name:"张雷云",icon:"img/workflow/list_folder.png",history_time:"2017-10-23 16:02",alias_css:"#4B0082"},
    {flow_name:"文件上传申请",alias:"待审核",last_emp_name:"张雷云",icon:"img/workflow/list_folder.png",history_time:"2017-10-23 16:02",alias_css:"#4B0082"},
    {flow_name:"文件上传申请",alias:"待审核",last_emp_name:"张雷云",icon:"img/workflow/list_folder.png",history_time:"2017-10-23 16:02",alias_css:"#4B0082"}
];

app.workflowlaunchme = new Vue({
    el:"#app-workflow-launch-me",
    beforeMount:function () {
        var self=this;
        launch.nav.unshift({node_name:"全部"});
        self.navBar = launch.nav;
        self.allData = launch.allData;
    },
    mounted:function () {
        var self = this;
        tool.waitLoad.display=false;
        mui.init();
        mui.ready(function() {
            mui('.mui-scroll-wrapper').scroll();
            document.querySelector('.mui-slider').addEventListener('slide', function(event) {
                self.tabActive = event.detail.slideNumber;
            });
        });
    },
    data:{
        flag:{
            navActive:0
        },
        tabActive:0,
        allData:[],
        tabData:[],
        navBar:[],
        tabItem:[]
    },
    computed:{
        displayData:function () {
            return this.flag.navActive===0?this.allData:this.tabData
        },
        tabItemLen:function () {
            return this.tabItem.length === 0?1: this.tabItem.length;
        }
    },
    methods:{
        //点击横向导航栏请求操作
        navTab:function (index) {
            var self = this;
            self.flag.navActive = index;
            if (index ===0){
                self.allData = launch.allData;
                self.tabItem = [];
            }else if (index > 0&&launch.tab.length > 0){
                launch.tab.unshift({alias:"全部"});
                self.tabItem = launch.tab;
                self.tabData = launch.tabData;
            }
        }
    },
    watch:{
        //选项卡切换一次请求一次
        tabActive:function (val) {
            var self=this;
            self.tabData = launch.tabData2;
            console.log(this.tabItem[val])
        }
    }
});