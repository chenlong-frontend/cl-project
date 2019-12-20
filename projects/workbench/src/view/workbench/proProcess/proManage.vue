<template>
  <div class="tp_proManage">
    <ibox title="进度管理">
      <span style="color: #23AEFC;cursor:pointer;" v-show="pIdList.length !== 0" @click="backToBefore"><i class="el-icon-arrow-left"></i>返回上一级</span>
      <el-input
        placeholder="请输入搜索内容"
        size="small"
        v-model="searchInput"
        style="float:right;width:300px;margin-bottom: 10px;"
        @keyup.enter.native="searchQuery"
      >
        <el-button
          slot="append"
          icon="el-icon-search"
          @click="searchQuery"
        >搜索</el-button>
      </el-input>
      <el-table
        ref="multipleTable"
        :data="tableData5"
        style="width: 100%;cursor: pointer;"
        stripe
        @selection-change="handleSelectionChange"
        >
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          label="任务编号"
          prop="task_num">
        </el-table-column>
        <el-table-column
          label="任务名称"
          prop="task_name">
        </el-table-column>
        <el-table-column
          label="计划开始时间"
          prop="task_gmt_start">
        </el-table-column>
        <el-table-column
          label="计划结束时间"
          prop="task_gmt_end">
        </el-table-column>
        <el-table-column
          label="计划进度"
          prop="task_prog_plan">
          <template slot-scope="scope">
            <span>{{formatData(scope.row.task_prog_plan)}}%</span>
          </template>
        </el-table-column>
        <el-table-column
          label="实际进度"
          prop="task_prog_act">
          <template slot-scope="scope">
            <span>{{formatData(scope.row.task_prog_act)}}%</span>
          </template>
        </el-table-column>
        <el-table-column
          label="进度预警">
          <template slot-scope="scope">
            <span v-show="Number(scope.row.task_prog_act) >= Number(scope.row.task_prog_plan) " style="color: #8bc34a">正常</span>
            <span v-show="Number(scope.row.task_prog_act) < Number(scope.row.task_prog_plan)" style="color: #f51c23;">滞后</span>
          </template>
        </el-table-column>
        <el-table-column
          label="负责人"
          prop="task_emp_name_chg">
        </el-table-column>
        <el-table-column
          label="施工日志">
          <template slot-scope="scope">
            <span v-show="Number(scope.row.task_is_last) === 0" @click="checkClick(scope.row)">查看日志</span>
            <span v-show="Number(scope.row.task_is_last) === 1" style="color: #1C84C6;text-decoration: underline" @click="checkClick(scope.row)">查看子任务</span>
          </template>
        </el-table-column>
        <el-table-column
          label="编辑">
          <template slot-scope="scope">
            <el-button style="z-index: 1000;" type="primary" size="small" @click.native="addNewTask(scope.row)">新增子任务</el-button>
          </template>
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
        <ibtn styleName="el-icon-circle-plus" msg="新增" @click.native="addTask1"></ibtn>
      </div>
      <!--分页-->
      <el-pagination
        layout="prev, pager, next"
        :total="allItem"
        :page-size=10
        v-show="Number(allItem) > 0"
        :current-page.sync="currentPage"
        @current-change="handleCurrentChange"
        style="margin-top:-30px;text-align: center;"
      >
      </el-pagination>
      <!--新建任务弹框-->
      <el-dialog
        title="新建任务"
        :visible.sync="flag.createTaskFlag"
        width="620px">
        <create-task ref="taskPage" :msg="pMsgObj" @close-add="closeAdd" @add-task="addTask"></create-task>
      </el-dialog>
      <!--删除任务-->
      <el-dialog
        title="删除提示"
        :visible.sync="flag.delTaskFlag"
        width="30%">
        <div style="text-align: center">是否删除任务？</div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="flag.delTaskFlag = false" size="small">取 消</el-button>
          <el-button type="primary" @click="delRequest" size="small">确 定</el-button>
        </span>
      </el-dialog>
      <!--查看日志-->
      <el-dialog
        title="查看日志"
        :visible.sync="flag.showLogFlag"
        :append-to-body="true"
        style="top: -30px;"
        :before-close="closeLog"
        width="80%">
        <show-log :taskid="taskId" @close-log="closeLog"></show-log>
      </el-dialog>
    </ibox>
  </div>
</template>
<script>
  import ibtn from '@/components/style/ibtn.vue'
  import ibox from '@/components/style/ibox.vue'
  import showLog from './proLogs.vue'
  import createTask from './components/createTask.vue'
  import request from '@/api/request'
  import roundMath from 'lodash/round'
  export default {
    components: {ibox, createTask, ibtn, showLog},
    created () {
      this.getListData()
    },
    data () {
      return {
        flag: {
          createTaskFlag: false,
          delTaskFlag: false,
          disableddelete: true,
          showLogFlag: false,
          firstSearch: true
        },
        multipleSelection: [],
        task_id_list: [],
        allItem: 100,      // 分页
        currentPage: 1,
        searchInput: '',   // 绑定的搜索内容
        tableData5: [],
        pId: 0,
        pIdList: [],
        pLimitTimeList1: [],
        pLimitTimeList2: [],
        pMsgObj: {
          task_id: 0
        },
        taskId: ''
      }
    },
    methods: {
      pIdClear () {
        this.pId = 0
        this.pIdList = []
      },
      dataInit () {
        this.flag = {
          createTaskFlag: false,
          delTaskFlag: false,
          disableddelete: true,
          showLogFlag: false,
          firstSearch: true
        }
        this.multipleSelection = []
        this.task_id_list = []
        this.allItem = 100      // 分页
        this.currentPage = 1
        this.searchInput = ''   // 绑定的搜索内容
        this.tableData5 = []
        this.pId = 0
        this.pIdList = []
        this.pMsgObj = {
          task_id: 0
        }
        this.taskId = ''
      },
      closeLog () {
        this.getListData()
        this.flag.showLogFlag = false
      },
      addNewTask (item) {
        this.flag.createTaskFlag = true
        this.pMsgObj = item
      },
      addTask1 () {
        this.flag.createTaskFlag = true
        if (this.pIdList.length === 0) {
          console.log('返回上一级数组为空')
          this.pMsgObj = {
            task_id: 0
          }
        } else {
          console.log('返回上一级有数组')
          this.pMsgObj = {
            task_id: this.pId,
            task_gmt_start: this.pLimitTimeList1[this.pLimitTimeList1.length - 1],
            task_gmt_end: this.pLimitTimeList2[this.pLimitTimeList2.length - 1]
          }
        }
      },
      addTask (item) {
        console.log(item)
        request({type: '1600',
          data: {
            task_num: item.task_num,
            task_name: item.task_name,
            task_emp_id_chg: item.task_emp_id_chg,
            task_gmt_start: item.task_gmt_start,
            task_gmt_end: item.task_gmt_end,
            task_p_id: item.task_p_id,
            task_note: item.task_note
          }}).then(t => {
            console.log(t)
            this.flag.createTaskFlag = false
            this.currentPage = 1
            this.getListData()
            this.$notify({
              title: '成功',
              message: '添加任务成功',
              type: 'success'
            })
            this.$refs.taskPage.dataInit()
          })
      },
      closeAdd () {
        this.flag.createTaskFlag = false
      },
      delRequest () {
        request({type: '1601', data: {task_id_list: this.task_id_list}}).then(t => {
          console.log(t)
          // 返回的信息
          this.flag.delTaskFlag = false
          this.dataInit()
          this.getListData()
          this.$notify({
            title: '成功',
            message: '删除成功',
            type: 'success'
          })
        })
      },
      backToBefore () {
        if (this.pIdList.length > 0) {
          this.pIdList.pop()
          this.pLimitTimeList1.pop()
          this.pLimitTimeList2.pop()
          console.log(this.pIdList)
          if (this.pIdList.length === 0) {
            this.pId = 0
          } else {
            this.pId = this.pIdList[this.pIdList.length - 1]
          }
          this.currentPage = 1
          this.getListData()
        }
      },
      checkClick (row) {
        // console.log(row)
        // this.pMsgObj = row
        if (Number(row.task_is_last) === 0) {
          console.log('查看日志')
          this.flag.showLogFlag = true
          this.taskId = row.task_id
          console.log(this.taskId)
        } else {
          console.log('查看下一级目录')
          this.pId = row.task_id
          this.pIdList.push(Number(row.task_id))
          this.pLimitTimeList1.push(row.task_gmt_start)
          this.pLimitTimeList2.push(row.task_gmt_end)
          this.currentPage = 1
          this.getListData()
        }
      },
      getListData () {
        request({type: '1603',
          data:
          {
            'task_p_id': this.pId,
            'page_no': this.currentPage,
            'page_size': 10,
            'search': {
              'search_like': this.searchInput
            }}
        }).then(t => {
          console.log(t)
          this.tableData5 = t.task_list
          this.allItem = Number(t.page_info.page_count)
        })
      },
      // 复选框点击事件
      handleSelectionChange (val) {
        this.multipleSelection = val
        this.task_id_list = this.multipleSelection.map(value => {
          return value.task_id
        })
        console.log(this.task_id_list)
        if (this.multipleSelection.length !== 0) {
          this.flag.disableddelete = false
        } else {
          this.flag.disableddelete = true
        }
      },
      // 删除数据/批量删除
      deleteIcon () {
        this.flag.delTaskFlag = true
      },
      // 分页点击事件
      handleCurrentChange (val) {
       // console.log('当前页是：' + this.currentPage)
        this.getListData()
      },
      searchQuery () {
        this.pIdClear()
        if (this.searchInput !== '') {
          // 实际查询
          console.log(this.currentPage)
          console.log(this.searchInput)
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
      expandChange (row, expandedRows) {
        console.log(row)
        console.log(expandedRows)
      },
      toggleSelection (rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row)
          })
        } else {
          this.$refs.multipleTable.clearSelection()
        }
      },
      formatData (value) {
        return roundMath(value, 2)
      }
    },
    watch: {
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
</style>
