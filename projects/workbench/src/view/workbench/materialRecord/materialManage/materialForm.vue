<template>
  <div class="content">
      <div class="leftBox">
        <div class="carInfo" v-for="item in infos">
          <span>{{item.name}}</span>
          <span>{{item.info}}</span>
        </div>
      </div>
      <div class="rightBox">
        <div class="imgBox">
          <div class="imgPic" v-for="(item, index) in pic_list">
            <div class="img">
              <img :src="item.pic_url" alt="">
            </div>
            <div class="smallTitle">{{item.pic_name}}</div>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
  import request from '@/api/workbench/materialRecord/materialManage.js'
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
        let carInfo = [{car_number: '车牌号:'}, {material_num: '物料编号:'}, {material_name: '物料种类:'}, {whole_weight: '收料毛重:'}, {car_weight: '车辆净重:'}, {target_weight: '应收重量:'}, {actual_weight: '实收重量:'}, {action: '任务种类:'}, {loadometer_id: '进出场地磅:'}, {time: '进出场时间:'}, {contact_name: '进出场操作员:'}, {sign_name: '进场签收人:'}, {memo: '备注:'}]
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
        items: [], // *******从后台获取数据**************
        pic_list: []  // ************图像列表***********
      }
    },
    methods: {
      // *************初始化*********
      getInit () {
        request.showInfo(this.rowId).then(value => {
          this.items = value.material[0]
          this.pic_list = value.pic_list
        })
      }
    }
  }
</script>
<style scoped>
.content{height:620px;margin: 0 60px;}
  .leftBox{width:50%; float:left;height: 100%;font-size: 16px;}
  .rightBox{width: 48%; float:left; height: 100%;}
  .carInfo{height:37px;line-height: 37px;}
  .carInfo span:first-child{float:left;width:25%;text-align: right;}
  .carInfo span:nth-child(2){padding-left: 40px;width: 45%;float:left;}
  .rightBox{background: #EDEDED;height:560px;overflow: auto;}
  .rightBox .imgPic{background: white;margin: 15px 8% 0 8%;width: 84%;height:260px;}
  .rightBox .imgPic .img{width:100%;height: 220px;}
  .rightBox .imgPic .smallTitle{width:100%;height: 40px;line-height:40px;text-align:center;background: #EDEDED;}

</style>
