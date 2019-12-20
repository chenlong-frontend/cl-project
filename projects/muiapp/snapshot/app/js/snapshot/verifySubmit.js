var data={};

app.snapshotverifysubmit = new Vue({
    el:"#app-snapshot-verify-submit",
    beforeMount:function () {
        var self = this;
        var info = tool.session.get("verifySubmit");
        self.department = info.next_nodes;
        self.level = info.vio_level;
        self.photo = info.vio_pic;
        self.text.time = info.history_time;
        tool.waitLoad.display=false;
    },
    data:{
        department:[],
        level:[],
        form:{
            vio_level_id:"",
            gro_id:"",
            verify_advise:""
        },
        photo:"",
        text:{
            dep:"请选择部门",
            level:"请选择问题等级",
            time:""
        },
        flag:{
            serious:false
        }
    },
    methods:{
        depChange:function (val) {
            this.text.dep = $(val.target).find("option:selected").text();
        },
        levelChange:function (val) {
            this.text.level = $(val.target).find("option:selected").text();
            if (this.form.vio_level_id === 2){
                this.flag.serious = true;
                this.text.dep="项目经理部";
                this.form.gro_id="20170831113128016"
            } else {
                this.flag.serious = false;
            }
        },
        submit:function () {
            tool.wait.show("数据提交中···");
            var check = tool.emptyCheck([{data:this.form.vio_level_id,tip:"问题等级"},
                {data:this.form.gro_id,tip:"部门"},
                {data:this.form.verify_advise,tip:"审核意见"}]);

            if (check){
                var request = tool.session.get("verifySubmit");
                for (a in this.form){
                    request[a] = this.form[a]
                }
                window.location.href="jump_page.html?type=3";
                console.log(request);
            } else {
                tool.wait.hide();
            }
        }
    }
});