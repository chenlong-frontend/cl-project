<template>
  <div class="allPersonMessage">
      <h4>塔吊所有人信息</h4>
      <span class="seeDetail" @click="editInfo()">点击查看详情</span>
      <p class="left">所在公司：<span>{{mess.company}}</span> </p>
      <p class="left">操作员： <span>{{mess.operator}}</span> </p>
      <p class="left">主要负责人： </p>
        <div class="mainPerson">
            <p>姓名：  <span>{{mess.name}}</span></p>
            <p>入职时间： <span>{{mess.time}}</span></p>
            <p>联系方式： <span>{{mess.phone}}</span></p>
        </div>
    <el-dialog title="塔吊基本信息"
               :visible.sync="addDialogVisible"
               :append-to-body= "true"
               :before-close="beforeClose"
               width="1000px">
      <add-tower ref="towerForm" :clickid="this.towerID" @submitFnc="submitFnc"></add-tower>
    </el-dialog>
  </div>
</template>
<script>
import request from '@/api/workbench/tower/towerMonitor/allPersonMessage.js'
import addTower from '@/view/workbench/tower/addTower.vue'
export default {
  components: {addTower},
  name: 'allPersonMessage',
  props: ['towerID'],
  mounted () {
//    console.log('kkkk' + this.towerID)
    this.getPersonInfo()
  },
  data () {
    return {
      mess: {
        company: '江苏省徐州市文翠园***公司',
        operator: '张三；李四',
        name: '王二',
        time: '2018-1-15',
        phone: '13328070340'
      },
      addDialogVisible: false
    }
  },
  methods: {
    getPersonInfo () {
      request.getPersonInfo(this.towerID).then(
        data => {
          if (data.data.code === 0) {
            this.mess = data.data.data.mess
          } else this.$message.error('获取失败')
        },
        error => {
          console.log(error)
        }
      )
    },
    beforeClose (done) {
      console.log('22222222')
      this.$refs.towerForm.init(this.towerID)
      done()
    },
    editInfo () {
      this.addDialogVisible = true
    },
    submitFnc (val) {
      if (val) {
        this.addDialogVisible = !val
        // 成功提价后的回调，重新加载该页面相关信息
      }
    }
  }
}
</script>
<style scoped>
.allPersonMessage{
  width:100%;
  height: 240px;
  background-color: #EBEBEB;
  padding:10px;
  margin-top: 20px;
  margin-left: 20px;
  box-sizing: border-box;
  position: relative;
}
.allPersonMessage h4{
  margin:0px;
}
.allPersonMessage .seeDetail{
  position: absolute;
  right: 20px;
  top:10px;
  color:aqua;
  cursor: pointer;
}
.allPersonMessage .left {
  margin-left: 20px;
  color:#A5A5A5;
}
.allPersonMessage .mainPerson{
  margin-left: 100px;
  margin-top: -20px;
}
.allPersonMessage .mainPerson p{
  margin:0px;
  padding:0px;
}
</style>
