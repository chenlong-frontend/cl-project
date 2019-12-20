<template>
  <table>
    <caption>
      <i class="fa fa-chevron-left caption-left" @click="yearActive--"></i>
      {{yearActive}}
      <i class="fa fa-chevron-right caption-right" @click="yearActive++"></i>
    </caption>
    <tbody>
      <tr v-for="item in monthArr">
        <td :class="{disabled: (yearActive > year) || (year === yearActive && child > month), active: yearActive === yearSelect && monthSelect === child}"
          v-for="child in item" @click="monthHandle(child)">{{child}}月</td>
      </tr>
    </tbody>
  </table>
</template>
<script>
  export default {
    beforeMount () {
      let date = new Date()
      this.year = date.getFullYear()
      this.yearSelect = date.getFullYear()
      this.month = date.getMonth() + 1
      this.monthSelect = date.getMonth() + 1
    },
    data () {
      return {
        year: 1950,
        month: 1,
        yearActive: 2018,
        monthSelect: 1,
        yearSelect: 2018,
        monthArr: [[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12]]
      }
    },
    methods: {
      monthHandle (child) {
        if ((this.yearActive > this.year) || (this.year === this.yearActive && child > this.month)) {
          return false
        } else {
          this.yearSelect = this.yearActive
          this.monthSelect = child
          this.$emit('timeChange', {year: this.yearSelect, month: this.monthSelect})
        }
      }
    }
  }
</script>

<style scoped>
  table {width: 100%;text-align: center;border-collapse: collapse;}
  table caption {background-color: #00AFF0;font-weight: bold;color: #ffffff;padding: 10px 10px;box-sizing: border-box;border-radius: 15px 15px 0 0;font-size: 14px;}
  table caption i {cursor: pointer;padding: 2px;}
  .caption-left {float: left;}
  .caption-right {float: right;}
  table td {padding: 12px 3px;font-size: 12px;border: 1px solid #BBBBBB;width: 25%;cursor: pointer;}
  table td.disabled {background-color: #EDEDED;color: #CCCCCC;}
  table td.active {background-color: #00AFF0;color: #ffffff;border: none;}
</style>
