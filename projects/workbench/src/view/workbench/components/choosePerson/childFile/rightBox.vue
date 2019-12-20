<template>
  <div>
    <el-table
      :data="data"
      style="width: 100%"
      highlight-current-row
      size="mini"
      stripe
      @row-click="changeColor"
      :header-cell-style="headCellStyle">
      <el-table-column
        prop="emp_name"
        label="姓名"
        width="180"
        align="center">
      </el-table-column>
      <el-table-column
        prop="emp_num"
        label="工号"
        width="180"
        align="center">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    props: ['data'],
    data () {
      return {
        headCellStyle: {textAlign: 'center'}
      }
    },
    methods: {
      changeColor (row, event, column) {
        this.$emit('choosePerson', row)
      }
    }
  }
</script>

<style>

</style>
