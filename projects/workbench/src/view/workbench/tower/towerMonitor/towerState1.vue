<template>
  <div class="towerState1">
      <span class="title">塔吊实时状态</span>---- <span class="stateTitle">当前工作状态：</span> <span class="state">{{stateJudge}}</span>
      <el-row>
        <el-col :span="11" v-for="(item, index) in states" :key="index" class="oneData">
          <div class="grid-content bg-purple">
            <div class="circle"></div>
            <span class="left">{{item.title}}</span>
            <span class="center">{{item.data}}</span>
            <span class="rightState safe" v-if="item.stateNum === 0">{{item.state}}</span>
            <span class="rightState warning" v-if="item.stateNum === 1">{{item.state}}</span>
            <span class="rightState danger" v-if="item.stateNum === 2"><i class="fa fa-exclamation-triangle"></i>{{item.state}}</span>
          </div>
        </el-col>
      </el-row>
  </div>
</template>
<script>
import request from '@/api/workbench/tower/towerMonitor/towerState1.js'
export default {
  name: 'towerState1',
  props: ['towerID'],
  mounted () {
    this.init()
  },
  data () {
    return {
      states: [
        {title: '当前风速', data: '一级', state: '安全', stateNum: 0},
        {title: '当前幅度', data: '25.6米', state: '安全', stateNum: 0},
        {title: '当前碰撞角度', data: '88.7', state: '警告', stateNum: 1},
        {title: '当前高度', data: '0.5米', state: '安全', stateNum: 0},
        {title: '当前吊重', data: '0.05T', state: '安全', stateNum: 0},
        {title: '当前倾角', data: '17', state: '危险', stateNum: 2},
        {title: '当前倍率', data: '4倍', state: '安全', stateNum: 0},
        {title: 'GPS状态', data: '', state: '信号正常', stateNum: 0}
      ],
      stateJudge: '正常工作'
    }
  },
  methods: {
    init () {
      this.getTowerState()
    },
    getTowerState () {
      console.log('11111112' + this.towerID)
      request.getTowerState(this.towerID).then(
        data => {
          if (data.data.code === 0) {
            this.states = data.data.data.states
            this.stateJudge = data.data.data.stateJudge
          } else this.$message.error('获取失败')
        },
        error => {
          console.log(error)
        }
      )
    }
  }
}
</script>
<style scoped>
.towerState1{
  width:100%;
  height: 230px;
  background-color: #EBEBEB;
  padding:10px;
  margin-top: 20px;
  margin-left: 20px;
  box-sizing: border-box;
  overflow: auto;
}
.title{
  font-weight: bold;
  color:#676A6C;
}
.stateTitle{
  color:#D8D8D8;
}
.state{
  color:red;
}
.oneData{
  height: 36px;
  line-height: 36px;
  background-color: #FAFAFA;
  border-radius: 5px;
  padding-right: 4px;
  margin: 9px 8px 0px 8px;
  position: relative;
}
.oneData .circle{
  width:6px;
  height: 6px;
  border-radius: 3px;
  background-color: #999999;
  position: absolute;
  left:6px;
  top:16px;
}
.oneData .left{
  margin-left: 18px;
  margin-right: 10px;
  color:#A2A2AA;
}
.oneData .center{
  color:#676A6C;
}
.oneData .rightState{
  float:right;
}
.oneData .safe{
  color:#8BC34A;
}
.oneData .warning{
  color:#FFB800;
}
.oneData .danger{
  color:#E30000;
}
</style>


