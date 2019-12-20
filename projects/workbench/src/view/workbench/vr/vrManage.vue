<template>
  <div class="tp-item-manage">
    <ibox title="体验点及二维码管理">
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
          prop="name"
          label="体验点名称"
          width="200">
        </el-table-column>
        <el-table-column
          prop="address"
          label="体验点位置"
          width="200">
        </el-table-column>
        <el-table-column
          prop="administrator"
          label="管理员"
          width="200">
        </el-table-column>
        <el-table-column
          prop="phone"
          label="联系方式"
          width="200">
        </el-table-column>
        <el-table-column>
          <template slot-scope="scope">
            <span
              style="width:15px;display: inline-block;margin-right: 30px;"
              @click="exportCode(scope.row)">
              <img style="width:15px;" src="../../../assets/img/vr/vr-scan.png" >
            </span>
            <span style="width:15px;" @click="editRow(scope.row)">
              <img style="width:15px;" src="../../../assets/img/vr/vr-edit.png" >
            </span>
          </template>
        </el-table-column>
      </el-table>
      <!--删除/新增体验点-->
      <div class="btn-group">
        <el-button
          type="primary"
          size="small"
          icon="el-icon-error"
          plain
          style="margin-left: 20px;"
          :disabled="flag.disableddelete"
          @click="deleteIcon">删除</el-button>
        <el-button
          type="primary"
          size="small"
          icon="el-icon-circle-plus"
          style="margin-left: 20px;"
          plain
          @click="flag.addDialog = true"
        >新增体验点</el-button>
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
    </ibox>
    <!--删除弹框-->
    <el-dialog
      title="提示"
      width="30%"
      :visible.sync="flag.delteDialog"
      center
      :modal-append-to-body= false
    >
      <span style="margin-left:120px;">确认删除这些人员信息吗？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="flag.delteDialog = false">取 消</el-button>
        <el-button type="primary" @click="saveDel">确 定</el-button> <!-- @click="deleteItem"-->
      </span>
    </el-dialog>
    <!--体验点编辑弹框-->
    <el-dialog
      title="体验点编辑"
      :visible.sync="flag.editDialog"
      width="30%"
      :append-to-body="true"
      center
      custom-class="dialogCss"
    ><!---->
    <el-dialog
      width="60%"
      :visible.sync="flag.editInnerDialog"
      append-to-body>
      <add-person :type="type" ref="clear"></add-person>
      <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="editConfirm">确 定</el-button>
      </span>
    </el-dialog>
      <el-form
        ref="form"
        :model="form"
        :label-width="formLabelWidth"
        size="small"
      >
        <el-form-item label="体验点名称：" >
          <el-input v-model="form.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="体验点位置：" >
          <el-input v-model="form.address" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="管理员：" :label-width="formLabelWidth" class="readstyle">
          <el-input v-model="form.manage" auto-complete="off" style="width: 150px;margin-right: 40px;" readonly></el-input>
          <el-button type="primary" @click="flag.editInnerDialog = true">选择人员</el-button>
        </el-form-item>
        <el-form-item label="电话号码：" :label-width="formLabelWidth" class="readstyle">
          <el-input v-model="form.phone" auto-complete="off" readonly style="width: 150px;"></el-input>
        </el-form-item>
        <el-form-item v-if="form.backup_phone.length > 0" label="备用号码：" :label-width="formLabelWidth">
          <!--<el-input v-model="form.phone" auto-complete="off" readonly></el-input>-->
          <template v-for="item in form.backup_phone">
            <el-tag
              type="info"
              style="margin-right: 3px;margin-bottom: 8px;"
            >{{item}}</el-tag>
          </template>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="flag.editDialog = false">取 消</el-button> <!-- @click="isShow = false"-->
        <el-button type="primary"  @click="saveEdit" :loading="addLoading" ><span v-show="!addLoading">保存</span><span v-show="addLoading">提交中</span></el-button><!--@click="isShow = false"-->
      </div>
    </el-dialog>
    <!--体验点新增弹框-->
    <el-dialog
      title="新增体验点"
      :visible.sync="flag.addDialog"
      width="30%"
      :append-to-body="true"
      center
      custom-class="dialogCss"
    >
      <el-dialog
        width="60%"
        :visible.sync="flag.addInnerDialog"
        append-to-body>
        <add-person :type="type" ref="clear"></add-person>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="addConfirm">确 定</el-button>
      </span>
      </el-dialog>
      <el-form
        ref="form"
        :model="addform"
        :label-width="formLabelWidth"
        size="small"
      >
        <el-form-item label="体验点名称：" >
          <el-input v-model="addform.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="体验点位置：" >
          <el-input v-model="addform.address" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="管理员：" :label-width="formLabelWidth" class="readstyle">
          <el-input v-model="addform.manage" readonly auto-complete="off" style="width: 150px;margin-right: 40px;"></el-input>
          <el-button type="primary" @click="flag.addInnerDialog = true">选择人员</el-button>
        </el-form-item>
        <el-form-item label="电话号码：" :label-width="formLabelWidth" class="readstyle">
          <el-input v-model="addform.phone" readonly auto-complete="off" style="width: 150px;"></el-input>
        </el-form-item>
        <el-form-item v-if="addform.backup_phone.length > 0" label="备用号码：" :label-width="formLabelWidth">
          <template v-for="item in addform.backup_phone">
            <el-tag
              type="info"
              style="margin-right: 3px;margin-bottom: 8px;"
            >{{item}}</el-tag>
          </template>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="flag.addDialog = false">取 消</el-button> <!-- @click="isShow = false"-->
        <el-button type="primary"  @click="saveAdd" :loading="formLoading" ><span v-show="!formLoading">确认新增</span><span v-show="formLoading">提交中</span></el-button><!--@click="isShow = false"-->
      </div>
    </el-dialog>
    <!--二维码弹框-->
    <el-dialog
      :visible.sync="flag.codeDialog"
      width="20%"
      center
      :modal-append-to-body= false
    >
      <img :src="imgsrc" style="width: 90%; margin-left: 5%">
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" ><a :href="imgsrc" download class="exportCode">导出二维码</a></el-button><!--@click="dialogVisible = false"-->
  </span>
    </el-dialog>
  </div>
</template>
<script>
  import ibox from '@/components/style/ibox.vue'
  import addPerson from '@/view/workbench/components/addPerson.vue'
  import newitem from '@/api/workbench/item/management/newItem.js'
  import request from '@/api/workbench/vr/vrManage.js'
  export default {
    components: { ibox, addPerson },
    mounted () {
      this.getDataFirst()
      console.log(window.location.host)
    },
    data () {
      return {
        loading: true,
        formLoading: false,
        addLoading: false,
        bgstyle: {
          'background': '#FAFAFA'
        },
        tableData: [],  // 页面表格数据
        multipleSelection: [],  // 复选框点击选择项目
        flag: {
          disableddelete: true,
          delteDialog: false,
          addDialog: false,
          addInnerDialog: false,
          editDialog: false,
          editInnerDialog: false,
          codeDialog: false,
          firstSearch: true
        },
        form: {
          name: '',
          address: '',
          manage: '',
          phone: '',
          id: '',
          admin_id: '',
          backup_phone: []
        },
        addform: {
          name: '',
          address: '',
          manage: '',
          phone: '',
          admin_id: '',
          backup_phone: []
        },
        imgsrc: '/static/vr-code.png',
        formLabelWidth: '100px',
        allItem: 100,      // 分页
        currentPage: 1,
        searchInput: '',   // 绑定的搜索内容
        ids: [],           // 删除需要的id
        type: [1, 2]
      }
    },
    methods: {
      // 初始化页面，分页page = 1
      getDataFirst () {
        this.datainit()
        this.ajaxGet()
      },
      ajaxGet () {
        request.getVrManagements(this.currentPage, 10, this.searchInput).then(
          data => {
            // console.log(data.data)
            // 初始化页面时才给的count
            if (this.currentPage === 1) {
              this.allItem = Number(data.data.count)
            }
            this.tableData = data.data.exp_list
            this.loading = false
          }
        )
      },
      datainit () {
        this.loading = true
        this.formLoading = false
        this.addLoading = false
        this.tableData = []
        this.multipleSelection = []
        this.flag.disableddelete = true
        this.flag.delteDialog = false
        this.flag.addDialog = false
        this.flag.editDialog = false
        this.flag.codeDialog = false
        this.flag.addInnerDialog = false
        this.flag.editInnerDialog = false
        this.form = {name: '', address: '', manage: '', phone: '', id: '', admin_id: '', backup_phone: []}
        this.addform = {name: '', address: '', manage: '', phone: '', admin_id: '', backup_phone: []}
        this.currentPage = 1
        this.searchInput = ''
      },
      // 导出二维码
      exportCode (row) {
        console.log(row.id + '')
        let urldata = encodeURIComponent(`{"id":${"'" + row.id + "'"},"width":400,"height":400}`)
        let httpurl = document.location.origin
        this.imgsrc = httpurl + '/zjsbs/njuapi?type=1061&data=' + urldata + '&md5=md'
        console.log(this.imgsrc)
        this.flag.codeDialog = true
      },
      editRow (row) {
        this.form.name = row.name
        this.form.address = row.address
        this.form.manage = row.administrator
        this.form.phone = row.phone
        this.form.id = row.id
        this.form.admin_id = row.admin_id
        this.flag.editDialog = true
      },
      // 保存编辑信息
      saveEdit () {
        console.log(this.form)
        if (this.form.name === '' || this.form.address === '' || this.form.phone === '' || this.form.manage === '') {
          this.$notify.error({
            title: '提示',
            message: '请将数据填写完整'
          })
        } else {
          this.addLoading = true
          request.editSaveItem(this.form).then(
            data => {
              if (data.data.code === 0) {
                this.getDataFirst()
                this.flag.editDialog = false
                this.addLoading = false
              } else {
                this.$notify.error({
                  title: '错误',
                  message: '更新失败,请再次尝试'
                })
              }
              this.addLoading = false
            }
          )
        }
      },
      // 保存新增
      saveAdd () {
        console.log(this.addform)
        if (this.addform.name === '' || this.addform.address === '' || this.addform.phone === '' || this.addform.manage === '') {
          this.$notify.error({
            title: '提示',
            message: '请将数据填写完整'
          })
        } else {
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
          this.addform = {name: '', address: '', manage: '', phone: '', backup_phone: [], admin_id: ''}
        }
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
        }
        )
        this.flag.delteDialog = false
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
          this.$notify.error({
            title: '提示',
            message: '请输入查询的值'
          })
        }
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
      // 编辑选择人员获取数据
      editConfirm () {
        this.flag.editInnerDialog = false
        this.$refs.clear.clearAll()
        newitem.getManagerData().then(value => {
          this.form.manage = value.managerName
          this.form.phone = value.managePhone
          this.form.admin_id = value.managerID
          this.form.backup_phone = value.backup_phone.split(';')
        })
      },
      // 新增选择人员
      addConfirm () {
        this.flag.addInnerDialog = false
        this.$refs.clear.clearAll()
        newitem.getManagerData().then(value => {
          this.addform.manage = value.managerName
          this.addform.phone = value.managePhone
          this.addform.admin_id = value.managerID
          this.addform.backup_phone = value.backup_phone.split(';')
        })
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
.tp-item-manage .ibox .el-input{
  margin-bottom: 10px;
}
.tp-item-manage .ibox .vr-scan{
  width: 20px;
}
.btn-group{
  margin-top: 10px;
}
.tp-item-manage .el-dialog .el-dialog__title{
  font-size: 24px;
  font-weight: 600;
}
.vrcode{
  width: 90%;
  margin-left: 5%;
}
.exportCode{
  color: white;
  text-decoration: none;
}

</style>
