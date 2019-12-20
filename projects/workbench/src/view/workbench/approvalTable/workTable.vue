<template>
  <ibox title="我的待办" class="jinm-approvalTable-workTable">
    <el-select v-model="value" placeholder="请选择" style="width:25%" @change="select(value)">
      <el-option
        v-for="item in options"
        :key="item.flow_id"
        :label="item.flow_name"
        :value="item.flow_id">
      </el-option>
    </el-select>

    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="待我处理" name="first">
        <el-table
          :data="tableData1"
          tooltip-effect="dark"
          stripe
          style="width: 100%"
          align="center">
          <el-table-column
            prop="alias"
            label="工单状态"
            width="180"
            align="center"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="start_emp_name"
            label="发起人"
            width="180"
            align="center">
          </el-table-column>
          <el-table-column
            prop="last_emp_name"
            label="处理人"
            align="center">
          </el-table-column>
          <el-table-column
            prop="start_time"
            label="发起时间"
            align="center">
          </el-table-column>
          <el-table-column
            prop="history_time"
            label="变更时间"
            align="center"
            show-overflow-tooltip>
          </el-table-column>
        </el-table>
      </el-tab-pane>

      <el-tab-pane label="处理中的" name="second">
        <el-table
          :data="tableData2"
          tooltip-effect="dark"
          stripe
          style="width: 100%"
          align="center">
          <el-table-column
            prop="alias"
            label="工单状态"
            width="180"
            align="center"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="start_emp_name"
            label="发起人"
            width="180"
            align="center">
          </el-table-column>
          <el-table-column
            prop="last_emp_name"
            label="处理人"
            align="center">
          </el-table-column>
          <el-table-column
            prop="start_time"
            label="发起时间"
            align="center">
          </el-table-column>
          <el-table-column
            prop="history_time"
            label="变更时间"
            align="center"
            show-overflow-tooltip>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="处理完成" name="third">
        <el-table
          :data="tableData3"
          tooltip-effect="dark"
          stripe
          style="width: 100%"
          align="center">
          <el-table-column
            prop="alias"
            label="工单状态"
            width="180"
            align="center"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="start_emp_name"
            label="发起人"
            width="180"
            align="center">
          </el-table-column>
          <el-table-column
            prop="last_emp_name"
            label="处理人"
            align="center">
          </el-table-column>
          <el-table-column
            prop="start_time"
            label="发起时间"
            align="center">
          </el-table-column>
          <el-table-column
            prop="history_time"
            label="变更时间"
            align="center"
            show-overflow-tooltip>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>

    <el-input
      v-model.trim="input"
      placeholder="请输入搜索内容"
      @keyup.enter.native="searchQuery">
      <el-button
        slot="append"
        icon="el-icon-search"
        @click="searchQuery"
      ></el-button>
    </el-input>

    <div class="block">
      <el-pagination
        layout="prev, pager, next"
        :total="allItem"
        :page-size=10
        align="center"
        :current-page.sync="currentPage"
        @current-change="handleCurrentChange"
      >
      </el-pagination>
    </div>
  </ibox>
</template>

<script>
  import ibox from '@/components/style/ibox.vue'
  import request from '@/api/workbench/approvalTable/workTable.js'
  export default {
    components: { ibox },
    created () {
      request.getTable({'type': 0, 'currentPage': 1, 'input': '', 'selectId': this.selectId}).then(value => {
        this.tableData1 = value.issue
        console.log(value.count)
        this.allItem = Number(value.count)
      })
      request.getData().then(value => {
        this.options = value
      })
    },
    data () {
      return {
        options: [],
        value: '',
        tableData1: [],
        tableData2: [],
        tableData3: [],
        activeName: 'first',
        allItem: 0,
        currentPage: 1,
        input: '',
        index: 0,
        selectId: '-1'
      }
    },
    methods: {
      handleClick (tab, event) {
        console.log(tab)
        console.log(tab.index)
        this.index = Number(tab.index)
        this.input = ''
//        this.value = ''
        this.currentPage = 1
        if (this.index === 0) {
          request.getTable({'type': this.index, 'currentPage': 1, 'input': '', 'selectId': this.selectId}).then(value => {
            this.tableData1 = value.issue
//            this.allItem = Number(value.count)
          })
        }
        if (this.index === 1) {
          request.getTable({'type': this.index, 'currentPage': 1, 'input': '', 'selectId': this.selectId}).then(value => {
            this.tableData2 = value.issue
//            this.allItem = Number(value.count)
          })
        }
        if (this.index === 2) {
          request.getTable({'type': this.index, 'currentPage': 1, 'input': '', 'selectId': this.selectId}).then(value => {
            this.tableData3 = value.issue
//            this.allItem = Number(value.count)
          })
        }
      },
      // **********分页************
      handleCurrentChange (val) {
        console.log(val)
        this.restart()
      },
      // **************搜索功能****************
      searchQuery () {
        this.restart()
      },
      // +++++++++++++++xi下拉框**************
      select (val) {
        console.log(val)
        this.restart()
      },
      restart () {
        this.selectId = ''
        if (this.value === '') {
          this.selectId = '-1'
        } else {
          this.selectId = this.value
        }
        if (this.index === 0) {
          request.getTable({'type': this.index, 'currentPage': this.currentPage, 'input': this.input, 'selectId': this.selectId}).then(value => {
            this.tableData1 = value.issue
            this.allItem = Number(value.count)
          })
        }
        if (this.index === 1) {
          request.getTable({'type': this.index, 'currentPage': this.currentPage, 'input': this.input, 'selectId': this.selectId}).then(value => {
            this.tableData2 = value.issue
            this.allItem = Number(value.count)
          })
        }
        if (this.index === 2) {
          request.getTable({'type': this.index, 'currentPage': this.currentPage, 'input': this.input, 'selectId': this.selectId}).then(value => {
            this.tableData3 = value.issue
            this.allItem = Number(value.count)
          })
        }
      }
    }
  }
</script>

<style scoped>
  .el-tabs__header{float:left;}
  .block{width:100%;margin-top:20px;}
</style>
