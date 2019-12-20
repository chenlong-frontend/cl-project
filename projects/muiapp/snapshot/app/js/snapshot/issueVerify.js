var data = {};
data.type = [{_id:1,_name:"违反“三宝”规定"},{_id:2,_name:"违反“五临边”规定"},{_id:3,_name:"违反安全用电规定"}];
data.info = {"m_platform":1,"address":"江苏省南京市玄武区玄武湖街道","role":2,"iss_id":"20171025142352860",
    "next_nodes":[{"is_fail":false,"flow_id":"20170831112335001","alias_css":"#FF00FF","name":"工程部",
        "form_id":"2","alias":"待处理","id":"20170831113128004","tag":false},
        {"is_fail":false,"flow_id":"20170831112335001","alias_css":"#FF00FF","name":"技术部","form_id":"2","alias":"待处理","id":"20170831113128005","tag":false},{"is_fail":false,"flow_id":"20170831112335001","alias_css":"#FF00FF","name":"合约部","form_id":"2","alias":"待处理","id":"20170831113128006","tag":false}
        ,{"is_fail":false,"flow_id":"20170831112335001","alias_css":"#FF00FF","name":"物资部","form_id":"2","alias":"待处理","id":"20170831113128007","tag":false},{"is_fail":false,"flow_id":"20170831112335001","alias_css":"#FF00FF","name":"安全部","form_id":"2","alias":"待处理","id":"20170831113128008","tag":false},
        {"is_fail":false,"flow_id":"20170831112335001","alias_css":"#FF00FF","name":"质保部","form_id":"2","alias":"待处理","id":"20170831113128014","tag":false},{"is_fail":false,"flow_id":"20170831112335001","alias_css":"#FF00FF","name":"综合办","form_id":"2","alias":"待处理","id":"20170831113128015","tag":false},
        {"is_fail":false,"flow_id":"20170831112335001","alias_css":"#FF00FF","name":"项目经理部","form_id":"2","alias":"待处理","id":"20170831113128016","tag":false}],"cur_node_id":"20170831113128003","history_id":"20171025142352892","vio_type_id":11,"upload_time":"2017-10-25 14:24","record_id":"20171025142352878","vio_pic":"img/temp.jpg","copy_to_man":"","vio_type_name":"其他类","is_over":1,"form_url":"../snapshot/issueVerify.html","history_time":"2017-10-25 14:23","form_table_name":"p_iss_snapshot","flow_id":"20170831112335001","vio_desc":"在",
    "vio_level":[{"_id":1,"_name":"一般问题","_level":1},
        {"_id":2,"_name":"重大问题","_level":2}],"state":1,"fail_reason":[{"_id":1,"_name":"图片不清晰"},
        {"_id":2,"_name":"位置不在范围内"}],"upload_name":"唐龙"};

app.snapshotissueverify = new Vue({
    el:"#app-snapshot-issue-verify",
    beforeMount:function () {
        var self = this;
        var info = data.info;
        self.state = info.state;
        //驳回重传
        if (info.state === 4 && info.role === 2){
            self.progress[0] = "未通过";
            self.progressBottom="80px";
            self.text.confirm = "修改上传内容";
            self.text.reject = "放弃";
            self.flag.submit = true;
            for (p in self.fail) {self.fail[p] = info[p];}
            self.flag.fail = true;
            self.onlyRead = true;
            tool.session.set("issueWrite",info);
        //驳回查看
        } else if (info.state === 4 && info.role === 1) {
            self.paddingBottom="50px";
            for (p in self.fail) {self.fail[p] = info[p];}
            self.flag.fail = true;
            self.onlyRead = true;
        //待审核查看
        } else if (info.state === 1 && info.role === 1){
            self.paddingBottom="50px";
            self.onlyRead = true;
        //审核人查看
        } else if (info.state === 1 && info.role === 2){
            self.progressBottom="80px";
            self.flag.submit = true;
            self.flag.tip = true;
            tool.session.set("verifySubmit",info);
        }
        self.selectType = data.type;
        for (p in self.form) {self.form[p] = info[p];}
        self.photo = info.vio_pic;
        self.historyTime = info.history_time;
        self.selectText = info.vio_type_name;
        tool.waitLoad.display=false;
    },
    data:{
        form:{
            address:"",
            upload_name:"",
            upload_time:"",
            vio_desc:"",
            vio_type_id:""
        },
        fail:{
            fail_reason:"",
            verify_advise:""
        },
        selectType:[],
        selectText:"选择违章类型",
        photo:"",
        historyTime:"",
        progress:["待审核","待处理","已处理","已确认"],
        proActive:1,
        flag:{
            submit:false,
            fail:false,
            tip:false
        },
        paddingBottom:"120px",
        progressBottom:"0px",
        onlyRead:false,
        state:0,
        text:{
            confirm:"通过审核",
            reject:"审核不通过"
        }

    },
    methods:{
        typeChange:function (val) {
            this.selectText = $(val.target).find("option:selected").text();
        },
        copyTo:function () {
            var self = this;
            //选择抄送人
            console.log(2)
        },
        confirm:function () {
            var self = this;
            if (self.state === 4){
                window.location.href="issueWrite.html?type=1"
            } else {
                window.location.href="verify_submit.html"
            }
        },
        reject:function () {
            var self = this;
            if (self.state === 4){
                window.location.href="../workflow/working.html"
            }
        }
    }
});