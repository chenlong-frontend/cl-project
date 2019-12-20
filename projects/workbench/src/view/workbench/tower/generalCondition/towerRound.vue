<template>
  <div class="towerRound">
    <div class="grab" ref="grabs" @click="toMonitor" v-popover:detail>
      <div class="rect" ref="rects">
        <p class="rectHead" ref="rectHeads"></p>
      </div>
      <el-popover
        ref="detail"
        placement="top-start"
        width="250"
        trigger="hover">
        <div class="detail">
          <img :src="towerInfo.Img" alt="">
          <div class="dataContent">
            <p> 编号：<span>{{towerInfo.num}}</span></p>
            <p> 位置：<span>{{towerInfo.position}}</span></p>
            <p> 部门：<span>{{towerInfo.work}}</span></p>
          </div>
      </div>
      </el-popover>
    </div>
    <el-dialog
      title="塔吊实时监控信息"
      :visible.sync="showMonitor"
      width="1080px"
      :append-to-body='true'>
      <tower-monitor :showMonitor='this.showMonitor' :towerID="this.roundInfo.id"></tower-monitor>
    </el-dialog>
  </div>
</template>

<script>
  import towerMonitor from '@/view/workbench/tower/towerMonitor/towerMonitor.vue'
  export default {
    name: 'tower',
    props: ['roundInfo', 'bgSize'],
    components: {towerMonitor},
    data () {
      return {
        showId: -1,
        towerInfo: {Img: '', num: '', position: '', work: ''},
        showMonitor: false
      }
    },
    mounted () {
      console.log('shengxiao')
      this.$refs.grabs.style.width = this.roundInfo.diameter * parseInt(this.bgSize.substring(0, this.bgSize.length - 2)) + 'px'
      this.$refs.grabs.style.height = this.roundInfo.diameter * parseInt(this.bgSize.substring(0, this.bgSize.length - 2)) + 'px'
      this.$refs.grabs.style.borderRadius = this.roundInfo.diameter / 2 * parseInt(this.bgSize.substring(0, this.bgSize.length - 2)) + 'px'
      this.$refs.grabs.style.left = this.roundInfo.leftPrecent * parseInt(this.bgSize.substring(0, this.bgSize.length - 2)) + 'px'
      this.$refs.grabs.style.bottom = this.roundInfo.bottomPrecent * parseInt(this.bgSize.substring(0, this.bgSize.length - 2)) + 'px'
      this.$refs.grabs.style.transform = 'rotate' + '(' + this.roundInfo.degs + 'deg' + ')'
      this.$refs.rects.style.height = this.roundInfo.diameter * parseInt(this.bgSize.substring(0, this.bgSize.length - 2)) + 'px'
      this.$refs.rectHeads.style.top = this.roundInfo.diameter * parseInt(this.bgSize.substring(0, this.bgSize.length - 2)) - 36.5 + 'px'
      this.towerInfo = this.roundInfo.info
      console.log(this.towerInfo)
    },
    methods: {
      getRoundData () {

      },
      // 鼠标移入显示详情
      enter (index) {
        this.showId = index
      },
      leave () {
        this.showId = -1
      },
      toMonitor () {
        this.showMonitor = true
      }
    }
  }
</script>

<style scoped>
.grab{
  background-color: #89BB77;
  position: absolute;
  cursor: pointer;
}
.grab .rect{
  width:4px;
  border-radius: 2px;
  background-color: #1F670B;
  margin:0 auto;
  position: relative;
}
.grab .rect .rectHead{
  width:15px;
  height: 20px;
  background-color: #1F670B;
  position: absolute;
  left:-5px;
}
.detail{
  height:80px;
  position: relative;
}
.detail img{
  width:80px;
  height:80px;
}
.detail p{
  padding:0px;
  margin:0px;
}
.detail .dataContent{
  position: absolute;
  top:0px;
  left:80px;
}
</style>
