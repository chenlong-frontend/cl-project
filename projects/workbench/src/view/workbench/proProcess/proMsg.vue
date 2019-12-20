<template>
  <div class="tp_proMsg">
    <ibox title="进度概览">
      <span class="backLast" v-show="pIdList.length !== 0" @click="backToBefore"><i class="el-icon-arrow-left"></i>返回上一级</span>
      </el-input>
      <div id="myChart"></div>
      <!--分页-->
      <el-pagination
        layout="prev, pager, next"
        :total="allItem"
        :page-size=8
        :current-page.sync="currentPage"
        @current-change="handleCurrentChange"
        style="text-align: center;"
      >
      </el-pagination>
      <el-dialog
        title="提示"
        :visible.sync="taskFlag"
        width="30%">
        <div style="text-align: center">当前任务下没有子任务！</div>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="taskFlag = false" size="small">确 定</el-button>
        </span>
      </el-dialog>
    </ibox>
  </div>
</template>
<script>
  import request from '@/api/request'
  import ibox from '@/components/style/ibox.vue'
  import theme from '@/style/theme/walden.json'
  // 引入 ECharts 主模块
  let echarts = require('echarts/lib/echarts')
  // 引入柱状图
  require('echarts/lib/chart/bar')
  // 引入提示框和标题组件
  require('echarts/lib/component/title')
  require('echarts/lib/component/tooltip')
  require('echarts/lib/component/legendScroll')
  echarts.registerTheme('walden', theme)
  export default {
    components: {ibox},
    mounted () {
      let self = this
      console.log(this.option)
      let myChart = echarts.init(document.getElementById('myChart'), 'walden')
      request({type: '1603', data: {'task_p_id': 0, 'page_no': 1, 'page_size': 8}}).then(t => {
        self.allItem = Number(t.page_info.page_count)
        self.idlist = t.task_list.map(n => { return n.task_id })
        self.isLastList = t.task_list.map(n => { return n.task_is_last })
        self.xList1 = t.task_list.map(n => { return n.task_name })
        self.option.xAxis.data = t.task_list.map(n => { return n.task_name })
        self.option.series[0].data = t.task_list.map(n => { return n.task_prog_plan + '' })
        self.option.series[1].data = t.task_list.map(n => { return n.task_prog_act + '' })
        console.log('idlist: -----------')
        console.log(self.idlist)
        console.log('isLastList: -----------')
        console.log(self.isLastList)
        myChart.setOption(self.option, true)
      })
      myChart.on('click', function (param) {
        console.log('任务名称：' + param.name)
        let idIndex = self.xList1.indexOf(param.name)
        let isLast = self.isLastList[idIndex]
        if (Number(isLast) === 0) {
          self.taskFlag = true
        } else {
          self.pId = Number(self.idlist[idIndex])
          console.log('当前pid:  ' + self.pId)
          self.pIdList.push(Number(self.idlist[idIndex]))
          console.log('当前pidlist:  ')
          console.log(self.pIdList)
          self.currentPage = 1
          self.getListData()
        }
        myChart.setOption(self.option, true)
      })
      self.chartObj = myChart
    },
    data () {
      return {
        chartObj: '',
        allItem: 100,      // 分页
        currentPage: 1,
        pId: 0,
        option: {
          title: {
            subtext: '进度（%）'
          },
          legend: {
            data: ['计划进度', '实际进度']
          },
          tooltip: {},
          xAxis: {
            type: 'category',
            data: []
          },
          yAxis: [
            {
              type: 'value'
            }
          ],
          series: [
            {
              name: '计划进度',
              type: 'bar',
              data: []
            },
            {
              name: '实际进度',
              type: 'bar',
              data: []
            }
          ]
        },
        idlist: [],
        xList1: [],
        pIdList: [],
        isLastList: [],
        taskFlag: false
      }
    },
    methods: {
      backToBefore () {
        if (this.pIdList.length > 0) {
          this.pIdList.pop()
          console.log(this.pIdList)
          if (this.pIdList.length === 0) {
            this.pId = 0
          } else {
            this.pId = this.pIdList[this.pIdList.length - 1]
          }
          this.currentPage = 1
          this.getListData()
        }
      },
      getListData () {
        let self = this
        request({type: '1603', data: {'task_p_id': this.pId, 'page_no': this.currentPage, 'page_size': 8}}).then(t => {
          self.allItem = Number(t.page_info.page_count)
          self.idlist = t.task_list.map(n => {
            return n.task_id
          })
          self.xList1 = t.task_list.map(n => {
            return n.task_name
          })
          self.isLastList = t.task_list.map(n => {
            return n.task_is_last
          })
          self.option.xAxis.data = t.task_list.map(n => {
            return n.task_name
          })
          self.option.series[0].data = t.task_list.map(n => {
            return n.task_prog_plan + ''
          })
          self.option.series[1].data = t.task_list.map(n => {
            return n.task_prog_act + ''
          })
          console.log('idlist: -----------')
          console.log(self.idlist)
          console.log('isLastList: -----------')
          console.log(self.isLastList)
          self.chartObj.setOption(self.option, true)
        })
      },
      // 分页点击事件
      handleCurrentChange (val) {
        console.log('当前页是：' + this.currentPage)
        this.getListData()
      }
    }
  }
</script>
<style scoped>
  #myChart {
    width: auto;
    height: 500px;
  }
  .backLast{
    display: inline-block;
    margin-left: 10px;
    margin-bottom: 10px;
    color: #23AEFC;
    cursor:pointer;
  }
</style>
