import img from '@/assets/img/menu/head02.svg'
import headImg from '@/assets/img/menu/head.svg'
let common = {}
export default (common.install = function (Vue) {
  Vue.prototype.regExp = function (param) {
    let obj = {
      identity: {reg: /^\d{6}(1[89]|2[01])\d{2}(0[1-9]|1[012])(0[1-9]|[012]\d|3[01])\d{3}(\d|X|x)$/i, text: '请输入正确的身份证号'},
      mobile: {reg: /^1[3|4|5|7|8]\d{9}$/, text: '请输入正确手机号'},
      telephone: {reg: /^(\d{3,4}-)?\d{7,8}$/, text: '请输入正确电话号码'},
      email: {reg: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+\.([a-zA-Z0-9_-])+$/, text: '请输入正确邮箱地址'},
      common: {reg: /^[0-9a-zA-Z]{1,}$/, text: '输入字符必须由英文和数字组成'},
      fax: {reg: /(^[0-9]{3,4}[-][0-9]{7,8}$)|(^[0-9]{7,8}$)|(^[0−9]3,4[0-9]{3,8}$)|(^0{0,1}13[0-9]{9}$)/, text: '传真格式错误'},
      illegalWord: {reg: /^[^%&',;*!@|[\]=?/$\x22]+$/, text: '不得有非法字符'},
      managerLimit: {reg: '管理员', text: '名称不得为管理员'},
      departmentLimit: {reg: '默认部门', text: '名称不得为默认部门'},
      workerLimit: {reg: '默认工种', text: '名称不得为默认工种'},
      jwdNum: {reg: /^(([0-9]\d?)|([12]\d{2})|(3[1-5]\d)|360)$/, text: '0-360之间'},
      ipPort: {reg: /^([0-9]|[1-9]\d{1,3}|[1-5]\d{4}|6[0-5]{2}[0-3][0-5])$/, text: '请输入正确的端口号0-65535'},
      number: {reg: /^[0-9]*$/, text: '请输入数字'},
      ipAddress: {reg: /^(?:(?:1[0-9][0-9]\.)|(?:2[0-4][0-9]\.)|(?:25[0-5]\.)|(?:[1-9][0-9]\.)|(?:[0-9]\.)){3}(?:(?:1[0-9][0-9])|(?:2[0-4][0-9])|(?:25[0-5])|(?:[1-9][0-9])|(?:[0-9]))$/, text: '请输入正确的路由格式'}
    }
    return (rule, value, callback) => {
      if (typeof obj[param].reg === 'object') {
        !obj[param].reg.test(value) ? callback(new Error(obj[param].text)) : callback()
      } else {
        value.indexOf(obj[param].reg, 0) !== -1 ? callback(new Error(obj[param].text)) : callback()
      }
    }
  }
  Vue.prototype.cookie = (function () {
    // 传入cookie名，值，时间(传入时间单位为小时)
    function setCookie (name, value, time) {
      let exp = new Date()
      exp.setTime(exp.getTime() + time * 60 * 60 * 1000)
      document.cookie = name + '=' + encodeURIComponent(value) + ((time === null) ? '' : ';expires=' + exp.toGMTString())
    }
    function getCookie (name) {
      let reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
      let arr = document.cookie.match(reg)
      console.log(arr)
      return arr ? decodeURIComponent(arr[2]) : null
    }
    function delCookie (name) {
      let exp = new Date()
      exp.setTime(exp.getTime() - 1)
      let cval = getCookie(name)
      if (cval !== null) document.cookie = name + '=' + cval + ';expires=' + exp.toGMTString()
    }
    return {
      set: function (opt) {
        if (opt instanceof Array) {
          opt.forEach(function (val) { setCookie(val.name, val.value, val.time) })
        } else { setCookie(opt.name, opt.value, opt.time) }
      },
      get: function (opt) {
        let backValue = {}
        if (opt instanceof Array) {
          opt.forEach(function (val) { backValue[val] = getCookie(val) })
        } else { backValue = getCookie(opt) }
        return backValue
      },
      del: delCookie
    }
  })()
  /**
   *  active class类的切换
   */
  Vue.directive('tab-active', {
    bind (el, binding, vnode, oldVnode) {
      el.addEventListener('click', e => {
        el.classList.toggle('active')
      }, false)
    }
  })

  /**
   *  头像加载
   */
  Vue.directive('header-load', {
    update (el, binding, vnode, oldVnode) {
      if (binding.value !== undefined) {
        if (binding.value.length !== 0 && el.src !== headImg) {
          el.src = binding.value
          el.onerror = function () {
            el.src = headImg
          }
        }
      }
    }
  })

  /**
   *  图像加载
   */
  Vue.directive('img-loading', {
    inserted (el, binding, vnode, oldVnode) {
      let div = document.createElement('div')
      div.style.width = binding.value[0]
      div.style.height = binding.value[1]
      div.style.backgroundColor = '#66CCFF'
      div.className = 'img-loading-div'
      el.style.display = 'none'
      el.parentNode.appendChild(div)
    },
    update (el, binding, vnode, oldVnode) {
      if (binding.value[2]) {
        el.src = binding.value[2]
        el.onload = function () {
          if (el.parentNode.querySelector('.img-loading-div')) {
            el.parentNode.removeChild(el.parentNode.querySelector('.img-loading-div'))
            el.style.display = 'block'
          }
        }
      }
    }
  })
  // 个人资料那边显示无
  Vue.directive('show-no', {
    update (el, binding, vnode, oldVnode) {
      if (binding.value[0] === '' || binding.value[0] == null) {
        el.innerHTML = '暂无'
      }
    }
  })
  // 个人资料那边显示无
  Vue.directive('header-img', {
    update (el, binding, vnode, oldVnode) {
      if (binding.value !== undefined) {
        if (binding.value.length !== 0 && el.src !== img) {
          el.src = 'img/' + binding.value + '.svg'
          el.onerror = function () {
            el.src = img
          }
        }
      }
    }
  })
})
