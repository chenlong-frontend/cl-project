var deal = {};
deal.issue=[
    {flow_name:"文件上传申请",alias:"待审核",start_emp_name:"张雷云",last_emp_name:"张雷云",history_time:"2017-10-23 16:02",alias_css:"#4B0082"},
    {flow_name:"文件上传申请",alias:"待审核",start_emp_name:"张雷云",last_emp_name:"张雷云",history_time:"2017-10-23 16:02",alias_css:"#4B0082"},
    {flow_name:"文件上传申请",alias:"待审核",start_emp_name:"张雷云",last_emp_name:"张雷云",history_time:"2017-10-23 16:02",alias_css:"#4B0082"},
    {flow_name:"文件上传申请",alias:"待审核",start_emp_name:"张雷云",last_emp_name:"张雷云",history_time:"2017-10-23 16:02",alias_css:"#4B0082"},
    {flow_name:"文件上传申请",alias:"待审核",start_emp_name:"张雷云",last_emp_name:"张雷云",history_time:"2017-10-23 16:02",alias_css:"#4B0082"},
    {flow_name:"文件上传申请",alias:"待审核",start_emp_name:"张雷云",last_emp_name:"张雷云",history_time:"2017-10-23 16:02",alias_css:"#4B0082"},
    {flow_name:"文件上传申请",alias:"待审核",start_emp_name:"张雷云",last_emp_name:"张雷云",history_time:"2017-10-23 16:02",alias_css:"#4B0082"}
];
deal.issue1=[
    {flow_name:"文件上传申请",alias:"待审核s",start_emp_name:"张雷云",last_emp_name:"张雷云",history_time:"2017-10-23 16:02",alias_css:"#4B0082"},
    {flow_name:"文件上传申请",alias:"待审核",start_emp_name:"张雷云",last_emp_name:"张雷云",history_time:"2017-10-23 16:02",alias_css:"#4B0082"},
    {flow_name:"文件上传申请",alias:"待审核",start_emp_name:"张雷云",last_emp_name:"张雷云",history_time:"2017-10-23 16:02",alias_css:"#4B0082"},
    {flow_name:"文件上传申请",alias:"待审核",start_emp_name:"张雷云",last_emp_name:"张雷云",history_time:"2017-10-23 16:02",alias_css:"#4B0082"},
    {flow_name:"文件上传申请",alias:"待审核",start_emp_name:"张雷云",last_emp_name:"张雷云",history_time:"2017-10-23 16:02",alias_css:"#4B0082"},
    {flow_name:"文件上传申请",alias:"待审核",start_emp_name:"张雷云",last_emp_name:"张雷云",history_time:"2017-10-23 16:02",alias_css:"#4B0082"}
];

app.workflowdeal = new Vue({
    el:"#app-workflow-deal",
    beforeMount:function () {
        var self = this;
        self.deal = self.addIcon(deal.issue);
        self.count = self.deal.length;
        self.process =self.addIcon(deal.issue1);
        self.complete =self.addIcon(deal.issue1);
    },
    mounted:function () {
        var self = this;
        mui.init();
        mui.ready(function() {
            mui('.mui-scroll-wrapper').scroll();
            document.querySelector('.mui-slider').addEventListener('slide', function(event) {
                self.tabActive = event.detail.slideNumber;
            });
        });
        tool.waitLoad.display=false;
    },
    data:{
        deal:[],
        process:[],
        complete:[],
        flag:{
            proActive:true
        },
        tabActive:0
    },
    computed:{
      myDeal:function () {
          return this.flag.proActive?this.process:this.complete
      },
      proActiveTip:function () {
          if ((this.flag.proActive && this.process.length === 0) || (!this.flag.proActive && this.complete.length === 0)){return true}
      },
      countTotal:function () {
          var count = 0;
          if (this.tabActive === 0){
              count = this.deal.length
          } else if (this.tabActive === 1 && this.flag.proActive){
              count = this.process.length
          } else if (this.tabActive === 1 && !this.flag.proActive){
              count = this.complete.length
          }
          return count
      }
    },
    methods:{
        addIcon:function (data) {
            if (data.length > 0){
                $.each(data,function (key,val) {
                    if (val.flow_name === "文件上传申请"){
                        val.icon="img/workflow/list_folder.png"
                    }
                })
            }
            return data
        }
    }
});