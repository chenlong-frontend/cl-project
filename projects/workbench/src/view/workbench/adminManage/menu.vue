<template>
  <ibox class="cl-transfer" title="菜单管理">
    <transfer :config="config" :title="transferTitle" :platform="0"></transfer>
  </ibox>
</template>
<script>
  import transfer from './menu/transferTwo.vue'
  import ibox from '@/components/style/ibox.vue'
  export default {
    name: 'menuWorkType',
    components: {transfer, ibox},
    data () {
      return {
        transferTitle: ['菜单管理', '菜单内功能', '可选功能', '菜单'],
        config: {
          treeType: 702,                    // 树结构请求接口
          treeAddType: 705,                // 树形结构添加数据接口
          editTree: 709,
          treeDeleteType: 704,            // 树形结构删除数据接口
          selectType: 703,                // 选择栏请求接口
          allType: 708,                   // 所有数据请求接口
          addToBox: 707,                // 给中间添加人员
          deleteFromBox: 706            // 给中间删除人员
        }
      }
    }
  }
</script>
