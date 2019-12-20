<template>
  <div>
    <!--<el-button @click="changefather">测试更改父组件的值</el-button>-->
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
      v-loading="loading"
      stripe
      highlight-current-row
      @row-dblclick="changefathereasy"
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
        prop='emp_name'
        label='姓名'
        width='80'
        show-overflow-tooltip>
        <!--<template slot-scope='scope'>{{ scope.row.date }}</template>-->
      </el-table-column>
      <el-table-column
        prop='emp_sex'
        label='性别'
        width='50'
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop='age'
        label='年龄'
        width='50'
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop='pro_id'
        label='员工工号'
        width='120'
        show-overflow-tooltip>
      </el-table-column>
      <!--<el-table-column-->
        <!--prop='dep_name'-->
        <!--label='项目部门'-->
        <!--width='100'-->
        <!--show-overflow-tooltip>-->
      <!--</el-table-column>-->
      <!--<el-table-column-->
        <!--prop='emp_post'-->
        <!--label='项目职务'-->
        <!--width='100'-->
        <!--show-overflow-tooltip>-->
      <!--</el-table-column>-->
      <!--<el-table-column-->
        <!--prop='emp_role'-->
        <!--label='工种'-->
        <!--width='100'-->
        <!--show-overflow-tooltip>-->
      <!--</el-table-column>-->
      <el-table-column
        prop='emp_mobile'
        label='手机'
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop='emp_phone'
        label='固定电话'
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop='emp_email'
        label='邮箱'
        show-overflow-tooltip>
      </el-table-column>
    </el-table>
    <!--<div style='margin-top: 20px'>-->
    <!--<el-button @click='toggleSelection([DepartmentUser[1], DepartmentUser[2]])'>切换第二、第三行的选中状态</el-button>-->
    <!--<el-button @click='toggleSelection()'>取消选择</el-button>-->
    <!--</div>-->
    <el-button type="primary"
               size="small"
               plain icon="el-icon-delete"
               style="float:left;margin-top:20px;margin-left:20px"
               @click="centerDialogVisible = true"
               :disabled="disableddelete"
    >批量删除</el-button>
    <el-button type="primary"
               size="small"
               plain  icon="el-icon-edit"
               style="float:left;margin-top:20px;margin-left:20px"
               @click="changefather"
               :disabled="disabledchange"
    >修改</el-button>
    <el-button type="primary"
               size="small"
               plain  icon="el-icon-download"
               style="float:left;margin-top:20px;margin-left:20px"
               @click="downloadMultiple"
    >批量导出</el-button>
    <el-pagination
      layout="prev, pager, next"
      :total="allItem"
      :page-size=10
      :current-page.sync="currentPage"
      @current-change="handleCurrentChange"
      style="float:left;margin-left:100px;margin-top:20px"
    >
    </el-pagination>

    <el-dialog
      title="提示"
      :visible.sync="centerDialogVisible"
      width="30%"
      center
      :modal-append-to-body= false
    >
      <span style="margin-left:120px;">确认删除这些人员信息吗？</span>
      <span slot="footer" class="dialog-footer">
    <el-button @click="centerDialogVisible = false">取 消</el-button>
    <el-button type="primary"  @click="deleteItem">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
  import {mapMutations} from 'vuex'
  import request from '@/api/workbench/staff/department/userTable.js'
  export default {
    mounted () {
      console.log('cookie here')
      console.log(document.cookie)
      console.log(this.loading)
      this.getDataFirst()
//      this.loading = false
      console.log('created初始加载')
      console.log(this.loading)
    },
    name: 'UserTable',
    data () {
      return {
        DepartmentUser: [],
        form: {index: '', input: '', multipleSelection: []},
        // 下面的input用于v-moel和监听，无法监听from里面的input
        input: '',
        inputtemp: '',
        currentPage: 1,
        centerDialogVisible: false,
        allItem: 100,
        loading: false,
        disableddelete: true,
        disabledchange: true,
        bgstyle: {
          'background': '#FAFAFA'
        }
      }
    },
    methods: {
      getDataFirst () {
        this.changeUpdate(false)
        this.datainit()
        this.ajaxGet()
      },
      ajaxGet () {
        request.getTable(this.form.input, this.currentPage, 10).then(
          data => {
            this.loading = false
            if (this.currentPage === 1) {
              this.allItem = parseInt(data.data.data.num)
            }
            this.DepartmentUser = data.data.data.emp_list
            console.log('loading')
            console.log(this.loading)
          },
          error => {
            this.error = error.toString()
          }
        )
      },
      ...mapMutations('department', ['changeUserTableId', 'changeUpdate']),
      changefathereasy: function (val) {
        if (/管理员/.test(val.emp_name)) {
          this.$message.warning('禁止操作管理员')
        } else {
          this.changeUserTableId(val.Id)
          this.$emit('changecontent')
        }
      },
      changefather: function () {
        this.changeUserTableId(this.form.multipleSelection[0])
        this.$emit('changecontent')
      },
      downloadMultiple () {
        if (this.form.multipleSelection.length === 0) {
          // 导出所有人员数据
          this.downloadMultipleUtil()
        } else {
          // 向后台发送this.form.multipleSelection,返回选中的数据的文件
          this.downloadMultipleUtil()
        }
      },
      downloadMultipleUtil () {
        // 根据multipleSelection是否为空去判断，为空则下载全部人员信息，不为空则下载选中的部分信息
        request.download(this.form.multipleSelection).then(
          data => {
            console.log('打印数据' + data)
            console.log(data.data.data.download_url)
            window.open(data.data.data.download_url)
          },
          error => {
            console.log(error.toString())
          }
        )
      },
      clearselection () {
        this.$refs.multipleTable.clearSelection()
      },
//      getDate (callback) {
//        callback(this.DepartmentUser)
//      },
//      toggleSelection (rows) {
//        if (rows) {
//          rows.forEach(row => {
//            this.$refs.multipleTable.toggleRowSelection(row)
//          })
//        } else {
//          this.$refs.multipleTable.clearSelection()
//        }
//      },
      handleSelectionChange (val) {
        // 经测试val在翻页后会自动清空
        this.form.multipleSelection = []
        for (var k = 0, length = val.length; k < length; k++) {
          if (!/管理员/.test(val[k].emp_name)) {
            this.form.multipleSelection[k] = val[k].Id
          } else {
            this.$message.warning('禁止操作管理员')
            this.clearselection()
            return
          }
        }
        this.disabledchange = (!(val.length === 1))
        this.disableddelete = (!(val.length > 0))
      },
      searchQuery () {
        this.form.input = this.inputtemp
        if (this.inputtemp !== '') {
          // 实际查询
          this.currentPage = 1
          this.getDataFirst()
          console.log('搜索加载')
        } else {
          this.$message('请输入查询的值')
        }
      },
      deleteItem () {
        this.centerDialogVisible = false
        // 实际从后台删除数据并重新加载
        request.deleteItem(this.form.multipleSelection).then(
          data => {
            console.log(data)
            if (data.data.code === 0) {
              // 实际从后台请求回的数据
              this.getDataFirst()
            } else {
              alert('删除失败')
            }
          }, error => {
          this.loading = false
          this.error = error.toString()
        }
        )
      },
      handleCurrentChange (index) {
//        this.$message('模拟向后台请求该页数的页面')
        this.form.index = index
        console.log(this.form.input)
        // 实际 发送this.form.index 还需要返回this.form.input 去观察是否是查询经过页面的换页，重设departmentUser
        this.ajaxGet()
        console.log('页面改变的加载')
      },
      datainit () {
        this.DepartmentUser = []
        this.form = {index: '', input: '', multipleSelection: []}
        // 下面的input用于v-moel和监听，无法监听from里面的input
        this.input = ''
        this.inputtemp = ''
        this.currentPage = 1
        this.centerDialogVisible = false
        this.allItem = 100
        this.loading = false
        this.disableddelete = true
        this.disabledchange = true
        this.clearselection()
      }
    },
    watch: {
      input: function (msg) {
        this.inputtemp = msg
        if (msg !== '') {
          console.log('搜索框数据变化中' + msg)
        } else {
          this.form.input = msg
          this.currentPage = 1
          // 当搜索框变为空时，自动返回第一页面
          this.getDataFirst()
          console.log('输入为空的自动加载')
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
    right:58px;
    top:105px;
  }
</style>

