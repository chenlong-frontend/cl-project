var routes = [
    { path: '/file.html', component: component.file },
    { path: '/work.html', component: component.work }
];

router.index = new VueRouter({
    routes:routes
});

app.filemanageindex = new Vue({
    el:"#app-file-manage-index",
    beforeMount:function () {
        var self = this;
        this.contentUrl = this.tab.data[0].url;
        self.department = data.info;
        tool.waitLoad.display=false;
    },
    router:router.index,
    data:{
        department:{},
        tab:{
            img:["file","work"],
            data:[{url:"file.html",text:"我的文件"},
                {url:"work.html",text:"工作区"}],
            active:0
        }
    },
    computed:{
      tabData:function(){
          var self = this;
          this.tab.data.forEach(function (val,key) {
              val.img = 'img/filemanage/' + self.tab.img[key] + (key === self.tab.active?'.png': '_grey.png');
          });
          return this.tab.data
      }
    },
    methods:{
        tabTurn:function (index) {
            var self = this;
            if (this.tab.active !== index) {
                this.tab.active = index;
                this.contentUrl = this.tab.data[index].url;
            }
        }
    }
});