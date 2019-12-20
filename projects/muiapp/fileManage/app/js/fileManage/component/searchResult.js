var data1 = {};
data1.searchResult = [{file_name:"安全活动图像",file_size:"848.03KB",file_src_size:3,scan_time:"2017-10-24",type_icon:"img/filemanage/doc.png"},
    {file_name:"放全活动图像2",file_size:"848.03KB",file_src_size:1,scan_time:"2016-10-23",type_icon:"img/filemanage/doc.png"},
    {file_name:"不全活动图像3",file_size:"848.03KB",file_src_size:10,scan_time:"2017-09-24",type_icon:"img/filemanage/doc.png"},{file_name:"安全活动图像",file_size:"848.03KB",file_src_size:50,scan_time:"2017-10-24",type_icon:"img/filemanage/doc.png"},
    {file_name:"安全活动图像2",file_size:"848.03KB",file_src_size:9,scan_time:"2018-10-24",type_icon:"img/filemanage/doc.png"}];

// 搜索结果
Vue.component('file-manage-search-result', {
    props: ['request','isShow','extra'],
    template: '<div @click="nodeControl" class="md-manage-search md-manage-search-result" v-show="isShow">\n' +
                    '<header class="mui-bar mui-bar-nav">\n' +
                        '<a @click="cancel" class="mui-icon mui-icon-left-nav mui-pull-left"></a>\n' +
                            '<h1 class="mui-title ">\n' +
                            '<img class="search-type" :src="display.icon" />\n' +
                                '<input placeholder="搜索文件名" v-model="form.search" >\n' +
                                '<i @click="search" class="mui-icon mui-icon-search" ></i>\n' +
                            '</h1>\n' +
                        '<a class="icon">' +
                             '<img @click.stop="active.sort=!active.sort" src="img/filemanage/sort.png" />' +
                             '<ul v-show="active.sort" class="select-box"><li @click="sortByName">按名称排序</li><li @click="sortByTime">按时间排序</li><li @click="sortBySize">按文件大小排序</li></ul>' +
                        '</a>\n' +
                    '</header>\n' +
                    '<div class="mui-content">\n' +
                        '<!--横向滚动-->\n' +
                        '<div class="my_scroll mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">\n' +
                            '<div class="mui-scroll">\n' +
                                '<a v-for="(item,index) in display.type" @click="typeSelect(item,index)" :class="{active:index === active.type}">{{item.name}}</a>' +
                            '</div>\n' +
                        '</div>\n' +
                        '<!--横向滚动-->\n' +
                        '<ul @scroll="loadMore($event)" class="file_list">\n' +
                            '<li class="item" v-for="item in display.search">\n' +
                                '<div class="img">\n' +
                                    '<img :src="item.type_icon" />\n' +
                                '</div>\n' +
                                '<div class="text">\n' +
                                    '<p class="name">{{item.file_name}}</p>\n' +
                                    '<p class="info"><span class="time">上传时间 : {{item.scan_time}}</span> <span class="size">{{item.file_size}}</span> </p>\n' +
                                '</div>\n' +
                            '</li>' +
                            '<li v-show="display.search.length === 0"><p style="text-align: center">无搜索结果</p></li>' +
                            '<li class="loading-more" v-show="isScrollBottom"><p>加载中···</p></li>' +
                        '</ul>\n' +
                    '</div>\n' +
                    '<!--底部计数-->\n' +
                    '<div class="search-count">\n' +
                        '<p>搜索结果共{{display.search.length}}个</p>\n' +
                    '</div>\n' +
                '</div>\n',
    data:function () {
        return {
            display:{
                type:[{name:'全部'},{name:'Word'},{name:'Xls'},{name:'PPT'},{name:'Pdf'},{name:'txt'},{name:'图片'}],
                icon:'',
                search:[]
            },
            active:{
                type:0,
                sort:false
            },
            isScrollBottom:false,
            form:{
                search:'',
                type:'',
                extra:this.extra,
                page_index:0,
                page_size :15
            }
        }
    },
    methods:{
        search: function () {
            this.getSearch(this.form)
            this.test = false
        },
        //排序选项控制
        nodeControl:function () {
           if (this.active.sort){this.active.sort = false;}
        },
        typeSelect: function (item,index) {
            this.active.type = index;
            this.form.type = item.name;
            this.getSearch();
        },
        //发起请求
        getSearch:function () {
            //ajax请求
            var self = this;
            console.log(this.form)
            self.display.search = data1.searchResult;
        },
        //后退操作
        cancel:function () {
            this.$emit('update:isShow', false)
        },
        //加载操作
        loadMore:function (e) {
            var self = this;
            if(e.target.scrollHeight-e.target.scrollTop===e.target.clientHeight && !self.isScrollBottom){
                console.log("到达底部");
                //ajax请求
                self.isScrollBottom = true;
                self.display.search = self.display.search.concat(data1.searchResult)
            }
        },
        //三个排序操作
        sortByTime : function () {
            if (this.display.search.length > 0){
                this.display.search =  this.display.search.sort(function (a,b) {
                    return (new Date(b.scan_time)).getTime() - (new Date(a.scan_time)).getTime()
                })
            }
        },
        sortByName : function () {
            if (this.display.search.length > 0){
                this.display.search =  this.display.search.sort(function (a,b) {
                    return a.file_name.localeCompare(b.file_name,'zh-Hans-CN', {sensitivity: 'accent'})
                })
            }
        },
        sortBySize : function () {
            if (this.display.search.length > 0){
                this.display.search =  this.display.search.sort(function (a,b) {
                    return a.file_src_size - b.file_src_size
                })
            }
        }
    },
    watch:{
        request:function (val) {
            this.form.type = val.type.text;
            this.form.search = val.search;
            this.display.icon = val.type.icon;
            for (var i=0;i<this.display.type.length;i++){
                if (this.display.type[i].name === this.form.type){
                    this.active.type = i;break
                }
            }
            this.getSearch();
        }
    }
});