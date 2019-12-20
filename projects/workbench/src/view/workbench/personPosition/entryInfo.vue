<template>
  <div class="tp_entryInfo">
    <ibox title="信息录入与对接">
      <el-tabs v-model="activeName" type="border-card" >
        <el-tab-pane label="安全帽相关信息" name="first">
          <helmet-table></helmet-table>
        </el-tab-pane>
        <el-tab-pane label="新增安全帽" name="second">
          <add-helmet></add-helmet>
        </el-tab-pane>
        <el-tab-pane label="安全帽批量导入" name="third">
          <imp-helmet></imp-helmet>
        </el-tab-pane>
      </el-tabs>
    </ibox>
  </div>
</template>
<script>
  import ibox from '@/components/style/ibox.vue'
  import helmetTable from './entryinfoComponents/helmetTable.vue'
  import addHelmet from './entryinfoComponents/addHelmet.vue'
  import impHelmet from './entryinfoComponents/importHelmet.vue'
  export default {
    components: {ibox, helmetTable, addHelmet, impHelmet},
    data () {
      return {
        activeName: 'first'
      }
    }
  }
</script>
<style scoped>

</style>
