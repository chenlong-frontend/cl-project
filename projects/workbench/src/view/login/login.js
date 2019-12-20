import Vue from 'vue'
import login from './index.vue'
import '../../../node_modules/normalize.css/normalize.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'font-awesome/css/font-awesome.css'
import 'babel-polyfill'

Vue.config.productionTip = false

Vue.use(ElementUI)
/* eslint-disable no-new */
new Vue({
  el: '#login',
  template: '<login/>',
  components: { login }
})
