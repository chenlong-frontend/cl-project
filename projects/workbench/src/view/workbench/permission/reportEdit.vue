<template>
<ibox title="报表配置" class="jinm-reportEdit">
  <transfer :title="title"></transfer>
</ibox>
</template>

<script>
  import ibox from '@/components/style/ibox.vue'
  import transfer from '@/view/workbench/components/transferFour.vue'
  export default {
    components: { ibox, transfer },
    data () {
      return {
        title: ['姓名', '工号', '现有报表', '待添加报表', '报表名称', '报表ID']
      }
    }
  }
</script>

<style>

</style>
