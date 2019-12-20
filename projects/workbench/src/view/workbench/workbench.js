import Vue from 'vue'
import ElementUI from 'element-ui'
import common from '../../plugin/common.js'
import 'element-ui/lib/theme-chalk/index.css'
import 'font-awesome/css/font-awesome.css'
import '../../../node_modules/normalize.css/normalize.css'
import workbench from '../../view/workbench/index.vue'
import router from '../../router/workbench.js'
import store from '../../store'
import BaiduMap from 'vue-baidu-map'
import '../../style/global.scss'
import '../../style/workbench/global.scss'
import 'babel-polyfill'

Vue.use(ElementUI)
Vue.use(common)
Vue.use(BaiduMap, {
  ak: '4uYADIVi5BVEiI6hgfjEHwqE'
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#workbench',
  router,
  store,
  template: '<workbench/>',
  components: { workbench }
})
