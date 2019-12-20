data.album = {};
data.album.photo = [{thumbnail:"img/monitor/yuantiao.jpg",unit_type:"大华HDX-266",org_pic:"img/monitor/yuantiao.jpg",position:"仓库区-堆料仓库-左侧区域",time:"2017-10-30 15:35"},
    {thumbnail:"img/monitor/yuantiao.jpg",unit_type:"大华HDX-266",position:"仓库区-堆料仓库-左侧区域",org_pic:"img/monitor/yuantiao.jpg",time:"2017-11-01 15:35"},
    {thumbnail:"img/monitor/yuantiao.jpg",unit_type:"大华HDX-266",position:"仓库区-堆料仓库-左侧区域",org_pic:"img/monitor/yuantiao.jpg",time:"2017-11-12 15:35"},
    {thumbnail:"img/monitor/yuantiao.jpg",unit_type:"大华HDX-266",position:"仓库区-堆料仓库-左侧区域",org_pic:"img/monitor/yuantiao.jpg",time:"2018-12-12 15:35"}];

//相册列表
component.album = {
    template:'<div class="fixed_box">' +
                 '<div class="album">' +
                    '<template v-for="item in photoDisplay">'+
                        '<h5>{{item.time}}</h5>' +
                        '<ul>' +
                            '<li @click="photoWatch(photo)" v-for="photo in item.img"><img :src="photo.thumbnail"></li>' +
                        '</ul>' +
                    '</template>'+
                 '</div>' +
                '</div>',
    beforeMount:function () {
        var self = this;
        self.photo = data.album.photo;
    },
    data:function () {
        return {
            photo:[]
        }
    },
    computed:{
        photoDisplay:function () {
            var self = this;
            var photos = [];
            var lastMonth=0,lastYear=0;
            self.photo.forEach(function (val) {
                var photo = {};
                var time = new Date(val.time.replace(/-/g,"/"));
                var year =time.getFullYear(),
                    month = time.getMonth() + 1;
                var times = year + "年" + month + "月";
                if (year !== lastYear || month !== lastMonth){
                    photo.time = times;
                    photo.img = [val];
                    photos.push(photo);
                    lastMonth = month;
                    lastYear = year;
                } else {
                    photos[photos.length - 1].img.push(val);
                }
            });
            return photos
        }
    },
    methods:{
        photoWatch:function (val) {
            window.location.href = "album_watch.html?album="+encodeURIComponent(JSON.stringify(val));
        }
    }
};