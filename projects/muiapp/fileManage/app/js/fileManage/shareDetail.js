var data={};
data.fileData={doc_num:"20171023160914717",file_name:"timg",file_icon:"img/filemanage/unknow.png",
    file_alias:"2",file_emp_name:"王彐岳",history_time:"2017-10-23 16:11",file_path:"文荟苑",
    file_desc:"2",file_size:"6.61KB",asg_emp_name:"章雷云",file_tips:"123",rvw_advc:"无审核意见",rvw_emp_name:"章雷云",
    file_real_url:"/usr/local/upload/zjsbs/test/20171023160108337.doc"
};

app.filemanagesharedetail = new Vue({
    el:"#app-file-manage-share-detail",
    beforeMount:function () {
        tool.waitLoad.display=false;
    },
    data:{
        display:{
            file:[]
        }
    },
    methods:{
        submit:function () {
            console.log(1)
        }
    }
});