<template>
  <div>
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
      ref='multipleTable'
      :data='DepartmentUser'
      tooltip-effect='dark'
      style='width: 100%'
      :header-row-style="bgstyle"
      @selection-change='handleSelectionChange'>
      <el-table-column
        type='selection'
        width='55'>
      </el-table-column>

      <el-table-column
        prop='num'
        label='项目编号'
        width='100'
        show-overflow-tooltip>
        <!--<template slot-scope='scope'>{{ scope.row.date }}</template>-->
      </el-table-column>
      <el-table-column
        prop='name'
        label='项目名称'
        width='90'
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop='project_area'
        label='项目区域'
        width='160'
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop='state'
        label='项目状态'
        width='90'
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop='acreage'
        label='建筑总面积'
        width='100'
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop='price'
        label='总造价'
        width='100'
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop='architecture'
        label='建设单位'
        width='100'
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop='manage_name'
        label='项目经理'
        width="100"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop='supervise_name'
        label='项目管理员'
        width='100'
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop='start_time'
        label='开工日期'
        width="110"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop='end_time'
        label='竣工日期'
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
               @click="changefather"
               :disabled="disabledchange"
    >修改</el-button>
    <el-button
       type="primary"
       size="small"
       plain icon="el-icon-download"
       style="display:inline-block;margin-top: 20px;margin-left:20px"
       @click="downloadMultiple"
    >批量导出</el-button>

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
      width="30%"
      center
      :modal-append-to-body= false
    >
      <span style="margin-left:120px;">确认删除这些项目信息吗？</span>
      <span slot="footer" class="dialog-footer">
    <el-button @click="centerDialogVisible = false">取 消</el-button>
    <el-button type="primary"  @click="deleteItem">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
  import {mapMutations} from 'vuex'
  import admintable from '@/api/workbench/item/management/adminTable.js'
  export default {
    created () {
      // admintable.getTable({query: '', page: this.currentPage - 1, pageSize: 10}).then(value => {
      //   this.DepartmentUser = value.project
      //   this.allItem = value.count * 10
      // })
      this.getInit()
    },
    name: 'adminTable',
    data () {
      return {
        DepartmentUser: [],
        form: {index: '', input: '', multipleSelection: []},
        // 下面的input用于v-moel和监听，无法监听from里面的input
        input: '',
        inputtemp: '',
        currentPage: 1,
        centerDialogVisible: false,
        allItem: 300,
        loading: true,
        disableddelete: true,
        disabledchange: true,
        bgstyle: {
          'background': '#FAFAFA'
        }
      }
    },
    methods: {
      ...mapMutations('item', ['changeItemId']),
      //  **************修改数据
      changefather: function () {
        let modifyData = this.form.multipleSelection
        console.log(modifyData)
        admintable.modify(modifyData).then(value => {
          this.DepartmentUser = value
        })
        this.changeItemId(this.form.multipleSelection[0].Id)
        this.$emit('changecontent')
      },
      downloadMultiple () {
//        if (this.form.multipleSelection.length === 0) {
//          // todo 导出所有人员数据
//          this.$message('从后台导出所有数据')
//        } else {
//          this.$message('从后台导出选中的数据')
//          // todo 向后台发送this.form.multipleSelection,返回选中的数据的文件
//        }
      },
      getDate (callback) {
        callback(this.DepartmentUser)
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
      handleSelectionChange (val) {
        this.form.multipleSelection = val
        if (val.length === 1) {
          this.disabledchange = false
        } else {
          this.disabledchange = true
        }
        if (val.length > 0) {
          this.disableddelete = false
        } else {
          this.disableddelete = true
        }
        // console.log(this.form.multipleSelection)
      },
      //  输入框搜索数据
      searchQuery () {
        let inputValue = this.input.trim()
        admintable.searchInput(inputValue).then(value => {
          this.DepartmentUser = value.project
          this.allItem = value.count * 10
        })
        this.form.input = this.inputtemp
        this.currentPage = 1
      },
      //  ****************批量删除数据
      deleteItem () {
        this.centerDialogVisible = false
        var deleteData = this.form.multipleSelection
        let deleteList = []
        for (let key in deleteData) {
          deleteList.push(deleteData[key].id)
        }
        var deleteInfo = {id: deleteList}
        console.log(deleteInfo)
        admintable.deleteAll(deleteInfo).then(value => {
          // this.DepartmentUser = deleteData
          admintable.getTable({query: '', page: this.currentPage - 1, pageSize: 10}).then((value) => {
            this.DepartmentUser = value.project
            this.allItem = value.count * 10
          })
        })
      },
      // *********************分页***********************//
      handleCurrentChange (val) {
        console.log(val)
        admintable.getPage(val).then(value => {
          // this.DepartmentUser = value
          // admintable.getTable({query: '', page: val - 1, pageSize: 10}).then((value) => {
          this.DepartmentUser = value.project
          this.allItem = value.count * 10
          // })
        })
      },
      getInit () {
        admintable.getTable({query: '', page: this.currentPage - 1, pageSize: 10}).then(value => {
          console.log(value)
          this.DepartmentUser = value.project
          this.allItem = value.count * 10
        })
      }
    },
    watch: {
      input: function (msg) {
        this.inputtemp = msg
        if (msg !== '') {
          console.log('数据变化中' + msg)
        } else {
          this.form.input = msg
          this.currentPage = 1
          // 重新从后台请求请求第一个页面的数据
          // this.getDataFirst()
        }
      }
    }
  }
</script>

<style scoped>
  /*#department {float: left;width:30%}*/
  #user {float:left;width:100%}
  .el-table td, .el-table th.is-leaf{background:#FAFAFA}
  /*#queryArea {position:absolute;left:500px;top:0px }*/
  .el-input{
    float: right;
    width: 250px;
    margin-bottom: 5px;
    position: absolute;
    z-index: 99999;
    right:68px;
    top:95px;
  }
  .block{width:400px; display:inline-block}
</style>
