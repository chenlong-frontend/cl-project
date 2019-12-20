var data={};
data.info = {"role":2,process_pic:"img/temp.jpg","vio_type_name":"违反基本行为准则","is_over":1,"history_time":"2017-11-03 10:27","flow_id":"20170831112335001","vio_desc":"1111","state":3,"vio_level_name":"一般问题","process_advise":"京津冀好了就好","m_platform":1,"address":"江苏省南京市玄武区环园东路","iss_id":"20171103102720069","vio_level_id":1,"next_nodes":[{"is_fail":false,"flow_id":"20170831112335001","alias_css":"#FF6347","name":"end","form_id":"3","alias":"已确认","id":"201708311131280008","tag":false}],"gro_id":"20170831145801050","cur_node_id":"201708311131280007","history_id":"20171103102720537","processor":"邵武","vio_type_id":7,"upload_time":"2017-10-25 11:47","gro_name":"工程部","record_id":"20171025114708351","vio_pic":"img/temp.jpg","copy_to_man":"","form_url":"../snapshot/confirm.html","form_table_name":"p_iss_snapshot","verify_advise":"胜多负少","upload_name":"孙传虎"};
console.log(data.info)
app.snapshotconfirm = new Vue({
    el:"#app-snapshot-confirm",
    beforeMount:function () {
        var self=this;
        self.info = data.info;

        if (self.info.state === 3 && self.info.role === 2){
            self.style.progress = "80px";
            self.style.content = "128px";
        }else if (self.info.state === 5 && self.info.role === 1){

        }


        mui.init();
        mui.ready(function() {
            mui('.mui-scroll-wrapper').scroll();
        });
        tool.waitLoad.display=false;
    },
    data:{
        info:{},
        style:{
            progress:"0px",
            content:"48px"
        }
    },
    methods:{

    }
});