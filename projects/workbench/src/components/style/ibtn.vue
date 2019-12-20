<template>
  <el-button
    type="primary"
    size="small"
    :icon="styleName"
    plain
  >{{this.msg}}</el-button>
</template>
<script>
  export default {
    props: ['styleName', 'msg']
  }
</script>
<style scoped>
</style>
