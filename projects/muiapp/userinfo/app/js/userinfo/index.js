app.userinfoindex = new Vue({
    el:"#app-userinfo-index",
    beforeMount:function () {
        tool.waitLoad.display=false;
    },
    data:{
        userInfo:{},
        editHref:"edit.html"
    },
    methods:{

    }
});