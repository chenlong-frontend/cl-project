import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import * as mutations from './mutations'
import process from './modules/process'
import transfer from './modules/transfer'
import department from './modules/department'
import item from './modules/item'
import router from './modules/router'
import manage from './modules/manage'
import area from './modules/area'

Vue.use(Vuex)

export default new Vuex.Store({
  actions,
  getters,
  mutations,
  modules: {
    process,
    transfer,
    department,
    item,
    router,
    manage,
    area
  }
})
