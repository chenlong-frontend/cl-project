<template>
  <div class="monitorTable">
    <p>塔吊名称：<span>{{info.name}}</span></p>
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="监控视频" name="first">
        <div class="Img">
          <i class="el-icon-close"></i>
          <p>暂无实时监控视频</p>
          <p @click="configueView">点击进入实时监控视频配置界面</p>
        </div>
        <p class="back" @click="backView">点击选择录像回放</p>
      </el-tab-pane>
      <el-tab-pane label="视频监控列表" name="second">
        <view-list></view-list>
      </el-tab-pane>
    </el-tabs>
    <div class="time">{{this.date}}</div>
    <div class="towerPosition">
      <h4>塔吊基本信息</h4>
      <ul>
        <li>安全吊量: <span>{{info.safeWeight}}</span></li>
        <li>安全力距：<span>{{info.forceDis}}</span></li>
        <li>经纬度：<span>{{info.jwd}}</span></li>
      </ul>
    </div>

    <!-- 视频配置对话框 -->
    <el-dialog
      title="塔吊视频监控数据"
      :visible.sync="showView"
      width="472px"
      :append-to-body="true">
      <view-configue-dia></view-configue-dia>
      <div slot="footer" class="viewConfigue" >
        <el-button @click="reset">重置</el-button>
        <el-button type="primary" @click="readyConfigue">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 录像回放对话框 -->
    <el-dialog
      title="录像回放"
      :visible.sync="backViewDia"
      width="410px"
      :append-to-body="true">
      <back-view></back-view>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="select">查询</el-button>
      </span>
    </el-dialog>
    <!-- 录像回放查看对话框 -->
    <el-dialog
      title="录像回放查看对话框"
      :visible.sync="checkBackViewDia"
      width="810px"
      :append-to-body="true">
      <check-back-view></check-back-view>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="toBackView">重新选择查看时间</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import request from '@/api/workbench/tower/towerMonitor/monitorTab.js'
import viewConfigueDia from './view/viewConfigueDia'
import backView from './view/backView.vue'
import checkBackView from './view/checkBackView.vue'
import viewList from './viewList/viewList.vue'
export default {
  name: 'monitorTable',
  components: {viewConfigueDia, backView, checkBackView, viewList},
  props: ['towerID'],
  mounted () {
    this.init()
  },
  data () {
    return {
      activeName: 'first',
      date: '',
      showView: false,
      backViewDia: false,
      checkBackViewDia: false,
      info: {safeWeight: '120吨', forceDis: '120牛顿-米', jwd: 'W:20 E:40'}
    }
  },
  methods: {
    init () {
      this.getInfo()
      this.setDate()
    },
    getInfo () {
      request.getInfo(this.towerID).then(
        data => {
          if (data.data.code === 0) {
            this.info = data.data.data.info
          } else this.$message.error('获取失败')
        },
        error => {
          console.log(error)
        }
      )
    },
    handleClick (tab, event) {
      console.log(tab, event)
    },
    // 进入视频配置
    configueView () {
      this.showView = true
    },
    // 视频配置中的重置按钮
    reset () {

    },
    // 视频配置中的确定按钮
    readyConfigue () {
      this.showView = false
    },
    // 录像回放
    backView () {
      this.backViewDia = true
    },
    // 录像回放中的查询按钮
    select () {
      this.backViewDia = false
      this.checkBackViewDia = true
    },
    // 录像回放查看对话框中的重新选择查看时间按钮
    toBackView () {
      this.backViewDia = true
      this.checkBackViewDia = false
    },
    setDate () {
      let d1 = new Date().toLocaleString()
      this.date = d1.substring(0, d1.length - 3)
    }
  }
}
</script>
<style scoped>
.monitorTable{
  position: relative;
  height: 550px;
  overflow: auto;
}
.Img{
  width:550px;
  height:300px;
  margin:0 auto;
  background-color: #EBEBEB;
  text-align: center;
  cursor: pointer;
}
.Img .el-icon-close{
  font-size: 40px;
  margin-top: 70px;
}
.back{
  color:cyan;
  margin-left: 450px;
  cursor: pointer;
}
.towerPosition{
  margin: -20px 0px 0px 10px;
}
.towerPosition li{
  width:30%;
  display: inline-block;
}
.time{
  position: absolute;
  top:50px;
  right:15px;
}
.viewConfigue {
  margin-top: 20px;
  padding-right: 30px;
}
</style>


