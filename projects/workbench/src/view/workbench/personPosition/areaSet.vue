<template>
  <div class="tp_entryInfo">
    <ibox title="区域设置">
      <el-tabs v-model="activeName" type="border-card" >
        <el-tab-pane label="区域列表" name="first">
          <area-list></area-list>
        </el-tab-pane>
        <el-tab-pane label="新增区域" name="second">
          <add-area></add-area>
        </el-tab-pane>
      </el-tabs>
    </ibox>
  </div>
</template>
<script>
  import ibox from '@/components/style/ibox.vue'
  import areaList from './areasetComponents/areaList.vue'
  import addArea from './areasetComponents/addArea.vue'
  export default {
    components: {ibox, areaList, addArea},
    data () {
      return {
        activeName: 'first'
      }
    }
  }
</script>
<style scoped>

</style>
