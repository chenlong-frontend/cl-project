const state = {
  itemId: 0
}

const getters = {
  checkoutItemId: state => {
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
  changeItemId (state, val) {
    state.itemId = val
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
