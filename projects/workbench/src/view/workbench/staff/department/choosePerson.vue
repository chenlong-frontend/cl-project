<template>
  <transfer :config="config" :title="transferTitle" class="cl-transfer"></transfer>
</template>
<script>
  import transfer from '@/view/workbench/components/transferTwo.vue'
  import ibox from '@/components/style/ibox.vue'
  export default {
    name: 'permissionDepartment',
    components: {transfer, ibox},
    data () {
      return {
        transferTitle: ['父级项目部门', '部门内人员', '部门人员', '部门'],
        config: {
          treeType: 313,                    // 树结构请求接口
//          treeAddType: 303,                // 树形结构添加数据接口
//          editTree: 307,
//          treeDeleteType: 304,            // 树形结构删除数据接口
          selectType: 315,                // 选择栏请求接口
          allType: 314,                   // 所有数据请求接口
          addToBox: 317,                // 给中间添加人员
          deleteFromBox: 316            // 给中间删除人员
        }
      }
    }
  }
</script>
