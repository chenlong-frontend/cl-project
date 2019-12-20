<template>
  <div class="policeList">
    <el-input placeholder="请输入内容" v-model="input"  size="small" >
      <el-button slot="append" icon="el-icon-search" type="primary" size="small" class="seo" @click="seo">搜索</el-button>
    </el-input>
    <div class="table">
      <el-table
        :data="tableData"
        border
        stripe
        style="width:100%;"
        @row-click="hidden">
        <el-table-column
          prop="warnDate"
          label="日期"
          align="center">
        </el-table-column>
        <el-table-column
          prop="warnTime"
          label="报警时间"
          align="center">
        </el-table-column>
        <el-table-column
          prop="towerName"
          label="塔吊名称"
          align="center">
        </el-table-column>
        <el-table-column
          prop="operator"
          label="操作人"
          align="center">
        </el-table-column>
        <el-table-column
          prop="operatorPhone"
          label="操作人联系方式"
          align="center">
        </el-table-column>
        <el-table-column
          prop="responsibleInfo"
          label="塔吊负责人"
          align="center">
        </el-table-column>
      </el-table>
    </div>
    <!-- 分页 -->
    <div class="block">
      <el-pagination
        layout="prev, pager, next"
        :page-size=10
        :current-page.sync = 'currentPage'
        @current-change ='handleCurrentChange'
        :total="allItem">
      </el-pagination>
    </div>
  </div>
</template>
<script>
  import request from '@/api/workbench/tower/police/policeList.js'
  export default {
    name: 'policeList',
    props: ['show'],
    data () {
      return {
        input: '',
        inputtemp: '',
        currentPage: 1,
        allItem: 38,
        tableData: [
          {id: '', warnDate: '', warnTime: '', towerName: '', operator: '', operatorPhone: '', responsibleInfo: ''}
        ]
      }
    },
    created () {

    },
    mounted () {
      this.getCurrentPage(1, '')
    },
    methods: {
      getCurrentPage (page, input) {
        request.getCurrentPage(page, input).then(
          data => {
            if (data.data.code === 0) {
              this.tableData = data.data.data.tableData
              if (page === 1) {
                this.allItem = parseInt(data.data.data.allItem)
              }
            } else this.$message.error('获取失败')
          },
          error => {
            this.$message.error('获取失败')
            console.log(error)
          }
        )
      },
      hidden (row, event) {
        this.$emit('toParent', row.id)
      },
      seo () {
        if (this.input !== '') {
          this.back2one()
        } else {
          this.$message('请输入查询的值')
        }
      },
      handleCurrentChange (index) {
        this.getCurrentPage(this.currentPage, this.input)
      },
      back2one () {
        if (this.currentPage === 1) {
          this.getCurrentPage(this.currentPage, this.input)
        } else {
          this.currentPage = 1
        }
      }
    },
    watch: {
      input: function (msg) {
        if (msg !== '') {
          console.log('搜索框数据变化中' + msg)
        } else {
          this.back2one()
        }
      }
    }
  }
</script>
<style scoped>
  .policeList{
    padding: 10px;
    box-sizing: border-box;
    /* border:1px solid; */
    margin-top: -20px;
  }
  .el-input{
    width: 250px;
    margin-left: 76%;
  }
  .el-input-group__append button.el-button, .el-input-group__append div.el-select .el-input__inner, .el-input-group__append div.el-select:hover .el-input__inner, .el-input-group__prepend button.el-button, .el-input-group__prepend div.el-select .el-input__inner, .el-input-group__prepend div.el-select:hover .el-input__inner{
    background-color: #D1ECFF;
    color:#969FF0;
  }
  .table{
    margin-top: 10px;
    /* border: 1px solid; */
    padding:10px;
    text-align: center;
    background-color: #F3F3F4;
  }
  .block{
    width:20%;
    margin: 10px auto -20px;
  }
</style>


