var data1 = {};
data1.searchResult = [{id:1,file_name:"安全活动图像",file_size:"848.03KB",file_src_size:3,scan_time:"2017-10-24",type_icon:"img/filemanage/doc.png"},
    {id:2,file_name:"放全活动图像2",file_size:"848.03KB",file_src_size:1,scan_time:"2016-10-23",type_icon:"img/filemanage/doc.png"},
    {id:3,file_name:"不全活动图像3",file_size:"848.03KB",file_src_size:10,scan_time:"2017-09-24",type_icon:"img/filemanage/doc.png"},
    {id:4,file_name:"安全活动图像2",file_size:"848.03KB",file_src_size:9,scan_time:"2018-10-24",type_icon:"img/filemanage/doc.png"},
    {id:5,file_name:"安全活动图像2",file_size:"848.03KB",file_src_size:9,scan_time:"2018-10-24",type_icon:"img/filemanage/doc.png"},
    {id:6,file_name:"安全活动图像2",file_size:"848.03KB",file_src_size:9,scan_time:"2018-10-24",type_icon:"img/filemanage/doc.png"},
    {id:7,file_name:"安全活动图像2",file_size:"848.03KB",file_src_size:9,scan_time:"2018-10-24",type_icon:"img/filemanage/doc.png"},
    {id:8,file_name:"安全活动图像2",file_size:"848.03KB",file_src_size:9,scan_time:"2018-10-24",type_icon:"img/filemanage/doc.png"},
    {id:9,file_name:"安全活动图像2",file_size:"848.03KB",file_src_size:9,scan_time:"2018-10-24",type_icon:"img/filemanage/doc.png"},
    {id:10,file_name:"安全活动图像2",file_size:"848.03KB",file_src_size:9,scan_time:"2018-10-24",type_icon:"img/filemanage/doc.png"}];

app.fileManagecollection = new Vue({
    el:"#app-fileManage-collection",
    beforeMount:function () {
        var self = this;
        data1.searchResult.forEach(function (t) {t.isToolBar = false});
        self.display.file = data1.searchResult;
        this.muiInit();
        tool.waitLoad.display=false;
    },
    data:{
        display: {
            file:[],
            type:[{name:'全部'},{name:'Word'},{name:'Xls'},{name:'PPT'},{name:'Pdf'},{name:'txt'},{name:'图片'}]
        },
        selected:[],
        page:{
            index:0,
            size:15
        },
        active:{
            type:0,
            sort:false,
            select:false
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
        typeSelect: function (item,index) {
            this.active.type = index;
        },
        //全部收藏
        allSelect:function () {
          console.log(this.selected);
          var arr = [];
          if (this.display.file.length > 0){
              this.display.file.forEach(function (t) {
                  arr.push(t.id);
              });
              this.selected = arr;
          }
        },
        cancelCollect:function () {
            var self = this;
            if (this.selected.length > 0){
                this.display.file = this.display.file.filter(function (t) {
                    return $.inArray(t.id,self.selected) === -1
                });
                this.selected = [];
            }
        },
        //文件分享
        fileShare:function (val) {
            console.log(val)
            val.isToolBar = false;
        },
        //文件收藏
        fileCollection:function (val) {
            console.log(val)
            val.isToolBar = false;
        },
        //排序选项控制
        nodeControl:function () {
            if (this.active.sort){this.active.sort = false;}
        },
        //加载操作
        loadMore:function (e) {
            var self = this;
            if(e.target.scrollHeight-e.target.scrollTop===e.target.clientHeight && !self.isScrollBottom){
                console.log("到达底部");
                //ajax请求
                self.isScrollBottom = true;
               // self.display.search = self.display.search.concat(data1.searchResult)
            }
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
        },
        muiInit:function () {
            var self =this;
            mui.init({gestureConfig:{longtap: true}});
            mui.ready(function () {
                mui(".file_list").on('longtap','.item',function(){
                    self.active.select = true;
                })
            });
        }
    }
});