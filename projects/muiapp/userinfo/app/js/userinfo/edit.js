var dtpicker = new mui.DtPicker({
    type: "month",
    beginDate: new Date(1970, 01, 01),
    endDate: new Date(),//设置结束日期
    labels: ['年', '月']
});
app.userinfoedit = new Vue({
    el:"#app-userinfo-edit",
    beforeMount:function () {

        tool.waitLoad.display=false;
    },
    data:{
        userInfo:{}
    },
    methods:{
        selectPic:function () {
            //选择头像
        },
        selectTime:function () {
            dtpicker.show(function(e) {
                console.log(e);
            })
        },
        tel:function () {
            //固定电话
            mui.prompt(' ','请输入固定电话','固定电话',['确定','取消'],function (e) {
                console.log(e)
            },'div')
        },
        email:function () {
            mui.prompt(' ','请输入邮箱','邮箱',['确定','取消'],function (e) {
                console.log(e)
            },'div')
        },
        mark:function () {
            mui.prompt(' ','请输入备注','备注',['确定','取消'],function (e) {
                console.log(e)
            },'div')
        },
        submit:function () {
            
        }
    }
});