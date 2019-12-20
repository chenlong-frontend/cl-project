const state = {
  areaName: '',
  addhelmetChange: '0',
  addAreaChange: '0'
}

const getters = {
  getAreaName: state => {
    return state.areaName
  },
  getHekmetFlag: state => {
    return state.addhelmetChange
  },
  getAreaFlag: state => {
    return state.addAreaChange
  }
}
const mutations = {
  changeAreaName (state, val) {
    state.areaName = val
  },
  changeAddHelmetFlag (state, val) {
    state.addhelmetChange = val
  },
  changeAddAreaFlag (state, val) {
    state.addAreaChange = val
  }
}
export default {
  namespaced: true,
  state,
  getters,
  mutations
}
