<template>
  <div class="jimb-item-manage">
    <ibox title="项目管理">
      <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
        <el-tab-pane label="项目管理" name="adminTable">
          <!--<component-->
          <!--v-bind:is="activeName"-->
          <!--@changecontent="changecomponent"-->
          <!--@changeback1="changeback2"-->
          <!--&gt;</component>-->
          <admin-table @changecontent="changecomponent" ref="adminTable"></admin-table>
        </el-tab-pane>
        <el-tab-pane :label="label1" name="newItem">
          <!--<component-->
          <!--v-bind:is="activeName"-->
          <!--@changecontent="changecomponent"-->
          <!--@changeback1="changeback2"-->
          <!--&gt;</component>-->
          <new-item @changeback1="changeback2" ref="newItem"></new-item>
        </el-tab-pane>
      </el-tabs>
    </ibox>
  </div>
</template>

<script>
  import ibox from '@/components/style/ibox.vue'
  import adminTable from './management/adminTable.vue'
  import newItem from './management/newItem.vue'
  export default {
    components: { ibox, adminTable, newItem },
    data () {
      return {
        activeName: 'adminTable',
        label1: '新增项目'
//        name1: 'StaffIncrement'
      }
    },
    methods: {
      handleClick (tab, event) {
        console.log(tab.name)
//        console.log(tab, event)
      },
      changecomponent () {
        this.label1 = '项目信息详情'
//        this.name1 = 'userIterm'
        this.activeName = 'newItem'
        this.$refs.newItem.getdata()
      },
      changeback2 () {
        this.label1 = '新增项目'
//        this.name1 = 'UserTable'
        this.activeName = 'adminTable'
        this.$refs.adminTable.getInit()
      }
    }
  }
</script >
