<template>
  <div class="tp_point">
      <div
        class="red_round"
        :style="{ 'left': item.left, 'bottom': item.bottom}"
        @click="sendPersonId(item)"
        @mouseover="showPop(item)"
        v-popover:detail
      >
        <!--@mouseover="showPop(item)"-->
        <el-popover
          ref="detail"
          placement="top-start"
          width="230"
          trigger="hover"
        >
          <div class="round_msg">
            <img :src="personMsg.emp_avatar" >
            <div>姓名：{{personMsg.emp_name}}</div>
            <div>部门：{{personMsg.gro_name}}</div>
            <div>工种：{{personMsg.role_name}}</div>
          </div>
        </el-popover>
      </div>
    <!--个人信息弹框-->
    <el-dialog
      title="具体人员信息详情"
      :visible.sync="flag.personMsg"
      width="80%"
      :modal-append-to-body= false
      style="margin-top: -70px;"
    >
      <person-msg :personid="personid"></person-msg>
    </el-dialog>
  </div>
</template>
<script>
  import personMsg from './personMsg.vue'
  import request from '@/api/workbench/personPosition/workArea'
  export default {
    props: ['item'],
    components: {personMsg},
    mounted () {
      console.log(this.item)
    },
    data () {
      return {
        flag: {
          personMsg: false
        },
        personid: '',
        hoverPointId: '',
        personMsg: {}
      }
    },
    methods: {
      sendPersonId (item) {
        // console.log('当前点击人员的id' + item.id)
        this.personid = item.id
        this.flag.personMsg = true
      },
      showPop (item) {
        console.log(item)
        this.hoverPointId = item.id
        this.ajaxGetHover()
      },
      ajaxGetHover () {
        request.getPointHoverData({'helment_id': this.hoverPointId}).then(
          data => {
            // console.log(data.data.data)
            this.personMsg = data.data.data
          }
        )
      }
    }
  }
</script>
<style scoped>
  .red_round{
    width: 15px;
    height: 15px;
    background-color: red;
    -webkit-border-radius: 100%;
    -moz-border-radius: 100%;
    border-radius: 100%;
    position: absolute;
    cursor: pointer;
  }
  .round_msg{
    height: 80px;
    position: relative;
  }
  .round_msg img {
    width: 80px;
    height:80px;
    position: absolute;
    left: 0px;
  }
  .round_msg div {
    margin-left: 100px;
    font-size: 12px;
    margin-top: 5px;
    margin-bottom: 15px;
  }

</style>
