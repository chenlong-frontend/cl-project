<template>
  <ibox class="cl-transfer" title="部门管理">
  <transfer :config="config" :title="transferTitle"></transfer>
  </ibox>
</template>
<script>
  import transfer from '@/view/workbench/components/transferTwo.vue'
  import ibox from '@/components/style/ibox.vue'
  export default {
    name: 'permissionDepartment',
    components: {transfer, ibox},
    data () {
      return {
        transferTitle: ['部门管理', '部门内人员', '可选人员', '部门'],
        config: {
          treeType: 310,                    // 树结构请求接口
          treeAddType: 303,                // 树形结构添加数据接口
          editTree: 307,
          treeDeleteType: 304,            // 树形结构删除数据接口
          selectType: 311,                // 选择栏请求接口
          allType: 312,                   // 所有数据请求接口
          addToBox: 302,                // 给中间添加人员
          deleteFromBox: 305            // 给中间删除人员
        }
      }
    }
  }
</script>
