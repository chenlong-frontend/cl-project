<template>
  <div class="runBox">
    <el-container>
      <!-- 左边 -->
      <el-aside width="60%">
        <el-row>
          <el-col :span="24" >
            <div class="grid-content bg-purple-dark">
              <ibox title="塔吊报警信息统计">
                <el-row>
                  <el-col :span="8">
                    <div class="grid-content bg-purple">
                      <div class="boxItem">
                        <p>今日报警的塔吊数量</p>
                        <span class="count">{{todayWarn}}</span> <span class="unit">台</span>
                      </div>
                    </div>
                  </el-col>
                  <el-col :span="8">
                    <div class="grid-content bg-purple-light">
                      <div class="boxItem">
                        <p>近10日报警的塔吊数量</p>
                        <span class="count">{{tenDayWarn}}</span> <span class="unit">台</span>
                      </div>
                    </div>
                  </el-col>
                  <el-col :span="8">
                    <div class="grid-content bg-purple">
                      <div class="boxItem">
                        <p>今日报警的塔吊总次数</p>
                        <span class="count">{{todayNum}}</span> <span class="unit">台</span>
                      </div>
                    </div>
                  </el-col>
                </el-row>
              </ibox>
            </div>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24" class="martop">
            <div class="grid-content bg-purple-dark">
              <ibox title="塔吊报警次数统计">
                <div class="charts-box">
                  <ul >
                    <template v-for="(item, index) in datelist" class="listBox">
                      <li :class="{'click_focus':showindex === index}" @click="chooseList(item,index)" :key="index">{{item}}</li>
                    </template>
                  </ul>
                  <!--<div class="date" @click="showDate">按时间选择</div>-->
                  <!-- 选择日历对话框开始 -->
                  <el-dialog
                    title="按时间进行选择"
                    :visible.sync="dataDia"
                    width="30%"
                    :append-to-body="true">
                    <div class="block">
                      <el-date-picker
                        v-model="date"
                        type="daterange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                      </el-date-picker>
                    </div>
                    <span slot="footer" class="dialog-footer">
                      <el-button type="primary" @click="readyDate">确 定</el-button>
                    </span>
                  </el-dialog>
                  <!-- 选择日历对话框结束 -->
                  <!-- 图表 -->
                  <div id="myChart" style="width: 100%;height: 360px;margin-top: 40px;"></div>
                  <!-- <canvas id="myChart" width="320" height="150" style="margin-top: 40px;"></canvas> -->
                </div>
              </ibox>
            </div>
          </el-col>
        </el-row>

      </el-aside>
      <!-- 右边 -->
      <el-aside width="40%" class="rightBoxs">
        <ibox title="塔吊实时报警列表" class="policeList">
          <div style="height: 570px;overflow: auto">
            <li v-for="(item, index) in warnInfos" :key="index" class="messageList">{{item.info}}<span @click="jumpWarnInfo(item.id)" class="toDetail">点击查看详情</span></li>
          </div>
          <!-- 报警详情对话框开始 -->
          <el-dialog
            title="报警详情"
            :visible.sync="showWarningDetail"
            width="80%"

            :append-to-body="true">
            <warning-detail :warningInfoID="warningInfoID" ref="warnDetail"></warning-detail>
            <!--:before-close="WarnClose"-->
          </el-dialog>
          <!-- 报警详情对话框结束 -->
          <span class="more" @click="toMessageList">查看更多</span>
          <!-- 报警列表对话框开始 -->
          <el-dialog
            title="塔吊报警列表"
            :visible.sync="showPolideList"
            width="80%"
            :append-to-body="true">
            <police-list :show='this.showPolideList' @toParent='showChild'></police-list>
          </el-dialog>
          <!-- 报警列表对话框结束 -->
        </ibox>
      </el-aside>
    </el-container>
  </div>
</template>
<script>
import ibox from '@/components/style/ibox.vue'
import policeList from '@/view/workbench/tower/police/policeList.vue'
import warningDetail from '@/view/workbench/tower/police/warningDetail.vue'
import request from '@/api/workbench/tower/police.js'
import theme from '@/style/theme/walden.json'
// 引入 ECharts 主模块
let echarts = require('echarts/lib/echarts')
// 引入曲线图
require('echarts/lib/chart/line')
// 引入提示框和标题组件
require('echarts/lib/component/tooltip')
require('echarts/lib/component/legendScroll')
echarts.registerTheme('walden', theme)

export default {
  components: {ibox, policeList, warningDetail},
  data () {
    return {
      chooseDate: '',
      datelist: ['近一周', '近一月', '近一季度'],
      // datelist: ['近一周', '近一月', '近一季度', '按时间选择'],
      // charts表用到的数据
      label1X: ['一月', '二月', '三月', '四月'],
      data1Y: ['30', '123', '19', '69'],
      showindex: 0,   // tab选项卡用
      dataDia: false,
      showPolideList: false,
      showWarningDetail: false,
      date: '',
      flag: '',
      todayWarn: 0, // 今日报警的塔吊数量
      tenDayWarn: 0, // 近10日报警的塔吊数量
      todayNum: 0, // 今日报警的塔吊总次数
      warningInfoID: '',
      warnInfos: [
        {info: '12/12 09:12 TD001 操作人：张三', id: '00000'},
        {info: '12/12 09:12 TD001 操作人：张三', id: '00000'},
        {info: '12/12 09:12 TD001 操作人：张三', id: '00000'},
        {info: '12/12 09:12 TD001 操作人：张三', id: '00000'},
        {info: '12/12 09:12 TD001 操作人：张三', id: '00000'},
        {info: '12/12 09:12 TD001 操作人：张三', id: '00000'},
        {info: '12/12 09:12 TD001 操作人：张三', id: '00000'},
        {info: '12/12 09:12 TD001 操作人：张三', id: '00000'},
        {info: '12/12 09:12 TD001 操作人：张三', id: '00000'},
        {info: '12/12 09:12 TD001 操作人：张三', id: '00000'},
        {info: '12/12 09:12 TD001 操作人：张三', id: '00000'},
        {info: '12/12 09:12 TD001 操作人：张三', id: '00000'},
        {info: '12/12 09:12 TD001 操作人：张三', id: '00000'}
      ]
    }
  },
  mounted () {
    let myChart = echarts.init(document.getElementById('myChart'), 'walden')
    this.myChartData = {
      tooltip: {},
      legend: {
        data: ['次数']
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: this.label1X
      },
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: '次数',
          type: 'line',
          areaStyle: {},
          data: this.data1Y
        }
      ]
    }
    myChart.setOption(this.myChartData, true)
    this.init()
  },
  methods: {
    init () {
      this.getWarnNums()
      this.getWarnList()
      this.changeDate(this.showindex)
      this.changeFlag(this.showindex)
      this.getWarnChart()
    },
    getWarnNums () {
      request.getWarnNums().then(
        data => {
          if (data.data.code === 0) {
            this.todayWarn = data.data.data.todayWarn
            this.tenDayWarn = data.data.data.tenDayWarn
            this.todayNum = data.data.data.todayNum
          } else this.$message.error('获取失败')
        },
        error => {
          console.log(error)
        }
      )
    },
    getWarnList () {
      request.getWarnList().then(
        data => {
          if (data.data.code === 0) {
            this.warnInfos = data.data.data.warnInfos
          } else this.$message.error('获取失败')
        },
        error => {
          console.log(error)
        }
      )
    },
    getWarnChart () {
      request.getWarnChart(this.flag).then(
        data => {
          if (data.data.code === 0) {
            this.myChartData.xAxis.data = data.data.data.x
            this.myChartData.series[0].data = data.data.data.y
            // this.myChart1.update()
          } else this.$message.error('获取失败')
        },
        error => {
          console.log(error)
        }
      )
    },
    // 点击查看详情跳转
    jumpWarnInfo (val) {
      this.showWarningDetail = true
      this.warningInfoID = val
    },
    // 点击去塔吊报警列表
    toMessageList () {
      this.showPolideList = true
    },
    showChild (data) {
      this.showPolideList = false
      this.warningInfoID = data
      this.showWarningDetail = true
    },
    // 报表tab切换事件
    chooseList (item, index) {
      if (index !== 3) {
        this.showindex = index
        this.changeDate(index)
        this.changeFlag(index)
        this.getWarnChart()
      } else {
        this.dataDia = true
      }
    },
    // 日历选择后的确定按钮
    readyDate () {
      this.changeDate(3)
      this.getWarnChart()
      this.dataDia = false
      // 标签激活成按时间选择
      this.showindex = 3
    },
//    WarnClose (done) {
//      this.$refs.warnDetail.init()
//      done()
//    },
    changeFlag (val) {
      if (val !== 3) {
        this.flag = val + 1
      }
    },
    changeDate (val) {
      var d1 = new Date()
      var weekbefore = new Date(d1)
      var monthbefore = new Date(d1)
      var threeMonthBefore = new Date(d1)
      weekbefore.setDate(d1.getDate() - 7)
      monthbefore.setDate(d1.getDate() - 30)
      threeMonthBefore.setDate(d1.getDate() - 90)
      if (val === 0) {
        this.beginDate = weekbefore.toLocaleDateString()
        this.endDate = d1.toLocaleDateString()
      } else if (val === 1) {
        this.beginDate = monthbefore.toLocaleDateString()
        this.endDate = d1.toLocaleDateString()
      } else if (val === 2) {
        this.beginDate = threeMonthBefore.toLocaleDateString()
        this.endDate = d1.toLocaleDateString()
      } else if (val === 3) {
        this.beginDate = this.date[0].toLocaleDateString()
        this.endDate = this.date[1].toLocaleDateString()
      }
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
.boxItem{
  width:80%;
  height:100px;
  margin:0 auto;
  border:1px solid #F1F1F1;
  border-radius: 5px;
  text-align: center;
  background-color: #FAF7FA;
}
.boxItem p {
  color:#8F8F8F;
  font-size: 14px;
}
.boxItem .count{
  color: #737373;
  font-size: 32px;
  font-weight: 700;
}
.boxItem .unit{
  color: #737373;
  font-size: 18px;
}
/* 塔吊实时运行列表开始 */
.policeList{
  position: relative;
}
.more{
  color: #3C70A8;
  position: absolute;
  top:5px;
  right:10px;
  cursor: pointer;
}
.messageList{
  line-height: 24px;
  color: #BCBEBF;
  margin-bottom: 4px;
}
.toDetail{
  color:#3C70A8;
  float: right;
  cursor: pointer;
}
.rightBoxs{
float: right;
margin-left: 30px;
}
/* 塔吊实时运行列表结束 */
/* 塔吊运行统计次数开始 */
.charts-box{
  width: 100%;
  /*高度需要自适应*/
  height:auto;
  border:1px solid #ddd;
  -webkit-border-radius: 2px;
  -moz-border-radius: 2px;
  border-radius: 2px;
}
.charts-box ul{
  text-align: center;
}
.listBox{
  width:100px;
  border: 1px solid red;
}
.charts-box ul li.click_focus{
  border-bottom: none;
  color: #676A84;
  font-weight: bold;
  font-size: 14px;
}
.charts-box ul li, .date{
  float: left;
  border-right:1px solid #ddd;
  border-bottom: 1px solid #ddd;
  padding: 8px;
  text-align: center;
  width: 14%;
  cursor: pointer;
  color: #A6A6A6;
  font-weight: bold;
  font-size:14px;
}
/* 日历对话框 */
.block{
  text-align: center;
}
/* 塔吊运行统计次数结束 */
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
