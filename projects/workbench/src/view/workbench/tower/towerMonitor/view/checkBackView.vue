<template>
    <div class="checkBackView">
        <el-container>
            <el-main width="70%" class="left">
                <div class="viewBox">

                </div>
            </el-main>
            <el-aside width="30%" class="right">
                <h5>塔吊名称：<span>{{viewDetail.name}}</span> </h5>
                <p>播放时间段: <span>{{viewDetail.time}}</span> </p>
                <p>监控部位： <span>{{viewDetail.position}}</span> </p>
                <p >实时状态： 
                    <span class="safe" v-if="viewDetail.workState === 0">{{viewDetail.nowState}}</span> 
                    <span class="warning" v-if="viewDetail.workState === 1">{{viewDetail.nowState}}</span> 
                    <span class="danger" v-if="viewDetail.workState === 2">{{viewDetail.nowState}}</span> 
                </p>
                <p>塔吊经纬度：<span>{{viewDetail.longitude}}</span> </p>
                <h5>当前状态信息:<span></span> </h5>
                <p>操作员：<span>{{viewDetail.state.person}}</span> </p>
                <p>塔吊经纬度：<span>{{viewDetail.state.position}}</span> </p>
            </el-aside>
        </el-container>
    </div>
</template>
<script>
export default {
  name: 'checkBackView',
  data () {
    return {
      viewDetail: {
        name: 'TD001',
        time: '2017-1-16    11:22',
        position: '塔吊尾部',
        nowState: '正常运行中',
        workState: 0,
        longitude: 'W:113.243  E:185.134',
        state: {
          person: '0001',
          position: '仓库区-堆料区-左侧'
        }
      }
    }
  }
}
</script>
<style scoped>
.checkBackView{
    /* border: 1px solid; */
    width:100%;
    margin: 0 auto;
}
.checkBackView .left{
    margin-top: -20px;
}
.checkBackView .left .viewBox{
    width:100%;
    height: 300px;
    background-color: black;
    margin:0 auto;
}
.checkBackView .right{
    padding:10px;
    box-sizing: border-box;
    background-color: #E6E6E6;
}
.checkBackView .right h5{
    margin: 15px 0px;
}
.checkBackView .right p{
    margin: 0px;
}
.checkBackView .right .safe{
    color:#8BC34A;
}
.checkBackView .right .warning{
    color:#FFB800;
}
.checkBackView .right .danger{
    color:#E30000;
}
</style>


