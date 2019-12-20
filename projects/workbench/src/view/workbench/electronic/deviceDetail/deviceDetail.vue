<template>
  <div class="deviceDetail">
    <div class="addOne"> <p class="left">设备名称：</p> <span class="right">{{DeviceData.eqpt_name}}</span> </div>
    <div class="addOne"> <p class="left">设备功能：</p> <span class="right">{{DeviceData.function}}</span> </div>
    <div class="addOne"> <p class="left">设备编号：</p> <span class="right">{{DeviceData.eqpt_num}}</span> </div>
    <div class="addOne position"> <p class="left">设备详细位置：</p> <span class="right">{{DeviceData.eqpt_pos}}</span> </div>
    <div class="addOne"> <p class="left">设备功率：</p> <span class="right">{{DeviceData.eqpt_type_pow}}</span> </div>
    <div class="addOne"> <p class="left">每日使用时间：</p> <span class="right">{{DeviceData.eqpt_dur}}</span> </div>
    <span class="dialog-footer">
        <el-button type="primary" @click="editDevice()">修改设备信息</el-button>
        <el-button @click="goBack">返  回</el-button>
    </span>
    <!-- 修改设备信息对话框开始 -->
    <el-dialog
        title="设备信息修改"
        :visible.sync="editMessage"
        width="35%"
        :appendToBody='true'>
        <div class="addOne1"> <p class="left">设备名称：</p>
            <el-input v-model="editDeviceData.eqpt_name" size="mini" disabled  class="rightInput"></el-input>
        </div>
        <div class="addOne1"> <p class="left">设备功能：</p>
            <el-input v-model="editDeviceData.function" size="mini" disabled  class="rightInput"></el-input>
        </div>
        <div class="addOne1"> <p class="left">设备编号：</p>
            <el-input v-model="editDeviceData.eqpt_num" size="mini" class="rightInput"></el-input></div>
        <div class="addOne1 position"> <p class="left">设备详细位置：</p>
            <el-input v-model="editDeviceData.eqpt_pos" type="textarea" :rows="3" resize="none" size="mini" class="inPos"></el-input>
        </div>
        <div class="addOne1"> <p class="left">设备功率：</p>
            <el-input v-model="editDeviceData.eqpt_type_pow" size="mini" disabled  class="rightInput rightInputPos chp-electronic-device"></el-input>
        </div>
        <div class="addOne1"> <p class="left">每日使用时间：</p>
            <el-input v-model="editDeviceData.eqpt_time" size="mini" disabled  class="rightInput rightInputTime chp-electronic-device"></el-input>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="editMessage = false">取 消</el-button>
            <el-button type="primary" @click="storage()">保  存</el-button>
        </span>
    </el-dialog>
    <!-- 修改设备信息对话框结束 -->
  </div>
</template>
<script>
import request from '@/api/workbench/electronic/devices.js'
export default {
  name: 'deviceDetail',
  props: ['show', 'toData'],
  data () {
    return {
      editMessage: false,
      DeviceData: {},
      editDeviceData: {}
    }
  },
  created () {
    this.DeviceData = this.toData
    if (this.DeviceData.eqpt_is_gen === -1) {
      this.DeviceData.function = '用电/发电'
    } else if (this.DeviceData.eqpt_is_gen === 0) {
      this.DeviceData.function = '用电'
    } else if (this.DeviceData.eqpt_is_gen === 1) {
      this.DeviceData.function = '发电'
    }
  },
  watch: {
    'toData.eqpt_id': function () {
      this.DeviceData = this.toData
      if (this.DeviceData.eqpt_is_gen === -1) {
        this.DeviceData.function = '用电/发电'
      } else if (this.DeviceData.eqpt_is_gen === 0) {
        this.DeviceData.function = '用电'
      } else if (this.DeviceData.eqpt_is_gen === 1) {
        this.DeviceData.function = '发电'
      }
    }
  },
  methods: {
    //   修改设备信息按钮
    editDevice () {
      this.$emit('goBack', false)
      this.editMessage = true
      this.editDeviceData = this.DeviceData
    },
    // 返回按钮
    goBack () {
      this.$emit('goBack', false)
    },
    // 保存按钮
    storage () {
      // this.$emit('reFresh', '1')
      request.storageData(this.editDeviceData).then(data => {
        if (data.code === 0) {
          this.$emit('reFresh', 'getDetailData')
        }
      })
    }
  }
}
</script>
<style scoped>
.addOne{
  width:100%;
  height: 40px;
  line-height: 40px;
  position: relative;
}
.addOne .left{
  width: 120px;
  text-align: right;
  vertical-align: top;
  position: absolute;
  top:-15px;
  color:#666666;
}
.right{
    margin-left: 140px;
}
.addOne1{
  width:100%;
  height: 50px;
  line-height: 50px;
  position: relative;
}
.addOne1 .left{
  width: 120px;
  text-align: right;
  vertical-align: top;
  position: absolute;
  top:-15px;
  color:#666666;
}
.addOne1 .rightInput{
    width:250px;
    position: absolute;
    left:140px;
}
.addOne1 .rightInputPos:after{
  content: 'kw';
  position: absolute;
  right:1px;
}
.addOne1 .rightInputTime:after{
  content: 'h';
  position: absolute;
  right:1px;
}
.addOne1 .inPos{
    width:250px;
    margin-left: 140px;
}
.position{
  height:80px;
}
.dialog-footer{
    margin-left: 35%;
    margin-top: -20px;
}
</style>


