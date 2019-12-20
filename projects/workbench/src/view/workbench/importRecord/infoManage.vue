<template>
  <div class="runBox">
    <ibox title="塔吊地磅管理" style="overflow: hidden">
      <el-button type="primary"
                 size="small"
                 plain icon="el-icon-delete"
                 style="float:left;margin-top:-10px;margin-bottom:5px;margin-left: 80px"
                 @click="deleteDialogVisible = true"
                 :disabled="disableddelete"
      >删除</el-button>
      <el-button type="primary"
                 size="small"
                 plain  icon="el-icon-edit"
                 style="float:left;margin-top:-10px;margin-bottom:5px;margin-left: 20px"
                 @click="editInfo('0')"
      >新增</el-button>
      <el-input
        v-model="input"
        placeholder="请输入搜索内容"
        style="float:right;width:300px;margin-top:-10px;margin-bottom: 5px;"
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
        ref='multipleTable'
        :data='DepartmentUser'
        tooltip-effect='dark'
        style='width: 100%'
        :header-row-style="bgstyle"
        @selection-change='handleSelectionChange'>
        <!--:header-row-style="bgstyle"-->
        <el-table-column
          type='selection'
          width='55'>
        </el-table-column>
        <el-table-column
          prop='loado_name'
          label='设备名称'
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop='loado_num'
          label='编号'
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop='loado_position'
          label='设备位置'
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop='loado_function'
          align="center"
          label='设备功能'
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop='loado_model'
          align="center"
          label='设备型号'
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop='loado_ip'
          align="center"
          label='IP地址'
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop='loado_port'
          align="center"
          label='设备端口'
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop='loado_linkman'
          align="center"
          label='负责人'
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <el-button @click="editInfo(scope.row.loadometer_id)" type="text" size="small">修改地磅信息</el-button>
          </template>
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
          style="display:inline-block;width:100%;"
        >
        </el-pagination>
      </div>

      <el-dialog
        title="提示"
        :visible.sync="deleteDialogVisible"
        width="30%"
        center
        :modal-append-to-body= false
      >
        <span style="margin-left:120px;">确认删除这些地磅信息吗？</span>
        <span slot="footer" class="dialog-footer">
    <el-button @click="deleteDialogVisible = false">取 消</el-button>
    <el-button type="primary"  @click="deleteItem">确 定</el-button>
  </span>
      </el-dialog>

      <el-dialog title="修改地磅基本信息"
                 :visible.sync="addDialogVisible"
                 :append-to-body= "true"
                 width="1300px">
        <wagonBalance :clickId="clickId" @change="returnStatus"></wagonBalance>
      </el-dialog>

    </ibox>
  </div>
</template>
<script>
  import ibox from '@/components/style/ibox.vue'
  import wagonBalance from '@/view/workbench/importRecord/infoManage/wagonBalance.vue'
  import request from '@/api/workbench/importRecord/infoManage.js'
  export default {
    created () {
      this.getTable()
    },
    components: {ibox, wagonBalance},
    name: '',
    data () {
      return {
        bgstyle: {
          'background': '#FAFAFA'
        },
        DepartmentUser: [],
        allItem: 0,
        input: '',
        currentPage: 1,
        deleteDialogVisible: false,
        addDialogVisible: false,
        multipleSelection: [],
        disableddelete: true,
        clickId: '0'
      }
    },
    methods: {
      getTable () {
        request.getTable({'page_index': this.currentPage, 'search_key': this.input}).then(value => {
          this.DepartmentUser = value.loadometer
          this.allItem = Number(value.count)
        })
      },
      // ******************搜索功能*****************
      searchQuery () {
        this.currentPage === 1 ? this.handleCurrentChange() : this.currentPage = 1
      },
      // ***************table所选行******************
      handleSelectionChange (val) {
        console.log(val)
        this.multipleSelection = val
        val.length > 0 ? this.disableddelete = false : this.disableddelete = true
      },
      // ****************分页**********************
      handleCurrentChange () {
        this.getTable()
      },
      // *****************删除********************
      deleteItem () {
        this.deleteDialogVisible = false
        let arr = []
        for (let o of this.multipleSelection) {
          console.log(o)
          arr.push(o.loadometer_id)
        }
        request.deleteItem(arr).then(value => {
          this.getTable()
        })
      },
      // *******************新增地磅信息***************
      editInfo (val) {
        console.log(val)
        this.addDialogVisible = true
        this.clickId = val
      },
      // ***************************提交按钮*************
      returnStatus () {
        this.addDialogVisible = false
        this.getTable()
      }
    }
  }
</script>
<style scoped>
  .block{width: 100%;}
  ::-webkit-scrollbar {
    width: 6px;
  }/* 滚动条整体宽度 */
  ::-webkit-scrollbar-track{
    background-color: #F3F3F4;
  }/* 滚动条的滑轨背景颜色 */
  ::-webkit-scrollbar-thumb{
    background-color: #DAE4E5;
    border-radius: 3px;
  }/* 滚动条的滑块背景颜色 */
  ::-webkit-scrollbar-corner {
    background-color: #B0AFB0;
  } /* 横向滚动条和纵向滚动条相交处尖角的颜色 */
</style>
