var data = {};
data.location = "龙眠大道";
data.type = [{_id:1,_name:"违反“三宝”规定"},{_id:2,_name:"违反“五临边”规定"},{_id:3,_name:"违反安全用电规定"}];
data.photo = "img/temp.jpg";

app.snapshotissuewrite = new Vue({
    el:"#app-snapshot-issue-write",
    beforeMount:function () {
        var self = this;
        if (tool.getUrlParam("type")==="1"){
            var info = tool.session.get("issueWrite");
            for (p in self.form) {self.form[p] = info[p];}
            self.photo = info.vio_pic;
            self.selectText = info.vio_type_name;
            self.subTip = "修改完成 重新上传"
        }else {
            self.form.upload_name = tool.cookie.get("name");
            self.form.address = data.location;
            self.form.upload_time = tool.getTime();
            self.photo = data.photo;
        }
        self.selectType = data.type;
    },
    mounted:function () {
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
        selectType:[],
        selectText:"选择违章类型",
        subTip:"上传记录",
        photo:""
    },
    methods:{
        typeChange:function (val) {
            this.selectText = $(val.target).find("option:selected").text();
        },
        submit:function () {
            var self = this;
            tool.wait.show("数据提交中···");
            var request =this.form;
            var check = tool.emptyCheck([{data:request.address,tip:"手机定位"},
                {data:request.vio_type_id,tip:"违章类型"},
                {data:self.photo,tip:"图片"},
                {data:request.vio_desc,tip:"违章详情"}]);
            if (check){
                window.location.href="jump_page.html?type=0";
                tool.wait.hide();
            }
        },
        takePhoto:function () {
            var self = this;
            console.log(2)
        },
        copyTo:function () {
            var self = this;
            //选择抄送人
            console.log(2)
        }
    }
});