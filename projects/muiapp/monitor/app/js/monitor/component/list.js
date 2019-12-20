data.list={};
data.list.cameras = [{area_name:"仓库001",unit_type:"大华HDX-266",state:"0",camera_id:"1"},
    {area_name:"仓库002",unit_type:"大华HDX-266",state:"0",camera_id:"2"}];
data.list.catalog = [{name: "左侧区域", id: "7", p_id: "5"},{name: "左侧区域", id: "7", p_id: "5"},{name: "左侧区域", id: "7", p_id: "5"},
    {name: "右侧区域", id: "7", p_id: "5"},{name: "左侧区域", id: "7", p_id: "5"},{name: "左侧区域", id: "7", p_id: "5"},{name: "左侧区域", id: "7", p_id: "5"}];


//监控列表
component.list = {
    template:'<div class="camera-list"><div class="head">\
                 <a v-for="(item,index) in path" @click="catalogBack(item,index)" class="active">{{item.name}}<span v-show="index < (path.length-1)">></span></a>\
             </div>\
             <div class="fixed_box">\
                    <div v-for="item in catalog" @click="catalogSelect(item)" class="center list-folder">\
                      <div class="left">\
                        <img class="img" src="img/monitor/svg/fold.svg" />\
                      </div>\
                      <div class="middle list-folder">\
                         <p class="text">{{item.name}}</p>\
                      </div>\
                      <div class="right"></div>\
                      <div class="space"></div>\
                    </div>\
                    <div v-for="item in cameras" @click="cameraCheck(item)" class="center">\
                        <div class="left">\
                         <img class="img" src="img/monitor/svg/camera.svg" />\
                        </div>\
                        <div class="middle">\
                            <span class="area">{{item.area_name}}</span>\
                            <span class="state_normal">{{item.state | state}}</span>\
                            <p class="number">{{item.unit_type}}</p>\
                         </div>\
                        <div class="right">\
                            <a class="selected" v-if="item.camera_id === defaultCameraId" @click.stop="defaultRemove(item)">取消默认</a>\
                            <a @click.stop="defaultCamera(item)" v-else>设为默认</a>\
                         </div>\
                        <div class="space"></div>\
                     </div>\
             </div></div>',
    beforeMount:function () {
        var self = this;
        self.cameras = data.list.cameras;
        self.catalog = data.list.catalog;
        self.defaultCameraId = "1";
    },
    data:function () {
        return {
            cameras:[],
            catalog:[],
            path:[{name: "总目录", id: "-1", p_id: "-1"}],
            defaultCameraId:"-1"
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
        },
        defaultCamera:function (val) {
            var self = this;
            self.defaultCameraId = val.camera_id;
        },
        cameraCheck:function (val) {
            console.log(1)
        },
        defaultRemove:function (val) {
            this.defaultCameraId = "-1";
        }
    },
    filters:{
        state:function (val) {
            return val == 0?"正常":"异常"
        }
    }
};