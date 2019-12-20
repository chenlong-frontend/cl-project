<template>
  <div class="generalCondtion">
    <el-container>
      <!-- 左边 -->
      <el-aside width="66%" ref="graphOut">
        <ibox title="工地塔吊概览图" >
          <graph ></graph>
        </ibox>
      </el-aside>
      <!-- 右边 -->
      <el-aside width="34%" class="rightBoxs">
        <el-row>
          <el-col :span="24" >
            <div class="grid-content bg-purple-dark">
              <ibox title="塔吊数量统计">
                <p class="title">工地塔吊总数：<span class="count">{{towerNum}}</span> </p>
                <div style="overflow: auto;margin-top:10px;height:130px;">
                <div v-for="(tower,index) in towersInfo" style="float: left;margin-left:10px"  :key="index">
                  <img :src="littleTower" style="height: 40px;width:40px;"/>
                  <p style="margin: 2px;">{{tower.name}}</p>
                </div>
                </div>
              </ibox>
            </div>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24" class="martop">
            <div class="grid-content bg-purple-dark">
              <ibox title="塔吊运行统计">
                <p class="count">当前运行中塔吊的数量：<span class="number"> {{nowRun}} </span></p>
                <p class="count">今日累积运行塔吊的数量：<span class="number"> {{todayRun}} </span></p>
              </ibox>
            </div>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24" class="martop">
            <div class="grid-content bg-purple-dark">
              <ibox title="塔吊报警统计">
                <p class="count">今日报警的塔吊数量：<span class="number"> {{todayWarn}} </span></p>
                <p class="count">近10日报警的塔吊数量：<span class="number"> {{tenDayWarn}} </span></p>
              </ibox>
            </div>
          </el-col>
        </el-row>
      </el-aside>
    </el-container>
  </div>
</template>

<script>
  import ibox from '@/components/style/ibox.vue'
  import graph from '@/view/workbench/tower/generalCondition/generalGraph.vue'
  import request from '@/api/workbench/tower/generalCondition.js'
  export default {
    components: {ibox, graph},
    name: '',
    props: [''],
    mounted () {
      console.log('waiwaiwai')
      console.log(this.$refs.graphOut)
      this.init()
    },
    data () {
      return {
        towerNum: 0,
        nowRun: 0,
        todayRun: 0,
        todayWarn: 0,
        tenDayWarn: 0,
        towersInfo: [
          {id: '1000', name: 'TD001'}
        ],
        littleTower: require('@/assets/img/home/build.png')
      }
    },
    methods: {
      init () {
        this.getGenNums()
      },
      getGenNums () {
        request.getWarnNums().then(
          data => {
            if (data.data.code === 0) {
              this.todayWarn = data.data.data.todayWarn
              this.tenDayWarn = data.data.data.tenDayWarn
            } else this.$message.error('报警模块获取失败')
          },
          error => {
            console.log(error)
          }
        )
        request.getRunNums().then(
          data => {
            if (data.data.code === 0) {
              this.nowRun = data.data.data.nowRun
              this.todayRun = data.data.data.todayRun
            } else this.$message.error('运行模块获取失败')
          },
          error => {
            console.log(error)
          }
        )
        request.getTowersInfo().then(
          data => {
            if (data.data.code === 0) {
              this.towerNum = data.data.data.towerNum
              this.towersInfo = data.data.data.towersInfo
            } else this.$message.error('塔吊信息获取失败')
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
.el-main {
  width:20%;
  border:1px solid;
  background-color: #E9EEF3;
  color: #333;
}
.rightBoxs{
  float: right;
  margin-left: 30px;
}
.martop{
  margin-top:20px;
}
.title{
  width:200px;
  height: 40px;
  line-height: 40px;
  padding:0px;
  margin:0px auto;
  text-align: center;
  background-color: #FAF7FA;
  color:#858585;
  border-radius: 20px;
  font-weight: bold;
  font-size: 14px;
}
.title .count{
  font-size: 22px;
  color: #2D65A2;
}
.count{
  text-align: center;
  font-size: 12px;
  color: #6B6B6B;
}
.count .number{
  font-size: 22px;
  font-weight: bold;
}
::-webkit-scrollbar {
  width: 6px;
}/* 滚动条整体宽度 */
::-webkit-scrollbar-track{
  background-color: #F3F3F4;
}/* 滚动条的滑轨背景颜色 */
::-webkit-scrollbar-thumb{
  background-color: #DAE4E5;
  border-radius: 3px;
}/* 滚动条的滑块背景颜色 */
::-webkit-scrollbar-corner {
  background-color: #B0AFB0;
} /* 横向滚动条和纵向滚动条相交处尖角的颜色 */
</style>
