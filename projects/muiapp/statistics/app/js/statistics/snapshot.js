var data = [];
data.list = [{flow_name:'审核中',vio_type_name:'违规停放',last_emp_name:'张三',history_time:'2017-02-11',img:'../workflow/img/workflow/camera_list.png'}]

app.statisticssnapshot = new Vue({
    el:"#app-statistics-snapshot",
    beforeMount:function () {
        var self = this;
        self.muiInit();
        self.display.audit = data.list;
        self.display.pending = data.list;
        self.display.tConfirm = data.list;
        self.display.confirm = data.list;
        self.display.failled = data.list;
        tool.waitLoad.display=false;
    },
    data:{
        display:{
            //待审核
            audit:[],
            //待处理
            pending:[],
            //待确认
            tConfirm:[],
            //已确认
            confirm:[],
            //未完成
            failled:[]
        },
        page:{
            audit:{
              index:0,
              loading:false,
              text:'加载更多'
            },
            pending:{
                index:0,
                loading:false,
                text:'加载更多'
            },
            tConfirm:{
                index:0,
                loading:false,
                text:'加载更多'
            },
            confirm:{
                index:0,
                loading:false,
                text:'加载更多'
            },
            failled:{
                index:0,
                loading:false,
                text:'加载更多'
            }
        },
        pagesize:15

    },
    methods:{
        loadAudit:function () {
            var self = this;
            self.page.audit.text = '正在加载';
            if (!self.page.audit.loading){
                self.page.audit.loading = true;
                //执行加载操作，此处不需要tool.wait.show
                self.page.audit.loading = false;
                self.display.audit = self.display.audit.concat(data.list);
                self.page.audit.text = '加载更多';
            }
        },
        loadPending:function () {
            var self = this;
            self.page.pending.text = '没有更多数据了'
        },
        loadTConfirm:function () {
            var self = this;
        },
        loadFailled:function () {
            var self = this;
        },
        loadConfirm:function () {
            var self = this;
        },
        muiInit:function () {
            var self=this;
            mui.init();
            mui.ready(function () {
                mui('.mui-scroll-wrapper').scroll();
            })
        }
    }
});