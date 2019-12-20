<template>
  <!--穿梭框-->
  <el-row>
    <el-col :span="7"><div class="grid-content bg-purple">
      <div class="item-box">
        <container :title="title[0]">
          <div slot="content" class="content-child">
            <!--*************************************树形列表******************************************-->
            <el-tree :default-expanded-keys="[1]" v-loading="treeLoading" :data="treeData" @current-change="getDataInTree" highlight-current node-key="id" :render-content="renderContent"></el-tree>
          </div>
        </container>
      </div>
    </div></el-col>
    <el-col :span="7"><div class="grid-content bg-purple-light">
      <div class="item-box">
        <!--*************************************已选择列表******************************************-->
        <container :title="title[1]">
          <div slot="content" class="content-child content-table">
            <el-table :data="selectData"  stripe ref="selectData" size="small" :header-row-style= 'headStyle'
                      @selection-change="selectDataSelectionChange"
                      :header-cell-style="headCellStyle" :cell-style="headCellStyle" style="width: 100%">
              <el-table-column type="selection" width="40"></el-table-column>
              <el-table-column prop="emp_name" label="功能名称"  show-overflow-tooltip></el-table-column>
            </el-table>
          </div>
          <div slot="foot" class="foot">
            <!--*************************************分页******************************************-->
            <el-pagination @current-change="selectPageChange" layout="prev, pager, next" :page-size="pageSize"
                           :current-page.sync="selectPageIndex" :total="selectDataTotal"></el-pagination>
          </div>
        </container>
      </div>
    </div></el-col>
    <el-col :span="2"><div class="grid-content bg-purple">
      <!--*************************************移动按钮******************************************-->
      <div class="tool-box">
        <div @click="toLeft" class="middle-left"><img src="../../../../assets/img/lib/transfer/left.png" /></div>
        <div @click="toRight" class="middle-right"><img src="../../../../assets/img/lib/transfer/right.png" /></div>
      </div>
    </div></el-col>
    <el-col :span="8"><div class="grid-content bg-purple">
      <div class="item-box">
        <!--*************************************全部数据列表******************************************-->
        <container :title="title[2]">
          <div slot="head" class="search-box">
            <!--*************************************搜索******************************************-->
            <el-input placeholder="请输入内容" v-model="searchText">
              <el-button @click="searchData(searchText)" slot="append" icon="el-icon-search"></el-button>
            </el-input>
          </div>
          <div slot="content" class="content-child content-table">
            <el-table :data="allData" stripe size="small" ref="allData"
                      @selection-change="allDataSelectionChange" :header-row-style= 'headStyle'
                      :header-cell-style="headCellStyle" :cell-style="headCellStyle" style="width: 100%">
              <el-table-column type="selection" width="50"></el-table-column>
              <el-table-column prop="emp_name" label="功能名称" show-overflow-tooltip></el-table-column>
            </el-table>
          </div>
          <div slot="foot" class="foot">
            <!--*************************************分页******************************************-->
            <el-pagination  @current-change="allPageChange" layout="prev, pager, next" :page-size="pageSize"
                            :current-page.sync="allPageIndex" :total="allDataTotal"></el-pagination>
          </div>
        </container>
      </div>
    </div></el-col>
    <!--*************************************模态框******************************************-->
    <el-dialog
      :visible.sync="dialogVisible"
      :title='dialogTitle'
      :append-to-body="true"
      width="400px">
      <div class="add-tree">
        <el-form :model="addTreeForm" :rules="rules" ref="addTreeForm" label-width="80px" class="demo-ruleForm">
          <el-form-item label="菜单名称" prop="name">
            <el-input v-model="addTreeForm.name" size="small"></el-input>
          </el-form-item>
          <el-form-item label="菜单图标" prop="icon">
            <el-input v-model="addTreeForm.icon" size="small"></el-input>
          </el-form-item>
          <el-form-item label="菜单排序" prop="order">
            <el-input v-model="addTreeForm.order" size="small"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addTreeData('addTreeForm')">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      :visible.sync="editVisible"
      title='菜单编辑'
      :append-to-body="true"
      width="400px">
      <div class="add-tree">
        <el-form :model="editTreeForm" :rules="rules" ref="editTreeForm" label-width="80px" class="demo-ruleForm">
          <el-form-item label="菜单名称" prop="name">
            <el-input v-model="editTreeForm.name" size="small"></el-input>
          </el-form-item>
          <el-form-item label="菜单图标" prop="icon">
            <el-input v-model="editTreeForm.icon" size="small"></el-input>
          </el-form-item>
          <el-form-item label="菜单排序" prop="order">
            <el-input v-model="editTreeForm.order" size="small"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editVisible = false">取 消</el-button>
        <el-button type="primary" @click="editTreeData('editTreeForm')">确 定</el-button>
      </span>
    </el-dialog>
  </el-row>
</template>

<script>
  import container from '@/components/style/container.vue'
  import addPerson from '@/view/workbench/components/staffIncrementTemplate.vue'
  import request from '@/api/workbench/adminManage/menu.js'
  export default {
    props: ['title', 'config', 'platform'],
    components: {container, addPerson},
    mounted () {
      request.setPlatform(this.platform)
      request.setConfigValue(this.config)
      this.getTreeData()
    },
    computed: {
      dialogTitle () {
        return '添加' + this.title[3]
      }
    },
    data () {
      return {
        allDataSelection: [],
        selectDataSelection: [],
        headStyle: {backgroundColor: '#E6E6E6'},
        headCellStyle: {textAlign: 'center'},
        dialogVisible: false,
        addVisible: false,
        editVisible: false,
        treeChild: [],
        addTreeForm: {
          name: '',
          icon: '',
          order: ''
        },
        editTreeForm: {
          name: '',
          icon: '',
          order: ''
        },
        rules: {
          name: { required: true, message: '名称不得为空', trigger: 'blur' },
          icon: { required: true, message: '图标不得为空', trigger: 'blur' },
          order: { required: true, message: '排序不得为空', trigger: 'blur' }
        },
        treeLoading: true,
        pageSize: 7,
        // ********************数据部分**************//
        searchText: '',
        allPageIndex: 1,
        selectPageIndex: 1,
        selectDataTotal: 0,          // 已选数据总条数
        allDataTotal: 0,             // 所有可选数据个数
        treeData: [{}],                 // 树形渲染数据
        selectData: [],               // 可选择列表
        allData: []                   // 所有数据,
      }
    },
    methods: {
      // ***************请求树形数据(左侧)************//
      getTreeData () {
        request.getDataInTree(this.config).then(data => {
          this.treeData = data
          this.treeLoading = false
        })
      },
      // ***************请求树形结构内部数据(右侧)************//
      getDataInTree (data) {
        if (data.id === 1) {
          this.selectData = []
          this.allData = []
          return false
        }
        request.setselectIDValue(data.id)
        this.selectPageChange(1)
        this.allPageChange(1)
      },
      // ************树形结构数据添加************//
      append (data, e) {
        e.stopPropagation()
        this.dialogVisible = true
        this.treeChild = data
      },
      addTreeData (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log(this.addTreeForm)
            let newChild = { name: this.addTreeForm.name, children: [] }
            request.addTree({parent: this.treeChild, data: newChild, extra: this.addTreeForm}).then((data) => {
              newChild.id = data.data.id
              newChild.isPlus = data.isPlus
              if (!this.treeChild.children) { this.$set(this.treeChild, 'children', []) }
              this.treeChild.children.push(newChild)
              this.$notify({title: '成功', message: '新增成功', type: 'success'})
              this.dialogVisible = false
              this.$refs[formName].resetFields()
            })
          }
        })
      },
      // ************树形结构数据删除************//
      remove (node, data, e) {
        e.stopPropagation()
        this.$confirm('确认执行此删除操作?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          request.removeTree(data).then(() => {
            const parent = node.parent
            const children = parent.data.children || parent.data
            const index = children.findIndex(d => d.id === data.id)
            children.splice(index, 1)
            this.allData = []
            this.selectData = []
            this.$notify({title: '成功', message: '删除成功', type: 'success'})
          })
        })
      },
      editTreeData (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            request.editTree({id: this.treeChild.id,
              name: this.editTreeForm.name,
              icon: this.editTreeForm.icon,
              order: this.editTreeForm.order}).then(t => {
                if (t.code === 0) {
                  this.treeChild.name = this.editTreeForm.name
                  this.treeChild.icon = this.editTreeForm.icon
                  this.treeChild.order = this.editTreeForm.order
                  this.editVisible = false
                }
                this.$refs[formName].resetFields()
              })
          }
        })
      },
      // ************树形结构数据编辑************//
      edit (node, data, e) {
        e.stopPropagation()
        this.editTreeForm.name = data.name
        this.editTreeForm.icon = data.icon
        this.editTreeForm.order = data.order
        this.editVisible = true
        this.treeChild = data
      },
      // ************数据左移************//
      toLeft () {
        request.addData(this.allDataSelection).then((data) => {
          console.log(data)
          this.selectPageIndex === 1 ? this.selectPageChange(1) : this.selectPageIndex = 1
          this.allPageIndex === 1 ? this.allPageChange(1) : this.allPageIndex = 1
        })
      },
      // ************数据右移************//
      toRight () {
        request.deleteData(this.selectDataSelection).then(() => {
          this.selectPageIndex === 1 ? this.selectPageChange(1) : this.selectPageIndex = 1
          this.allPageIndex === 1 ? this.allPageChange(1) : this.allPageIndex = 1
        })
      },
      // ************已选数据翻页************//
      selectPageChange (val) {
        request.selectDataPage(val).then(data => {
          this.selectData = data.member
          this.selectDataTotal = data.amount
        })
      },
      // ************所有数据翻页************//
      allPageChange (val) {
        request.allDataPage(val).then(data => {
          this.allData = data.employee
          this.allDataTotal = data.amount
        })
      },
      // ************所有数据搜索************//
      searchData (val) {
        request.setQueryStringValue(val)
        this.allPageIndex === 1 ? this.allPageChange(1) : this.allPageIndex = 1
      },
      // ************所有数据添加单条************//
      allDataSelectionChange (val) {
        this.allDataSelection = val
      },
      selectDataSelectionChange (val) {
        this.selectDataSelection = val
      },
      renderContent (h, { node, data, store }) {
        return (<span
        style="flex: 1; display: flex; align-items: center; justify-content: space-between; font-size: 14px; padding-right: 8px;" > <span>
          <span>{data.name}</span>
        </span>
        <span>
        <el-button
      class="fa fa-plus" v-show={!data.isPlus} style={{ fontSize: '14px' }} type="text" on-click={ () => this.append(data, event) }>
      </el-button>
        <el-button class="fa fa-edit" v-show={!data.isDel} style="font-size: 14px;margin-left: 5px;" type="text" on-click={ () => this.edit(node, data, event) }>
      </el-button>
        <el-button class="fa fa-trash-o" v-show={!data.isDel} style="font-size: 14px;margin-left: 5px;" type="text" on-click={ () => this.remove(node, data, event) }>
      </el-button>
        </span>
        </span>)
      }
    }
  }
</script>

<style scoped>
  p {margin: 0;}
  .item-box {padding: 0 5px;}
  .content-child {height: 350px;padding: 10px;box-sizing: border-box; }
  .content-child.content-table {padding: 0;}
  .foot a {color: #959798;}
  .search-box .el-input {width: 40%;max-width: 200px;position: absolute;right: 6px;top: 10px;}
  .tool-box {box-sizing: border-box;position: relative;padding: 20px;height: 434px;}
  .tool-box img{width: 100%;cursor: pointer;}
  .tool-box .middle-left{margin: 115px 0 20px 0;}
  .add-tree .el-input{display: inline-block;width: 250px;height: 30px;}
</style>
