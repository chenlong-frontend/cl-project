var data = {};
data.list = {
    title:"dsf",
    content:"dfsdfafda",
    time:"2017-10-12",
    img:["img/home/news/004.png","img/home/news/004.png"]
};

app.homedetail = new Vue({
    el:"#app-home-detail",
    beforeMount:function () {
        this.display = data.list;
        tool.waitLoad.display=false;
    },
    data:{
        display:{
            title:'',
            content:'',
            time:'',
            img : []
        }
    },
    methods:{

    }
});