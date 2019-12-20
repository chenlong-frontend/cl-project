<template>
  <div class="tp_proLogs">
    <el-input
      placeholder="请输入搜索内容"
      size="small"
      v-model="searchInput"
      style="float:right;width:300px;"
      @keyup.enter.native="searchQuery"
    >
      <el-button
        slot="append"
        icon="el-icon-search"
        @click="searchQuery"
      >搜索</el-button>
    </el-input>
    <!--表格数据-->
    <el-table
      :data="tableData"
      stripe
      highlight-current-row
      ref="multipleTable"
      style="width: 100%;margin-top: 10px;"
      height="400"
      @row-click="rowClick"
      @selection-change="handleSelectionChange">
      <el-table-column
        type="selection"
        stripe>
      </el-table-column>
      <el-table-column
        prop="rec_con"
        show-overflow-tooltip
        label="施工日志">
      </el-table-column>
      <el-table-column
        prop="rec_prog"
        label="当前进度">
        <template slot-scope="scope">
          <span>{{formatData(scope.row.rec_prog)}}%</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="rec_gmt_cre"
        label="日期">
      </el-table-column>
    </el-table>
    <!--删除/新增-->
    <div class="btn-group">
      <el-button
        type="primary"
        size="small"
        icon="el-icon-error"
        plain
        style="margin-left: 20px;margin-top: 10px;"
        :disabled="flag.disableddelete"
        @click="deleteIcon">删除</el-button>
      <ibtn styleName="el-icon-circle-plus" msg="新增" @click.native="flag.addDialog = true"></ibtn>
    </div>
    <div style="position: relative;left: 90%;z-index: 100;">
      <el-button type="primary" @click="$emit('close-log')" size="small">确 定</el-button>
    </div>
    <!--分页-->
    <el-pagination
      layout="prev, pager, next"
      :total="allItem"
      :page-size=6
      v-show="Number(allItem) > 0"
      :current-page.sync="currentPage"
      @current-change="handleCurrentChange"
      style="position: relative;left: 35%;top: -30px;}"
    >
    </el-pagination>
    <!--新增日志-->
    <el-dialog
      title="新增日志"
      :visible.sync="flag.addDialog"
      :append-to-body="true"
      width="40%">
      <add-log ref="logPage" @close-addLog="flag.addDialog = false" @add-log="submitAddLog"></add-log>
    </el-dialog>
    <!--修改日志-->
    <el-dialog
      title="查看日志"
      :visible.sync="flag.changeDialog"
      :append-to-body="true"
      width="40%">
      <change-log :changedata="changeData" @close-showLog="flag.changeDialog = false"></change-log>
    </el-dialog>
    <!--删除日志-->
    <el-dialog
      title="提示"
      :visible.sync="flag.delteDialog"
      :append-to-body="true"
      width="30%">
      <div style="text-align: center">确认删除？</div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="flag.delteDialog = false" size="small">取 消</el-button>
        <el-button type="primary" @click="delRequest" size="small" :loading="delLoading" ><span v-show="!delLoading">确 定</span><span v-show="delLoading">提交中</span></el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  import ibtn from '@/components/style/ibtn.vue'
  import ibox from '@/components/style/ibox.vue'
  import addLog from './components/addLog.vue'
  import request from '@/api/request'
  import roundMath from 'lodash/round'
  import changeLog from './components/changeLog.vue'
  export default {
    components: {ibox, ibtn, addLog, changeLog},
    props: ['taskid'],
    mounted () {
      this.getListData()
    },
    data () {
      return {
        loading: true,
        delLoading: false,
        tableData: [
          {
            rec_con: '',
            rec_prog: '',
            rec_gmt_cre: ''
          }
        ],  // 页面表格数据
        multipleSelection: [],  // 复选框点击选择项目
        rec_id_list: [],
        allItem: 100,      // 分页
        currentPage: 1,
        searchInput: '',   // 绑定的搜索内容
        flag: {
          disableddelete: true,
          delteDialog: false,
          addDialog: false,
          changeDialog: false,
          firstSearch: true
        },
        changeData: {}
      }
    },
    methods: {
      submitAddLog (item) {
        console.log(item)
        request({type: 1610, data: {rec_task_id: this.taskid, rec_con: item.rec_con, rec_prog: item.rec_prog, rec_pic_url: item.rec_pic_url}}).then(t => {
//          this.$notify({
//            title: '成功',
//            message: '添加日志成功',
//            type: 'success'
//          })
          this.flag.addDialog = false
          this.$refs.logPage.formInit()
          this.searchInput = ''
          this.currentPage = 1
          this.getListData()
        })
      },
      dataInit () {
        this.loading = true
        this.delLoading = false
        this.tableData = [
          {
            rec_con: '',
            rec_prog: '',
            rec_gmt_cre: ''
          }
        ]  // 页面表格数据
        this.multipleSelection = []  // 复选框点击选择项目
        this.rec_id_list = []
        this.allItem = 100      // 分页
        this.currentPage = 1
        this.searchInput = ''   // 绑定的搜索内容
        this.flag = {
          disableddelete: true,
          delteDialog: false,
          addDialog: false,
          changeDialog: false,
          firstSearch: true
        }
        this.changeData = {}
      },
      getListData () {
        request({type: 1613, data: {rec_task_id: this.taskid, page_no: this.currentPage, page_size: 6, search: this.searchInput}}).then(t => {
          // console.log(t)
          this.tableData = t.record_list
          this.allItem = Number(t.page_info.page_count)
        })
      },
      delRequest () {
        this.delLoading = true
        request({type: 1611, data: {rec_id_list: this.rec_id_list, rec_task_id: this.taskid}}).then(t => {
          this.$notify({
            title: '成功',
            message: '删除日志成功',
            type: 'success'
          })
          this.delLoading = false
          this.flag.delteDialog = false
          this.searchInput = ''
          this.currentPage = 1
          this.getListData()
        })
      },
      // 复选框点击事件
      handleSelectionChange (val) {
        this.multipleSelection = val
        this.rec_id_list = this.multipleSelection.map(v => {
          return v.rec_id
        })
        console.log(this.rec_id_list)
        if (this.multipleSelection.length !== 0) {
          this.flag.disableddelete = false
        } else {
          this.flag.disableddelete = true
        }
      },
      // 删除数据/批量删除
      deleteIcon () {
        this.flag.delteDialog = true
      },
      // 分页点击事件
      handleCurrentChange (val) {
       // console.log('当前页是：' + this.currentPage)
        this.getListData()
      },
      searchQuery () {
        if (this.searchInput !== '') {
          this.currentPage = 1
          this.getListData()
          this.flag.firstSearch = false
        } else {
          this.currentPage = 1
          this.$notify.error({
            title: '提示',
            message: '请输入查询的值'
          })
        }
      },
      formatData (value) {
        return roundMath(value, 2)
      },
      rowClick (row) {
        console.log(row)
        this.changeData = row
        this.flag.changeDialog = true
      }
    },
    watch: {
      taskid: function (msg) {
        console.log('检测到taskId变化' + msg)
        this.getListData()
      },
      searchInput: function (msg) {
        // 检测搜索框内容为空时自动加载第一页
        // console.log(this.searchInput)
        if (msg === '') {
          this.dataInit()
          this.getListData()
          this.flag.firstSearch = true
        }
      }
    }
  }
</script>
<style scoped>
  .tp_proLogs {
    width: 90%;
    margin-left: 5%;
  }
  .btn-group {
    position: relative;
    top:33px;
  }
</style>
