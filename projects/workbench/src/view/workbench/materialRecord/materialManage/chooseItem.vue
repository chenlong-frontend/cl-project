<template>
  <div class="smallTable">
    <div class="searchInput">
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
    </div>

    <el-table
      stripe
      highlight-current-row
      :data='DepartmentUser'
      ref='multipleTable'
      tooltip-effect='dark'
      @row-click="rowClick"
      style='width: 100%'
      :header-row-style="bgstyle">

      <el-table-column
        prop='name'
        label='项目名称'
        align="center"
        show-overflow-tooltip>
      </el-table-column>
    </el-table>

    <div class="block">
      <el-pagination
        layout="prev, pager, next"
        :total="allItem"
        :page-size=7
        align="center"
        :current-page.sync="currentPage"
        @current-change="handleCurrentChange"
        style="width:100%"
      >
      </el-pagination>
    </div>
  </div>

</template>

<script>
  import request from '@/api/workbench/materialRecord/materialManage.js'
  export default {
    created () {
      this.getInit()
    },
    data () {
      return {
        bgstyle: {
          'background': '#FAFAFA'
        },
        DepartmentUser: [],
        input: '',
        currentPage: 1,
        allItem: 0,
        itemId: '',
        itemName: ''
      }
    },
    methods: {
      // **********初始化************
      getInit () {
        request.getItemInfo({'input': this.input, 'currentPage': this.currentPage - 1}).then(value => {
          this.DepartmentUser = value.project
          this.allItem = Number(value.count)
        })
      },
      searchQuery () {
        this.currentPage === 1 ? this.handleCurrentChange() : this.currentPage = 1
      },
      handleCurrentChange () {
        this.getInit()
      },
      rowClick (row, event, column) {
        this.itemId = row.id
        this.itemName = row.name
        console.log(this.itemId, this.itemName)
        request.getItemId({itemId: this.itemId, itemName: this.itemName})
      }
    }
  }
</script>

<style scopde>
  .smallTable{width:420px; margin-left: 20px; border:1px solid #F3F3F4; background: #F3F3F4; border-radius: 8px;padding: 5px 10px 10px 10px;}
  .smallTable .searchInput{width: 100%;}
  .smallTable .searchInput .el-input{width:50%; float: right;height:25px;}
  .smallTable .searchInput .el-input__inner{height:30px;}
  .smallTable .el-table{margin-top: 35px;}

</style>
