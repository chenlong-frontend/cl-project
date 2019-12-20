<template>
  <div class="gyw-staff-department">
    <ibox title="人员管理">
      <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
        <el-tab-pane label="人员信息列表" name="UserTable">
          <user-table  @changecontent="changecomponent" ref="redefUt"></user-table>
        </el-tab-pane>
        <!--<el-tab-pane label="新增集团人员" name="StaffIncrement">-->
        <el-tab-pane :label="label1" name="StaffIncrement">
          <staff-increment :companyLevel="companyLevel" :companyName="companyName" @changeback1="changeback2" ref="redefSt"></staff-increment>
        </el-tab-pane>
        <el-tab-pane label="人员调配" name="choosePerson">
          <choose-person></choose-person>
        </el-tab-pane>
        <el-tab-pane label="人员批量导入" name="multipleImport">
          <multiple-import></multiple-import>
        </el-tab-pane>
        <!--<component-->
          <!--v-bind:is="activeName"-->
          <!--@changecontent="changecomponent"-->
          <!--@changeback1="changeback2"-->
          <!--:ref="activeName"-->
          <!--:leaveFlag = leaveFlag-->
        <!--&gt;</component>-->
        <!--<el-tab-pane label="暂定" name="fourth">暂定</el-tab-pane>-->
      </el-tabs>
      <el-dialog
        title="提示"
        :visible.sync="centerDialogVisible"
        width="30%"
        center
        :modal-append-to-body= false
      >
        <span style="margin-left:50px;">检测到有尚未保存的数据，是否离开</span>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="jump(true)">是</el-button>
          <el-button type="primary" @click="jump(false)">否</el-button>
          <!--<el-button type="primary"  @click="change2submit('userForm')">确 定</el-button>-->
  </span>
      </el-dialog>
    </ibox>
  </div>

</template>
<script>
  import UserTable from './department/userTable.vue'
  import StaffIncrement from './department/staffIncrement.vue'
  import userIterm from './department/userIterm.vue'
  import multipleImport from './department/multipleImport.vue'
  import ibox from '@/components/style/ibox.vue'
  import choosePerson from './department/choosePerson.vue'
  import { mapGetters, mapMutations } from 'vuex'
//  import staffIncrement from '../../api/staff/department/staffIncrement'

 // import ibox from '@/components/department/testcomponent.vue'
  export default {
    components: {UserTable, StaffIncrement, userIterm, ibox, multipleImport, choosePerson},
    created () {
//      this.setCookie('manage_name', '中江国际集团', 1)
//      this.setCookie('manage_type', '集团管理', 1)
      this.companyName = this.getCookie('manage_name')
      if (this.getCookie('manage_type') !== '集团管理') {
        this.label1 = '新增公司人员'
        this.companyLevel = '公司'
      }
//      console.log(document.cookie)
    },
    data () {
      return {
        activeName: 'UserTable',
        label1: '新增集团人员',
        centerDialogVisible: false,
        path: '',
        forbiddenLeave: true,
        companyLevel: '集团',
        companyName: ''
      }
    },
    beforeRouteLeave (to, from, next) {
      if (this.$refs.redefSt.jumpValid() && this.forbiddenLeave) {
        this.centerDialogVisible = true
        this.path = to.path
        next(false)
      } else {
        this.changeUserTableId('0')
        next(true)
      }
    },
    computed: {
      ...mapGetters('department', ['checkoutUsertableId', 'isChanged', 'isupdata'])
    },
    methods: {
      jump (val) {
        if (val) {
          console.log(val)
          this.changeUserTableId('0')
          this.centerDialogVisible = false
          console.log(this.path)
          this.forbiddenLeave = false
          this.$router.replace({path: this.path})
        } else {
          this.centerDialogVisible = false
        }
      },
      ...mapMutations('department', ['changeUserTableId', 'changeFlag', 'changeUpdate']),
      handleClick (tab, event) {
        console.log(event)
        console.log(tab.name)
//        if (tab.name === 'StaffIncrement') {
//          console.log('获取数据')
//          this.$refs.redefSt.getdata()
//        }
        if (tab.name === 'UserTable') {
          if (this.isupdata) {
            console.log('重置table数据')
            this.$refs.redefUt.getDataFirst()
          }
        }
      },
      changecomponent () {
        this.label1 = '人员信息详情'
        this.$refs.redefSt.getdata()
        this.activeName = 'StaffIncrement'
      },
      changeback2 () {
        if (this.isupdata) {
          console.log('重置table数据')
          this.$refs.redefUt.getDataFirst()
        }
        this.$refs.redefSt.getdata()
        if (this.getCookie('manage_type') !== '集团管理') {
          this.label1 = '新增公司人员'
        } else {
          this.label1 = '新增集团人员'
        }
        this.activeName = 'UserTable'
      },
      // 设置cookie
      setCookie: function (cname, cvalue, exdays) {
        var d = new Date()
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000))
        var expires = 'expires=' + d.toUTCString()
        console.info(cname + '=' + cvalue + '; ' + expires)
        document.cookie = cname + '=' + cvalue + '; ' + expires
        console.info(document.cookie)
      },
      // 获取cookie
      getCookie: function (cname) {
        var name = cname + '='
        console.log(document.cookie)
        var ca = document.cookie.split(';')
        for (var i = 0; i < ca.length; i++) {
          var c = ca[i]
          while (c.charAt(0) === ' ') c = c.substring(1)
          if (c.indexOf(name) !== -1) return c.substring(name.length, c.length)
        }
        return ''
      },
      checkCookie: function () {
        var user = this.getCookie('username')
        if (user !== '') {
          alert('Welcome again ' + user)
        } else {
          user = prompt('Please enter your name:', '')
          if (user !== '' && user != null) {
            this.setCookie('username', user, 365)
          }
        }
      }
    }
  }
</script>
