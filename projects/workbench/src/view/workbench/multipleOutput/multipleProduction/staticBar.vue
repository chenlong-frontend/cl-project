<template>
  <div>
    <p @click="goBack" v-if="isShow">返回上一级</p>
    <div id="myChart"></div>
  </div>
</template>

<script>
  import theme from '@/style/theme/walden.json'
  let echarts = require('echarts/lib/echarts')
  require('echarts/lib/chart/bar')
  // 引入提示框和标题组件sadasdad
  require('echarts/lib/component/title')
  require('echarts/lib/component/tooltip')
  require('echarts/lib/component/legendScroll')
  echarts.registerTheme('walden', theme)

  export default {
    props: ['barData'],
    mounted () {
      console.log(this.barData)
      let myChart = echarts.init(document.getElementById('myChart'), 'walden')
      myChart.on('click', (param) => {
        if (param.name === '分包') {
          this.$emit('changeData')
          this.isShow = true
        }
      })
      myChart.setOption(this.option, true)
      this.sss = myChart
    },
    data () {
      return {
        sss: '',
        option: {
          title: {
          },
          legend: {
            data: ['本月施工产值', '累计产值']
          },
          tooltip: {},
          xAxis: {
            type: 'category',
            data: []
          },
          yAxis: [
            {
              type: 'value',
              show: true,
              name: '产值(万元)'
            }
          ],
          series: [
            {
              name: '本月施工产值',
              type: 'bar',
              data: []
            },
            {
              name: '累计产值',
              type: 'bar',
              data: []
            }
          ]
        },
        isShow: false
      }
    },
    watch: {
      'barData': function (n) {
        console.log(n)
        this.option.xAxis.data = n.map(t => { return t.name })
        this.option.series[0].data = n.map(t => { return t.mon_cons_out_value })
        this.option.series[1].data = n.map(t => { return t.acc_out_value })
        this.sss.setOption(this.option, true)
      }
    },
    methods: {
      goBack () {
        this.isShow = false
        this.$emit('back')
      }
    }
  }
</script>

<style scoped>
#myChart{width:1000px;height:500px; }
  p{font-size: 14px; color:#1D84C6;text-decoration: underline;line-height: 20px;}
</style>
