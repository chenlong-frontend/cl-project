<template>
  <div class="jinm-carRecord">
    <ibox title="物料信息管理">
      <div class="chooseItem">
        <el-input placeholder="请选择项目" @click.native="itemVisible=true" v-model="itemName"></el-input>
      </div>

      <div class="selectBox">
        <el-select v-model="value" placeholder="请选择" @change="select">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>

      <div class="block">
        <el-date-picker
          v-model="time"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="yyyy-MM-dd HH:mm:ss"
          @change="chooseTime">
        </el-date-picker>
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

      <div class="tableBox">
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
          prop='car_number'
          label='车牌号'
          align="center"
          show-overflow-tooltip>
        </el-table-column>

        <el-table-column
          prop='material_num'
          label='物料编号'
          align="center"
          show-overflow-tooltip>
        </el-table-column>

        <el-table-column
          prop='material_name'
          label='物料种类'
          align="center"
          show-overflow-tooltip>
        </el-table-column>

        <el-table-column
          prop='target_weight'
          label='应收重量'
          align="center"
          show-overflow-tooltip>
        </el-table-column>

        <el-table-column
          prop='actual_weight'
          label='实收重量'
          align="center"
          show-overflow-tooltip>
        </el-table-column>

        <el-table-column
          prop='action'
          label='任务种类'
          align="center"
          show-overflow-tooltip>
        </el-table-column>

        <el-table-column
          prop='time'
          label='进出场时间'
          align="center"
          show-overflow-tooltip>
        </el-table-column>

        <el-table-column
          prop='contact_name'
          label='进出场操作员'
          align="center"
          show-overflow-tooltip>
        </el-table-column>


      </el-table>
      </div>

      <div class="block1">
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

      <!--弹出框-->
      <el-dialog
        :visible.sync="dialogVisible"
        width="1000px"
        :append-to-body="true"
        title="物料信息管理详情">
        <materialForm :rowId="rowId"></materialForm>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="confirm">确 定</el-button>
            </span>
      </el-dialog>

      <el-dialog
        :visible.sync="itemVisible"
        width="520px"
        :append-to-body="true">
        <chooseItem></chooseItem>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="confirm1">确 定</el-button>
            </span>
      </el-dialog>


    </ibox>
  </div>
</template>

<script>
  import ibox from '@/components/style/ibox.vue'
  import request from '@/api/workbench/materialRecord/materialManage.js'
  import materialForm from './materialManage/materialForm.vue'
  import chooseItem from './materialManage/chooseItem.vue'
  export default {
    created () {
      request.selectBox().then(value => {
        this.options = value
      })
      this.getTable()
    },
    components: {ibox, materialForm, chooseItem},
    data () {
      return {
        bgstyle: {
          'background': '#FAFAFA'
        },
        value: '',
        options: [],
        time: '',
        input: '',
        DepartmentUser: [],
        allItem: 50,
        currentPage: 1,
        dialogVisible: false,          // 弹出框可视化
        itemVisible: false,
        rowId: '',
        itemId: '', // *********项目Id***********
        itemName: ''
//        start_time: '',
//        end_time: ''
      }
    },
    methods: {
      getTable () {
        request.getTable({'itemId': this.itemId, 'action': this.value, 'input': this.input, 'start_time': this.time[0], 'end_time': this.time[1], 'currentPage': this.currentPage - 1}).then(value => {
          this.DepartmentUser = value.material
          this.allItem = Number(value.count)
        })
      },
      // ***********搜索框******************
      searchQuery () {
        this.currentPage === 1 ? this.handleCurrentChange() : this.currentPage = 1
      },
      // ***********选择进出场**************
      select () {
        this.getTable()
      },
      // **************分页**********************
      handleCurrentChange () {
        this.getTable()
      },
      // ****************当某一行被点击的时候**********
      rowClick (row, event, column) {
        this.rowId = row.id
        this.dialogVisible = true
      },
      // *****************时间选择器*******************
      chooseTime () {
        this.getTable()
        console.log(this.time[0], this.time[1])
        this.start_time = this.time[0]
        this.end_time = this.time[1]
      },
      // ********回调得到项目id**************
      callback (val) {
        this.itemId = val
        console.log(val)
      },
      // *************确认按钮************
      confirm () {
        this.dialogVisible = false
      },
      // ****************选择项目的确定按钮****************
      confirm1 () {
        this.itemVisible = false
        request.sendItemId().then(value => {
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
  .chooseItem,.searchInput, .selectBox, .block{display: inline-block}
  .chooseItem{width: 17%;}
  .chooseItem .el-input{width:90%;}
  .searchInput .el-input{width:100%;}
  .selectBox{width:18%;}
  .selectBox .el-select{width:92%;}
  .searchInput{width:23%;}
  .tableBox{margin-top: 30px;}
</style>
