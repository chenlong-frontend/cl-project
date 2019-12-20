<template>
  <div class="content">
    <el-row :gutter="30">
      <el-col :span="9">
        <div class="grid-content bg-purple">
          <!--左上-->
          <div class="box left-top">
            <div class="title"><strong>项目信息</strong></div>
            <div class="item-content" v-loading="loading.leftTop">
              <div class="img">
                <img v-img-loading="['110px', '80px' , projectData.preview_pic]" />
              </div>
              <div class="text">
                <h4>{{projectData.name}}</h4>
                <p>开工日期 : {{projectData.start_time}}</p>
                <p>项目经理 : {{projectData.manage_name}}</p>
                <p>地址 : {{projectData.area}}</p>
              </div>
              <div class="intro">
                <p>{{'简介：' + projectData.desc}}</p>
              </div>
            </div>
            <div class="item-bottom">
              <a @click="flag.showMap = true"><i class="fa fa-map"></i>工地地图</a><a @click="addressBook"><i class="fa fa-address-book"></i>项目通讯录</a>
            </div>
          </div>
          <!--左下-->
          <div class="box left-bottom">
            <div class="title"><strong>工地文档记录</strong><small>(最近上传文档)</small></div>
            <div class="item-content">
              <template>
                <el-table  v-loading="loading.leftBottom"
                  :data="documentData" style="width: 100%" stripe size="mini">
                  <el-table-column prop="icon" label="类型" width="50px">
                    <template slot-scope="scope">
                      <img style="width: 22px;border: none;" v-img-loading="['22px', '24px' , scope.row.icon]" />
                    </template>
                  </el-table-column>
                  <el-table-column prop="file_name" label="文件名" show-overflow-tooltip></el-table-column>
                  <el-table-column prop="emp_name" label="上传人" width="60px" show-overflow-tooltip></el-table-column>
                  <el-table-column prop="file_time" label="上传日期" width="110px" show-overflow-tooltip></el-table-column>
                </el-table>
              </template>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="15">
        <div class="grid-content bg-purple">
          <!--右上-->
          <div class="box right-top">
            <div class="title">
              <strong>项目工地人员信息</strong>
            </div>
            <div class="item-content" v-loading="loading.rightTop">
              <h5 class="item-content-title">{{liveCount.current_time}}</h5>
              <div class="count">
                <el-row :gutter="20">
                <el-col :span="6">
                  <div class="grid-content bg-purple">
                    <div class="circle-text">
                      <p class="small">实时在场</p>
                      <p><strong>{{liveCount.live_count}}</strong></p>
                      <p class="small">人</p>
                    </div>
                  </div>
                </el-col>
                <el-col :span="6">
                  <div class="grid-content bg-purple">
                    <div class="circle-text danger">
                      <p class="small">今日累计进场</p>
                      <p><strong>{{liveCount.accumulate_count}}</strong></p>
                      <p class="small">人</p>
                    </div>
                  </div>
                </el-col>
                <el-col :span="6">
                  <div class="grid-content bg-purple">
                    <div class="circle-text primary">
                      <p class="small">临时卡实时</p>
                      <p><strong>{{liveCount.temp_card_count}}</strong></p>
                      <p class="small">张</p>
                    </div>
                  </div>
                </el-col>
                <el-col :span="6">
                  <div class="grid-content bg-purple">
                    <div class="circle-text warning">
                      <p class="small">实时卡累计</p>
                      <p><strong>{{liveCount.live_card_count}}</strong></p>
                      <p class="small">人/次</p>
                    </div>
                  </div>
                </el-col>
              </el-row>
              </div>
            </div>
            <div class="item-bottom">
              <a><i class="fa fa-flag"></i><span>在场队伍</span><i class="tab"  @click="show.team=!show.team" :class="[{'el-icon-arrow-down':!show.team},{'el-icon-arrow-up':show.team}]"></i>
                <el-collapse-transition>
                  <div class="drop-down" v-show="show.team" style="margin-left: 1px;">
                    <div class="title">
                      <span>名称</span>
                      <span class="right">人数</span>
                    </div>
                    <ul class="list">
                      <li class="item" v-for="item in liveCount.live_group"><div class="text"><span>{{item.name}}</span><span class="right">{{item.ct}}</span></div></li>
                    </ul>
                  </div>
                </el-collapse-transition>
              </a><!--
              --><a><i class="fa fa-user"></i><span>现场工种</span><i class="tab" @click="show.worker=!show.worker" :class="[{'el-icon-arrow-down':!show.worker},{'el-icon-arrow-up':show.worker}]"></i>
              <el-collapse-transition>
                <div class="drop-down"  v-show="show.worker" style="margin-left: 3px;">
                  <div class="title">
                    <span>名称</span>
                    <span class="right">人数</span>
                  </div>
                  <ul class="list">
                    <li class="item" v-for="item in liveCount.live_role"><div class="text"><span>{{item.name}}</span><span class="right">{{item.ct}}</span></div></li>
                  </ul>
                </div>
              </el-collapse-transition>
            </a>
            </div>
          </div>
          <!--右下-->
          <div class="box left-bottom">
            <div class="title"><strong>文明施工记录</strong></div>
            <div class="item-content">
              <template>
                <el-table  v-loading="loading.rightBottom" :data="cameraData" style="width: 100%" stripe size="mini">
                  <el-table-column prop="icon" label="类型" width="50px">
                    <template slot-scope="scope">
                      <img style="width: 22px;border: none;" v-img-loading="['22px', '24px' , scope.row.icon]" />
                    </template>
                  </el-table-column>
                  <el-table-column prop="vio_type_name" label="违规类型" show-overflow-tooltip></el-table-column>
                  <el-table-column prop="vio_desc" label="违章内容" show-overflow-tooltip></el-table-column>
                  <el-table-column prop="start_emp_name" label="上传人" width="70px" show-overflow-tooltip></el-table-column>
                  <el-table-column prop="start_time" label="上传日期" width="110px" show-overflow-tooltip></el-table-column>
                  <el-table-column prop="last_emp_name" label="处理人" width="70px" show-overflow-tooltip></el-table-column>
                  <el-table-column prop="history_time" label="处理日期" width="110px" show-overflow-tooltip></el-table-column>
                </el-table>
              </template>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-dialog
      :visible.sync="flag.showMap"
      width="80%"
      :append-to-body="true"
      center
      custom-class="dialogCss"
    >
      <!--:center="center"  @ready="handler" -->
      <template>
        <baidu-map
          class="map"
          :center="center"
          :zoom="zoom"
          @ready="handler"
          >
          <bm-marker :position="center" @click="infoWindowOpen">
            <bm-info-window
              :show="flag.show"
              @close="infoWindowClose"
              @open="infoWindowOpen"
              style="width: 350px;"
              >
              <span class="map_title">{{projectData.name}}</span>
              <img :src="projectData.preview_pic" class="map_img">
              <div class="map_msg map_msg1">
                <span>开工日期：{{projectData.start_time}}</span>
              </div>
              <div class="map_msg map_msg2">
                <span>项目经理：{{projectData.manage_name}}</span>
              </div>
              <div class="map_msg map_msg3">
                <span>地址：{{projectData.area}}</span>
              </div>
              <div class="map_msg map_msg4">
                <span>项目描述：{{projectData.desc}}</span>
              </div>
            </bm-info-window>
          </bm-marker>
        </baidu-map>
      </template>
    </el-dialog>
    <el-dialog
      title="项目通讯录" :visible.sync="addressVisible" width="1000px" append-to-body>
      <div>
        <staff-contract></staff-contract>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addressVisible = false">返 回</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import staffContract from '@/view/workbench/contract/staffContractIn.vue'
  import homeRequest from '@/api/workbench/home/home.js'
  import { BmMarker } from 'vue-baidu-map'
  export default {
    props: ['formid'],
    components: { BmMarker, staffContract },
    name: 'home',
    mounted () {
      homeRequest.getDocumentData().then(data => {
        this.documentData = data
        this.loading.leftBottom = false
      })
      homeRequest.getCameraData().then(data => {
        this.cameraData = data
        this.loading.rightBottom = false
      })
      homeRequest.getProjectData().then(data => {
        this.projectData = data
        this.loading.leftTop = false
      })
      homeRequest.getCount().then(data => {
        this.liveCount = data
        this.loading.rightTop = false
      })
    },
    data () {
      return {
        loading: {
          leftTop: true,
          leftBottom: true,
          map: false,
          rightBottom: true,
          rightTop: true
        },
        show: {
          map: false,
          team: false,
          worker: false
        },
        sizeMap: [{
          text: 'safsa',
          show: false,
          child: [{
            text: 'dsfsd'
          }]
        }],
        documentData: [],
        cameraData: [],
        projectData: [{}],
        liveCount: {},
        addressVisible: false,
        flag: {
          showMap: false,
          show: true
        },
        // 百度地图需要的点
        center: {lng: 0, lat: 0},
        zoom: 3
      }
    },
    methods: {
      handler ({BMap, map}) {
        console.log(BMap, map)
        this.center.lng = Number(this.projectData.longitude)
        this.center.lat = Number(this.projectData.latitude)
        this.zoom = 15
      },
      infoWindowClose () {
        this.flag.show = false
      },
      infoWindowOpen () {
        this.flag.show = true
      },
      addressBook () {
        this.addressVisible = true
      }
    }
  }
</script>

<style scoped>
  ul {list-style: none;margin: 0;padding: 0;}
  ul li {padding: 0;text-align: left;}
  .content {padding: 10px;}
  .box {background-color: #FEFEFE;border-top: 4px solid #E6E9EB;}
  .box .title{padding: 8px 4px;font-size: 12px;border-bottom: 1px solid #E6E9EB;color: #676A6C;}
  .item-content {padding: 20px 25px 15px 25px;border-bottom: 1px solid #E6E9EB;}
  .item-content .img{width: 110px;border-radius: 2px;float: left;max-height: 90px;overflow: hidden;}
  .item-content .img img {width: 100%;}
  .item-content .text {padding-left: 130px;}
  .item-content .text h4{margin-top: 0;color: #1C84C6;margin-bottom: 6px;}
  .item-content .text p {margin: 0;font-size: 12px;color: #676A6C;line-height: 1.4em;}
  .item-content .intro {font-size: 12px;color: #676A6C;line-height: 1.4em;}
  .item-content .intro p {margin-bottom: 0;}
  .item-bottom a{width: 50%;display: inline-block;color: #1C84C6;text-align: center;font-size: 12px;padding: 10px 0;position: relative;}
  .left-top .item-bottom a {cursor: pointer;}
  .item-bottom a i {font-size: 20px;padding:0 10px;}
  .item-bottom a span {vertical-align: 4px;padding: 0 5px;}
  .item-bottom a:first-child:before{position: absolute;content: ' ';right: 0;top:0;bottom: 0;width: 1px;background-color: #E6E9EB;}
  .left-bottom {margin-top: 20px;}
  .el-table {cursor: pointer;}
  .el-button-group {float: right;margin-top: -6px;}
  .left-bottom .el-button {padding: 0;}
  .right-top .item-content-title{margin: 0 0 15px 0;color: #1C84C6;}
  .right-top .circle-text {border: 6px solid #1C84C6;border-radius: 100px;width: 94px;margin: 0 auto;padding: 15px 0;}
  .right-top .circle-text.danger {border-color: #EF5253;}
  .right-top .circle-text.primary {border-color: #1AB394;}
  .right-top .circle-text.warning {border-color: #F8AC59;}
  .right-top .circle-text p {margin: 0;text-align: center;line-height: 1.2em;font-size: 30px;color: #1C84C6;}
  .right-top .circle-text.primary p {color: #1AB394;}
  .right-top .circle-text.danger p {color: #EF5253;}
  .right-top .circle-text.warning p {color: #F8AC59;}
  .right-top .circle-text .small {font-size: 12px;}
  .right-top .item-content {padding-bottom: 20px;border-bottom: 1px solid #E6E9EB;}
  .right-top .item-bottom a {width: 50%;position: relative;}
  .right-top .item-bottom a:last-child:before{position: absolute;content: ' ';left: 0;top:0;bottom: 0;width: 1px;background-color: #E6E9EB;}
  .right-top span {padding: 0 8px;}
  .right-top .item-bottom > a {padding: 0;}
  .right-top .item-bottom > a .tab{cursor: pointer;padding: 12px 4px;}
  .drop-down {position: absolute;width: 99%;top: 45px;overflow: hidden;border: 1px solid #E6E9EB;border-left: none;background-color: #ffffff;z-index: 999;}
  .drop-down ul{max-height: 120px;overflow: auto;}
  .drop-down li {padding: 0;}
  .drop-down .title {font-size: 12px;font-weight: 600;text-align: left;color: #676A6C;padding-left: 0px;}
  .drop-down .title .right {float: right;margin-right: 15px;}
  .drop-down .item .right {float: right;margin-right: 24px;}
  .drop-down .item .right.folder {margin-right: 0;}
  .drop-down .item .right i {padding-left: 6px;}
  .drop-down .item .text {color: #676A6C;padding: 8px 0;}
  .map{
    width: 100%;
    height:450px;
    border:1px solid #ddd;
  }
  .map .map_title{
    display: inline-block;
    font-weight: 600;
    position: absolute;
  }
  .map .map_img{
    display: inline-block;
    width: 60%;
    min-height: 120px;
    position: absolute;
    left: 0px;
    top: 30px;
  }
  .map .map_msg{
    display: inline-block;
    width: 40%;
    position: absolute;
    left:62%;
    font-size: 12px;
  }
  .map .map_msg1{
    top:15%;
  }
  .map .map_msg2{
    top:25%;
  }
  .map .map_msg3{
    top:35%;
  }
  .map .map_msg4{
    top:50%;
    line-height: 105%;
  }
</style>
