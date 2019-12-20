<template>
  <div class="jinm-groupManager">
    <ibox title="集团管理">
    <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick" >
      <el-tab-pane label="集团管理" name="groupManage" class="tab1">
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
          style='width: 100%'
          :header-row-style="bgstyle"
          @selection-change='handleSelectionChange'>
          <el-table-column
            type='selection'
            width='55'>
          </el-table-column>

          <el-table-column
            prop='corp_name'
            label='集团名称'
            align="center"
            show-overflow-tooltip>
            <!--<template slot-scope='scope'>{{ scope.row.date }}</template>-->
          </el-table-column>
          <el-table-column
            prop='corp_manager'
            label='集团管理员工号'
            align="center"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop='manager_name'
            label='集团管理员名称'
            align="center"
            show-overflow-tooltip>
          </el-table-column>
        </el-table>

        <el-button
          type="primary"
          size="small"
          plain
          icon="el-icon-delete"
          style="display:inline-block;margin-top:20px;margin-left:40px"
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
            style="display:inline-block;margin-left:200px;margin-top:20px;margin-right:30px"
          >
          </el-pagination>
        </div>

      </el-tab-pane>
      <el-tab-pane label="新建集团" name="newGroup">
        <el-form label-width="110px"  :model="userForm" ref="userForm" :rules="rules" class="demo-ruleForm">

            <el-form-item label="集团名称:" prop="name">
              <el-input v-model="userForm.name" style="width:250px" ></el-input>
            </el-form-item>
            <el-form-item label="管理员工号:" prop="pro_manager">
              <el-input v-model="userForm.pro_manager"  style="width:250px" ></el-input>
            </el-form-item>

          <div class="button">
            <el-button type="primary" @click="submitForm('userForm')">提交</el-button>
            <el-button @click="resetForm('userForm')">重置</el-button>
          </div>
        </el-form>

      </el-tab-pane>
    </el-tabs>

  <el-dialog
    title="提示"
    :visible.sync="centerDialogVisible"
    width="450px"
    center
    :modal-append-to-body= false
  >
    <span style="margin-left:120px;">确认删除这些集团信息吗？</span>
    <span slot="footer" class="dialog-footer">
    <el-button @click="centerDialogVisible = false">取 消</el-button>
    <el-button type="primary"  @click="deleteItem">确 定</el-button>
  </span>
  </el-dialog>

      <!--修改数据-->
      <el-dialog
        :visible.sync="dialogVisible"
        width="460px"
        :append-to-body="true">

        <el-form label-width="110px"  :model="userForm1" ref="userForm1" :rules="rules" class="demo-ruleForm">

          <el-form-item label="集团名称:" prop="name">
            <el-input v-model="userForm1.name" style="width:250px" ></el-input>
          </el-form-item>
          <el-form-item label="管理员工号:" prop="corp_manager">
            <el-input v-model="userForm1.corp_manager"  style="width:250px" readonly></el-input>
          </el-form-item>

          <div class="button">
            <el-button type="primary" @click="submitForm1('userForm1')">保存</el-button>
            <el-button @click="resetForm1('userForm1')">取消</el-button>
          </div>
        </el-form>
        <span slot="footer" class="dialog-footer">
        </span>
      </el-dialog>

</ibox>
  </div>
</template>
<script>
  import ibox from '@/components/style/ibox.vue'
  import request from '@/api/workbench/groupManager/groupTable.js'
  export default {
    components: { ibox },
    created () {
      this.getInit()
    },
    data () {
      // **************表单验证******************
      var validatePass = (rule, value, callback) => {
        if (!value || !/^[0-9a-zA-Z]{1,}$/.test(value)) {
          callback(new Error('工号不能为空，且必须由英文和数字组成'))
        } else {
          callback()
        }
      }
      return {
        activeName: 'groupManage',
        DepartmentUser: [],
        centerDialogVisible: false,  // 删除状态
        dialogVisible: false,   // 修改状态
        input: '',
        allItem: 0,  // 所有的数据
        currentPage: 1,
        disableddelete: true,
        disabledchange: true,
        multipleSelection: [],
        bgstyle: {
          'background': '#FAFAFA'
        },
        userForm: {              // 表单信息
          name: '',
          pro_manager: ''
        },
        userForm1: {              // 修改的表单信息
          id: '',
          name: '',
          corp_manager: ''
        },
        rules: {
          name: [
            { required: true, message: '请输入集团名称', trigger: 'blur' }
          ],
          pro_manager: [
            { validator: validatePass, trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      handleClick () {

      },
//      搜索功能
      searchQuery () {
        this.getInit()
      },
//      table的选中状态
      handleSelectionChange (val) {
        console.log(val)
        this.multipleSelection = val
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
      },
//      分页
      handleCurrentChange () {
        this.getInit()
      },
//      删除集团信息
      deleteItem () {
        this.centerDialogVisible = false
        var deleteData = this.multipleSelection
        let deleteList = []
        for (let key in deleteData) {
          deleteList.push(deleteData[key].id)
        }
        var deleteInfo = {id: deleteList}
        request.deleteData(deleteInfo).then(value => {
          this.getInit()
        })
      },
      // ******************修改数据***************
      modifyData () {
        this.dialogVisible = true
        console.log(this.multipleSelection[0])
        this.userForm1.name = this.multipleSelection[0].corp_name
        this.userForm1.corp_manager = this.multipleSelection[0].corp_manager
        this.userForm1.id = this.multipleSelection[0].id
      },
      // **********初始化操作***************
      getInit () {
        request.getTable({'currentPage': this.currentPage - 1, 'input': this.input}).then(value => {
          this.DepartmentUser = value.project
          console.log(this.DepartmentUser)
          this.allItem = Number(value.count)
        })
      },
      // ******************提交****************
      submitForm (userForm) {
        this.$refs[userForm].validate((valid) => {
          if (valid) {
            request.submitData(this.userForm).then(value => {
              if (!value) {
                this.$notify.error({
                  title: '错误',
                  message: '您输入的工号已重复，请从新输入'
                })
              } else {
                this.activeName = 'groupManage'
                this.$refs[userForm].resetFields()
                this.getInit()
              }
            })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      resetForm (userForm) {
        this.$refs[userForm].resetFields()
      },
      // ******************保存****************
      submitForm1 (userForm1) {
        this.$refs[userForm1].validate((valid) => {
          if (valid) {
            request.submitData1(this.userForm1).then(value => {
              this.dialogVisible = false
              this.getInit()
            })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      resetForm1 (userForm1) {
        this.dialogVisible = false
      }
    }
  }
</script>

<style scoped>
  .el-table td, .el-table th.is-leaf{background:#FAFAFA}
  .tab1 .el-input{
    float: right;
    width: 250px;
    margin-bottom: 5px;
    position: absolute;
    right:68px;
    top:95px;
  }
  .block{width:400px; display:inline-block}
  .button {
    padding-left: 115px;
  }
</style>
