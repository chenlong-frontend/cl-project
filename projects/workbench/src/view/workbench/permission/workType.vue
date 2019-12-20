<template>
  <ibox class="cl-transfer" title="工种管理">
    <transfer :config="config" :title="transferTitle"></transfer>
  </ibox>
</template>
<script>
  import transfer from '@/view/workbench/components/transferTwo.vue'
  import ibox from '@/components/style/ibox.vue'
  export default {
    name: 'permissionWorkType',
    components: {transfer, ibox},
    data () {
      return {
        transferTitle: ['工种管理', '工种内人员', '可选人员', '工种'],
        config: {
          treeType: 321,                    // 树结构请求接口
          treeAddType: 322,                // 树形结构添加数据接口结构删除数据接口
          editTree: 308,
          selectType: 324,                // 选择栏请求接口
          allType: 327,                   // 所有数据请求接
          treeDeleteType: 323,            // 树形口
          addToBox: 326,                // 给中间添加人员
          deleteFromBox: 325            // 给中间删除人员
        }
      }
    }
  }
</script>
