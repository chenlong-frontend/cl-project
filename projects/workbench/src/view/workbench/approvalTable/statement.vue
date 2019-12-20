<template>
  <ibox title="发起新待办">
    <div class="picBox">

      <div class="picItem" v-for="(item, index) in options" @click="imgClick(item.platform)">
      <div class="picName">{{item.flow_name}}</div>
      <div class="picImg"><img :src="item.icon" alt=""></div>
      <div class="picContent">发起新流程</div>
    </div>

    </div>

    <!--<el-button-->
      <!--plain-->
      <!--@click="open">-->
      <!--可自动关闭-->
    <!--</el-button>-->
  </ibox>
</template>

<script>
  import ibox from '@/components/style/ibox.vue'
  import request from '@/api/workbench/approvalTable/workTable.js'
  export default {
    components: { ibox },
    created () {
      request.getData().then(value => {
        this.options = value
      })
    },
    data () {
      return {
        options: []
      }
    },
    methods: {
      // *********图像点击****************
      imgClick (val) {
        console.log(val)
        let option = this.options.filter(t => {
          if (t.platform === 0) {
            return t
          }
        })
        if (val === 0) {
          console.log(option[0].url, option)
          this.$router.push(option[0].pc_url)
        }
        if (val === 1) {
          this.$notify.info({
            title: '消息',
            message: '想要查看随手拍，请到手机端处理'
          })
        }
      }
    }

  }
</script>

<style scoped>
  .picBox{
    width:100%;
    height:600px;
  }
.picItem{
  width:13%;
  height:180px;
  background: #50B095;
  border-radius: 4px;
  color:white;
  text-align: center;
  line-height: 60px;
  margin-left: 3.1%;
  float:left;
  margin-bottom:20px;
}
.picImg{
  width:100%;
  height:80px;
  position: relative;
}
.picImg img{
  width:40%;
  height:60px;
  border-radius: 60px;
  border:4px solid white;
  position: absolute;
  top:10px;
  left:30%;
  background:white;
}
  .picName{
    width:100%;
    height:50px;
  }
  .picContent{
    width:100%;
    height:50px;
  }
</style>
