var data = {};
data.fileList = [{file_name:"安全活动图像",file_size:"848.03KB",scan_time:"2017-10-24",type_icon:"img/filemanage/doc.png"},
    {file_name:"安全活动图像2",file_size:"848.03KB",scan_time:"2017-10-24",type_icon:"img/filemanage/doc.png"},
    {file_name:"安全活动图像3",file_size:"848.03KB",scan_time:"2017-10-24",type_icon:"img/filemanage/doc.png"}];

component.file = {
    template: '<div><div class="head_nav">' +
                    '<a>' +
                        '<img src="img/filemanage/myup.png" >' +
                        '<p>我上传的</p>' +
                    '</a>' +
                    '<a>' +
                        '<img src="img/filemanage/share.png" />' +
                        '<p>收到的分享</p>' +
                    '</a>' +
                    '<a>' +
                        '<img src="img/filemanage/collection.png" />' +
                        '<p>我的收藏</p>' +
                    '</a>' +
                '</div>' +
                '<div class="file_list">' +
                    '<h5 class="title">最近浏览文件</h5>' +
                    '<ul>' +
                        '<p v-show="listData.length === 0">暂无浏览数据</p>' +
                        '<li class="item" v-for="item in listData">' +
                            '<div class="img">' +
                             '<img :src="item.type_icon" />' +
                            '</div>' +
                            '<div class="text">' +
                                '<p class="name">{{item.file_name}}</p>' +
                                '<p class="info"><span class="time">{{item.scan_time}}</span><span class="size">大小:{{item.file_size}}</span></p>' +
                            '</div>' +
                            '<div class="right">' +
                              '<img src="img/filemanage/more.png" />' +
                            '</div>' +
                        '</li>' +
                    '</ul>' +
                    '<div class="my_tips" @click="clearList" v-show="listData.length > 0">' +
                        '<div class="box">' +
                            '<div class="img">' +
                              '<img src="img/filemanage/clear.png" />' +
                            '</div>' +
                            '<p>清除浏览记录</p>' +
                        '</div>' +
                    '</div>' +
                '</div></div>',
    beforeMount:function () {
        var self = this;
        self.listData = data.fileList;
    },
    data:function () {
        return {
            listData:[]
        }
    },
    methods:{
        clearList:function () {
            this.listData = [];
        }
    }
};