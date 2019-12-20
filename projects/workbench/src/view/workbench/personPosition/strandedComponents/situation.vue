<template>
  <div class="tp_situation">
    <span >按日期进行选择：</span>
    <!--选择时间-->
    <el-date-picker
      v-model="choosedate"
      type="daterange"
      align="right"
      unlink-panels
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      value-format="yyyy-MM-dd"
      :picker-options="pickerOptions2"
      size="mini"
      @change="chooseData"
      style="width: 250px"
    >
    </el-date-picker>
    <!--搜索框-->
    <el-input
      size="mini"
      v-model="searchInput"
      style="width:250px;position: absolute;left: 70%"
      @keyup.enter.native="searchQuery"
    >
      <el-button
        slot="append"
        icon="el-icon-search"
        @click="searchQuery"
      >搜索</el-button>
    </el-input>
    <!--表格内容-->
    <el-table
      :data="tableData"
      stripe
      style="width: 100%;margin-top: 20px">
      <el-table-column
        prop="date"
        label="滞留人员姓名"
        width="130">
      </el-table-column>
      <el-table-column
        prop="name"
        label="安全帽编号"
        width="130">
      </el-table-column>
      <el-table-column
        prop="address"
        width="150"
        show-overflow-tooltip
        label="所在部门">
      </el-table-column>
      <el-table-column
        prop="name"
        label="滞留区域"
        width="130">
      </el-table-column>
      <el-table-column
        prop="name"
        label="滞留人员联系方式"
        width="150">
      </el-table-column>
      <el-table-column
        prop="name"
        label="滞留时间段"
        width="120">
      </el-table-column>
      <el-table-column
        prop="name"
        label="滞留市场">
      </el-table-column>
    </el-table>
    <!--分页-->
    <el-pagination
      layout="prev, pager, next"
      :total="allItem"
      :page-size=6
      :current-page.sync="currentPage"
      style="margin-left: 35%; margin-top: 20px;"
    ><!--
              @current-change="handleCurrentChange"-->
    </el-pagination>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        pickerOptions2: {
          shortcuts: [{
            text: '最近一周',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '最近一个月',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '最近三个月',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            }
          }]
        },
        choosedate: '',
        searchInput: '',
        allItem: 20,
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }]
      }
    },
    methods: {
      // 日期改变事件
      chooseData (item) {
        console.log(item)
      },
      // 搜索框点击事件
      searchQuery () {}
    }
  }
</script>
<style scoped>
</style>
