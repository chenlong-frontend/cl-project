data.info = {name:"徐州沛县文荟苑工地项目",address:"徐州市沛县正阳街道250号",id:1,count:"2"};

var routes = [
    { path: '/camera.html', component: component.camera },
    { path: '/list.html', component: component.list },
    { path: '/album.html', component: component.album }
];

router.index = new VueRouter({
    routes:routes
});

app.monitorcamera = new Vue({
    el:"#app-monitor-camera",
    beforeMount:function () {
        var self = this;
        tool.waitLoad.bottom = "59px";
        this.contentUrl = this.tab.data[0].url;
        self.department = data.info;
        tool.waitLoad.display=false;
    },
    router:router.index,
    data:{
        department:{},
        tab:{
            img:["camera","list","album"],
            data:[{url:"camera.html",text:"视频监控"},
                {url:"list.html",text:"监控列表"},
                {url:"album.html",text:"截屏相册"}],
            active:0
        },
        style:{
            content:"130px"
        }
    },
    computed:{
      tabData:function(){
          var self = this;
          this.tab.data.forEach(function (val,key) {
              val.img = 'img/monitor/svg/' + self.tab.img[key] + (key === self.tab.active?'.svg': '_grey.svg');
          });
          return this.tab.data
      }
    },
    methods:{
        tabTurn:function (index) {
            var self = this;
            self.style.content = index === 1?"170px":"130px";
            if (this.tab.active !== index) {
                this.tab.active = index;
                this.contentUrl = this.tab.data[index].url;
            }
        }
    }
});