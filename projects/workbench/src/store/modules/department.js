const state = {
  userTableId: '0',
  flag: false,
  updataflag: false
}

const getters = {
  checkoutUsertableId: state => {
    return state
  },
  isChanged: state => {
    return state.flag
  },
  isupdata: state => {
    return state.updataflag
  }
}

const mutations = {
  changeUserTableId (state, val) {
    state.userTableId = val
  },
  changeFlag (state, val) {
    state.flag = val
  },
  changeUpdate (state, val) {
    state.updataflag = val
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations
}
