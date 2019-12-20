<template>
  <div class="tp_powerstatistics">
    <!--<span @click="closePower" style="cursor: pointer;margin-left: 10px;margin-top: 10px;">安全帽低电量统计<i class="fa fa-angle-up"></i></span>-->
    <!--表格数据-->
    <el-table
      :data="tableData"
      stripe
      style="width: 100%;margin-top: 20px;">
      <el-table-column
        prop="no"
        label="安全帽编号"
        width="220">
      </el-table-column>
      <el-table-column
        prop="emp_name"
        label="持有者姓名"
        width="220">
      </el-table-column>
      <el-table-column
        prop="mobile"
        label="持有者手机号"
        width="220">
      </el-table-column>
      <el-table-column
        prop="power"
        label="剩余电量">
      </el-table-column>
    </el-table>
    <el-pagination
      layout="prev, pager, next"
      :total="allItem"
      :page-size=10
      :current-page.sync="currentPage"
      @current-change="handleCurrentChange"
      style="margin-left: 30%;margin-top: 20px"
    >
    </el-pagination>
  </div>
</template>
<script>
  import request from '@/api/workbench/personPosition/helmetDetections'
  export default {
    props: ['chooseFlag'],
    mounted () {
      console.log(this.chooseFlag)
      this.dataInit()
      this.ajaxGet()
    },
    data () {
      return {
        allItem: 40,
        currentPage: 1,
        tableData: []
      }
    },
    methods: {
      handleCurrentChange () {
        console.log(this.currentPage + '-----' + this.chooseFlag)
        this.ajaxGet()
      },
      ajaxGet () {
        request.getTables(this.currentPage, 10, this.chooseFlag).then(
          data => {
            console.log(data)
            if (this.currentPage === 1) {
              this.allItem = parseInt(data.data.count)
            }
            this.tableData = data.data.power_list
          }
        )
      },
      dataInit () {
        this.allItem = 0
        this.currentPage = 1
        this.tableData = []
      }
    }
  }
</script>
<style scoped>
  .tp_powerstatistics{
    width: 95%;
    height: auto;
    margin-top: -30px;
    margin-left: 2%;
    background-color: white;
  }
  .tp_powerstatistics span{
    color: #1C84C6;
  }
</style>
