<template>
   <div class="meassageList">
       <ibox title='下属公司管理'>
           <!-- 菜单栏 -->
           <el-tabs v-model="choose" type="border-card" @tab-click="handleClick">
             <!-- 公司信息列表 -->
                <el-tab-pane label="公司信息列表" name="messageList">
                     <!-- 表格 -->
                    <el-table
                        stripe
                        size='small'
                        ref="multipleTable"
                        :data="tableData"
                        tooltip-effect="dark"
                        style="width: 100%"
                        :header-row-style='headColor'
                        :cell-style='center'
                        :header-cell-style='center'
                        @selection-change="handleSelectionChange">
                        <el-table-column
                        type="selection"
                        width="55">
                        </el-table-column>
                        <el-table-column
                        prop="name"
                        label="公司/机构名称">
                        </el-table-column>
                        <el-table-column
                        prop="phone"
                        label="电话">
                        </el-table-column>
                        <el-table-column
                        prop="email"
                        label="邮箱"
                        show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column
                        prop="fax"
                        label="传真"
                        show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column
                        prop="address"
                        label="地址"
                        show-overflow-tooltip>
                        </el-table-column>
                    </el-table>
                    <!-- 修改信息的内容 -->
                    <el-dialog title='修改下属公司信息' :visible.sync='dialogFormVisible' class="messaage" :appendToBody='toTop' width='80%'>
                      <edit class="mesageBox" key="1" :formData="form" ></edit>
                    </el-dialog>
                    <!-- 按钮 -->
                    <div class="btns">
                      <!-- 分页器 -->
                      <div class="block">
                        <el-pagination
                          class="page"
                          layout="prev, pager, next"
                          :current-page = 'page'
                          @current-change ='getPage'
                          :total="pageNum">
                        </el-pagination>
                      </div>
                      <el-button type="primary"
                                size="small"
                                plain @click="toEdit" icon="el-icon-edit" class="change" :disabled='edit'>修改</el-button>
                      <el-button type="primary"
                                size="small"
                                plain @click="clear"  icon="el-icon-delete" class="delete" :disabled='ban'>删除</el-button>
                    </div>
                </el-tab-pane>
              <!-- 新增公司 -->
                <el-tab-pane label="新增公司" name="addCompany">
                  <edit class="addCompany" key="2" @tabRefresh="tab" @refresh='fresh' :formData='{name: "", alias: "", desc: "", leaders: "", phone: "", email: "", fax: "", address: "", remark: "", pro_success:[{name: "", pic_url: ""}]}'></edit>
                </el-tab-pane>
            </el-tabs>
            <!-- 搜索框 -->
            <el-input placeholder="请输入内容" v-model="input" class="input-with-select" size="mini" v-show='showinput'>
                <el-button slot="append" @tabRefresh="tab" icon="el-icon-search" @click="seo"></el-button>
            </el-input>
       </ibox>
   </div>
</template>

<script>
import ibox from '@/components/style/ibox.vue'
import request from '@/api/workbench/subCompany/messageList.js'
import edit from './edit/edit.vue'
export default {
  components: {ibox, edit},
  data () {
    return {
      choose: 'messageList',
      input: '',
      showinput: true,
      headColor: {backgroundColor: '#F7F7F7'},
      center: {textAlign: 'center'},
      tableData: [],
      form: {},
      ids: [],
      pageNum: 10,
      page: 1,
      ban: true,
      edit: true,
      toTop: true,
      dialogFormVisible: false
    }
  },
  created () {
    console.log(sessionStorage.userInfo)
    // 获取表格数据 1000
    request.getTableData().then(data => {
      this.tableData = data.data.company_list
      this.pageNum = Number(data.data.count)
    })
  },
  methods: {
    // 在公司信息列表和新增公司之间进行跳转的点击事件
    handleClick (tab, event) {
      if (tab.index === '1') {
        this.showinput = false
      } else {
        this.showinput = true
      }
    },
    // 点击一个复选框触发的事件  以及全选事件
    handleSelectionChange (val) {
      this.multipleSelection = val
      this.ids = []
      for (var i = 0; i < val.length; i++) {
        this.ids.push(val[i].id)
      }
      if (val.length > 0) {
        this.ban = false
      } else {
        this.ban = true
      }
      if (val.length === 1) {
        this.edit = false
      } else {
        this.edit = true
      }
    },
    tab (data) {
      this.choose = data
    },
    // 提交完后页面数据重新刷新
    fresh (data) {
      request.getTableData().then(data => {
        this.tableData = data.data.company_list
        this.pageNum = Number(data.data.count)
      })
    },
    // 点击搜索获取表格数据
    seo () {
      request.getTableData(this.input).then(data => {
        this.tableData = data.data.company_list
        if (this.page !== 1) {
          this.page = 1
        }
      })
    },
    // 分页器点击事件
    getPage (currentPage) {
      this.page = currentPage
      request.getPage(currentPage).then(data => {
        this.tableData = data.data.company_list
      })
    },
    // 编辑公司信息
    toEdit () {
      request.getEditData(this.ids[0]).then(data => {
        this.form = data.data
        this.dialogFormVisible = true
        this.obj = this.form
        this.obj.id = this.ids[0]
      })
    },
    // 删除批量信息
    clear () {
      this.$confirm('是否删除该公司?', {
        confirmButtonText: '确定删除',
        cancelButtonText: '取消',
        center: true,
        customClass: {fontSize: '40px'}
      }).then(() => {
        request.clear(this.ids).then(data => {
          if (data.code === 0) {
            request.getTableData().then(data => {
              this.tableData = data.data.company_list
              this.pageNum = Number(data.data.count)
            })
          }
        })
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }
}
</script>

<style scoped>
.el-input{
    width: 250px;
    position: absolute;
    right:70px;
    top:88px;
}
.el-dialog{
  z-index: 9999;
}
.btns{
  width:100%;
  height:40px;
  margin-top: 20px;
  position: relative;
}
.block{
  width:20%;
  display: inline-block;
  position: absolute;
  left:50%;
  margin-left: -20%;
}
.change{
  position: absolute;
  left:20px;
}
.delete{
  position: absolute;
  left:120px;
}
.addCompany{
  position: relative;
}
</style>


