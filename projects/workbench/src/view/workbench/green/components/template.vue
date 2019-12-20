<template>
  <div class="quality">
    <ibox :title="title">
      <!--*****************按钮*******************-->
      <action @addClick="dialog.addVisible = true" @editClick="editBtnClick" :count="parseInt(checkTableData.count)"
              :dataExtra="actionExtraData" @typeChange="actionTypeChange" :tableSelectLen="tableSelect.length"
              :proData="actionProData" @proChange="proChange"
              @timeChange="actionTimeChange" @searchChange="actionSearchChange"
              @searchClick="actionSearchClick" @pageChange="actionPageChange"
              @deleteClick="deleteClick" @manageClick="dialog.manageVisible = true;getTagData()"
              ref="actionRef">
        <!--*****************表格*******************-->
        <check-table
          title='奖项' @selection='editFormSelection' :data="checkTableData"></check-table>
      </action>
    </ibox>
    <el-dialog title="新建进展记录" :append-to-body="true" :visible.sync="dialog.addVisible" width="600px">
      <!--*****************新增*******************-->
      <add-form ref="addFormRef" title="奖项" :dataExtra="actionExtraData"></add-form>
      <span slot="footer" class="dialog-footer">
            <el-button @click="dialog.addVisible = false">取 消</el-button>
            <el-button type="primary" @click="addFormSubmit">确 定</el-button>
        </span>
    </el-dialog>
    <el-dialog title="修改进展记录" :visible.sync="dialog.editVisible" :before-close="editClose" width="600px">
      <!--*****************修改*******************-->
      <edit-form ref="editFormRef" :tableSelect="tableSelect[0]" title="奖项" :dataExtra="actionExtraData"></edit-form>
      <span slot="footer" class="dialog-footer">
              <el-button @click="dialog.editVisible = false">取 消</el-button>
              <el-button type="primary" @click="editFormSubmit">确 定</el-button>
          </span>
    </el-dialog>
    <el-dialog :title="`管理${title}目录`" :visible.sync="dialog.manageVisible" width="780px">
      <!--*****************管理目录*******************-->
      <manage-form
        :data="actionExtraData" :title="title"
        @addTag="addTag" @editTag="editTag" @deleteTag="deleteTag"
      ></manage-form>
      <span slot="footer" class="dialog-footer">
              <el-button @click="dialog.manageVisible = false">返 回</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<script>
  import ibox from '@/components/style/ibox.vue'
  import checkTable from './checkTable.vue'
  import action from './action.vue'
  import addForm from './addForm.vue'
  import editForm from './editForm.vue'
  import manageForm from './manageForm.vue'
  import request from '@/api/request'
  export default {
    props: ['title', 'category'],
    components: {ibox, checkTable, action, addForm, manageForm, editForm},
    mounted () {
      this.getTableData()
      this.getTagData()
      request({type: 814, data: {page_index: 0, page_size: 100000}}).then(val => {
        this.actionProData = val.project
      })
    },
    data () {
      return {
        dialog: {
          addVisible: false,
          editVisible: false,
          manageVisible: false
        },
        actionData: {
          award_id: '',
          start_time: '',
          search_key: '',
          page_size: '8',
          pro_id: '',
          category: this.category,
          page_index: 0
        },
        actionExtraData: [],
        actionProData: [],
        checkTableData: {award: [], count: 0},
        tableSelect: []
      }
    },
    methods: {
      getTagData () {
        request({type: '1504', data: {'all': true, 'category': this.category}}).then(t => {
          this.actionExtraData = t.award.map(t => ({value: t.id, label: t.name}))
        })
      },
      getTableData () {
        this.actionData.start_time = this.actionData.start_time || ''
        request({type: '1514', data: this.actionData}).then(t => {
          t.award = t.award.map(t => {
            t.pic = t.pic || ''
            return t
          })
          this.checkTableData = t
        })
      },
      actionTypeChange (val) {
        this.actionData.award_id = val
        this.getTableData()
      },
      actionTimeChange (val) {
        this.actionData.start_time = val
        this.getTableData()
      },
      actionSearchClick () {
        this.actionData.page_index === 0 ? this.getTableData() : this.$refs.actionRef.setPage(0)
      },
      actionPageChange (val) {
        if (this.actionData.page_index !== val) {
          this.actionData.page_index = val
          this.getTableData()
        }
      },
      proChange (val) {
        this.actionData.pro_id = val
        this.getTableData()
      },
      actionSearchChange (val) { this.actionData.search_key = val },
      addTag (val) {
        request({type: '1501', data: {'award_name': val, 'award_category': this.category}}).then(t => {
          this.$notify({title: '成功', message: `${val}新增成功`, type: 'success'})
          this.getTagData()
        })
      },
      editTag (val) {
        console.log(val)
        request({type: '1502', data: {'award_name': val.val, 'award_id': val.oldVal.value}}).then(t => {
          this.$notify({title: '成功', message: '修改成功', type: 'success'})
          this.getTagData()
        })
      },
      deleteTag (val) {
        request({type: '1503', data: {'award_id': val.map(t => (t.value))}}).then(t => {
          this.$notify({title: '成功', message: `成功删除${val.length}条数据`, type: 'success'})
          this.getTagData()
        })
      },
      deleteClick () {
        this.$confirm('此操作将永久删除该信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          request({type: '1513', data: {record_id: this.tableSelect.map(t => (t.id))}}).then(t => {
            this.$notify({title: '成功', message: '删除成功', type: 'success'})
            this.getTableData()
          })
        }).catch(() => {})
      },
      addFormSubmit () {
        let param = this.$refs.addFormRef.getForm()
        param.award_id = param.select
        param.category = this.category
        param.pic = param.pic.join(';')
        request({type: '1511', data: param}).then(t => {
          this.$notify({title: '成功', message: '新增成功', type: 'success'})
          this.$refs.addFormRef.formReset()
          this.getTableData()
        })
        this.dialog.addVisible = false
      },
      editFormSelection (val) {
        this.tableSelect = val
      },
      editFormSubmit () {
        let param = this.$refs.editFormRef.getForm()
        param.category = this.category
        param.record_id = this.tableSelect[0].id
        param.end_time = param.end_time || ''
        param.start_time = param.start_time || ''
        console.log(param)
        request({type: '1512', data: param}).then(t => {
          this.$notify({title: '成功', message: '修改成功', type: 'success'})
          this.getTableData()
        })
        this.$refs.editFormRef.formReset()
        this.dialog.editVisible = false
      },
      editClose (done) {
        this.$refs.editFormRef.formReset()
        done()
      },
      editBtnClick () {
        this.dialog.editVisible = true
        if (this.$refs.editFormRef) this.$refs.editFormRef.formInit()
      }
    }
  }
</script>
