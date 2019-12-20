<template>
  <div class="towerMonitor">
    <el-container>
        <el-aside width="55%">
            <monitor-tab :towerID="this.towerID"></monitor-tab>
        </el-aside>
        <el-main width="45%">
            <tower-state1 :towerID="this.towerID"></tower-state1>
            <all-person-message :towerID="this.towerID"></all-person-message>
        </el-main>
    </el-container>
  </div>
</template>
<script>
import monitorTab from '@/view/workbench/tower/towerMonitor/monitorTab.vue'
import towerState1 from '@/view/workbench/tower/towerMonitor/towerState1.vue'
import allPersonMessage from '@/view/workbench/tower/towerMonitor/allPersonMessage.vue'
export default {
  name: 'towerMonitor',
//  props: ['showMonitor'],
  props: ['showMonitor', 'towerID'],
  components: {monitorTab, towerState1, allPersonMessage},
  data () {
    return {
//      towerID: '20180125135957001'
    }
  },
  mounted () {
    console.log('iiiii' + this.towerID)
  },
  created () {

  },
  methods: {

  }
}
</script>
<style scoped>

</style>


