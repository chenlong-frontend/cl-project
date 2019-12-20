<template>
  <div>
    <!--搜索框-->
    <el-input
      v-model="input"
      placeholder="请输入搜索内容"
      style="float:right;width:300px;margin-top:-15px;margin-bottom: 5px;"
      @keyup.enter.native="searchQuery">
      <el-button
        slot="append"
        icon="el-icon-search"
        @click="searchQuery"
      ></el-button>
    </el-input>
    <!--表格数据-->
    <el-table
      v-loading="loading"
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
        prop='no'
        label='安全帽编号'
        width='250'>
      </el-table-column>
      <el-table-column
        prop='emp_name'
        label='持有者姓名'
        width='250'>
      </el-table-column>
      <el-table-column
        prop='create_time'
        label='所持时长'
        show-overflow-tooltip>
      </el-table-column>
    </el-table>

    <el-button type="primary"
               size="small"
               plain icon="el-icon-delete"
               style="float:left;margin-top:20px;margin-left:20px"
               @click="centerDialogVisible = true"
               :disabled="disableddelete"
    >删除</el-button>
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
  import request from '@/api/workbench/personPosition/entryInfo'
  import { mapGetters, mapMutations } from 'vuex'
  export default {
    name: 'helmetTable',
    mounted () {
      this.getDataFirst()
    },
    data () {
      return {
        DepartmentUser: [],
        form: {index: '', input: '', multipleSelection: []},
        // 下面的input用于v-model和监听，无法监听from里面的input
        input: '',
        inputtemp: '',
        currentPage: 1,
        centerDialogVisible: false,
        allItem: 100,
        loading: false,
        disableddelete: true,
        bgstyle: {
          'background': '#FAFAFA'
        }
      }
    },
    computed: {
      ...mapGetters('area', ['getHekmetFlag'])
    },
    methods: {
      ...mapMutations('area', ['changeAddHelmetFlag']),
      getDataFirst () {
        this.datainit()
        this.ajaxGet()
      },
      ajaxGet () {
        // 初始化数据
        request.getHelmetTables(this.currentPage, 10, this.form.input).then(
          data => {
            this.loading = false
            console.log(data)
            if (this.currentPage === 1) {
              this.allItem = parseInt(data.data.count)
            }
            this.DepartmentUser = data.data.helment_list
          },
          error => {
            this.error = error.toString()
          }
        )
      },
      clearselection () {
        this.$refs.multipleTable.clearSelection()
      },
      handleSelectionChange (val) {
        // 经测试val在翻页后会自动清空
        this.form.multipleSelection = []
        for (var k = 0, length = val.length; k < length; k++) {
          this.form.multipleSelection[k] = val[k].id
        }
        console.log(this.form.multipleSelection)
        this.disableddelete = (!(val.length > 0))
      },
      searchQuery () {
        this.form.input = this.inputtemp
        this.currentPage = 1
        if (this.inputtemp !== '') {
          // 实际查询
          this.ajaxGet()
          console.log('搜索加载')
        } else {
          this.$message('请输入查询的值')
        }
      },
      deleteItem () {
        this.centerDialogVisible = false
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
        // this.$message('模拟向后台请求该页数的页面')
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
      },
      getHekmetFlag: function (msg) {
        console.log('检测到安全帽添加：' + msg)
        this.getDataFirst()
        this.changeAddHelmetFlag('0')
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
    z-index: 10;
    right:58px;
    top:105px;
  }
</style>

