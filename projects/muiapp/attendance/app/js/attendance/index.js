var data = {};
data.list = [{"check_time": "2017-10-08 09:33", "io": 1, "check_type": "考勤机", "emp_name": "章雷云", "gro_name": "技术部"},
    {"check_time": "2017-10-08 10:33", "io": 1, "check_type": "考勤机", "emp_name": "章雷云", "gro_name": "技术部"},
    {"check_time": "2017-10-08 11:33", "io": 2, "check_type": "考勤机", "emp_name": "章雷云", "gro_name": "技术部"},
    {"check_time": "2017-10-08 18:33", "io": 2, "check_type": "考勤机", "emp_name": "章雷云", "gro_name": "技术部"}];

app.attendanceindex = new Vue({
    el:"#app-attendance-index",
    beforeMount:function () {
        this.init();
        this.getDays(6,new Date(),[]);
      //  this.display.attendance = data.list;
        //这里是ajax请求
        tool.waitLoad.display=false;
    },
    data:{
        timeTitle:'',
        display:{
            days:[],
         //   attendance:[]
        },
        active:{
            days:6
        }
    },
    computed: {
        // start: function () {
        //     var self = this;
        //     return this.display.attendance.filter(function (t,key) {
        //         return key === 0 && t.io === 1
        //     })
        // },
        // process: function () {
        //     var self = this;
        //     return this.display.attendance.filter(function (t,key) {
        //         return !((key === self.display.attendance.length - 1 && t.io === 2) || (key === 0 && t.io === 1))
        //     })
        // },
        // end: function () {
        //     var self = this;
        //     return this.display.attendance.filter(function (t,key) {
        //         return key === self.display.attendance.length - 1 && t.io === 2
        //     })
        // }
    },
    methods:{
        getDays:function (num,date,arr) {
            if (num >= 0){
                var newDate = new Date(date.getTime() - num*24*60*60*1000);
                num--;
                var time = newDate.getDate();
                arr.push(time);
                this.getDays(num,date,arr);
            } else {
                this.display.days = arr
            }
        },
        init:function () {
            var self = this;
            $(function() {
                var mask = mui.createMask(function(){$(".my_modal").css("display","none");});
                $(".time_select").on("click",function(){mask.show();$(".my_modal").css("display","block");});
                var dateTime = new Date().format("yyyy-MM-dd");
                var muiContent = $(".mui-content");
                self.timeTitle = dateTime;
                $(".time_title").on("click","li",function(){
                    $(this).find("a").addClass("active").parent().siblings().find("a").removeClass("active");
                    var curtime1 = muiContent.find(".title").find(".h3").text();
                    var str = curtime1.split("-");
                    var month = str[1];
                    var day = $(this).find("a").text();
                    if (day<10&&day.length<2){day = "0"+day;}
                    if (month<10&&month.length<2){month = "0" + month;}
                    self.timeTitle=str[0]+"-"+month+"-"+day;
                    //这里是ajax请求
                });

                var mySchedule = new Schedule({
                    el: '#schedule_box',
                    clickCb: function (y,m,d) {
                        if (d<10){d = "0"+d;}
                        if (m<10){m = "0"+m;}
                        var time = y+"-"+m+"-"+d;
                        self.getDays(6,new Date(time),[]);
                        mask.close();
                        $(".my_modal").css("display","none");
                        self.timeTitle=time;
                        //这里是ajax请求
                    }
                });
            });
            mui.init();
            mui.ready(function() {
                var mask = mui.createMask(function() {
                    $(".folder_content").hide();
                });
                $(".folder_ctrl").on("click", function() {
                    mask.show();$(".folder_content").show();
                });
                $(".folder_content").on("click", "li", function() {
                    $(".modal").css("display", "none");mask.close();
                })
            })
        }
    }
});