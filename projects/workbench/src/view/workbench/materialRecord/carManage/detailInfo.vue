<template>
<div class="bigBox">
  <div class="detailInfo" v-for="item in infos">
    <span>{{item.name}}</span>
    <span>{{item.info}}</span>
  </div>
</div>
</template>

<script>
  import request from '@/api/workbench/materialRecord/carManage.js'
  export default {
    props: ['rowId'],
    created () {
      this.getInit()
    },
    watch: {
      rowId: function () {
        this.getInit()
      }
    },
    computed: {
      infos () {
        let arr
        let carInfo = [{car_number: '车牌号:'}, {car_brand: '车辆品牌:'}, {car_model: '车辆型号:'}, {car_weight: '车辆自重:'}, {contact_name: '联系人:'}, {contact_phone: '联系方式:'}, {belong_to: '所属公司:'}, {memo: '备注:'}]
        for (let key of Object.keys(this.items)) {
          arr = carInfo.map(t => {
            for (let o of Object.keys(t)) {
              if (o === key) {
                t.name = t[o]
                t.info = this.items[o]
              }
            }
            return t
          })
        }
        return arr
      }
    },
    data () {
      return {
        items: []
      }
    },
    methods: {
      getInit () {
        request.getTable({'id': this.rowId}).then(value => {
          this.items = value.car[0]
        })
      }
    }
  }
</script>

<style scoped>
.bigBox{width:300px; margin:0 100px;font-size: 16px;line-height: 40px;height:360px;}
.detailInfo span:first-child{float:left;width:30%;text-align: right;}
.detailInfo span:nth-child(2){padding-left: 40px;width:50%;float:left;}

</style>
