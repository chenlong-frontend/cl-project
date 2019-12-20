app.snapshotjumppage = new Vue({
    el:"#app-snapshot-jump-page",
    beforeMount:function () {
        var self = this;
        var info = [{img:"img/svg/state_done.svg",result:"违章记录已上传成功",tip:"请等待安全部门管理员审核通过"},
            {img:"img/svg/state_done.svg",result:"确认违章记录已妥善处理完毕",tip:""},
            {img:"img/svg/state_done.svg",result:"违章记录已处理完成",tip:"已提交至指定部门负责人确认"},
            {img:"img/svg/state_done.svg",result:"违章记录已审核通过",tip:"已提交至指定部门负责人处理"},
            {img:"img/svg/state_fail.svg",result:"违章记录审核不通过",tip:"已拒绝记录提交，等待上传人修改记录后再次提交"},
            {img:"img/svg/state_done.svg",result:"违章记录已重新提交",tip:"请等待安全部门管理员审核通过"}];
        self.info = info[tool.getUrlParam("type")];
        tool.waitLoad.display=false;
    },
    data:{
        info:{}
    },
    methods:{
        jump:function () {
            console.log(1)
        }
    }
});