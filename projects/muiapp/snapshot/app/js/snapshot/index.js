var index = {};
tool.cookie.set([{name:"name",value:"章雷云",time:1},
    {name:"dep_name",value:"技术部",time:1},
    {name:"emp_post",value:"技术部负责人",time:1},
    {name:"id",value:"20170831145328055",time:1},
    {name:"avatar",value:"img/profile_small.jpg",time:1}]);
index.location = "龙眠大道三号门";

app.snapshotindex = new Vue({
    el:"#app-snapshot-index",
    beforeMount:function () {
        var self = this;
        self.userInfo = tool.cookie.get(["name","dep_name","emp_post","avatar"]);
        self.location = index.location;
    },
    mounted:function () {
        tool.waitLoad.display=false;
    },
    data:{
        userInfo:{},
        location:""
    },
    methods:{
        takePhoto:function () {
            console.log(1)
        }
    }
});