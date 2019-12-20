<template>
  <div class="device">
      <ibox title="设备管理">
        <div class="deviceBox">
          <el-select v-model="type" placeholder="请选择" size="small" @change="chooseDevice">
            <el-option
              v-for="item in options1"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>

          <el-button class="addDevice" plain size="small" type="primary" icon="el-icon-plus" @click="dialogVisible = true">新增设备</el-button>
          <el-input placeholder="请输入内容" v-model="requestTypeData.like"  size="small" >
                <el-button slot="append" icon="el-icon-search" type="primary" size="small" class="seo" @click="seo">搜索</el-button>
          </el-input>
          <!-- 对话框开始 -->
          <el-dialog
            title="新增设备"
            :visible.sync="dialogVisible"
            width="438px"
            :appendToBody = 'true'>
            <el-form :model="addDevice" status-icon :rules="addDeviceRule" ref="addDevice">
              <el-form-item prop="eqpt_type_name">
                  <div class="addOne"> <p class="left">设备名称：</p><el-input v-model="addDevice.eqpt_type_name" size="mini"></el-input></div>
              </el-form-item>
              <el-form-item prop="eqpt_type_is_gen">
                <div class="addOne"> <p class="left">设备功能：</p>
                  <el-select v-model="addDevice.eqpt_type_is_gen" placeholder="请选择" size="small" class="diaSel" >
                    <el-option
                      v-for="item2 in options2"
                      :key="item2.value"
                      :label="item2.label"
                      :value="item2.value">
                    </el-option>
                  </el-select>
                </div>
              </el-form-item>
              <el-form-item prop="eqpt_type_pow">
                <div class="addOne"> <p class="left">功率：</p><el-input v-model="addDevice.eqpt_type_pow" size="mini" class="unit chp-electronic-device"></el-input></div>
              </el-form-item>
              <el-form-item prop="eqpt_type_dur">
                <div class="addOne"> <p class="left">每日使用时长：</p><el-input v-model="addDevice.eqpt_type_dur" size="mini" class="time chp-electronic-device"></el-input></div>
              </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="addOneDeviceType('addDevice')">确 定</el-button>
            </span>
          </el-dialog>

          <el-dialog
            title="删除提示"
            :visible.sync="deleteDis"
            width="438px"
            :appendToBody='true'>
            <span>是否删除该设备？</span>
            <span slot="footer" class="dialog-footer">
              <el-button @click="deleteDis = false">取 消</el-button>
              <el-button type="primary" @click="strike">确 定</el-button>
            </span>
          </el-dialog>
          <el-dialog
            title="编辑设备"
            :visible.sync="showEdit"
            width="438px"
            :appendToBody = 'true'>
            <!--弹出框-->
            <editDevice :oneDevice1="oneDevice1" :options2="options2" @remove="removeInfo" @confirm="confirm"></editDevice>
          </el-dialog>
          <!-- 对话框结束 -->

          <el-row class="deciBoxs">
            <el-col :span="6" class="boxItemsBox" v-for="(item, index) in devices" :key="index">
              <div class="grid-content bg-purple boxItems">

                <el-tooltip class="item" effect="dark" :content="item.eqpt_type_name" placement="top">
                  <h3 class="title over">{{item.eqpt_type_name}}</h3>
                </el-tooltip>
                  <div class="counts">
                    <p><span class="countLeft">工地内数量：</span><span class="countRight over">{{item.eqpt_type_qty}}</span> </p>
                    <p><span class="countLeft">功率：</span><span class="countRight over">{{item.eqpt_type_pow}}</span> </p>
                    <p><span class="countLeft">每日使用时长：</span> <span class="countRight over">{{item.eqpt_type_dur}}</span> </p>
                    <p><span class="countLeft">功能：</span><span v-if="item.eqpt_type_is_gen === 0">用电</span>
                              <span v-if="item.eqpt_type_is_gen === 1">发电</span>
                              <span v-if="item.eqpt_type_is_gen === -1">用电/发电</span></p>
                  </div>
                  <div class="three" @click="leave(index)" v-show="showIndex === index">
                    <p @click="edit(item, index)">编辑</p>
                    <p @click="remove(item.eqpt_type_id)">删除</p>
                    <p @click="detail(item, index)" >查看详情</p>
                  </div>
                  <div class="enter" @click="enter(index)" v-show="showIndex !== index">
                    <span class="el-icon-arrow-down"></span>
                  </div>
              </div>
            </el-col>
          </el-row>
          <el-dialog
            title="详情页面"
            :visible.sync="showDetail"
            width="80%"
            :appendToBody='true'>
            <electronicDetail :toDetail="this.DetailData" :index="this.index"></electronicDetail>
          </el-dialog>
        </div>
      </ibox>
  </div>
</template>
<script>
import ibox from '@/components/style/ibox.vue'
import request from '@/api/workbench/electronic/devices.js'
import electronicDetail from '@/view/workbench/electronic/electronicDetail.vue'
import editDevice from './deviceDetail/editDevice.vue'
export default {
  components: {ibox, electronicDetail, editDevice},
  data () {
    var checkDur = (rule, value, callback) => {
      if (value > 24) {
        return callback(new Error('每日使用时长不能超过24小时'))
      } else {
        callback()
      }
    }
    return {
      options1: [{
        value: '所有设备',
        label: '所有设备'
      }, {
        value: '发电设备',
        label: '发电设备'
      }, {
        value: '用电设备',
        label: '用电设备'
      }],
      options2: [{
        value: 1,
        label: '发电'
      }, {
        value: 0,
        label: '用电'
      }, {
        value: -1,
        label: '发电/用电'
      }],
      type: '所有设备',
      showUse: false,
      deleteDis: false,
      showEdit: false,
      dialogVisible: false,
      showDetail: false,
      oneDevice1: {},
      DetailData: {},
      requestTypeData: {page_num: '1', page_size: '10', eqpt_is_gen_list: [-1, 0, 1], like: ''},
      typeId: 0,
      strikeId: 0,
      devices: [],
      showIndex: -1,
      index: -1,
      addDevice: {},
      addDeviceRule: {
        eqpt_type_name: [
          { required: true, message: '请输入设备名称', trigger: 'blur' },
          { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
        ],
        eqpt_type_pow: [
          { required: true, message: '请输入功率', trigger: 'blur' },
          { validator: this.regExp('number'), trigger: 'blur' },
          { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
        ],
        eqpt_type_dur: [
          { required: true, message: '请输入时长', trigger: 'blur' },
          { validator: checkDur, trigger: 'blur' },
          { validator: this.regExp('number'), trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    this.getInit()
  },
  methods: {
    getInit () {
      request.getStart(this.requestTypeData).then(data => {
        this.devices = data.data.result_list
      })
    },
    confirm (val) {
      console.log(val, val.eqpt_type_is_gen, typeof val.eqpt_type_is_gen, '***********')
      request.SaveEditData(val).then(data => {
        console.log(data)
        if (data.code === 0) {
          this.showEdit = false
          this.getInit()
        }
      })
    },
    removeInfo () {
      this.showEdit = false
    },
    chooseDevice () {
      console.log(this.type)
      if (this.type === '所有设备') {
        this.requestTypeData.eqpt_is_gen_list = [-1, 0, 1]
      }
      if (this.type === '用电设备') {
        this.requestTypeData.eqpt_is_gen_list = [0, -1]
      }
      if (this.type === '发电设备') {
        this.requestTypeData.eqpt_is_gen_list = [1, -1]
      }
      this.getInit()
    },
    // 鼠标悬浮
    enter (index) {
      this.showIndex = index
    },
    // 鼠标离开
    leave (index) {
      this.showIndex = -1
    },
    // 新增一个设备种类
    addOneDeviceType (addDevice) {
      this.$refs[addDevice].validate((valid) => {
        if (valid) {
          if (this.addDevice.eqpt_type_is_gen === '发电') {
            this.addDevice.eqpt_type_is_gen = 1
          } else if (this.addDevice.eqpt_type_is_gen === '用电') {
            this.addDevice.eqpt_type_is_gen = 0
          } else if (this.addDevice.eqpt_type_is_gen === '发电/用电') {
            this.addDevice.eqpt_type_is_gen = -1
          }
          request.addOneDeviceType(this.addDevice).then(data => {
            console.log(data.code)
            if (data.code === 0) {
              this.dialogVisible = false
              this.addDevice = {}
              this.getInit()
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 新增一个设备时刷新页面
    refreshDevice () {
      this.init()
    },
    // 显示删除对话框
    remove (id) {
      this.strikeId = id
      this.deleteDis = true
    },
    // 确定删除   删除
    strike () {
      request.strike(this.strikeId).then(data => {
        this.deleteDis = false
        console.log(data)
        if (data.code === 0) {
          this.getInit()
        }
      })
    },
    // 显示编辑对话框
    edit (item, index) {
      console.log(item)
      this.showEdit = true
      this.index = index
      this.oneDevice1 = item
    },
//    // 确定编辑   保存编辑后的信息
//    readyEdit (readyEdit) {
//      this.$refs[readyEdit].validate((valid) => {
//        if (valid) {
//          this.showEdit = false
//          if (this.oneDevice1.eqpt_type_is_gen === '发电') {
//            this.oneDevice1.eqpt_type_is_gen = 1
//          } else if (this.oneDevice1.eqpt_type_is_gen === '用电') {
//            this.oneDevice1.eqpt_type_is_gen = 0
//          } else if (this.oneDevice1.eqpt_type_is_gen === '发电/用电') {
//            this.oneDevice1.eqpt_type_is_gen = -1
//          }
//          request.SaveEditData(this.oneDevice1, this.typeId).then(data => {
//            if (data.code === 0) {
//              this.devices[this.index] = this.oneDevice1
//            }
//          })
//        } else {
//          console.log('error submit!!')
//          return false
//        }
//      })
//    },
    // 查看详情
    detail (item, index) {
      console.log('详情')
      this.index = index
      console.log(item)
      this.showDetail = true
      this.DetailData = item
    },
    // 隐藏对话框
    hiddenDia (data) {
      this.showDetail = data
    },
//    搜索时加载设备种类信息
    seo () {
      this.getInit()
    }
  }
}
</script>
<style scoped>
.deviceBox{
  padding:5px 20px 20px 20px;
  position: relative;
}
.addDevice{
  position: absolute;
  right:300px;
  background-color: #D1ECFF;
  color:#969FF0;
}
.el-input{
    width: 250px;
    position: absolute;
    right:20px;
}
.el-input-group__append button.el-button, .el-input-group__append div.el-select .el-input__inner, .el-input-group__append div.el-select:hover .el-input__inner, .el-input-group__prepend button.el-button, .el-input-group__prepend div.el-select .el-input__inner, .el-input-group__prepend div.el-select:hover .el-input__inner{
   background-color: #D1ECFF;
   color:#969FF0;
}
.deciBoxs{
  width:100%;
  margin-top: 20px;
}
.boxItemsBox{
  padding:0 6px;
  display: inline-block;
}
.boxItems{
  height: 200px;
  border-radius: 10px;
  border: 2px solid #E5E5E5;
  padding:0px 0px 10px 20px;
  margin-top: 10px;
  box-sizing: border-box;
  position: relative;
}
.title{
  width:130px;
  font-size: 12px;
  font-weight: 800;
  height: 46px;
  line-height: 46px;
  margin:0px;
  color:#535353;
}
.countLeft{
  float: left;
}
.countRight{
  display: inline-block;
  width: 60px;
  float:left;
}
.over{
  overflow: hidden;
  text-overflow:ellipsis;
  white-space:nowrap;
}
.counts{
  border-top: 2px solid #E5E5E5;
  padding-top: 14px;
}
.counts p{
  padding: 0px;
  margin: 0px;
  height: 28px;
  line-height: 28px;
  color:#CBCBCB;
  font-size: 14px;
}
.three{
  width:56px;
  height:64px;
  text-align: center;
  border: 1px solid #E5E5E5;
  position: absolute;
  top:-1px;
  right: -1px;
  border-radius: 0px 10px;
  background-color: #DEDEDE;
  padding:0px 2px;
  box-sizing: border-box;
  cursor: pointer;
}
.three p {
  padding: 0px;
  margin: 0px;
  height:18px;
  line-height: 18px;
  font-size: 12px;
  color:#B4B4B4;
  border-bottom: 1px solid #F0F0F0;
}
.enter{
  width:40px;
  height:40px;
  line-height: 40px;
  text-align: center;
  border: 1px solid #E5E5E5;
  position: absolute;
  top:-1px;
  right: -1px;
  border-radius: 0px 10px;
  color:#51A0D2;
  cursor: pointer;
}
/* 对话框 */
.addOne{
  width:100%;
  height: 40px;
  line-height: 40px;
  position: relative;
}
.addOne p{
  width: 100px;
  text-align: right;
  vertical-align: top;
  position: absolute;
  top:-15px;
}
.addOne .diaSel{
  position: absolute;
  right:20px;
  width:250px;
}
.addOne .unit:after{
  content: 'kw';
  position: absolute;
  right:10px;
}
.addOne .time:after{
  content: 'h';
  position: absolute;
  right:10px;
}
</style>
