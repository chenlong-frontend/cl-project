<template>
<div>
  <el-tree :data="data"
           :props="defaultProps"
           @node-click="handleNodeClick"
           ref="tree"
           highlight-current>
  </el-tree>
</div>
</template>

<script>
  export default {
    props: ['data'],
    data () {
      return {
        defaultProps: {
          children: 'children',
          label: 'name'
        }
      }
    },
    methods: {
      handleNodeClick (data) {
        this.$emit('treeClick', data)
      },
      ss () {
        this.$refs.tree.getCurrentNode()
      }
    }
  }
</script>

<style>

</style>
