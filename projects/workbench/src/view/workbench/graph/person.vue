<template>
  <div id="canvasBox" style="width:100% ; height:100%">
    <el-select v-model="selType" class="selPeople" placeholder="全部人员">
      <el-option
        v-for="(item,index) in sels"
        :key="item.value"
        :label="item.label"
        :value="item.value"
        >
      </el-option>
    </el-select>

    <div class="butBox">
      <el-select class="firstBut" v-model='year' v-on:change="changeYear" placeholder="年" name="年" id="sel" >
        <el-option v-for="(item,index) in label1X" :key="index" :label="item" :value="index"></el-option>
      </el-select>
      <button v-bind:class="{ 'but1' : before2, 'but2': !before2}" v-on:click="changeQuarter">季度</button>
      <button v-bind:class="{ 'but1' : before3, 'but2': !before3}" v-on:click="changeMonth">月</button>
    </div>

    <div id="myChart"></div>

  </div>
</template>
<script>
import request from '@/api/workbench/graph/person.js'
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
  props: ['id'],
  // 页面加载进来就显示图表
  mounted () {
    this.before1 = false
    this.before2 = true
    this.before3 = true
    request.getYearChart(this.year, this.gro_type).then(data => {
      this.label1X = []
      this.data11Y = []
      this.data21Y = []
      if (data.pro.length === 0 && data.other.length > 0) {
        for (var b = 0; b < data.other.length; b++) {
          this.label1X.push(data.other[b].time)
          this.data21Y.push(data.other[b].ct)
          this.data11Y = []
        }
        console.log('没有集团人员数据')
      }
      if (data.other.length === 0 && data.pro.length > 0) {
        for (var a = 0; a < data.pro.length; a++) {
          this.label1X.push(data.pro[a].time)
          this.data11Y.push(data.pro[a].ct)
          this.data21Y = []
        }
        console.log('没有非集团人员数据')
      }
      if (data.pro.length > 0 && data.other.length > 0) {
        for (var bb = 0; bb < data.other.length; bb++) {
          this.label1X.push(data.other[bb].time)
          this.data21Y.push(data.other[bb].ct)
        }
        for (var aa = 0; aa < data.pro.length; aa++) {
          this.label1X.push(data.pro[aa].time)
          this.data11Y.push(data.pro[aa].ct)
        }
      }
      let myChart = echarts.init(document.getElementById('myChart'), 'walden')
      let option = {
        tooltip: {},
        legend: {
          data: ['集团人员折线图', '非集团人员折线图']
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
            name: '集团人员折线图',
            type: 'line',
            areaStyle: {},
            data: this.data11Y
          },
          {
            name: '非集团人员折线图',
            type: 'line',
            areaStyle: {},
            data: this.data21Y
          }
        ]
      }
      myChart.setOption(option, true)
    })
  },
  data () {
    return {
      label1X: [],
      data11Y: [],
      data21Y: [],
      label2X: [],
      data12Y: [],
      data22Y: [],
      label3X: [],
      data13Y: [],
      data23Y: [],
      before1: true,
      before2: true,
      before3: true,
      year: '',
      gro_type: 0,
      time_type: 0,
      activeName: 'first',
      sels: [
        {
          value: '0',
          label: '全部人员'
        },
        {
          value: '1',
          label: '集团人员'
        },
        {
          value: '2',
          label: '非集团人员'
        }
      ],
      selType: ''
    }
  },
  watch: {
    // 集团，非集团,全部的选择
    selType (index) {
      this.gro_type = index
      this.time_type = 0
      request.selType(this.gro_type, this.year, this.time_type).then(data => {
        this.label1X = []
        this.data11Y = []
        this.data21Y = []
        console.log(data)
        if ((data.pro.length === 0) && (data.other.length === 0)) {
          this.label1X = []
          this.data11Y = []
          this.data21Y = []
          console.log('nothing')
        }
        if (data.other.length === 0 && data.pro.length > 0) {
          for (var b = 0; b < data.pro.length; b++) {
            this.label1X.push(data.pro[b].time)
            this.data21Y.push(data.pro[b].ct)
            this.data11Y = []
          }
          console.log('没有非集团人员数据')
        }
        if (data.pro.length === 0 && data.other.length > 0) {
          for (var a = 0; a < data.other.length; a++) {
            this.label1X.push(data.other[a].time)
            this.data11Y.push(data.other[a].ct)
            this.data21Y = []
          }
          console.log('没有集团人员')
        }
        if (data.pro.length > 0 && data.other.other > 0) {
          for (var dd = 0; dd < data.pro.length; dd++) {
            this.label1X.push(data.pro[dd].time)
            this.data11Y.push(data.pro[dd].ct)
          }
          for (var cc = 0; cc < data.other.length; cc++) {
            this.label1X.push(data.other[cc].time)
            this.data21Y.push(data.other[cc].ct)
          }
        }
        // 表
        let myChart = echarts.init(document.getElementById('myChart'), 'walden')
        let option = {
          tooltip: {},
          legend: {
            data: ['集团人员折线图', '非集团人员折线图']
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
              name: '集团人员折线图',
              type: 'line',
              areaStyle: {},
              data: this.data11Y
            },
            {
              name: '非集团人员折线图',
              type: 'line',
              areaStyle: {},
              data: this.data21Y
            }
          ]
        }
        myChart.setOption(option, true)
      })
    },
    // 获取年份
    year () {
      request.getYearChart(this.year, this.gro_type).then(data => {})
    }
  },
  methods: {
    // 获取年的图表
    changeYear: function () {
      this.before1 = false
      this.before2 = true
      this.before3 = true
      this.time_type = 0
      request.getYearChart(this.year, this.gro_type, 0).then(data => {
        this.label1X = []
        this.data11Y = []
        this.data21Y = []
        if (data.other.length === 0 && data.pro.length === 0) {
          this.label1X = []
          this.data11Y = []
          this.data21Y = []
          console.log('nothing')
        }
        if (data.other.length === 0 && data.pro.length > 0) {
          for (var b = 0; b < data.pro.length; b++) {
            this.label1X.push(data.pro[b].time)
            this.data21Y.push(data.pro[b].ct)
            this.data11Y = []
          }
          console.log('没有非集团人员数据')
        }
        if (data.pro.length === 0 && data.other.length > 0) {
          for (var a = 0; a < data.other.length; a++) {
            this.label1X.push(data.other[a].time)
            this.data11Y.push(data.other[a].ct)
            this.data21Y = []
          }
          console.log('没有集团人员')
        }
        if (data.pro.length > 0 && data.other.length > 0) {
          for (var dd = 0; dd < data.pro.length; dd++) {
            this.label1X.push(data.pro[dd].time)
            this.data11Y.push(data.pro[dd].ct)
          }
          for (var cc = 0; cc < data.other.length; cc++) {
            this.label1X.push(data.other[cc].time)
            this.data21Y.push(data.other[cc].ct)
          }
        }
        // 表
        let myChart = echarts.init(document.getElementById('myChart'), 'walden')
        let option = {
          tooltip: {},
          legend: {
            data: ['集团人员折线图', '非集团人员折线图']
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
              name: '集团人员折线图',
              type: 'line',
              areaStyle: {},
              data: this.data11Y
            },
            {
              name: '非集团人员折线图',
              type: 'line',
              areaStyle: {},
              data: this.data21Y
            }
          ]
        }
        myChart.setOption(option, true)
      })
    },
    // 获取季度的图表
    changeQuarter: function (myChart) {
      this.before2 = false
      this.before1 = true
      this.before3 = true
      this.time_type = 1
      request.getQuarterChart(this.year, this.gro_type, 2).then(data => {
        this.label2X = []
        this.data12Y = []
        this.data22Y = []
        if (data.other.length === 0 && data.pro.length === 0) {
          this.label2X = []
          this.data12Y = []
          this.data22Y = []
          console.log('nothing')
        }
        if (data.other.length === 0 && data.pro.length > 0) {
          for (var a = 0; a < data.pro.length; a++) {
            this.label2X.push(data.pro[a].time)
            this.data12Y.push(data.pro[a].ct)
            this.data22Y = []
          }
          console.log('没有非集团人员')
        }
        if (data.pro.length === 0 && data.other.length > 0) {
          for (var b = 0; b < data.other.length; b++) {
            this.label2X.push(data.other[b].time)
            this.data22Y.push(data.other[b].ct)
            this.data12Y = []
          }
          console.log('没有集团人员')
        }
        if (data.pro.length > 0 && data.other.length > 0) {
          for (var aa = 0; aa < data.pro.length; aa++) {
            this.label2X.push(data.pro[aa].time)
            this.data12Y.push(data.pro[aa].ct)
          }
          for (var bb = 0; bb < data.other.length; bb++) {
            this.label2X.push(data.other[bb].time)
            this.data22Y.push(data.other[bb].ct)
          }
        }
        let myChart = echarts.init(document.getElementById('myChart'), 'walden')
        let option = {
          tooltip: {},
          legend: {
            data: ['集团人员折线图', '非集团人员折线图']
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: this.label2X
          },
          yAxis: [
            {
              type: 'value'
            }
          ],
          series: [
            {
              name: '集团人员折线图',
              type: 'line',
              areaStyle: {},
              data: this.data12Y
            },
            {
              name: '非集团人员折线图',
              type: 'line',
              areaStyle: {},
              data: this.data22Y
            }
          ]
        }
        myChart.setOption(option, true)
      })
    },
    // 获取月的图表
    changeMonth () {
      this.before3 = false
      this.before1 = true
      this.before2 = true
      this.time_type = 2
      request.getMonthChart(this.year, this.gro_type, 2).then(data => {
        this.label3X = []
        this.data13Y = []
        this.data23Y = []
        if (data.other.length === 0 && data.pro.length === 0) {
          this.label3X = []
          this.data13Y = []
          this.data23Y = []
          console.log('nothing')
        }
        if (data.other.length === 0 && data.pro.length > 0) {
          for (var a = 0; a < data.pro.length; a++) {
            this.label3X.push(data.pro[a].time)
            this.data13Y.push(data.pro[a].ct)
            this.data23Y = []
          }
          console.log('没有非集团人员')
        }
        if (data.pro.length === 0 && data.other.length > 0) {
          for (var b = 0; b < data.other.length; b++) {
            this.label3X.push(data.other[b].time)
            this.data23Y.push(data.other[b].ct)
            this.data13Y = []
          }
          console.log('没有集团人员')
        }
        if (data.pro.length > 0 && data.other.length > 0) {
          for (var aa = 0; aa < data.pro.length; aa++) {
            this.label3X.push(data.pro[aa].time)
            this.data13Y.push(data.pro[aa].ct)
          }
          for (var bb = 0; bb < data.other.length; bb++) {
            this.label3X.push(data.other[bb].time)
            this.data23Y.push(data.other[bb].ct)
          }
          return
        }
        let myChart = echarts.init(document.getElementById('myChart'), 'walden')
        let option = {
          tooltip: {},
          legend: {
            data: ['集团人员折线图', '非集团人员折线图']
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: this.label3X
          },
          yAxis: [
            {
              type: 'value'
            }
          ],
          series: [
            {
              name: '集团人员折线图',
              type: 'line',
              areaStyle: {},
              data: this.data13Y
            },
            {
              name: '非集团人员折线图',
              type: 'line',
              areaStyle: {},
              data: this.data23Y
            }
          ]
        }
        myChart.setOption(option, true)
      })
    }
  }
}
</script>

<style scoped>
#canvasBox {
  padding: 0px;
  margin-top: 60px;
  background-color: #f2f2f2;
  position: relative;
}
#myChart {
  width: 100%;
  height: 300px;
}
.selPeople {
  width: 140px;
  height: 20px;
  border-radius: 5px;
  position: absolute;
  left: 0%;
  top: -60px;
  outline: none;
}
.el-tabs {
  width: 800px;
  position: absolute;
  top: -60px;
  left: 10%;
}
/* 按钮 */
.butBox {
  position: absolute;
  top: -60px;
  left: 70%;
}
.firstBut{
  width: 90px;
  height: 40px;
  outline: none;
  border: none;
  border-radius: 5px;
  color: #1d84c6;
  background-color: #fff;
}
.but1 {
  width: 90px;
  height: 40px;
  outline: none;
  border: none;
  border: 1px solid #d8dce5;
  border-radius: 5px;
  color: #d8dce5;
  background-color: #fff;
}
.but2 {
  width: 90px;
  height: 40px;
  outline: none;
  border: none;
  border: 1px solid;
  border-radius: 5px;
  color: #fff;
  background-color: #1d84c6;
}
</style>
