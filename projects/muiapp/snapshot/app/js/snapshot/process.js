var data = {};
data.info = {"role":2,"vio_type_name":"违反“三宝”规定","is_over":0,"history_time":"2017-10-23 12:58","flow_id":"20170831112335001","vio_desc":"吃得太好","state":2,"vio_level_name":"一般问题","m_platform":1,"address":"江苏省徐州市沛县江南山水16栋","iss_id":"20171023125814189","vio_level_id":1,"next_nodes":[{"is_fail":false,"flow_id":"20170831112335001","alias_css":"#FFFF00","name":"安全部核查","form_id":"3","alias":"待确认","id":"201708311131280007","tag":false}],"gro_id":"20170831145801050","cur_node_id":"20170831113128004","history_id":"20171023125814226","vio_type_id":1,"upload_time":"2017-10-23 12:57","gro_name":"工程部","record_id":"20171023125727757","vio_pic":"img/temp.jpg","copy_to_man":"","form_url":"../snapshot/process.html","form_table_name":"p_iss_snapshot","verify_advise":"瞬间复活","upload_name":"章雷云"};

app.snapshotprocess = new Vue({
    el:"#app-snapshot-process",
    beforeMount:function () {
        console.log(data.info)
        var self = this;
        var info = data.info;
        for (a in self.form) {self.form[a] = info[a];}
        self.text.time = info.history_time;
        tool.session.set("process",info);
        if (info.role === 1 ){
            self.style.progress = "0px"
        } else if (info.role === 2){
            //处理
        }

        tool.waitLoad.display=false;
    },
    data:{
        form:{
            address:"",
            vio_type_name:"",
            upload_time:"",
            upload_name:"",
            vio_desc:"",
            vio_pic:"",
            vio_level_name:"",
            gro_name:"",
            verify_advise:"",
            copy_to_man:"",
            role:"",
            is_over:""
        },
        text:{
            time:""
        },
        style:{
            progress:"80px"
        }
    },
    methods:{
        accept:function () {
            this.form.is_over = 0;
            //session里的值改为0
        },
        report:function () {
            window.location.href="process_report.html?type=1";
        },
        done:function () {
            window.location.href="process_submit.html";
        }
    }
});