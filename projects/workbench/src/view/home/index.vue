<template>
    <el-container>
      <el-header height="133px">
        <div class="header">
          <div class="head-left">
            <img src="../../assets/img/menu/head03.svg" />
          </div>
          <div class="head-right">
            <img class="text" src="../../assets/img/menu/head02.svg"/>
            <img class="bg" src="../../assets/img/menu/head01.png"/>
          </div>
        </div>
        <div class="user-info">
          <div class="info-left">
            <img v-header-load="leader.emp_avatar" class="userImg">
            <div class="user-text">
              <el-dropdown class="leader-detail" @command="userTool">
              <span class="el-dropdown-link">
                 <span class="name">{{leader.name}}</span> <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="personal">个人资料</el-dropdown-item>
                  <el-dropdown-item command="changepwd">修改密码</el-dropdown-item>
                  <el-dropdown-item command="contact">联系我们</el-dropdown-item>
                  <el-dropdown-item command="setIndex">设置首页</el-dropdown-item>
                  <el-dropdown-item command="toLogin" divided>退出登录</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
              <p class="possion">{{leader.project_name}}   {{leader.emp_post}}</p>
            </div>
            <span class="line"></span>
            <a class="enter-manage"><img src="../../assets/img/home/build.png"/><span @click="intoCompany" >{{Name}}</span></a>
          </div>
        </div>
      </el-header>
      <el-main>
        <el-row :gutter="20">

          <el-col :span="12">
            <ibox :title="Count" >
              <div class="item-content" id="leftTop">
                <h5 class="item-content-title">{{date}} <span style="margin-left: 10px;">{{Time}}</span></h5>
                <div class="count">
                  <el-row :gutter="20">
                    <el-col :span="6" >
                      <div class="grid-content bg-purple">
                        <div class="circle-text" @click="dialog.subbuildPro = true ,toDialogData = {state: toDialogKey.build, id: toDialogKey.pId}">
                          <p class="small">在建项目</p>
                          <p><strong>{{fourCirData.building_num}}</strong></p>
                          <p class="small">个</p>
                        </div>
                      </div>
                    </el-col>
                    <el-col :span="6">
                      <div class="grid-content bg-purple">
                        <div class="circle-text danger" @click="dialog.subnotPro = true ,toDialogData = {state: toDialogKey.not, id: toDialogKey.pId}">
                          <p class="small">未开工项目 </p>
                          <p><strong>{{fourCirData.not_start_num}}</strong></p>
                          <p class="small">个</p>
                        </div>
                      </div>
                    </el-col>
                    <el-col :span="6">
                      <div class="grid-content bg-purple">
                        <div class="circle-text primary" @click="dialog.subdonePro = true ,toDialogData = {state: toDialogKey.done, id: toDialogKey.pId}">
                          <p class="small">竣工项目</p>
                          <p><strong>{{fourCirData.done_num}}</strong></p>
                          <p class="small">个</p>
                        </div>
                      </div>
                    </el-col>
                    <el-col :span="6">
                      <div class="grid-content bg-purple">
                        <div class="circle-text warning">
                          <p class="small">项目总人数</p>
                          <p><strong>{{fourCirData.human_num}}</strong></p>
                          <p class="small">人</p>
                        </div>
                      </div>
                    </el-col>
                  </el-row>
                </div>
              </div>
            </ibox>

            <ibox  :title="Project" class="left-bottom" id="leftBottom">
              <div class="company" v-if="toDialogKey.build === 'build'" >
                <el-select v-model="addressProject" size="mini" @focus="getaddressProject()" @change="changeProject()">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.label">
                  </el-option>
                </el-select>
                <div class="projectsBox">
                  <div class="pro" @click="showDetails(item.id)"  v-for="(item,index) in companyproData" :key="index">
                    <p class="name" :class="item.pro_num === 0 ? 'noPro' : 'havePro'">{{item.name}}</p>
                    <p v-if="item.pro_num === 0" class="num" :class="item.pro_num === 0 ? 'noPro' : 'havePro'">暂无项目</p>
                    <p class="num" v-if="item.pro_num !== 0"> <span>{{item.pro_num}}</span> 个项目</p>
                    <p v-if="item.pro_num !== 0"> <span class="build" >在建{{item.building_num}}</span> <span class="over">竣工{{item.done_num}}</span></p>
                  </div>
                </div>
              </div>
              <div class="projectCondition" v-if="toDialogKey.build === 'subbuild'" >
                  <div class="left">
                    <el-tabs type="border-card" >
                      <el-tab-pane label="项目详情" >
                          <div class="proDetail">
                            <div class="imgBox">
                              <img :src='subCompanyProDeatil.preview_pic' alt="项目图片" v-if='subCompanyProDeatil.preview_pic'>
                              <img :src='subCompanyProDeatil.original_pic' alt="项目图片" v-if='subCompanyProDeatil.original_pic'>
                            </div>
                            <div class="projectIntro">
                              <h4 v-if='subCompanyProDeatil.preview_pic'>{{subCompanyProDeatil.pro_name}}</h4>
                              <h4 v-if='subCompanyProDeatil.original_pic'>{{subCompanyProDeatil.name}}</h4>
                              <p><span class="introLeft">开工日期：</span><span class="introRight">{{subCompanyProDeatil.start_time}}</span></p>
                              <p><span class="introLeft">项目经理：</span><span class="introRight">{{subCompanyProDeatil.manager}}</span></p>
                              <p><span class="introLeft">地址：</span><span class="introRight">{{subCompanyProDeatil.address}}</span></p>
                            </div>
                            <el-row class="CirBox">
                              <el-col :span="8">
                                <div class="circle-text miniCircle">
                                  <p>项目总人数</p>
                                  <p class="number">{{subThreeCiecle.human_count}}</p>
                                  <p>个</p>
                                </div>
                              </el-col>
                              <el-col :span="8">
                                <div class="circle-text miniCircle danger">
                                  <p>实时在场</p>
                                  <p class="number">{{subThreeCiecle.live_count}}</p>
                                  <p>个</p>
                                </div>
                              </el-col>
                              <el-col :span="8">
                                <div class="circle-text miniCircle warning">
                                  <p>累计进场</p>
                                  <p class="number">{{subThreeCiecle.accumulate_count}}</p>
                                  <p>人</p>
                                </div>
                              </el-col>
                            </el-row>
                          </div>
                      </el-tab-pane>
                    </el-tabs>
                  </div>
                  <div class="right">
                    <div class="right-box">
                      <el-tabs v-model="chooseProject" type="border-card" @tab-click="handleClick">
                        <el-tab-pane label="选择项目" name="first">
                          <projectTable :tabindex="tabIndex" v-if="show" @tableDetail='dataFromTable'></projectTable>
                        </el-tab-pane>
                        <el-tab-pane label="我参加的项目" name="second">
                          <projectTable :tabindex="tabIndex" v-if="!show" @tableDetail='dataFromTable' ></projectTable>
                        </el-tab-pane>
                      </el-tabs>
                    </div>

                  </div>
              </div>
            </ibox>
          </el-col>

          <el-col :span="12">
            <ibox title="地图" >
              <div class="map" ref="mapBox">
                <MapEChart/>
              </div>
            </ibox>
          </el-col>
        </el-row>
      </el-main>

      <el-dialog
        title="在建项目统计详情"
        :visible.sync="dialog.buildPro"
        width="80%"
      >
        <projectDetail :toDialog="toDialogData"></projectDetail>
      </el-dialog>
      <el-dialog
        title="未开工项目详情"
        :visible.sync="dialog.notPro"
        width="80%"
      >
        <projectDetail :toDialog="toDialogData"></projectDetail>
      </el-dialog>
      <el-dialog
        title="竣工项目详情"
        :visible.sync="dialog.donePro"
        width="80%"
      >
        <projectDetail :toDialog="toDialogData"></projectDetail>
      </el-dialog>
      <el-dialog
        title="查看选择项目"
        :visible.sync="dialog.choosePro"
        width="80%"
      >
        <projectDetail :toDialog="toDialogData"></projectDetail>
      </el-dialog>
      <el-dialog
        title="在建项目统计详情"
        :visible.sync="dialog.subbuildPro"
        width="80%"
      >
        <projectDetail :toDialog="toDialogData"></projectDetail>
      </el-dialog>
      <el-dialog
        title="未开工项目详情"
        :visible.sync="dialog.subnotPro"
        width="80%"
      >
        <projectDetail :toDialog="toDialogData"></projectDetail>
      </el-dialog>
      <el-dialog
        title="竣工项目详情"
        :visible.sync="dialog.subdonePro"
        width="80%"
      >
        <projectDetail :toDialog="toDialogData"></projectDetail>
      </el-dialog>
<!-- 设置用户信息部分 -->
      <!--密码修改-->
      <el-dialog
        title="密码修改"
        :visible.sync="flag.changePwd"
        width="30%"
      >
        <change-pwd @sent-pwd="getChangePwd"></change-pwd>
      </el-dialog>
      <!--个人中心-->
      <el-dialog
        title="个人资料"
        :visible.sync="flag.changeMsg"
        width="50%"
        style="margin-top: -50px"
      >
        <show-msg @close-msg="closeShowMsg" @change-msg="changeEditMsg"></show-msg>
      </el-dialog>
      <!--联系我们-->
      <el-dialog
        title="联系我们"
        :visible.sync="flag.contactUs"
        width="40%"
      >
        <contact-us @close-contact="closeContact"></contact-us>
      </el-dialog>
      <!--退出登陆-->
      <el-dialog
        title="退出提示"
        :visible.sync="flag.logoutflag"
        width="30%"
      >
        <span style="margin-left: 25%; font-size: 18px;">您确认退出吗？</span>
        <span slot="footer" class="dialog-footer">
        <el-button @click="flag.logoutflag = false">取 消</el-button>
        <el-button type="primary" @click="confirmLogOut">确 定</el-button>
      </span>
      </el-dialog>
      <!--设置首页-->
      <el-dialog
        title="设置首页"
        :visible.sync="flag.indexSetting"
        width="30%"
      >
        <set-index @close-set="closeSettingFlag" @change-set="settingChange"></set-index>
      </el-dialog>
    </el-container>
</template>
<script>
import request from '@/api/home/home.js'
import ibox from '@/components/style/ibox.vue'
import showMsg from '@/components/comm/showMsg.vue'
import changePwd from '@/components/comm/changePwd.vue'
import contactUs from '@/components/comm/contactUs.vue'
import setIndex from '@/components/comm/setIndex.vue'
import projectDetail from '@/components/comm/proDetailDialog.vue'
import projectTable from '@/components/comm/projectTable.vue'
import MapEChart from './components/map.vue'
export default {
  name: 'home',
  components: {ibox, changePwd, showMsg, contactUs, setIndex, projectDetail, projectTable, MapEChart},
  data () {
    return {
      name: '',
      count: '',
      project: '',
      leader: {},
      fourCirData: {},
      subThreeCiecle: {
        human_count: '',
        live_count: '',
        accumulate_count: ''
      },
      date: new Date().toLocaleDateString(),
      time: '',
      dialog: {
        choosePro: false,
        buildPro: false,
        notPro: false,
        donePro: false,
        subbuildPro: false,
        subnotPro: false,
        subdonePro: false
      },
      toDialogKey: {
        build: '',
        done: '',
        not: ''
      },
      toDialogData: '',
      // leftHeight1: 0,
      // leftHeight2: 0,
      tabIndex: '0',
      companyproData: [],
      subCompanyProDeatil: [],
      show: true,
      chooseProject: 'first',
      flag: {
        changePwd: false,
        changeMsg: false,
        contactUs: false,
        logoutflag: false,
        indexSetting: false
      },
      options: [{
        label: '黄金糕'
      }, {
        label: '双皮奶'
      }, {
        label: '蚵仔煎'
      }, {
        label: '龙须面'
      }, {
        label: '北京烤鸭'
      }],
      addressProject: '国内工程'
    }
  },
  computed: {
    Name: function () {
      const userInfo = JSON.parse(sessionStorage.userInfo).index
      if (userInfo === 'company') {
        this.name = '集团管理'
        return this.name
      } else if (userInfo === 'subCompany') {
        this.name = '公司管理'
        return this.name
      } else if (userInfo === 'project') {
        this.name = '项目'
        return this.name
      }
    },
    Count: function () {
      const userInfo = JSON.parse(sessionStorage.userInfo).index
      if (userInfo === 'company') {
        this.count = '集团项目及其人员情况'
        return this.count
      } else if (userInfo === 'subCompany') {
        this.count = '分公司项目概况'
        return this.count
      } else if (userInfo === 'project') {
        this.count = '项目及人员情况'
        return this.count
      }
    },
    Project: function () {
      const userInfo = JSON.parse(sessionStorage.userInfo).index
      if (userInfo === 'company') {
        this.project = '集团下属公司/机构'
        return this.project
      } else if (userInfo === 'subCompany') {
        this.project = '项目详细情况'
        return this.project
      } else if (userInfo === 'project') {
        this.project = '项目'
        return this.project
      }
    },
    Time: function () {
      var date = new Date()
      var hh, mm, ss
      date.getHours() < 10 ? hh = '0' + date.getHours() : hh = date.getHours()
      date.getMinutes() < 10 ? mm = '0' + date.getHours() : mm = date.getMinutes()
      date.getSeconds() < 10 ? ss = '0' + date.getSeconds() : ss = date.getSeconds()
      console.log(date, 'ssss')
      console.log(hh, mm, ss)
      this.time = hh + ':' + mm + ':' + ss
      return this.time
    }
  },
  mounted () {
    // this.leftHeight1 = document.getElementById('leftBottom').clientHeight
    // this.leftHeight2 = document.getElementById('leftTop').clientHeight
    // this.$refs.mapBox.style.height = (this.leftHeight) + 'px'
    // console.log(this.leftHeight1)
    // console.log(this.leftHeight2)
  },
  created: function () {
    this.dataInit()
    this.leader = JSON.parse(sessionStorage.userInfo)
    const userInfo = JSON.parse(sessionStorage.userInfo).index
    if (userInfo === 'sky') {
      window.location.href = '/workbench/workbench.html'
    } else if (userInfo === 'project') {
      window.location.href = '/workbench/workbench.html'
    }
    // 左侧四个圆内的数据 1007
    request.getFourCirData(JSON.parse(sessionStorage.userInfo).index).then((data) => {
      this.fourCirData = data.data
    })
    //   获取集团显示的下属公司数据  1005
    if (userInfo === 'company') {
      request.getproData(JSON.parse(sessionStorage.userInfo).id).then((data) => {
        this.companyproData = data.data
        console.log(this.companyproData)
        this.toDialogKey.build = 'build'
        this.toDialogKey.done = 'done'
        this.toDialogKey.not = 'not'
      })
    } else if (userInfo === 'subCompany') {
      request.toDetails().then((data) => {
        this.subCompanyProDeatil = data.data[0]
        request.getsubCircle(JSON.parse(sessionStorage.userInfo).pro_id).then((data) => {
          this.subThreeCiecle.human_count = data.data.human_count
          this.subThreeCiecle.live_count = data.data.live_count
          this.subThreeCiecle.accumulate_count = data.data.accumulate_count
        })
        this.toDialogKey.build = 'subbuild'
        this.toDialogKey.done = 'subdone'
        this.toDialogKey.not = 'subnot'
        this.toDialogKey.pId = JSON.parse(sessionStorage.userInfo).pro_id
      })
    } else if (userInfo === 'project') {
      request.prosDetails(JSON.parse(sessionStorage.userInfo).id).then((data) => {
        this.subCompanyProDeatil = data.data
      })
    }
  },
  methods: {
    // 标签页切换
    handleClick (tab, event) {
      if (tab.index === '0') {
        this.tabIndex = tab.index
        this.show = true
        console.log(this.tabIndex)
      } else if (tab.index === '1') {
        this.tabIndex = tab.index
        this.show = false
      }
    },
    // 点击右边表格数据，左侧渲染
    dataFromTable (data) {
      this.subCompanyProDeatil = data
      request.getsubCircle(data.p_id).then((data) => {
        this.subThreeCiecle.human_count = data.data.human_count
        this.subThreeCiecle.live_count = data.data.live_count
        this.subThreeCiecle.accumulate_count = data.data.accumulate_count
      })
    },
    // 集团下select框的聚焦事件
    getaddressProject () {
      console.log('2222')
    },
    changeProject () {
      console.log(this.addressProject)
    },
    // 点击去集团下属公司的项目详情数据
    showDetails (index) {
      this.toDialogData = index
      this.dialog.choosePro = true
    },
    //   使下拉菜单触发点击事件
    userTool (command) {
      this[command]()
    },
    dataInit () {
      this.flag.changePwd = false
      this.flag.changeMsg = false
      this.flag.contactUs = false
      this.flag.logoutflag = false
      this.flag.indexSetting = false
    },
    // 得到修改后的密码
    getChangePwd (item) {
      console.log(item)
      if (item === 0) {
        this.$message.success('修改成功')
        this.flag.changePwd = false
      } else {
        this.$message.error('修改失败')
      }
    },
    changepwd () {
      this.flag.changePwd = true
    },
    personal () {
      this.flag.changeMsg = true
    },
    contact () {
      this.flag.contactUs = true
    },
    setIndex () {
      this.flag.indexSetting = true
    },
    closeShowMsg () {
      this.flag.changeMsg = false
    },
    closeContact () {
      this.flag.contactUs = false
    },
    changeEditMsg (item) {
      console.log(item)
      if (item.code === 0) {
        this.leader.emp_avatar = item.emp_avatar
        sessionStorage.userInfo = JSON.stringify(this.leader)
        this.$message.success('修改成功')
        this.flag.changeMsg = false
      } else {
        this.$message.error('修改失败')
      }
    },
    confirmLogOut () {
      request.toLogin().then((data) => {
        if (data.code === 0) {
          this.flag.logoutflag = false
          window.location.href = '/workbench/login.html'
        }
      })
    },
    closeSettingFlag () {
      this.flag.indexSetting = false
    },
    settingChange (item) {
      if (item === 0) {
        this.$notify({
          title: '成功',
          message: '修改信息成功',
          type: 'success'
        })
        this.flag.indexSetting = false
      } else {
        this.$notify.error({
          title: '提示',
          message: '修改失败'
        })
      }
    },
    // 退出登录
    toLogin () {
      this.flag.logoutflag = true
    },
    // 进入集团功能
    intoCompany: function () {
      if (this.name === '集团管理') {
        window.location.href = '/workbench/workbench.html'
      } else if (this.name === '公司管理') {
        window.location = '/workbench/workbench.html'
      } else if (this.name === '项目') {
        window.location.href = '/workbench/workbench.html'
      }
    }
  }
}
</script>
<style>
  .home_none {display: none;}
  .el-header {min-width: 1360px;}
  .header {padding: 0;background-color: #255f9e;height: 60px;}
  .head-left {width: 200px;background-color: #194c89;height: 60px;padding: 15px 0 12px 33px;box-sizing: border-box;}
  .head-left img {height: 30px;}
  .head-right .text {height: 30px;position: absolute;left: 230px;top: 16px;}
  .head-right .bg {height: 60px;position: absolute;right: 15px;top: 0;}

  .el-main {padding: 0 20px 30px 20px;overflow: hidden;}
  .user-info {padding: 10px 0;overflow: hidden;box-sizing: border-box;}
  .user-info .info-left img {height: 50px;margin-right: 10px;}
  .user-info .info-left {margin-left: 25px;position: relative;overflow: hidden;}
  .user-text {display: inline-block;vertical-align: 10px;}
  .user-text .possion {font-size: 12px;margin: 5px 0;}
  .havePro {color: #255F9E;}
  .noPro{color: #B0B0B0;}
  .info-left .line {height: 30px;width: 2px;display: inline-block;margin-left: 5px;background-color: #D0D0D0;vertical-align: 6px;}
  .enter-manage {font-size: 12px;vertical-align: 6px;cursor: pointer}
  .user-info .info-left .enter-manage img {height: 20px;margin: 0 5px 0 10px;}

  .item-content{height:136px;}
  .item-content img{width: 110px;border-radius: 2px;float: left;}
  .item-content .text {padding-left: 130px;}
  .item-content .text h4{margin-top: 0;color: #1C84C6;margin-bottom: 6px;}
  .item-content .text p {margin: 0;font-size: 12px;color: #676A6C;line-height: 1.4em;}
  .item-content .intro {font-size: 12px;color: #676A6C;line-height: 1.4em;text-indent: 2em;}
  .item-content .intro p {margin-bottom: 0;}
  .item-content .el-button {padding: 0;}
  .item-content .item-content-title{margin: 0 0 15px 0;color: #1C84C6;}
  .circle-text {border: 6px solid #1C84C6;border-radius: 100px;width: 94px;margin: 0 auto;padding: 15px 0;cursor: pointer;}
  .circle-text.danger {border-color: #EF5253;}
  .circle-text.primary {border-color: #1AB394;}
  .circle-text.warning {border-color: #F8AC59;}
  .circle-text p {margin: 0;text-align: center;line-height: 1.2em;font-size: 30px;color: #1C84C6;}
  .circle-text.primary p {color: #1AB394;}
  .circle-text.danger p {color: #EF5253;}
  .circle-text.warning p {color: #F8AC59;}
  .circle-text .small {font-size: 12px;}
  .CirBox{margin-top: 30px;}
  .miniCircle{width:66px;border-radius: 56px;display: table-cell;border: 4px solid #1C84C6;}
  .miniCircle p{font-size: 12px;line-height: 1em;}
  .miniCircle .number{font-size: 16px;font-weight: bold;}
  .left-bottom {margin-top: 22px;}
  a{text-decoration: none; color:#676a6c;}
  .proDetail .imgBox{width:65px;height:80px;border: none;}

  .introRight{width:100px;overflow: hidden;text-overflow:ellipsis;white-space:nowrap;float:left;display: inline-block;}
  .introLeft{float:left;}

  .map{height:534px;}
  /*!* 集团人员进入********************集团详细情况开始 *!*/
  .company {background-color: #fff;height:324px;overflow: auto;}
  .company .projectsBox{width:100%;padding:11px;background-color: #f3f3f4;box-sizing: border-box;height: 276px;margin-top: 8px;overflow: auto;}
  .company .projectsBox .pro{height: 115px;display: inline-block;background: url(../../assets/img/home/proBg.png) 100% 100%/75% auto no-repeat, #ffffff;margin: 1%;padding:10px;border-radius: 3px;width: 14.5%;box-sizing: border-box;cursor: pointer;z-index: 99;}
  .company .projectsBox .pro p{padding: 0;margin: 0;font-size: 12px}
  .company .projectsBox .pro .name{width:100%;height:60%;font-weight: bold;font-size: 15px;}
  .company .projectsBox .pro .num{font-size: 14px;font-weight: bold;margin-bottom: 10px;}
  .company .projectsBox .pro .build{color: #8BC34A;float:left}
  .company .projectsBox .pro .over{color: #3F51B5;float:right;}
  .company .projectsBox .pro .proLeft{color:#101010;font-weight: bold;}
  .company .projectsBox .pro .proNum{color:#6065B7;}
  .company .projectsBox .pro .proState{color:#8BC34A;}
  .company .projectsBox  .addPro{display: inline-block;text-align: center;;height: 115px;background-color: #fff;margin: 6px;padding:5px 8px 8px 16px;box-sizing: border-box;border-radius: 3px;cursor: pointer;width: 14.5%;}
  .company .projectsBox .addPro p {margin:0;padding:0;}
  .company .projectsBox .plus{font-size: 40px;text-align: center;color:#C0DDED;}
  .company .projectsBox .addCom{width:70px;font-size: 14px;color:#C0DDED;text-align: center;margin-top: 20px;}
  .company .projectsBox .addPros{display: inline-block;text-align: center;width:104px;height: 115px;margin-top: -20px;background-color: #fff;padding:5px 8px 8px 16px;box-sizing: border-box;cursor: pointer;position: relative;top:-11px;left:-4px;}
  .company .projectsBox .addPros p {margin:0;padding:0;}
  .company .projectsBox .addPros .plus{font-size: 40px;text-align: center;color:#C0DDED;}
  .company .projectsBox .addPros .addCom{width:70px;font-size: 14px;color:#C0DDED;text-align: center;margin-top: 20px;}
  .projectCondition{height: 300px;position: relative;box-sizing: border-box;}
  .projectCondition .left {width: 280px;float: left;}
  .projectCondition .right {padding-left: 300px;}
</style>
