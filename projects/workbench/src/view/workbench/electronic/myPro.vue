<template>
    <div class="myPro">
        <ibox title="我的项目信息">
            <div class="myBox">
              <div class="boxItem">
                  <p>装机容量</p>
                  <span class="count">{{proData.gen_cap_installed}}</span> <span class="unit">kW</span>
              </div>
              <div class="boxItem">
                  <p>日发电量</p>
                  <span class="count">{{proData.gen_cap_daily}}</span> <span class="unit">kW·h</span>
              </div>
              <div class="boxItem">
                  <p>月发电量</p>
                  <span class="count">{{proData.gen_cap_monthly}}</span> <span class="unit">kW·h</span>
              </div>
              <div class="boxItem">
                  <p>月累计节约标准煤</p>
                  <span class="count">{{proData.gen_reduction_c}}</span> <span class="unit">T</span>
              </div>
              <div class="boxItem">
                  <p>月累计CO2减排量</p>
                  <span class="count">{{proData.gen_reduction_co2}}</span> <span class="unit">T</span>
              </div>
            </div>
            <div id="canvasBox" style="width:100% ; height:100%">
                <div class="head">
                    <span class="title">光伏发电情况统计/月</span>
                    <div class="date">
                        <el-date-picker
                            v-model="date"
                            type="month"
                            format="yyyy 年 MM 月"
                            value-format="yyyy-MM"
                            placeholder="选择月">
                        </el-date-picker>
                    </div>
                </div>
                <div id="myChart"></div>
            </div>
        </ibox>
    </div>
</template>
<script>
import ibox from '@/components/style/ibox.vue'
import request from '@/api/workbench/electronic/devices.js'
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
  components: {ibox},
  data () {
    return {
      date: new Date(),
      proData: {},
      label1X: [],
      data1Y: []
    }
  },
  mounted () {
    let myChart = echarts.init(document.getElementById('myChart'), 'walden')
    let option = {
      tooltip: {},
      legend: {
        data: ['用电机']
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
          name: '用电机',
          type: 'line',
          areaStyle: {},
          data: this.data1Y
        }
      ]
    }
    myChart.setOption(option, true)
  },
  created () {
    request.getData().then(data => {
      console.log(data.data)
      this.proData = data.data
      if (this.proData.gen_cap_installed > 1000) {
        this.proData.gen_cap_installed = this.proData.gen_cap_installed / 1000
      } else if (this.proData.gen_cap_daily > 1000) {
        this.proData.gen_cap_daily = this.proData.gen_cap_daily / 1000
      } else if (this.proData.gen_cap_monthly > 1000) {
        this.proData.gen_cap_monthly = this.proData.gen_cap_monthly / 1000
      }
    })
    request.getChartData(this.date).then(data => {
      console.log(data.data)
      this.label1X = data.data.x_list
      this.data1Y = data.data.y_list
      let myChart = echarts.init(document.getElementById('myChart'), 'walden')
      let option = {
        tooltip: {},
        legend: {
          data: ['用电机']
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
            name: '用电机',
            type: 'line',
            areaStyle: {},
            data: this.data1Y
          }
        ]
      }
      myChart.setOption(option, true)
    })
  },
  watch: {
    date: function () {
      console.log(this.date)
      request.getChartData(this.date).then(data => {
        this.label1X = data.data.x_list
        this.data1Y = data.data.y_list
        let myChart = echarts.init(document.getElementById('myChart'), 'walden')
        let option = {
          tooltip: {},
          legend: {
            data: ['用电机']
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
              name: '用电机',
              type: 'line',
              areaStyle: {},
              data: this.data1Y
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
.myBox{
    padding:15px;
    box-sizing: border-box;
}
.boxItem{
    width:18.3%;
    height:100px;
    border:1px solid #F1F1F1;
    border-radius: 5px;
    text-align: center;
    display: inline-block;
    margin-right: 11px;
}
.boxItem p {
    color:#8F8F8F;
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
#canvasBox {
  padding: 10px;
  box-sizing: border-box;
  background-color: #fff;
  border: 1px solid #EBEBEB;
  border-radius: 8px 8px 0px 0px;
  position: relative;
}
#myChart {
  width: 100%;
  height: 300px;
  margin-top:36px;
}
.head{
    width:100%;
    height: 48px;
    line-height: 48px;
    background-color: #F2F2F2;
    position: absolute;
    top:0px;
    left:0px;
    border-radius: 8px 8px 0px 0px;
}
.head .title{
    color: #737373;
    font-weight: 700;
    margin-left:10px;
}
.head .date{
    float:right;
    margin-right: 10px;
    cursor: pointer;
}
</style>


