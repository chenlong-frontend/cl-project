var data={};
data.fileData={doc_num:"20171023160914717",file_name:"timg",file_icon:"img/filemanage/unknow.png",
    file_alias:"2",file_emp_name:"王彐岳",history_time:"2017-10-23 16:11",file_path:"文荟苑",
    file_desc:"2",file_size:"6.61KB",asg_emp_name:"章雷云",file_tips:"123",rvw_advc:"无审核意见",rvw_emp_name:"章雷云",
    file_real_url:"/usr/local/upload/zjsbs/test/20171023160108337.doc"
};

app.filemanageissueverify = new Vue({
    el:"#app-file-manage-issue-verify",
    beforeMount:function () {
        var self = this;
        self.fileData = data.fileData;
        //根据权限控制是否显示按钮
        self.flag.readOnly = true;
        tool.waitLoad.display=false;
    },
    data:{
        form:{
            advise:""
        },
        fileData:{},
        process:[{color:"",text:"已上传"},{color:"grey",text:"已审核"},{text:"已拒绝",color:"danger"}],
        flag:{
            modal:false,
            type:0,     //0通过，1拒绝,
            readOnly:false   //权限控制
        }
    },
    methods:{
        preview:function (url) {
            console.log(url)
        },
        submit:function () {
            var self = this;
            var check = tool.emptyCheck({data:self.form.advise,tip:"审核意见"});
            if (check){
                self.flag.modal=false;
            } else {

            }
        }
    }
});