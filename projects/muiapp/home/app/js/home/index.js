var data={};
data.list = [{url:'#',text:'中江国际集团公司荣获2016年江苏省建筑业“百强企业”和“外经十强”企业称号'},
    {url:'#',text:'中江国际集团与淮安市政府签署战略合作协议'},
    {url:'#',text:'中江国际集团公司领导赴泗阳开展精准扶贫调研'},
    {url:'#',text:'中江国际集团与淮安市洪泽区人民政府签署通用航空产业园战略合作框架协议'},
    {url:'#',text:'省委组织部常务副部长胡金波到中江国际集团公司调研指导工作'}]

app.homeindex = new Vue({
    el:"#app-home-index",
    beforeMount:function () {
        var self = this;
        self.display.tab1 = data.list;
        self.display.tab2 = data.list;
        self.display.tab3 = data.list;
        tool.waitLoad.display=false;
    },
    data:{
        display:{
            tab1:[],
            tab2:[],
            tab3:[]
        }
    },
    methods:{

    }
});