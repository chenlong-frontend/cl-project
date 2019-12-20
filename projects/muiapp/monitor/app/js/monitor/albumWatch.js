app.monitoralbumwatch = new Vue({
    el:"#app-monitor-album-watch",
    beforeMount:function () {
        var self = this;
        self.photoData= JSON.parse(decodeURIComponent(tool.getUrlParam("album")));
        tool.waitLoad.display=false;
    },
    data:{
        photoData:{}
    },
    methods:{
        lastPic:function (val) {
            console.log(val)
        },
        nextPic:function (val) {
            console.log(val)
        }
    }
});