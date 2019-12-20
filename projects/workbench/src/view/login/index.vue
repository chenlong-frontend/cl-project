<template>
  <div class="fixed">
			<div class="relatived">
				<header>
					<div class="logo">
						<img src="../../assets/img/login/logo.png" />
					</div>
					<div class="right">
						<span class="welcome">欢迎登陆中江国际 智慧工地+ 系统！</span>
						<a>中江国际</a>
						<span class="line"></span>
						<a>技术支持</a>
						<span class="line"></span>
						<a>联系我们</a>
					</div>
				</header>

				<img class="slogan" src="../../assets/img/login/slogan.png" />

				<div class="background">
					<img  src="../../assets/img/login/bg.png" alt="pic" />
				</div>

				<footer>
					<p>版权所有 : 江苏国际经济技术合作集团有限公司</p>
					<p>技术支持 : 南京大学智慧工程研究中心 Copyright @ nju.zhcs.com 苏公网安备 33011002011092号</p>
				</footer>

				<form class="form">
					<div class="title">登录</div>
					<div class="input_box">
						<div class="input_item">
							<label>账号 : </label>
							<div>
								<input @keyup.enter="toIndex" type="text" v-model="form.account" placeholder="请输入工号/手机号/身份证号" />
								<img src="../../assets/img/login/account.png" />
							</div>
						</div>
						<div class="input_item">
							<label>密码 : </label>
							<div>
								<input @keyup.enter="toIndex" type="password" v-model="form.password" placeholder="请输入密码" />
								<img src="../../assets/img/login/password.png" />
							</div>
						</div>
            <div class="tips">
              <p>{{tips}}</p>
            </div>
					</div>
					<div class="text_right"><a>忘记密码</a></div>
					<div class="btn">
						<button type="button" id="login" @click="toIndex">登 录</button>
					</div>
				</form>
        <!--检测浏览器状态-->
        <el-dialog
          width="40%"
          :visible.sync="flag.checkDialog"
          center
          :modal-append-to-body= false
          :show-close=false
          :close-on-click-modal=false
        >
          <i class="fa fa-exclamation-triangle"
             style="color: #FFD600; font-size: 50px; position: absolute; left: 35%; top: 40px; "></i>
          <span class="check-title">注意！！</span>
          <span slot="footer" class="dialog-footer">
          <div class="version_bg">
            <span class="version_title">您的浏览器不支持本系统，请使用如下版本浏览器登陆</span>
            <div class="version_hr"></div>
            <div class="version_icon">
              <span>
                <i class="fa  fa-internet-explorer"
                style="font-size: 38px;color: #1ca7f3;cursor: pointer;"
                @click="linkToIE">
                </i>
                <span>IE10以上</span>
              </span>
              <span>
                <i class="fa fa-chrome"
                   style="font-size:38px; color:#ff3844;cursor: pointer;"
                   @click="linkToChrome"></i>
                <span>Chrome 55以上</span>
              </span>
              <span>
                <i class="fa fa-edge"
                   style="font-size: 38px;color: #2678d9;cursor: pointer;"
                   @click="linkToEdge"></i>
                <span>Edge</span>
              </span>
              <span>
                <i class="fa fa-safari"
                   style="font-size: 38px;color:#8cc34a;cursor: pointer;"
                   @click="linkToSafria"></i>
                <span>safria 6.0以上</span>
              </span>
            </div>
          </div>
          <span class="version_link">点击图标可下载对应的浏览器</span>
      </span>
        </el-dialog>
	    </div>
  </div>
</template>
<script>
import request from '@/api/login/index.js'
export default {
  created () {
    let userAgent = window.navigator.userAgent
    console.log(userAgent)
    let strStart, strEnd, temp, chromVersion, IEVersion, safariVersion
    // 谷歌浏览器
    if (userAgent.indexOf('Chrome') !== -1 && userAgent.indexOf('Safari') !== -1 && !userAgent.indexOf('Edge')) {
      strStart = userAgent.indexOf('Chrome')
      strEnd = userAgent.indexOf('Safari')
      temp = userAgent.substring(strStart, strEnd)
      chromVersion = Number(temp.split('/')[1].split('.')[0])
      console.log('chromVersion:' + chromVersion)
    }

    // IE浏览器
    if (userAgent.indexOf('NET') !== -1 && userAgent.indexOf('rv') !== -1) {
      strStart = userAgent.indexOf('rv')
      strEnd = userAgent.indexOf(')')
      temp = userAgent.substring(strStart, strEnd)
      IEVersion = Number(temp.split(':')[1].split('.')[0])
      console.log('IEVersion:' + IEVersion)
    }

    // Safari浏览器
    if (userAgent.indexOf('Version') !== -1 && userAgent.indexOf('Safari') !== -1) {
      strStart = userAgent.indexOf('Version')
      strEnd = userAgent.indexOf('Safari')
      temp = userAgent.substring(strStart, strEnd)
      safariVersion = Number(temp.split('/')[1].split('.')[0])
      console.log('safariVersion:' + safariVersion)
    }

    if (chromVersion < 55 || IEVersion < 10 || safariVersion < 6) {
      console.log('请选择正确的浏览器')
      this.flag.checkDialog = true
    }
  },
  data () {
    return {
      form: {
        account: '',
        password: ''
      },
      tips: '',
      flag: {
        checkDialog: false
      }
    }
  },
  methods: {
    toIndex () {
      request.submit(this.form).then(data => {
        request.getRouter().then(menu => {
          sessionStorage.menu = JSON.stringify(menu.data)
          this.tips = ''
          window.location = '/workbench/home.html#/company'
          sessionStorage.userInfo = JSON.stringify(data.data)
        })
      }).catch(error => {
        if (error.code === 202) {
          this.tips = error.msg
        } else {
          this.tips = '网络错误'
        }
      })
    },
    linkToIE () {
      window.open('https://support.microsoft.com/zh-cn/help/17621/internet-explorer-downloads')
    },
    linkToEdge () {
      window.open('https://www.microsoft.com/zh-cn/windows/microsoft-edge')
    },
    linkToSafria () {
      window.open('http://rj.baidu.com/soft/detail/12966.html?ald')
    },
    linkToChrome () {
      window.open('http://rj.baidu.com/soft/detail/14744.html?ald')
    }
  }
}
</script>

<style scoped>
button {background-color: #2582c5;color: #ffffff;border: none;padding: 7px 32px;font-weight: bold;border-radius: 3px;cursor: pointer;}
.fixed {position: fixed;top: 0;bottom: 0;right: 0;left: 0;background: linear-gradient(#2c86c5, #31aadc);overflow: auto;}
.relatived {position: relative;width: 100%;height: 100%;min-width: 1080px;min-height: 750px;}
header {position: absolute;top: 0;width: 100%;height: 70px;background-color: #ffffff;border-bottom: 1px solid #cacaca;box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.3);}
.logo {padding: 10px 60px;display: inline-block;}
.right {float: right;display: inline-block;padding: 29px 70px 29px 0;}
.right .welcome {font-size: 12px;color: #666666;margin-right: 120px;}
.right a {font-size: 12px;color: #2682c5;}
.right .line {display: inline-block;width: 1px;background: #2682c5;height: 12px;vertical-align: -1px;margin: 0 7px;  }
.slogan {position: absolute;top: 200px;left: 15%;z-index: 9;}
.background {position: absolute;bottom: 0;top: 70px;right: 0;left: 0;}
.background img {width: 100%;height: auto;position: absolute;bottom: 0;}
footer {position: absolute;bottom: 30px;text-align: center;width: 100%;font-size: 12px;color: #666666;}
footer p {margin: 0;line-height: 20px;white-space: pre-wrap;}
.form {position: absolute;top: 192px;right: 186px;width: 360px;padding-bottom: 15px;background: white;border-radius: 4px;border: 1px solid #f1f1f1;}
.form .title {text-align: center;padding: 10px 20px;border-bottom: 1px solid #e7e7e7;color: #666666;font-size: 18px;}
.form .input_box {padding: 10px 10px 0 10px;}
.form .input_item {display: table;width: 100%;}
.form .input_item > * {display: table-cell;padding: 10px 0;}
.form .input_item label {width: 80px;text-align: center;color: #666666;}
.form .input_item input {background-color: #efefef;border: 1px solid #d7d7d7;font-size: 14px;padding: 6px 12px;width: 200px;border-radius: 6px;}
.form .input_item input + img {position: absolute;right: 52px;margin-top: 6px;}
.form .text_right {text-align: right;padding-right: 60px;}
.form .text_right a {font-size: 14px;color: #2683c8;text-decoration: underline;cursor: pointer;}
.form .btn {text-align: center;padding: 15px;}
.tips p{font-size: 12px;margin: 0;color: #C80000;padding-left: 18px;}
/* 检测浏览器版本样式 */
.check-title{font-size: 30px;position: absolute;top: 55px;left: 45%;font-weight: 500;  }
.version_bg{width: 90%;height: 200px; background-color: #F5F5F5;border-radius: 4px;margin-left: 5%;}
.version_title{font-size: 16px;color: #737373;display: inline-block;height:80px; line-height: 80px;}
.version_hr{width: 90%;height:1px;background-color: #E8E8E8;margin-left: 5%;}
.version_icon{margin-top: 20px;}
.version_icon>span{display: inline-block;width: 22%;position: relative;}
.version_icon>span>span{display: inline-block; width: 100%;position: absolute;left: 0;top:55px;text-align: center;font-size: 14px;color: #BEB8B8; }
.version_link{font-size: 14px;color: #BEB8B8;display: inline-block;height: 25px;position: relative;right: -28%;top:10px;}
</style>

