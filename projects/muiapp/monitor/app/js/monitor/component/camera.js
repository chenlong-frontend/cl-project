var data={};
data.default = {camera_id:"1",area_name:"仓库区-堆料仓库-左侧区域",camera_name:"004",unit_type:"大华HDX-266",state:"0",time:"2017-09-10 17:09"};
data.camera = [{camera_id:"1",area_name:"仓库区-堆料仓库-左侧区域",camera_name:"001",unit_type:"大华HDX-266",state:"0",time:"2017-09-10 17:09"},
    {camera_id:"2",area_name:"仓库区-堆料仓库-左侧区域",camera_name:"002",unit_type:"大华HDX-266",state:"0",time:"2017-09-10 17:09"},
    {camera_id:"3",area_name:"仓库区-堆料仓库-左侧区域",camera_name:"003",unit_type:"大华HDX-266",state:"0",time:"2017-09-10 17:09"}];

//视频监控
component.camera = {
    template: '<div class="fixed_box">' +
    '<ul class="list">' +
    '<h5 class="title" v-show="defaultCamera">默认查看</h5>'+
    '<li @click="cameraWatch(defaultCamera)" class="item" v-show="defaultCamera">' +
        '<div class="box"></div>' +
        '<h4>{{defaultCamera.camera_name}}</h4>' +
        '<a @click.stop="cameraRemove" class="setting selected">取消默认</a>' +
        '<p>位置 : <span class="adress">{{defaultCamera.area_name}}</span></p>'+
        '<p>型号 : <span class="model">{{defaultCamera.unit_type}}</span></p>'+
        '<p>运转 : <span class="status primary">{{defaultCamera.state | state}}</span></p>'+
    '</li>' +
    '<h5 class="title">最近查看</h5>'+
    '<li @click="cameraWatch(item)" v-for="item in recent" class="item">' +
        '<div class="box"></div>' +
        '<h4>{{item.camera_name}}</h4>' +
        '<a @click.stop="cameraSet(item)" class="setting">设为默认</a>' +
        '<p>位置 : <span class="adress">{{item.area_name}}</span></p>'+
        '<p>型号 : <span class="model">{{item.unit_type}}</span></p>'+
        '<p>运转 : <span class="status primary">{{item.state | state}}</span></p>'+
    '</li>' +
    '</ul>' +
    '</div>',
    beforeMount:function () {
        var self = this;
        self.defaultCamera = data.camera[0];
        self.recent = data.camera;
    },
    data:function () {
        return {
            defaultCamera:{},
            recent:[]
        }
    },
    methods:{
        cameraSet:function (val) {
            var self = this;
            self.defaultCamera=val
        },
        cameraRemove:function () {
            var self = this;
            self.defaultCamera = false
        },
        cameraWatch:function (camera) {
            var self = this;
            var key = 0,recent = self.recent.concat();
            recent.forEach(function (val,index) {
               if (val === camera){key = index}
            });
            var select = recent.splice(key,1);
            recent.unshift(select[0]);
            tool.session.set("cameraWatch",recent);
            window.location.href = "camera_watch.html";
        }
    },
    filters:{
        state:function (val) {
            return val == 0?"正常":"异常"
        }
    }
};