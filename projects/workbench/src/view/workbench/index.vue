<template>
  <el-container class="cl-menu">
    <el-header height="115px">
      <div class="logo">
        <!--侧栏logo-->
        <div class="logo-pic">
          <img src="../../assets/img/menu/head03.svg" />
        </div>
        <div class="logo-text">
          <img class="text" v-header-img="userInfo.pro_type" />
          <img class="bg" src="../../assets/img/menu/head01.png"/>
        </div>
      </div>
      <div class="tool-bar tp_menu">
        <!--侧栏用户信息-->
        <div class="right_user">
          <img v-header-load="userInfo.emp_avatar" />
          <div class="tp_box">
            <el-dropdown @command="userTool" >
              <span class="el-dropdown-link tp_dropStyle">
              {{userInfo.name}}<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="personal">个人资料</el-dropdown-item>
                <el-dropdown-item command="changepwd">修改密码</el-dropdown-item>
                <el-dropdown-item command="contact">联系我们</el-dropdown-item>
                <el-dropdown-item command="setIndex">设置首页</el-dropdown-item>
                <el-dropdown-item command="logout" divided>退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <span class="job">{{userInfo.emp_post}}</span>
          </div>
          <div class="tp_box1" >
            <div @click="flag.changePosition = true">
              <i class="fa fa-map-marker tp_iconStyle"></i>
              <span style="cursor: pointer;z-index: 100">{{userInfo.project_name}}</span></div>
            </div>
        </div>
        <div class="tp_headerMenu" :style="{'width': box_1}">
          <div class="commbtn left_btn" v-show="this,menuCount>0" @click="leftBtn"><i class="el-icon-arrow-left"></i></div>
          <ul :style="{'width': box_ul}">
            <li  v-for="(item, index) in menuIndex"
                 @click="menuClick(index)"
                 :key="index"
                 :class="{activeColor : (menuActiveIndex === index)}"
                 >
              <img :src="item.icon">{{item.name}}
            </li>
          </ul>
          <div class="commbtn right_btn" v-show="this,menuCount>0" @click="rightBtn"><i class="el-icon-arrow-right"></i></div>
        </div>
      </div>
    </el-header>
    <el-container>
      <el-aside width="200px" class="asidebox">
        <!--侧栏导航栏-->
        <div class="menu-box" v-loading="loading">
          <div v-if="error" class="error">
            {{ error }}
          </div>
          <el-menu unique-opened active-text-color="#66B1FF" text-color="#6b6b6b"
                   style="z-index:100"
          >
            <template v-for="(item, index) in menuShow">
              <el-menu-item v-if="item.href" class="nav-primary" :index="'index' + index" @click="menuHandle(item.href)">
                <i :class="item.icon" style="color:white"></i>
                <span slot="title" style="color:white">{{item.name}}</span>
              </el-menu-item>
            </template>
          </el-menu>
          <img src="../../assets/img/menu/menu_bg.png" class="menu_img">
        </div>
      </el-aside>
      <el-main>
        <div class="main-box">
          <router-view></router-view>
        </div>
      </el-main>
    </el-container>
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
    <!--选择项目位置-->
    <el-dialog
      title="修改当前位置"
      :visible.sync="flag.changePosition"
      width="40%"
    >
      <div class="tp_chooseproject">
        <span>当前位置：</span>
        <el-autocomplete
          v-model="projectstate"
          :fetch-suggestions="querySearchAsync"
          placeholder="请输入内容"
          @select="handleSelect"
          @blur="handleBlur"
          @focus="handleFocus"
          size="mini"
        ></el-autocomplete>
      </div>
    </el-dialog>
  </el-container>
</template>

<script>
  import workbenchRequest from '@/api/workbench/index.js'
  import showMsg from '@/components/comm/showMsg.vue'
  import changePwd from '@/components/comm/changePwd.vue'
  import contactUs from '@/components/comm/contactUs.vue'
  import setIndex from '@/components/comm/setIndex.vue'
  import changeRequest from '@/api/comm/changeMsg.js'
  export default {
    name: 'workbench',
    components: { changePwd, showMsg, contactUs, setIndex },
    created () {
      this.dataInit()
      this.changeMenuWidth()
    },
    mounted () {
      workbenchRequest.getMenu().then(data => {
        console.log(data)
        this.error = this.post = null
        this.loading = false
        this.menu = data.sort((a, b) => { return a.order - b.order })
        // 初始化项目选项project_name
        this.loadAll()
        let sessiondata = JSON.parse(sessionStorage.userInfo)
        this.projectstate = sessiondata.project_name
        this.getMenuCount()
        this.menuActiveIndex = -1
      })
    },
    data () {
      return {
        loading: true,
        handleFocusFlag: false,
        error: null,
        menu: [{'child': []}],
        menuSelect: 0,
        menuPage: 0,
        menuCount: 0,
        menuActiveIndex: 0,
        userInfo: JSON.parse(sessionStorage.userInfo),
        flag: {
          changePwd: false,
          changeMsg: false,
          contactUs: false,
          logoutflag: false,
          indexSetting: false,
          changePosition: false
        },
        restaurants: [],  // 初始化加载所有项目
        projectstate: '',   // 选择的项目
        firstPage: '',       // 进入项目
        box_1: '1050px',
        box_ul: '1020px'
      }
    },
    computed: {
      menuShow () {
        return this.menu[this.menuSelect].child
      },
      menuIndex () {
        return this.menu.slice(this.menuPage * 9, (this.menuPage + 1) * 9)
      }
    },
    methods: {
      menuHandle (url) {
        this.$router.replace(url)
      },
      handleSelect (item) {
        console.log(item)
        this.userInfo.project_name = item.value
        this.userInfo.index = item.index
        this.userInfo.pro_type = item.manage_type
        sessionStorage.userInfo = JSON.stringify(this.userInfo)
        changeRequest.changeIndex({'pro_id': item.pro_id}).then(
          data => {
            if (data.data.code === 0) {
              workbenchRequest.getRouter().then(menu => {
                sessionStorage.menu = JSON.stringify(menu.data)
              })
              if (item.manage_type === 1 || item.manage_type === 2) {
                window.location.replace('/workbench/home.html#/company')
              } else if (item.manage_type === 3) {
                window.location.reload()
              }
            } else {
              this.$notify.error({
                title: '提示',
                message: '切换失败，请稍后尝试'
              })
            }
          })
      },
      handleFocus () {
        this.handleFocusFlag = true
      },
      handleBlur () {
        this.handleFocusFlag = false
        let sessiondata = JSON.parse(sessionStorage.userInfo)
        this.projectstate = sessiondata.project_name
      },
      // 左右切换按钮
      leftBtn () {
        if (this.menuPage > 0) {
          this.menuPage --
          this.menuActiveIndex = -1
        }
      },
      rightBtn () {
        if (this.menuPage < this.menuCount) {
          this.menuPage ++
          this.menuActiveIndex = -1
        }
      },
      menuClick (index) {
        this.menuSelect = (this.menuPage * 9) + index
        this.menuActiveIndex = index
        // console.log(this.menuShow)
        this.$router.replace(this.menuShow[0].href)
      },
      changeMenuWidth () {
        const self = this
        self.box_1 = (document.body.clientWidth - 220) + 'px'
        self.box_ul = (document.body.clientWidth - 250) + 'px'
        window.onresize = () => {
          return (() => {
            let wide = document.body.clientWidth
            if (wide > 1280) {
              window.box_1 = (wide - 220) + 'px'
              window.box_ul = (wide - 250) + 'px'
              self.box_1 = window.box_1
              self.box_ul = window.box_ul
            } else {
              self.box_1 = '1050px'
              self.box_ul = '1020px'
            }
          })()
        }
      },
      getMenuCount () {
        if (this.menu.length < 10) {
          this.menuCount = 0
        } else {
          this.menuCount = (this.menu.length % 9 === 0) ? (this.menu.length / 9) : Math.floor(this.menu.length / 9)
        }
      },
      dataInit () {
        this.firstPage = ''
        this.changePwd = false
        this.changeMsg = false
        this.flag.contactUs = false
        this.flag.logoutflag = false
        this.flag.indexSetting = false
        this.flag.changePosition = false
        this.handleFocusFlag = false
      },
      userTool (command) {
        this[command]()
      },
      logout () {
        this.flag.logoutflag = true
      },
      // 得到修改后的密码
      getChangePwd (item) {
        if (item === 0) {
          this.$notify({
            title: '成功',
            message: '修改密码成功',
            type: 'success'
          })
          this.flag.changePwd = false
        } else {
          this.$notify.error({
            title: '提示',
            message: '修改失败'
          })
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
        if (item.code === 0) {
          this.userInfo.emp_avatar = item.emp_avatar
          sessionStorage.userInfo = JSON.stringify(this.userInfo)
          this.$notify({
            title: '成功',
            message: '修改信息成功',
            type: 'success'
          })
          this.flag.changeMsg = false
        } else {
          this.$notify.error({
            title: '提示',
            message: '修改失败'
          })
        }
      },
      confirmLogOut () {
        workbenchRequest.logout().then(t => {
          if (t.code === 0) {
            this.flag.logoutflag = false
            window.location = '/workbench/login.html#/'
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
      // 选择项目列表
      loadAll () {
        let searchData = {
          'search_key': ''
        }
        changeRequest.changeProject(searchData).then(
          data => {
            this.restaurants = data.data.data
          })
      },
      querySearchAsync (queryString, cb) {
        if (this.handleFocusFlag) {
          queryString = ''
        }
        this.handleFocusFlag = false
        let restaurants = this.restaurants
        let results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants
        cb(results)
      },
      createStateFilter (queryString) {
        return (state) => {
          return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
        }
      }
    }
  }
</script>

<style scoped>
  .menu_img{width: 200px;height: 100%;position: absolute;top:0px;}
  .tp_headerMenu ul li.activeColor{background-color:#2675c4 }
  .tp_headerMenu ul{display: inline-block;width: 1020px;position: relative;left: 15px;min-width: 1030px;}
  .tp_headerMenu ul li{float: left;width: 11%;height: 55px;line-height: 55px;text-align: center;cursor: pointer;color: white;font-size: 14px;min-width: 80px;}
  .tp_headerMenu ul li img{width: 20px;height: 20px;position: relative;top: 5px;margin-right: 5px;}
  .tp_headerMenu ul li:hover{background-color: #2675c4}
  .commbtn{width: 15px;color: white;height:55px;display: inline-block;background-color: #2675c4;line-height: 55px;}
  .commbtn:hover{cursor: pointer}
  .left_btn{position: absolute;left: 0px}
  .right_btn{position: absolute;right:0;}
  .tp_menu .tp_dropStyle{color: white;}
  .tp_menu .tp_box1{margin-top: 6px;color: white;font-size: 10px;text-align: right;width: 150px;}
  .tp_menu .tp_box1>div{display: inline-block;background-color: #2675c4;padding: 2px;border-radius:4px;padding-left: 10px;padding-right: 10px;}
  .tp_menu .tp_box{color: white;font-size: 10px;text-align: right;margin-top: 10px;width: 150px;}
  .tp_menu .tp_iconStyle{font-size: 13px;margin-right: 5px;}
  .tp_menu .dep_name{margin-right: 10px;}
  .tp_menu .right_user{float: right;min-width: 220px;height: 55px;}
  .tp_menu .right_user>img{width: 42px;height: 42px;float: right;margin: 5px;margin-right: 10px;}
  .tp_headerMenu{height: 55px;width: 1050px;position: relative;min-width: 1060px;}
  .cl-menu .logo-pic {background-color: #1768ba;padding: 15px 0 12px 33px ;height: 70px;box-sizing: border-box;}
  .cl-menu .logo-pic img {height: 30px;}
  .cl-menu .menu-box::-webkit-scrollbar,.el-main::-webkit-scrollbar{width: 6px;height: 6px;}
  .cl-menu .menu-box::-webkit-scrollbar-thumb,.el-main::-webkit-scrollbar-thumb{background-color: #989898;}
  .cl-menu .main-box {padding: 15px;}
  .cl-menu .menu-box .el-menu{background-color: transparent;border-right: none;}
  .cl-menu .menu-box .el-menu .el-menu-item{color:white}
  .cl-menu .menu-box .el-menu .el-menu-item:hover{background-color: #51ADE0}
  .cl-menu .menu-box .el-menu .el-menu-item.is-active{background-color: #51ADE0}
  .cl-menu .el-header .logo {height:60px;background-color: #255f9e;min-width: 1040px;box-sizing: border-box;}
  .cl-menu .el-header .logo-text .text {height: 30px;position: absolute;left: 230px;top: 15px;}
  .cl-menu .el-header .logo-text .bg {height: 60px;position: absolute;right: 15px;top: 0;}
  .cl-menu .el-header .tool-bar {height: 55px;background-color: #4394dd;min-width: 1040px;}
  .tp_chooseproject{margin-left: 25%; margin-top: 20px;margin-bottom: 120px;}
  .tp_chooseproject span{color:#255f9e;font-weight: 600;font-size: 14px;}
</style>
