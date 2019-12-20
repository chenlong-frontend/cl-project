<template>
  <div class="myPro">
        <div class="detailBox">
          <div class="seo">
            <el-input placeholder="请输入内容" v-model="input"  size="small" >
                  <el-button slot="append" icon="el-icon-search" type="primary" size="small"  @click="seo">搜索</el-button>
            </el-input>
          </div>
          <el-tabs type="border-card" class='tabBox' @tab-click="handleClick">
            <!-- 设备详情开始 -->
            <el-tab-pane label="设备详情">
              <el-table
                  ref="multipleTable"
                  :data="tableData"
                  tooltip-effect="dark"
                  style="width: 100%; height: 340px; overflow: auto;"
                  v-if = "this.tableData.length > 0"
                  @row-dblclick="showDialog"
                  @selection-change="handleSelectionChange">
                  <el-table-column
                    type="selection">
                  </el-table-column>
                  <el-table-column
                    prop="eqpt_name"
                    label="设备名称">
                  </el-table-column>
                  <el-table-column
                    prop="eqpt_type_is_gen"
                    label="设备功能">
                  </el-table-column>
                  <el-table-column
                    prop="eqpt_num"
                    label="设备编号">
                  </el-table-column>
                  <el-table-column
                    prop="eqpt_pos"
                    label="设备详细位置"
                    show-overflow-tooltip>
                  </el-table-column>
                  <el-table-column
                    prop="eqpt_type_pow"
                    label="功率">
                  </el-table-column>
                  <el-table-column
                    prop="eqpt_type_dur"
                    label="每日使用时长">
                  </el-table-column>
              </el-table>
              <span v-else style="text-align:center;width: 100%;height: 340px;display: block;">暂无数据</span>
              <el-button type="primary"
                          size="small"
                          plain @click="clear"  icon="el-icon-delete" class="delete" :disabled='ban'>删除</el-button>
              <!--删除对话框开始-->
              <el-dialog
                title="删除提示"
                :visible.sync="deleteDis"
                width="30%"
                :appendToBody='true'>
                <span>是否删除该设备？</span>
                <span slot="footer" class="dialog-footer">
                  <el-button @click="deleteDis = false">取 消</el-button>
                  <el-button type="primary" @click="strike">确 定</el-button>
                </span>
              </el-dialog>
              <!--删除对话框结束-->
              <!-- 显示一条数据的详情开始 -->
              <el-dialog
                title="设备信息查看"
                :visible.sync="showDetailDialog"
                width="30%"
                :appendToBody='true'>
                <device-detail :show="this.showDetailDialog" @goBack="backData()" @reFresh="refresh()"  :toData="this.toDeviceDetail"></device-detail>
              </el-dialog>
              <!-- 显示一条数据的详情结束 -->
              <div class="block">
                <el-pagination
                  class="page"
                  layout="prev, pager, next"
                  :current-page='page'
                  :page-size=8
                  @current-change ='getPage'
                  :total="pageNum">
                </el-pagination>
              </div>
            </el-tab-pane>
            <!-- 设备详情结束 -->
            <!-- 新增设备开始 -->
            <el-tab-pane label="新增设备项目">
              <!-- 设备管理进 新增 -->
              <div class="fromDevice">
                <div class="addOne"> <p class="left">设备名称：</p>
                  <el-input v-model="addDeviceData.eqpt_name" size="mini"></el-input>
                </div>
                <div class="addOne"> <p class="left">设备功能：</p><el-input v-model="power" size="mini" disabled></el-input></div>
                <div class="addOne"> <p class="left">设备编号：</p><el-input v-model="addDeviceData.eqpt_num" size="mini"></el-input></div>
                <div class="addOne position"> <p class="left">设备详细位置：</p><el-input v-model="addDeviceData.eqpt_pos" type="textarea"resize="none" size="mini" class="inPos"></el-input></div>
                <div class="addOne"> <p class="left">设备功率：</p><el-input v-model="addDeviceData.eqpt_type_pow" size="mini" disabled class="unitPos chp-electronic-device"></el-input></div>
                <div class="addOne"> <p class="left">每日使用时间：</p><el-input v-model="addDeviceData.eqpt_type_dur" size="mini" disabled class="unitTime chp-electronic-device"></el-input></div>
                <span slot="footer" class="dialog-footer">
                  <el-button type="primary" @click="readyAdd" class="submit">确定提交</el-button>
                </span>
              </div>
            </el-tab-pane>
            <!-- 新增设备结束 -->
            <!-- 设备导入导出开始 -->
            <el-tab-pane label="设备导入导出">
              <import1 :gen="this.gen" :id="this.id" @finalSubmit="finalSubmit"></import1>
            </el-tab-pane>
            <!-- 设备导入导出结束 -->
          </el-tabs>
        </div>
  </div>
</template>
<script>
import request from '@/api/workbench/electronic/devices.js'
import deviceDetail from '@/view/workbench/electronic/deviceDetail/deviceDetail.vue'
import import1 from '@/view/workbench/electronic/import/import.vue'
export default {
  components: {deviceDetail, import1},
  props: ['toDetail', 'index'],
  data () {
    return {
      tableData: [{}], // 表格数据包括result_list和page_info
      multipleSelection: [],
      input: '',
      deleteDis: false, // 是否显示删除对话框
      ids: [], // 删除时传递的id数组
      addDeviceData: {
        eqpt_type_id: '',
        eqpt_name: '',
        eqpt_is_gen: '',
        eqpt_num: '',
        eqpt_pos: '',
        eqpt_type_pow: '',
        eqpt_type_dur: ''
      }, // 传递过来有关的设备数据
      ban: true, // 删除按钮是否禁用
      pageNum: 0,
      currentPage: 1,
      page: 1, // 当前页
      requestTypeData: {}, // 搜索的请求内容
      showDetailDialog: false,
      toDeviceDetail: {},
      gen: '',
      id: '',
      tableName: '',
      eqpt_type_is_gen: -2,
      power: ''
    }
  },
  watch: {
    index: function () {
      this.init()
    }
  },
  created () {
    console.log(this.toDetail)
    console.log(this.toDetail.eqpt_is_gen)
    this.init()
  },
  methods: {
    init () {
      this.gen = this.toDetail.eqpt_type_is_gen
      this.id = this.toDetail.eqpt_type_id
//      this.time = this.toDetail.eqpt_type_dur
      this.addDeviceData.eqpt_type_id = this.toDetail.eqpt_type_id
      this.addDeviceData.eqpt_is_gen = this.toDetail.eqpt_type_is_gen
      this.addDeviceData.eqpt_type_pow = this.toDetail.eqpt_type_pow
      this.addDeviceData.eqpt_type_dur = this.toDetail.eqpt_type_dur
      if (this.toDetail.eqpt_type_is_gen === 1) {
        this.power = '发电'
      } else if (this.toDetail.eqpt_type_is_gen === 0) {
        this.power = '用电'
      } else if (this.toDetail.eqpt_type_is_gen === -1) {
        this.power = '发电/用电'
      }
      request.getDetailTable({id: this.toDetail.eqpt_type_id, page_num: this.page, page_size: 8, like: this.input}).then(data => {
        this.tableData = data.data.result_list
        for (var i = 0; i < this.tableData.length; i++) {
          this.tableData[i].eqpt_type_dur = this.toDetail.eqpt_type_dur
        }
        this.eqpt_type_is_gen = this.toDetail.eqpt_type_is_gen
        if (this.eqpt_type_is_gen === 0) {
          for (var j = 0; j < this.tableData.length; j++) {
            this.tableData[j].eqpt_type_is_gen = '用电'
          }
        } else if (this.eqpt_type_is_gen === -1) {
          for (var m = 0; m < this.tableData.length; m++) {
            this.tableData[m].eqpt_type_is_gen = '用电/发电'
          }
        } else if (this.eqpt_type_is_gen === 1) {
          for (var n = 0; n < this.tableData.length; n++) {
            this.tableData[n].eqpt_type_is_gen = '发电'
          }
        }
        this.pageNum = Number(data.data.page_info.page_count)
      })
    },
    // 选项卡切换
    handleClick (tab, event) {
      if (tab.index === '0') {
        this.init()
      }
    },
    // 上传失败
    errInformation (err, file, fileList) {
      this.$message.error('上传失败，请核对模板是否正确')
      console.log(err)
    },
    // 上传成功
    sueecssUploadAndPreview (response, file, fileList) {
      console.log('返回文件')
      console.log(response)
      if (response.code === 0) {
        this.DepartmentUser = response.data.gro_list
      } else {
        this.DepartmentUser = []
        this.$message.error(response.msg)
      }
    },
    // 多选框事件
    handleSelectionChange (val) {
      this.multipleSelection = val
      this.ids = []
      for (var i = 0; i < val.length; i++) {
        this.ids.push(val[i].eqpt_id)
      }
      if (val.length > 0) {
        this.ban = false
      } else {
        this.ban = true
      }
    },
//     确定提交
    readyAdd () {
      console.log(this.addDeviceData)
      if (this.addDeviceData.eqpt_num !== '' || this.addDeviceData.eqpt_pos !== '' || this.addDeviceData.eqpt_name !== '') {
        request.addOneDevice(this.addDeviceData).then(data => {
          console.log(data)
          if (data.code === 0) {
            this.addDeviceData.eqpt_num = ''
            this.addDeviceData.eqpt_pos = ''
            this.addDeviceData.eqpt_name = ''
            this.init()
          }
        })
      } else {
        this.$notify.error({
          title: '错误',
          message: '请将信息填写完整'
        })
      }
    },
    // 删除
    clear () {
      this.deleteDis = true
    },
//    确认删除
    strike () {
      this.deleteDis = false
      request.strikeDevice(this.ids).then(data => {
        if (data.code === 0) {
          this.init()
        }
      })
    },
    // 分页
    getPage (val) {
      console.log(val, '****************')
      this.page = val
      this.init()
    },
    //    搜索时加载设备种类信息
    seo () {
      this.init()
    },
    // 双击显示一条数据的详情信息
    showDialog (row, event) {
      console.log(row)
      console.log(event)
      this.toDeviceDetail = row
      console.log(this.toDeviceDetail)
      this.$emit('go', false)
      // this.$emit('refreshDetail', '1')
      this.showDetailDialog = true
    },
    // 设备信息中的返回按钮
    backData (data) {
      this.showDetailDialog = data
    },
    // 修改一个设备信息后的保存按钮   又一次请求页面数据
    refresh () {
      this.init()
    },
    finalSubmit (val) {
      console.log(val)
      val === 'ok' && this.init()
    }
  }
}
</script>
<style scoped>
.detailBox{
  position: relative;
}
.seo{
  width:250px;
  height:40px;
  margin-left: 70%;
  margin-top: -30px;
}
.el-input{
    width: 250px;
    position: absolute;
    right:10px;
}
.el-input-group__append button.el-button, .el-input-group__append div.el-select .el-input__inner, .el-input-group__append div.el-select:hover .el-input__inner, .el-input-group__prepend button.el-button, .el-input-group__prepend div.el-select .el-input__inner, .el-input-group__prepend div.el-select:hover .el-input__inner{
   background-color: #D1ECFF;
   color:#969FF0;
}
.tabBox{
  margin-top: 20px;
  height: 460px;
}
.add{
  margin-top: 20px;
}
.delete{
  margin-top: 20px;
}
.block{
  width:20%;
  margin: -30px auto 0px;
}
/* 新增 */
.fromDevice, .fromDeviceDetail{
  width:400px;
  margin-left: 100px;
}
.addOne{
  width:100%;
  height: 50px;
  position: relative;
}
.addOne p{
  width: 120px;
  text-align: right;
  vertical-align: top;
  position: absolute;
  top:-15px;
  color:#666666;
}
.addOne .diaSel{
  position: absolute;
  right:20px;
  width:250px;
}
.addOne .unitPos:after{
  content: 'kw';
  position: absolute;
  right:16px;
}
.addOne .unitTime:after{
  content: 'h';
  position: absolute;
  right:16px;
}
.position{
  height:80px;
}
.inPos{
  width:250px;
  position: absolute;
  left:140px;
}
.posArea{
  width:300px;
  position: absolute;
  left:144px;
}
.submit{
  margin-left: 140px;
}
::-webkit-scrollbar {
  width: 6px;
}/* 滚动条整体宽度 */
::-webkit-scrollbar-track{
  background-color: #F3F3F4;
}/* 滚动条的滑轨背景颜色 */
::-webkit-scrollbar-thumb{
  background-color: #DAE4E5;
  border-radius: 3px;
}/* 滚动条的滑块背景颜色 */
::-webkit-scrollbar-corner {
  background-color: #B0AFB0;
} /* 横向滚动条和纵向滚动条相交处尖角的颜色 */
</style>
