<template>
<ibox title="生产资金往来账目">
  <div id="myChart"></div>
</ibox>
</template>

<script>
  import ibox from '@/components/style/ibox.vue'
  import theme from '@/style/theme/walden.json'
  import request from '@/api/workbench/multipleOutput/exchangeFund.js'

  let echarts = require('echarts/lib/echarts')
  require('echarts/lib/chart/line')
  // 引入提示框和标题组件
  require('echarts/lib/component/title')
  require('echarts/lib/component/tooltip')
  require('echarts/lib/component/legendScroll')
  echarts.registerTheme('walden', theme)
  export default {
    components: { ibox },
    mounted () {
      request.getLineData().then(value => {
        console.log(value)
        option.xAxis.data = value.map(t => {
          return t.time
        })
        option.series[0].data = value.map(t => {
          return t.mon_pro_income
        })
        option.series[1].data = value.map(t => {
          return t.mon_payment
        })
        myChart.setOption(option, true)
      })
      let myChart = echarts.init(document.getElementById('myChart'), 'walden')
      let option = {
        title: {
//          text: '折线图堆叠',
//          subtext: '万元'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['本月工程款收入', '本月工程款支出']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          show: true,
          name: '月份',
          data: []
        },
        yAxis: {
          type: 'value',
          show: 'true',
          name: '产值(万元)'
        },
        series: [
          {
            itemStyle: {normal: {label: {show: true}}},
            name: '本月工程款收入',
            type: 'line',
            data: []
          },
          {
            itemStyle: {normal: {label: {show: true}}},
            name: '本月工程款支出',
            type: 'line',
            data: []
          }
        ]
      }
      myChart.setOption(option, true)
    },
    data () {
      return {
      }
    }
  }
</script>


<style scoped>
  #myChart{width:1000px;height:550px;}
</style>
