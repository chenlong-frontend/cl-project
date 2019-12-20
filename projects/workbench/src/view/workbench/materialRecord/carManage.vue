<template>
<div class="jinm-carInfo">
  <ibox title="车辆信息管理">
    <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick" >
      <el-tab-pane label="运输车辆详情" name="carInfo">
        <carInfo ref="carInfo"></carInfo>

      </el-tab-pane>
      <el-tab-pane label="新增车辆信息" name="newCar">
        <newCar @changeContent="callback"></newCar>
      </el-tab-pane>

      <el-tab-pane label="批量导入导出" name="importInfo">
        <importInfo></importInfo>

      </el-tab-pane>
    </el-tabs>
  </ibox>
</div>
</template>

<script>
  import ibox from '@/components/style/ibox.vue'
  import carInfo from './carManage/carInfo.vue'
  import newCar from './carManage/newCar.vue'
  import importInfo from './carManage/importInfo.vue'
  export default {
    components: { ibox, carInfo, newCar, importInfo },
    data () {
      return {
        activeName: 'carInfo'
      }
    },
    methods: {
      // *********************tab切换********************
      handleClick () {

      },
      callback () {
        this.activeName = 'carInfo'
        this.$refs.carInfo.getTable()
      }
    }
  }
</script>

<style>

</style>
