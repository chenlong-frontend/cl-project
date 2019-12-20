data.work = {pro_area: "徐州市沛县正阳街道250号", pro_id: "3", count: "2", pro_name: "徐州沛县文荟苑工地项目"};
data.folderData = [{file_icon:"img/filemanage/folder.png",file_name:"合约部",file_time:"2017-10-23"},
    {file_icon:"img/filemanage/folder.png",file_name:"合约部",file_time:"2017-10-23"},
    {file_icon:"img/filemanage/folder.png",file_name:"合约部",file_time:"2017-10-23"},
    {file_icon:"img/filemanage/folder.png",file_name:"合约部",file_time:"2017-10-23"},
    {file_icon:"img/filemanage/folder.png",file_name:"合约部",file_time:"2017-10-23"},
    {file_icon:"img/filemanage/folder.png",file_name:"合约部",file_time:"2017-10-23"},
    {file_icon:"img/filemanage/folder.png",file_name:"合约部",file_time:"2017-10-23"}];

component.work = {
    template: '<div class="work-list">' +
                    '<div class="folder">' +
                        '<div class="top folder_ctrl">' +
                            '<div class="img">' +
                              '<img src="img/filemanage/build.png" alt="pic" />' +
                            '</div>' +
                            '<div class="text">' +
                                '<p class="department">{{projectData.pro_name}}</p>' +
                                '<p class="address">{{projectData.pro_area}}</p>' +
                            '</div>' +
                            '<div class="right">' +
                                '<h3 class="position">共{{projectData.count}}条</h3>' +
                            '</div>' +
                        '</div>' +
                    '</div>' +
                    '<div class="head">' +
                        '<a v-for="(item,index) in path" @click="catalogBack(item,index)" :class="{active:index === (path.length-1)}">{{item.file_name}}<span v-show="index < (path.length-1)">></span></a>' +
                    '</div>' +
                    '<div class="fixed_box">' +
                        '<ul class="file_list">' +
                            '<li v-for="item in folderData" @click="catalogSelect(item)" class="item">' +
                                '<div class="img">' +
                                 '<img :src="item.file_icon" />' +
                                '</div>' +
                                '<div class="text">' +
                                    '<p class="name">{{item.file_name}}</p>' +
                                    '<p class="info"><span class="size">2k</span> <span class="time">{{item.file_time}}</span></p>' +
                                '</div>' +
                                '<div class="right">' +
                                  '<img src="img/filemanage/more.png" />' +
                                '</div>' +
                            '</li>' +
                        '</ul>' +
                    '</div>' +
                '</div>',
    beforeMount:function () {
        var self = this;
        self.projectData = data.work;
        self.folderData = data.folderData;
    },
    data:function () {
        return {
            projectData:{},
            folderData:[],
            path:[{file_name: "主目录", pro_id:"-1"}]
        }
    },
    methods:{
        catalogSelect:function (val) {
            var self = this;
            self.path.push(val)
        },
        catalogBack:function (val,index) {
            var self = this;
            self.path = self.path.slice(0,(index+1));
        }
    }
};