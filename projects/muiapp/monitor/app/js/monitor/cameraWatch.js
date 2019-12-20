app.mui = app.mui || {};
app.mui.dtPicker = new mui.DtPicker({
    type: "datetime",
    beginDate: new Date(2015,01,01),
    endDate: new Date(),
    labels: ['年', '月', '日', '时', '分'],
});

app.monitorcamerawatch = new Vue({
    el:"#app-monitor-camera-watch",
    beforeMount:function () {
        var self = this;
        self.cameraData = tool.session.get("cameraWatch");
        self.defaultCameraId = "1";
        console.log(self.cameraData)
    },
    mounted:function () {
        this.muiInit();
        tool.waitLoad.display=false;
    },
    data:{
        cameraData:[],
        defaultCameraId:{},
        cameraActive:0,
        duration:[{text:"5分钟",long:5},{text:"10分钟",long:10},{text:"30分钟",long:30}],
        durationActive:0,
        text:{
            time:""
        },
        flag:{
            time:false
        }
    },
    methods:{
        cameraSet:function (val) {
            var self = this;
            self.defaultCameraId = val.camera_id;
        },
        cameraRemove:function (val) {
            this.defaultCameraId = "-1";
        },
        play:function () {
            console.log(this.cameraActive)
        },
        playback:function () {
            this.flag.time = true;
        },
        confirm:function () {
            this.flag.time = false;
        },
        muiInit:function () {
            var self = this;
            mui.init();
            mui.ready(function () {
                var slideNumber = 0;
                var gallery = mui('.mui-slider');
                var max = 3;
                mui('.tap_slider').on('tap','.left',function(){
                    if (slideNumber) {
                        gallery.slider().gotoItem(slideNumber-1);
                    }
                });
                mui('.tap_slider').on('tap','.right',function(event){
                    if (slideNumber < max) {
                        gallery.slider().gotoItem(slideNumber+1);
                    }
                });

                document.querySelector('.mui-slider').addEventListener('slide', function(event) {
                    self.cameraActive = event.detail.slideNumber;
                    slideNumber = event.detail.slideNumber;
                });
            });
        },
        selectTime:function () {
            var self = this;
            app.mui.dtPicker.show(function (items) {
                self.text.time = items.value + ":00"
            });
        }
    },
    filters:{
        state:function (val) {
            return val == 0?"正常":"异常"
        }
    }
});