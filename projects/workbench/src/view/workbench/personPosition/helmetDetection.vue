<template>
  <div class="tp_helmet">
    <ibox title="安全帽电量检测">
      <div class="helmet_box">
        <div class="boxs">
          <div class="helmet_item">
            <div>电量充足</div>
            <div>(80%-100%)</div>
            <div>{{full_power}}人</div>
            <div class="noshow">点击查看详情</div>
          </div>
          <div class="helmet_item">
            <div>电量正常</div>
            <div>(50%-80%)</div>
            <div>{{normal_power}}人</div>
            <div class="noshow">点击查看详情</div>
          </div>
          <div class="helmet_item">
            <div>电量较低</div>
            <div>(20%-50%)</div>
            <div>{{low_power}}人</div>
            <!--做一个传参处理，根据id不同传不同的参数-->
            <div class="showmore" @click="lowTableFlag = true">点击查看详情</div>
          </div>
          <div class="helmet_item">
            <div>需充电</div>
            <div>(<20%)</div>
            <div>{{need_power}}人</div>
            <div class="showmore" @click="needTableFlag = true">点击查看详情</div>
          </div>
        </div>
        <!--人员信息-->
        <el-dialog
          title="安全帽低电量统计"
          :visible.sync="lowTableFlag"
          width="70%"
          :modal-append-to-body= false
        >
          <power-statistics :chooseFlag="0"></power-statistics>
        </el-dialog>

        <el-dialog
          title="安全帽需充电统计"
          :visible.sync="needTableFlag"
          width="70%"
          :modal-append-to-body= false
        >
          <power-statistics :chooseFlag="1"></power-statistics>
        </el-dialog>
      </div>
    </ibox>
  </div>
</template>
<script>
  import ibox from '@/components/style/ibox.vue'
  import powerStatistics from './helmetComponents/powerStatistics.vue'
  import request from '@/api/workbench/personPosition/helmetDetections'
  export default {
    components: {ibox, powerStatistics},
    mounted () {
      request.getDetetions().then(
        data => {
          console.log(data.data.data)
          this.full_power = data.data.data.full_power
          this.low_power = data.data.data.low_power
          this.normal_power = data.data.data.normal_power
          this.need_power = data.data.data.need_power
        }
      )
    },
    data () {
      return {
        lowTableFlag: false,
        needTableFlag: false,
        full_power: 0,
        low_power: 0,
        normal_power: 0,
        need_power: 0
      }
    },
    methods: {
      closePowerFlag () {
      }
    }
  }
</script>
<style scoped>
.helmet_box{
  width: 96%;
  height:auto;
  border:1px solid #ddd;
  margin-left: 2%;
  background-color: #F3F3F4;
  position: relative;
}
.boxs{
  margin-bottom: 150px;
}
  .helmet_item{
    width: 180px;
    height: 180px;
    border:1px solid #ddd;
    background-color: white;
    display: inline-block;
    margin-top: 20px;
    margin-left: 6%;
  }
  .helmet_item div{
    text-align: center;
  }
  .helmet_item div:nth-child(1){
    margin-top: 40px;
    font-size: 20px;
  }
  .helmet_item div:nth-child(2){
    font-size: 10px;
    margin-top: 8px;
  }
  .helmet_item div:nth-child(3){
    font-size: 26px;
    margin-top: 8px;
    font-weight: 600;
  }
  .noshow{
    color: white;
    font-size: 14px;
    margin-top: 8px;
  }
  .showmore{
    color: #1C84C6;
    font-size: 14px;
    margin-top: 8px;
    cursor: pointer;
  }
</style>
