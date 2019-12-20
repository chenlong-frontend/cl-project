app.statisticsindex = new Vue({
    el:"#app-statistics-index",
    beforeMount:function () {
        this.snapShot = "0%";
        this.camera = "5";
        this.project = "0"
        tool.waitLoad.display=false;
    },
    data:{
        snapShot:"无",
        camera:"无",
        project:"无"
    },
    methods:{

    }
});