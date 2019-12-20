var data = {};
data.msg = [{process:"处理流程",emp_avatar:"img/profile_small.jpg",emp_name:"ssa",content:"处理内容",create_time:"2017-5-6"},{emp_name:"ssa",process:"处理流程2",emp_avatar:"img/profile_small.jpg",content:"处理内容2",create_time:"2017-5-8"}]

app.snapshotprocessreport = new Vue({
    el:"#app-snapshot-process-report",
    beforeMount:function () {
        var self = this;
        self.msg = data.msg;
        if (tool.getUrlParam("type")!=="1"){
            this.readOnly = false;
        }
        tool.waitLoad.display=false;
    },
    data:{
        msg:[],
        flag:{
            modal:false
        },
        form:{
            process:"",
            content:""
        },
        readOnly:true
    },
    methods:{
        report:function () {
            this.flag.modal = true;
        },
        submit:function () {
            var self = this;
            var request =this.form;
            console.log(request)
            var check = tool.emptyCheck([{data:request.process,tip:"处理流程"},
                {data:request.content,tip:"内容"}]);
            if (check){
                var msg = {
                    process:request.process,
                    content:request.content,
                    create_time:tool.getTime(),
                    emp_avatar:"img/profile_small.jpg",
                    emp_name:"sds"
                };
                this.flag.modal = false;
                mui.alert("消息发送失败！","提示","确认");
                self.msg.push(msg);
            }
        }
    }
});