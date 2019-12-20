<template>
  <div>
    <el-table
      :data="data"
      style="width: 100%"
      highlight-current-row
      size="mini"
      stripe
      :header-cell-style="headCellStyle"
      @row-click="clickOne">
      <el-table-column
        prop="name"
        label="工种"
        width="330"
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
      clickOne (row, event, column) {
        this.$emit('tableClick', row)
      }
    }
  }
</script>

<style>

</style>
