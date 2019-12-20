var working = {};
working.launch = [
    {alias:"随手拍",icon:"img/workflow/plat_camera.png",url:"../snapshot/issueVerify.html"},
    {alias:"文件上传",icon:"img/workflow/plat_file.png",url:"../fileManage/issueVerify.html"}
];

app.workflowWorking = new Vue({
    el:"#app-workflow-working",
    beforeMount:function () {
        var self=this;
        self.launch = working.launch;
    },
    mounted:function () {
        tool.waitLoad.display=false;
    },
    data:{
        nav:[{url:"deal.html",count:0,text:"处理事项",icon:"img/workflow/work_toDo.png"},
             {url:"my_launch.html",count:0,text:"我发起的",icon:"img/workflow/launch.png"},
             {url:"launch_me.html",count:0,text:"抄送我的",icon:"img/workflow/cc.png"}],
        launch:[]
    },
    methods:{
        startNewMatter:function (url) {
            if (url === "../fileManage/issueVerify.html"){
                mui.toast('请到PC端处理，谢谢',{ duration:'short', type:'div' });
            }else{
                window.location.href=url;
            }
        }
    }
});