import Vue from 'vue'
import ElementUI from 'element-ui'
import home from './index.vue'
import '../../../node_modules/normalize.css/normalize.css'
import 'element-ui/lib/theme-chalk/index.css'
import common from '../../plugin/common.js'
import BaiduMap from 'vue-baidu-map'
import '../../style/global.scss'
import '../../style/home/global.scss'
import 'babel-polyfill'

Vue.use(ElementUI)
Vue.use(common)
Vue.use(BaiduMap, {
  ak: '4uYADIVi5BVEiI6hgfjEHwqE'
})
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#home',
  template: '<home/>',
  components: { home }
})
