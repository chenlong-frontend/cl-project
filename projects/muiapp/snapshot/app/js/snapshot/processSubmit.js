var data={};
data.cookieName = "张世东";

app.snapshotprocesssubmit = new Vue({
    el:"#app-snapshot-process-submit",
    beforeMount:function () {
        var self = this;
        var info = tool.session.get("process");
        self.text.time = info.history_time;
        self.form.processor = data.cookieName;
        console.log(info);
        tool.waitLoad.display=false;
    },
    data:{
        form:{
            processor:"",
            process_advise:""
        },
        text:{
            time:""
        },
        photo:""
    },
    methods:{
        takePhoto:function () {
            this.photo = "img/temp.jpg";
        },
        submit:function () {
            var self = this;
            tool.wait.show("数据提交中···");
            var request =this.form;
            var check = tool.emptyCheck({data:request.process_advise,tip:"处理说明"});
            if (check){
               window.location.href="jump_page.html?type=2";
               tool.wait.hide();
            } else {
                tool.wait.hide();
            }
        }
    }
});