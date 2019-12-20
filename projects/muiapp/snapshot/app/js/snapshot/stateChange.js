var data = {};
data.process =[{"record_id":"20171022152208541","vio_type_id":3,
    "iss_id":"20171022152208526","subtitle":"违反“五临边”规定",
    "name":"章立","vio_desc":"矿泉水瓶子危险，要掉下来了。",
    "time":"2017-10-22 15:22","state":1,"emp_id":"20170831145328070",
    "img":"img/svg/change_up.svg","stateName":"上传"},
    {"record_id":"20171022152208541",
        "vio_type_id":3,"iss_id":"20171022152329118",
        "subtitle":"违反“五临边”规定","vio_level_id":1,"name":"胡群","vio_desc":"矿泉水瓶子危险，要掉下来了。" +
    "","time":"2017-10-22 15:23","state":2,"emp_id":"20170831145328061",
        "img":"img/svg/change_process.svg","stateName":"审核通过"},
    {"record_id":"20171022152208541","vio_type_id":3,"iss_id":"20171023101458349",
        "subtitle":"违反“五临边”规定","vio_level_id":1,"name":"徐全余","vio_desc":"矿泉水瓶子危险，要掉下来了。" +
    "","time":"2017-10-23 10:14","state":3,"emp_id":"20170831145328047","img":"img/svg/change_done.svg","stateName":"处理完成"}];
console.log(data.process)

app.snapshotissuewrite = new Vue({
    el:"#app-snapshot-state-change",
    beforeMount:function () {
        var self = this;
        self.process = data.process;
        tool.waitLoad.display=false;
    },
    data:{
        process:[]
    },
    methods:{

    }
});