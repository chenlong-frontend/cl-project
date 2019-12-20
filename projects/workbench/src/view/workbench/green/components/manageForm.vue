<template>
  <div>
    <div>
      <el-button type="primary" size="small" icon="el-icon-plus" plain  @click="addData">新增</el-button>
      <el-button type="primary" :disabled="multipleSelection.length !== 1"
                 size="small" icon="el-icon-edit" plain @click="editData">修改</el-button>
      <el-button type="primary" :disabled="multipleSelection.length === 0"
                 size="small" icon="el-icon-delete" plain  @click="deleteData">删除</el-button>
    </div>
    <div class="table">
      <el-table size="small" :header-cell-style="{color: '#3a84b7'}" ref="multipleTable"
                :data="tablePage" @selection-change="handleSelectionChange" style="width: 100%">
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column prop="label" :label="title">
        </el-table-column>
      </el-table>
    </div>
    <div class="bottom-page" v-if="data.length > 0">
      <el-pagination
        layout="prev, pager, next" :total="data.length" :current-page.sync="page" :page-size="5">
      </el-pagination>
    </div>
  </div>
</template>
<script>
  import ibtn from '@/components/style/ibtn.vue'
  export default {
    props: ['data', 'title'],
    components: {ibtn},
    data () {
      return {
        multipleSelection: [],
        page: 1
      }
    },
    computed: {
      tablePage () {
        return this.data.slice(5 * (this.page - 1), this.page * 5)
      }
    },
    methods: {
      handleSelectionChange (val) {
        this.multipleSelection = val
      },
      addData () {
        this.$prompt('请输入新增信息名称', this.title, {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(({ value }) => {
          this.$emit('addTag', value)
        }).catch(() => {})
      },
      editData () {
        this.$prompt('请输入修改后信息名称', this.title, {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(({ value }) => {
          this.$emit('editTag', {val: value, oldVal: this.multipleSelection[0]})
        }).catch(() => {})
      },
      deleteData () {
        this.$confirm('此操作将永久删除该信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$emit('deleteTag', this.multipleSelection)
        }).catch(() => {})
      }
    }
  }
</script>

<style scoped>
  .table {margin: 15px 0;width: 100%;}
  .bottom-page {text-align: center;}
</style>
