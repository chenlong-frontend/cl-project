<template>
  <ibox title="车辆进出记录">
    <div class="chooseItem">
      <el-input placeholder="请选择项目" @click.native="itemVisible=true" v-model="itemName"></el-input>
    </div>

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
      style='width: 100%'
      :header-row-style="bgstyle">

      <el-table-column
        prop='id'
        label='流水ID'
        align="center"
        show-overflow-tooltip>
      </el-table-column>

      <el-table-column
        prop='car_number'
        label='车牌'
        align="center"
        show-overflow-tooltip>
      </el-table-column>

      <el-table-column
        prop='current_time'
        label='时间'
        align="center"
        show-overflow-tooltip>
      </el-table-column>

      <el-table-column
        prop='direction'
        label='方向'
        align="center"
        show-overflow-tooltip>
      </el-table-column>

      <el-table-column
        prop='weight'
        label='重量'
        align="center"
        show-overflow-tooltip>
      </el-table-column>
    </el-table>


    <div class="block">
      <el-pagination
        layout="prev, pager, next"
        :total="allItem"
        :page-size=10
        align="center"
        :current-page.sync="currentPage"
        @current-change="handleCurrentChange"
        style="width:100%"
      >
      </el-pagination>
    </div>

    <el-dialog
      :visible.sync="itemVisible"
      width="500px"
      :append-to-body="true">
      <chooseItem></chooseItem>
      <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="confirm1">确 定</el-button>
            </span>
    </el-dialog>

  </ibox>

</template>

<script>
  import ibox from '@/components/style/ibox.vue'
  import chooseItem from './materialManage/chooseItem.vue'
  import item from '@/api/workbench/materialRecord/materialManage.js'
  import request from '@/api/workbench/materialRecord/carRecord.js'
  export default {
    components: { ibox, chooseItem },
    created () {
      this.getTable()
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
        itemVisible: false,  // *********项目弹出框********
        itemName: '',
        itemId: ''
      }
    },
    methods: {
      getTable () {
        request.getTable({'itemId': this.itemId, 'input': this.input, 'currentPage': this.currentPage - 1}).then(value => {
          this.DepartmentUser = value.car
          this.allItem = Number(value.count)
        })
      },
      // ******************搜索框***************
      searchQuery () {
        this.currentPage === 1 ? this.handleCurrentChange() : this.currentPage = 1
      },
      // ******************分页******************
      handleCurrentChange () {
        this.getTable()
      },
      // ****************选择项目的确定按钮****************
      confirm1 () {
        this.itemVisible = false
        item.sendItemId().then(value => {
          console.log(value)
          this.itemId = value.itemId
          this.itemName = value.itemName
          this.currentPage === 1 ? this.handleCurrentChange() : this.currentPage = 1
        })
      }
    }
  }
</script>

<style scoped>
  .chooseItem, .searchInput{display: inline-block}
  .chooseItem{width: 73%;}
  .chooseItem .el-input{width:30%;}
  .searchInput{width:26%;}
  .el-table{margin-top:20px;}

</style>
