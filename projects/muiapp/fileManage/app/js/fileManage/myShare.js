var data = {};
data.fileList = [{file_name:"2安全活动图像",file_size:"848.03KB",scan_time:"2017-10-24",type_icon:"img/filemanage/doc.png"},
    {file_name:"安全活动图像65",file_size:"848.03KB",scan_time:"2017-09-24",type_icon:"img/filemanage/doc.png"},
    {file_name:"安全活动图像3",file_size:"848.03KB",scan_time:"2017-10-24",type_icon:"img/filemanage/doc.png"},
    {file_name:"安全活动图像2",file_size:"848.03KB",scan_time:"2017-10-24",type_icon:"img/filemanage/doc.png"},
    {file_name:"安全活动图像3",file_size:"848.03KB",scan_time:"2017-10-24",type_icon:"img/filemanage/doc.png"},
    {file_name:"安全活动图像2",file_size:"848.03KB",scan_time:"2017-10-24",type_icon:"img/filemanage/doc.png"},
    {file_name:"安全活动图像3",file_size:"848.03KB",scan_time:"2017-10-24",type_icon:"img/filemanage/doc.png"},
    {file_name:"安全活动图像2",file_size:"848.03KB",scan_time:"2017-10-24",type_icon:"img/filemanage/doc.png"},
    {file_name:"安全活动图像3",file_size:"848.03KB",scan_time:"2017-10-24",type_icon:"img/filemanage/doc.png"}];

app.fileManagemyshare = new Vue({
    el:"#app-fileManage-my-share",
    created:function () {
        var self = this;
        data.fileList.forEach(function (t) {t.isToolBar = false});
        self.display.file = data.fileList;
        tool.waitLoad.display=false;
    },
    data:{
        display: {
            file:[]
        },
        active:{
            sort:false
        },
        page:{
            index:0,
            size:15
        },
        isScrollBottom:false,
        searchRequest:{},
        isSearchShow:false,
        isSearchResult:false
    },
    methods:{
        searchListen:function (type) {
            console.log(type)
            this.isSearchShow = false;
            this.searchRequest = type;
            this.isSearchResult = true;
        },
        //文件分享
        deleteShare:function (val) {
            console.log(val)
            val.isToolBar = false;
        },
        //加载操作
        loadMore:function (e) {
            var self = this;
            console.log(e.target.scrollHeight)
            if(e.target.scrollHeight-e.target.scrollTop===e.target.clientHeight && !self.isScrollBottom){
                console.log("到达底部");
                //ajax请求
                self.isScrollBottom = true;
                // self.display.md = self.display.md.concat(data.fileList)
            }
        },
        //排序选项控制
        nodeControl:function () {
            if (this.active.sort){this.active.sort = false;}
        },
        //三个排序操作
        sortByTime : function () {
            console.log(1)
            if (this.display.file.length > 0){
                this.display.file =  this.display.file.sort(function (a,b) {
                    return (new Date(b.scan_time)).getTime() - (new Date(a.scan_time)).getTime()
                })
            }
        },
        sortByName : function () {
            if (this.display.file.length > 0){
                this.display.file =  this.display.file.sort(function (a,b) {
                    return a.file_name.localeCompare(b.file_name,'zh-Hans-CN', {sensitivity: 'accent'})
                })
            }
        },
        sortBySize : function () {
            if (this.display.file.length > 0){
                this.display.file =  this.display.file.sort(function (a,b) {
                    return a.file_src_size - b.file_src_size
                })
            }
        }
    }
});