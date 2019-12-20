app.snapshotverifyfailsubmit = new Vue({
    el:"#app-snapshot-verify-fail-submit",
    beforeMount:function () {
        var self = this;
        var info = tool.session.get("verifySubmit");
        self.photo = info.vio_pic;
        self.reason = info.fail_reason;
        self.text.time = info.history_time;
        tool.waitLoad.display=false;
    },
    data:{
        reason:[],
        form:{
            fail_id:"",
            verify_advise:""
        },
        photo:"",
        text:{
            reason:"请选择驳回原因",
            time:""
        }
    },
    methods:{
        submit:function () {
            tool.wait.show("数据提交中···");
            var check = tool.emptyCheck([{data:this.form.fail_id,tip:"驳回原因"},
                {data:this.form.verify_advise,tip:"审核意见"}]);

            if (check){
                var request = tool.session.get("verifySubmit");
                for (a in this.form){
                    request[a] = this.form[a]
                }
                window.location.href="jump_page.html?type=4";
                console.log(request);
            } else {
                tool.wait.hide();
            }
        },
        reasonChange:function (val) {
            this.text.reason = $(val.target).find("option:selected").text();
        }
    }
});