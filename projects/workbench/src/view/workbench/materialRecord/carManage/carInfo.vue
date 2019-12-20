<template>
  <div class="jinm-carInfo">
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

    <el-table
      stripe
      highlight-current-row
      :data='DepartmentUser'
      ref='multipleTable'
      tooltip-effect='dark'
      @row-dblclick	="rowClick"
      style='width: 100%'
      :header-row-style="bgstyle"
      @selection-change='handleSelectionChange'>
      <el-table-column
        type='selection'
        width='55'>
      </el-table-column>

      <el-table-column
        prop='car_number'
        label='车牌号'
        align="center"
        show-overflow-tooltip>
      </el-table-column>

      <el-table-column
        prop='car_brand'
        label='车辆品牌'
        align="center"
        show-overflow-tooltip>
      </el-table-column>

      <el-table-column
        prop='car_model'
        label='车辆型号'
        align="center"
        show-overflow-tooltip>
      </el-table-column>

      <el-table-column
        prop='car_weight'
        label='车辆自重'
        align="center"
        show-overflow-tooltip>
      </el-table-column>

      <el-table-column
        prop='contact_name'
        label='长期管理员'
        align="center"
        show-overflow-tooltip>
      </el-table-column>

      <el-table-column
        prop='contact_phone'
        label='联系方式'
        align="center"
        show-overflow-tooltip>
      </el-table-column>

      <el-table-column
        prop='belong_to'
        label='所属公司'
        align="center"
        show-overflow-tooltip>
      </el-table-column>

      <el-table-column
        prop='memo'
        label='备注'
        align="center"
        show-overflow-tooltip>
      </el-table-column>
    </el-table>

    <el-button
      type="primary"
      size="small"
      plain
      icon="el-icon-delete"
      style="display:inline-block;margin-top:20px;margin-left:20px"
      @click="centerDialogVisible = true"
      :disabled="disableddelete"
    >批量删除</el-button>

    <el-button type="primary"
               size="small"
               plain  icon="el-icon-download"
               style="display:inline-block;margin-top:20px;margin-left:20px"
               @click="modifyData"
               :disabled="disabledchange"
    >修改</el-button>

    <div class="block">
      <el-pagination
        layout="prev, pager, next"
        :total="allItem"
        :page-size=10
         align="center"
        :current-page.sync="currentPage"
        @current-change="handleCurrentChange"
        style="display:inline-block;margin-left:100px;margin-top:20px;margin-right:30px"
      >
      </el-pagination>
    </div>

      <el-dialog
        title="提示"
        :visible.sync="centerDialogVisible"
        width="450px"
        center
        :modal-append-to-body= false
      >
        <span style="margin-left:120px;">确认删除所属车辆信息？</span>
        <span slot="footer" class="dialog-footer">
    <el-button @click="centerDialogVisible = false">取 消</el-button>
    <el-button type="primary"  @click="deleteItem">确 定</el-button>
  </span>
      </el-dialog>

      <el-dialog
        :visible.sync="dialogVisible"
        width="500px"
        :append-to-body="true">
        <modifyData @change="returnStatus" :modifyId="modifyId"></modifyData>

        <span slot="footer" class="dialog-footer">
        </span>
      </el-dialog>

      <el-dialog
        :visible.sync="infoDialog"
        width="500px"
        :append-to-body="true"
        title="车辆信息详情">
        <detailInfo :rowId="rowId"></detailInfo>

        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="infoDialog = false">确 定</el-button>
        </span>
      </el-dialog>

    </div>

</template>

<script>
  import modifyData from './modifyData.vue'
  import request from '@/api/workbench/materialRecord/carManage.js'
  import detailInfo from './detailInfo.vue'
  export default {
    created () {
      this.getTable()
    },
    components: { modifyData, detailInfo },
    data () {
      return {
        input: '',
        bgstyle: {
          'background': '#FAFAFA'
        },
        DepartmentUser: [],
        multipleSelection: [],
        currentPage: 1,
        allItem: 0,
        disabledchange: true,   // ********修改页面*********
        disableddelete: true, // *********删除页面********
        centerDialogVisible: false,
        dialogVisible: false,
        infoDialog: false,    // **************详情页面
        modifyId: '',
        rowId: ''
      }
    },
    methods: {
//      ***************************页面初始化*****************
      getTable () {
        request.getTable({'page_index': this.currentPage, 'search_key': this.input}).then(value => {
          this.DepartmentUser = value.car
          this.allItem = Number(value.count)
        })
      },
      // *********************搜索框***********
      searchQuery () {
        this.getTable()
      },
      // *********************点击行********************
      rowClick (row, event) {
        console.log(row.id)
        this.rowId = row.id
        this.infoDialog = true
      },
      // ***********************分页*********************
      handleCurrentChange () {
        this.getTable()
      },
      // *******************点击修改页面**********************
      modifyData () {
        console.log(this.multipleSelection[0].id)
        this.modifyId = this.multipleSelection[0].id
        this.dialogVisible = true
      },
      // *********************table的选择****************
      handleSelectionChange (val) {
        this.multipleSelection = val
        val.length === 1 ? this.disabledchange = false : this.disabledchange = true
        val.length > 0 ? this.disableddelete = false : this.disableddelete = true
      },
      // ****************删除的确定按钮******************
      deleteItem () {
        this.centerDialogVisible = false
        let arr = []
        for (let o of this.multipleSelection) {
          console.log(o)
          arr.push(o.id)
        }
        request.deleteItem(arr).then(value => {
          this.getTable()
        })
      },
      // ******************修改按钮的取消按钮******************
      returnStatus () {
        this.dialogVisible = false
        this.getTable()
      }
    }
  }
</script>

<style scoped>
  .block{width:60%; display:inline-block;padding-left: 10%;}
  .el-input{
    float: right;
    width: 250px;
    margin-bottom: 5px;
    position: absolute;
    right:68px;
    top:87px;
  }
</style>
