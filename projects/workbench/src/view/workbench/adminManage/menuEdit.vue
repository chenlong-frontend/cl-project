<template>
  <ibox title="功能配置">
    <el-row :gutter="10">
      <el-col :span="10">
        <ibox title="功能结构" class="cl-adminManage-menuEdit cl-ibox-dark">
          <div class="menu-content">
            <el-tree :default-expanded-keys="[-1]" v-loading="treeLoading" :data="treeData" ref="treeRef"
                     @current-change="getDataInTree" highlight-current node-key="id" :render-content="renderContent"></el-tree>
          </div>
        </ibox>
      </el-col>
      <el-col :span="14">
        <ibox title="编辑功能配置信息" class="cl-ibox-dark">
          <el-form ref="form" :model="form" size="small" label-width="100px">
            <el-form-item label="功能名称">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="是否启用">
              <el-radio-group v-model="form.is_use">
                <el-radio :label=true>是</el-radio>
                <el-radio :label=false>否</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="是否流程">
              <el-radio-group v-model="form.is_work">
                <el-radio :label=false>是</el-radio>
                <el-radio :label=true>否</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="平台选择">
              <el-radio-group v-model="form.platform">
                <el-radio :label="0">PC</el-radio>
                <el-radio :label="1">mobile</el-radio>
                <el-radio :label="2">通用</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="PC端URL">
              <el-input v-model="form.pc_url"></el-input>
            </el-form-item>
            <el-form-item label="APP端URL">
              <el-input v-model="form.url"></el-input>
            </el-form-item>
            <el-form-item label="APP端类型" v-show="form.url.length > 0">
              <el-select v-model="form.type" placeholder="请选择APP端类型">
                <el-option label="轻应用" :value=1></el-option>
                <el-option label="办公" :value=2></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="APP端图标" v-show="form.url.length > 0">
              <el-input v-model="form.icon"></el-input>
            </el-form-item>
            <el-form-item label="是否计数" v-show="form.url.length > 0">
              <el-radio-group v-model="form.to_count">
                <el-radio :label=true>是</el-radio>
                <el-radio :label=false>否</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="功能对应流程" v-show="form.is_work">
              <el-input v-model="form.flow_id"></el-input>
            </el-form-item>
            <el-form-item label="路由配置">
              <el-input v-model="form.router_json"></el-input>
            </el-form-item>
            <el-form-item label="子功能序号">
              <el-input v-model="form.premission_id"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="small" @click="submit">保存</el-button>
              <el-button size="small">取消</el-button>
            </el-form-item>
          </el-form>
        </ibox>
      </el-col>
    </el-row>
    <el-dialog
      :visible.sync="dialogVisible"
      title='新增功能'
      :append-to-body="true"
      width="400px">
      <div class="add-tree">
        <el-form :model="addTreeForm" :rules="rules" ref="addTreeForm" label-width="80px" class="demo-ruleForm">
          <el-form-item label="功能名称" prop="name">
            <el-input v-model="addTreeForm.name" size="small"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addTreeData('addTreeForm')">确 定</el-button>
      </span>
    </el-dialog>
  </ibox>
</template>
<script>
  import ibox from '@/components/style/ibox.vue'
  import request from '@/api/workbench/adminManage/menuEdit.js'
  export default {
    components: {ibox},
    mounted () {
      this.getTreeData()
    },
    data () {
      return {
        treeLoading: true,
        treeData: [{}],
        dialogVisible: false,
        addTreeForm: {
          name: ''
        },
        form: {
          p_id: '',
          id: '',
          name: '',
          is_use: '',
          is_work: '',
          url: '',
          pc_url: '',
          type: '',
          icon: '',
          flow_id: '',
          router_json: '',
          to_count: '',
          platform: '',
          premission_id: ''
        },
        rules: {
          name: { required: true, message: '名称不得为空', trigger: 'blur' }
        }
      }
    },
    methods: {
      submit () {
        request.submit(this.form).then(t => {
          if (t.code === 0) {
            this.$notify({
              title: '提示',
              message: '提交成功',
              type: 'success'
            })
            console.log(this.form.name)
            this.$refs.treeRef.getCurrentNode().name = this.form.name
          }
        })
      },
      // ***************请求树形数据(左侧)************//
      getTreeData () {
        request.getDataInTree().then(data => {
          this.treeData = data
          this.treeLoading = false
        })
      },
      // ***************请求树形结构内部数据(右侧)************//
      getDataInTree (data, node) {
        if (data.id === 1) return false
        request.getData(data).then(callBack => {
          for (let o in this.form) {
            this.form[o] = callBack[0][o]
          }
          this.form.id = data.id
          this.form.p_id = node.parent.data.id
        })
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
            let newChild = { name: this.addTreeForm.name, children: [] }
            request.addTree({parent: this.treeChild, data: newChild}).then((data) => {
              newChild.id = data.id
              newChild.isPlus = data.isPlus
              console.log(newChild)
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
      renderContent (h, { node, data, store }) {
        return (<span
        style="flex: 1; display: flex; align-items: center; justify-content: space-between; font-size: 14px; padding-right: 8px;" > <span>
          <span>{data.name}</span>
        </span>
        <span>
        <el-button
      class="fa fa-plus" v-show={!data.isPlus} style={{ fontSize: '14px' }} type="text" on-click={ () => this.append(data, event) }>
      </el-button>
        <el-button class="fa fa-trash-o" v-show={!data.isDel} style="font-size: 14px;" type="text" on-click={ () => this.remove(node, data, event) }>
      </el-button>
        </span>
        </span>)
      }
    }
  }
</script>

<style scoped>
  .menu-content {background: #FFFFFF;height: 400px;}
</style>
