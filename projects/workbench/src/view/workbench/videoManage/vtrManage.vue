<template>
  <div class="tp_vtr_manage">
    <ibox title="录像机管理">
      <!--搜索框-->
      <el-input
        placeholder="请输入搜索内容"
        size="small"
        v-model="searchInput"
        style="float:right;width:300px;"
        @keyup.enter.native="searchQuery"
      >
        <el-button
          slot="append"
          icon="el-icon-search"
          @click="searchQuery"
        >搜索</el-button>
      </el-input>
      <!--表格数据-->
      <el-table
        :data="tableData"
        stripe
        highlight-current-row
        ref="multipleTable"
        style="width: 100%;margin-top: 10px;"
        :header-row-style="bgstyle"
        v-loading="loading"
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          stripe
          width="55">
        </el-table-column>
        <el-table-column
          prop="video_name"
          label="名称"
          width="200">
        </el-table-column>
        <el-table-column
          prop="unit_type"
          label="型号"
          width="200">
        </el-table-column>
        <el-table-column
          prop="ip"
          label="IP地址"
          width="200">
        </el-table-column>
        <el-table-column
          prop="time"
          label="接入时间"
          width="200">
        </el-table-column>
        <el-table-column>
          <template slot-scope="scope">
            <span style="width:15px;" @click="editRow(scope.row)">
              <img style="width:15px;" src="../../../assets/img/vr/vr-edit.png" >
            </span>
          </template>
        </el-table-column>
      </el-table>
      <!--删除/新增-->
      <div class="btn-group">
        <el-button
          type="primary"
          size="small"
          icon="el-icon-error"
          plain
          style="margin-left: 20px;margin-top: 20px;"
          :disabled="flag.disableddelete"
          @click="deleteIcon">删除</el-button>
        <el-button
          type="primary"
          size="small"
          icon="el-icon-circle-plus"
          style="margin-left: 20px;"
          plain
          @click="flag.addDialog = true"
        >新增</el-button>
      </div>
      <!--分页-->
      <el-pagination
        layout="prev, pager, next"
        :total="allItem"
        :page-size=10
        :current-page.sync="currentPage"
        @current-change="handleCurrentChange"
        style="float:left;margin-left:350px;margin-top:-30px"
      >
      </el-pagination>
      <!--删除弹框-->
      <el-dialog
        title="删除提示"
        width="30%"
        :visible.sync="flag.delteDialog"
        center
        :modal-append-to-body= false
      >
        <span style="margin-left:120px;">确认删除这些录像机？</span>
        <span slot="footer" class="dialog-footer">
        <el-button @click="flag.delteDialog = false">取 消</el-button>
        <el-button type="primary" @click="saveDel">确 定</el-button> <!-- @click="deleteItem"-->
      </span>
      </el-dialog>
      <!--新增弹框-->
      <el-dialog
        title="新增录像机"
        :visible.sync="flag.addDialog"
        width="32%"
        :modal-append-to-body= false
        center
        custom-class="dialogCss"
      >
        <el-form
          ref="addform"
          :model="addform"
          label-width="120px"
          size="small"
          :rules="rules"
        >
          <el-form-item label="用户名："  prop="username">
            <el-input v-model="addform.username" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="用户密码："  prop="password">
            <el-input v-model="addform.password" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="录像机名称："  prop="name">
            <el-input v-model="addform.name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="录像机型号："  prop="unit_type">
            <el-input v-model="addform.unit_type" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="录像机端口："  prop="port">
            <el-input v-model="addform.port" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="IP地址："  prop="ip">
            <el-input v-model="addform.ip" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="flag.addDialog = false">取 消</el-button>
          <el-button type="primary"  @click="saveAdd('addform')" :loading="formLoading" ><span v-show="!formLoading">确认新增</span><span v-show="formLoading">提交中</span></el-button>
        </div>
      </el-dialog>
      <!--编辑弹框-->
      <el-dialog
        title="编辑录像机"
        :visible.sync="flag.editDialog"
        width="32%"
        :modal-append-to-body= false
        center
        custom-class="dialogCss"
      >
        <el-form
          ref="form"
          :model="form"
          :label-width="formLabelWidth"
          :rules="rules"
          size="small"
        >
          <el-form-item label="用户名：" prop="username">
            <el-input v-model="form.username" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="用户密码："  prop="password">
            <el-input v-model="form.password" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="录像机名称："  prop="video_name">
            <el-input v-model="form.video_name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="录像机型号："  prop="unit_type">
            <el-input v-model="form.unit_type" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="录像机端口："  prop="port">
            <el-input v-model="form.port" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="IP地址："  prop="ip">
            <el-input v-model="form.ip" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="flag.editDialog = false">取 消</el-button>
          <el-button type="primary"  @click="saveEdit('form')">更新</el-button>
        </div>
      </el-dialog>
    </ibox>
  </div>
</template>
<script>
  import ibox from '@/components/style/ibox.vue'
  import request from '@/api/workbench/videoManage/vtrManage'
  export default {
    components: { ibox },
    mounted () {
      this.getDataFirst()
    },
    data () {
      return {
        formLoading: false,
        searchInput: '',  // 搜索框内容
        tableData: [],  // 页面表格数据
        bgstyle: {
          'background': '#FAFAFA'
        },
        currentPage: 1,  // 当前页
        allItem: 100,      // 分页
        loading: true,
        formLabelWidth: '120px',
        multipleSelection: [],  // 复选框点击选择项目
        ids: [],           // 删除需要的id
        flag: {
          disableddelete: true,
          delteDialog: false,
          addDialog: false,
          addInnerDialog: false,
          editDialog: false,
          editInnerDialog: false,
          codeDialog: false,
          firstSearch: true   // 第一次查询
        },
        addform: {
          ip: '',
          name: '',
          unit_type: '',
          port: '',
          username: '',
          password: ''
        },
        form: {
          id: '',
          ip: '',
          video_name: '',
          unit_type: '',
          port: '',
          username: '',
          password: ''
        },
        rules: {
          username: [
            { required: true, message: '不得为空', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '不得为空', trigger: 'blur' }
          ],
          name: [
            { required: true, message: '不得为空', trigger: 'blur' }
          ],
          unit_type: [
            { required: true, message: '不得为空', trigger: 'blur' }
          ],
          port: [
            { required: true, message: '不得为空', trigger: 'blur' },
            { validator: this.regExp('ipPort'), trigger: 'blur' }
          ],
          ip: [
            { required: true, message: '不得为空', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      getDataFirst () {
        this.datainit()
        this.ajaxGet()
      },
      datainit () {
        this.loading = true
        this.formLoading = false
        this.tableData = []
        this.multipleSelection = []
        this.flag.disableddelete = true
        this.flag.delteDialog = false
        this.flag.addDialog = false
        this.flag.editDialog = false
        this.flag.codeDialog = false
        this.flag.addInnerDialog = false
        this.flag.editInnerDialog = false
        this.currentPage = 1
        this.searchInput = ''
        this.ids = []
        this.form = {id: '', ip: '', video_name: '', unit_type: '', port: '', username: '', password: ''}
        this.addform = {ip: '', name: '', unit_type: '', port: '', username: '', password: ''}
      },
      ajaxGet () {
        request.getVtrData(this.currentPage, 10, this.searchInput).then(
          data => {
            // console.log(data.data)
            // 初始化页面时才给的count
            if (this.currentPage === 1) {
              this.allItem = Number(data.data.count)
            }
            this.tableData = data.data.videolist
            this.loading = false
          }
        )
      },
      // 复选框点击事件
      handleSelectionChange (val) {
        this.multipleSelection = val
        if (this.multipleSelection.length !== 0) {
          this.flag.disableddelete = false
        } else {
          this.flag.disableddelete = true
        }
      },
      // 分页点击事件
      handleCurrentChange (val) {
        console.log('当前页是：' + this.currentPage)
        this.ajaxGet()
      },
      // 删除数据/批量删除
      deleteIcon () {
        this.flag.delteDialog = true
        let ids = []
        for (let i = 0; i < this.multipleSelection.length; i++) {
          ids.push(this.multipleSelection[i].id)
        }
        this.ids = ids
      },
      // 保存删除
      saveDel () {
        request.deleteItem(this.ids).then(
          data => {
            if (data.data.code === 0) {
              // 删除成功之后需要重新刷新数据
              this.getDataFirst()
            } else {
              this.$notify.error({
                title: '错误',
                message: '删除失败,请再次尝试'
              })
            }
          }, error => {
          this.loading = false
          this.error = error.toString()
        })
        this.flag.delteDialog = false
      },
      // 保存新增
      saveAdd (formName) {
        console.log(this.addform)
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.formLoading = true
            request.addNewItem(this.addform).then(
              data => {
                if (data.data.code === 0) {
                  this.getDataFirst()
                  this.flag.addDialog = false
                } else {
                  this.$notify.error({
                    title: '错误',
                    message: '添加失败,请再次尝试'
                  })
                }
                this.formLoading = false
              }
            )
            this.addform = {ip: '', name: '', unit_type: '', port: '', username: '', password: ''}
          } else {
            this.$notify({
              title: '警告',
              message: '请将信息填写正确！',
              type: 'warning'
            })
          }
        })
      },
      editRow (row) {
        console.log(row)
        this.form.video_name = row.video_name
        this.form.id = row.id
        this.form.ip = row.ip
        this.form.unit_type = row.unit_type
        this.form.port = row.port
        this.form.username = row.username
        this.form.password = row.password
        this.flag.editDialog = true
      },
      // 保存编辑信息
      saveEdit (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            request.editSaveItem(this.form).then(
              data => {
                if (data.data.code === 0) {
                  this.getDataFirst()
                } else {
                  this.$notify.error({
                    title: '错误',
                    message: '更新失败,请再次尝试'
                  })
                }
              }
            )
            this.flag.editDialog = false
          } else {
            this.$notify({
              title: '警告',
              message: '请将信息填写正确！',
              type: 'warning'
            })
          }
        })
      },
      // 搜索
      searchQuery () {
        if (this.searchInput !== '') {
          // 实际查询
          console.log(this.currentPage)
          console.log(this.searchInput)
          this.currentPage = 1
          this.ajaxGet()
          this.flag.firstSearch = false
        } else {
          this.currentPage = 1
          this.$message.error('请输入查询的值')
        }
      }
    },
    watch: {
      searchInput: function (msg) {
        // 检测搜索框内容为空时自动加载第一页
        // console.log(this.searchInput)
        if (msg === '') {
          this.currentPage = 1
          this.getDataFirst()
          this.flag.firstSearch = true
        }
      }
    }
  }
</script>
<style scoped>

</style>
